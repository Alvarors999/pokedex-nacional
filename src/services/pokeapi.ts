import { Pokemon, PokemonType, EvolutionNode } from '../types/pokemon';
import { API_TO_POKEMON_TYPE } from '../data/types';

// In-memory caches to prevent repeated network calls
const pokemonCache = new Map<number | string, Pokemon>();
const speciesCache = new Map<number | string, any>();
const evolutionCache = new Map<string, EvolutionNode>();

// Generation names map in Spanish
export const GENERATION_NAMES: Record<string, string> = {
  'generation-i': 'Kanto (Gen I)',
  'generation-ii': 'Johto (Gen II)',
  'generation-iii': 'Hoenn (Gen III)',
  'generation-iv': 'Sinnoh (Gen IV)',
  'generation-v': 'Teselia (Gen V)',
  'generation-vi': 'Kalos (Gen VI)',
  'generation-vii': 'Alola (Gen VII)',
  'generation-viii': 'Galar (Gen VIII)',
  'generation-ix': 'Paldea (Gen IX)',
};

// Clean flavor text strings from PokéAPI (removes line break artifacts \f, \n)
function cleanFlavorText(text: string): string {
  return text
    .replace(/[\n\f\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Capitalize helper
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Fetch single Pokémon by ID or Name from PokéAPI
export async function fetchPokemon(idOrName: number | string): Promise<Pokemon> {
  const key = typeof idOrName === 'string' ? idOrName.toLowerCase().trim() : idOrName;

  if (pokemonCache.has(key)) {
    return pokemonCache.get(key)!;
  }

  // 1. Fetch Pokemon base data
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
  if (!res.ok) {
    throw new Error(`Pokémon "${idOrName}" no encontrado en PokéAPI.`);
  }
  const data = await res.json();
  const id: number = data.id;

  // 2. Fetch Species data for Spanish texts & evolution
  let speciesData: any = null;
  try {
    if (speciesCache.has(id)) {
      speciesData = speciesCache.get(id);
    } else {
      const speciesRes = await fetch(data.species.url);
      if (speciesRes.ok) {
        speciesData = await speciesRes.json();
        speciesCache.set(id, speciesData);
      }
    }
  } catch (err) {
    console.warn(`Error al cargar especie para Pokémon #${id}:`, err);
  }

  // Parse types
  const types: [PokemonType] | [PokemonType, PokemonType] = data.types.map(
    (t: any) => API_TO_POKEMON_TYPE[t.type.name] || 'Normal'
  ) as [PokemonType] | [PokemonType, PokemonType];

  // Parse stats
  const statMap: Record<string, number> = {};
  data.stats.forEach((s: any) => {
    statMap[s.stat.name] = s.base_stat;
  });

  const stats = {
    hp: statMap['hp'] || 50,
    attack: statMap['attack'] || 50,
    defense: statMap['defense'] || 50,
    specialAttack: statMap['special-attack'] || 50,
    specialDefense: statMap['special-defense'] || 50,
    speed: statMap['speed'] || 50,
  };

  // Parse abilities
  const abilities = data.abilities.map((a: any) => ({
    name: capitalize(a.ability.name.replace('-', ' ')),
    isHidden: a.is_hidden,
  }));

  // Parse Genus & Flavor Text (Spanish preferred)
  let genus = 'Pokémon';
  let description = 'Un misterioso Pokémon registrado en la enciclopedia nacional.';
  let generation = 'Kanto (Gen I)';
  let isLegendary = false;
  let isMythical = false;
  let habitat = data.location_area_encounters ? 'Tierras salvajes' : undefined;

  if (speciesData) {
    isLegendary = speciesData.is_legendary || false;
    isMythical = speciesData.is_mythical || false;

    // Spanish genus
    const genusEntry =
      speciesData.genera?.find((g: any) => g.language.name === 'es') ||
      speciesData.genera?.find((g: any) => g.language.name === 'en');
    if (genusEntry) {
      genus = genusEntry.genus;
    }

    // Spanish flavor text
    const flavorEntry =
      speciesData.flavor_text_entries?.find((f: any) => f.language.name === 'es') ||
      speciesData.flavor_text_entries?.find((f: any) => f.language.name === 'en');
    if (flavorEntry) {
      description = cleanFlavorText(flavorEntry.flavor_text);
    }

    // Generation
    if (speciesData.generation?.name) {
      generation = GENERATION_NAMES[speciesData.generation.name] || speciesData.generation.name;
    }

    // Habitat
    if (speciesData.habitat?.name) {
      habitat = capitalize(speciesData.habitat.name);
    }
  }

  // Sprites
  const spriteUrl =
    data.sprites?.other?.['official-artwork']?.front_default ||
    data.sprites?.other?.home?.front_default ||
    data.sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  // Cry audio from PokeAPI
  const cryUrl = data.cries?.latest || `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;

  // Parse Evolution Chain if available
  let evolutionChain: EvolutionNode | undefined = undefined;
  if (speciesData?.evolution_chain?.url) {
    try {
      const evoUrl = speciesData.evolution_chain.url;
      if (evolutionCache.has(evoUrl)) {
        evolutionChain = evolutionCache.get(evoUrl);
      } else {
        const evoRes = await fetch(evoUrl);
        if (evoRes.ok) {
          const evoData = await evoRes.json();
          evolutionChain = await parseEvolutionChain(evoData.chain);
          evolutionCache.set(evoUrl, evolutionChain);
        }
      }
    } catch (err) {
      console.warn(`Error al cargar cadena evolutiva:`, err);
    }
  }

  const pokemon: Pokemon = {
    id,
    name: capitalize(data.name),
    genus,
    types,
    stats,
    height: Number((data.height / 10).toFixed(1)), // dm to meters
    weight: Number((data.weight / 10).toFixed(1)), // hg to kg
    abilities,
    description,
    generation,
    habitat,
    isLegendary,
    isMythical,
    spriteUrl,
    cryUrl,
    evolutionChain,
  };

  pokemonCache.set(id, pokemon);
  pokemonCache.set(data.name.toLowerCase(), pokemon);
  return pokemon;
}

// Parse evolution chain node recursively
async function parseEvolutionChain(chainNode: any): Promise<EvolutionNode> {
  const speciesUrl = chainNode.species.url;
  const parts = speciesUrl.split('/').filter(Boolean);
  const id = Number(parts[parts.length - 1]);
  const name = capitalize(chainNode.species.name);

  // Trigger text in Spanish
  let triggerText: string | undefined = undefined;
  if (chainNode.evolution_details && chainNode.evolution_details.length > 0) {
    const details = chainNode.evolution_details[0];
    if (details.min_level) {
      triggerText = `Nivel ${details.min_level}`;
    } else if (details.item) {
      triggerText = capitalize(details.item.name.replace('-', ' '));
    } else if (details.trigger?.name === 'trade') {
      triggerText = 'Intercambio';
    } else if (details.min_happiness) {
      triggerText = 'Amistad alta';
    } else if (details.time_of_day) {
      triggerText = details.time_of_day === 'night' ? 'Durante la Noche' : 'Durante el Día';
    } else {
      triggerText = 'Evolución especial';
    }
  }

  // Sprite
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  // Fetch types if possible, or fallback
  let types: PokemonType[] = ['Normal'];
  if (pokemonCache.has(id)) {
    types = pokemonCache.get(id)!.types;
  }

  const evolvesTo: EvolutionNode[] = [];
  if (chainNode.evolves_to && chainNode.evolves_to.length > 0) {
    for (const sub of chainNode.evolves_to) {
      const childNode = await parseEvolutionChain(sub);
      evolvesTo.push(childNode);
    }
  }

  return {
    id,
    name,
    spriteUrl,
    types,
    triggerText,
    evolvesTo,
  };
}

// Fetch list of Pokemon (e.g. initial 151)
export async function fetchPokemonList(limit: number = 151, offset: number = 0): Promise<Pokemon[]> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) {
    throw new Error('Error al conectar con PokéAPI.');
  }
  const data = await res.json();
  const results = data.results;

  // Fetch in controlled batches to avoid browser socket bottlenecks
  const pokemonList: Pokemon[] = [];
  const batchSize = 12;

  for (let i = 0; i < results.length; i += batchSize) {
    const batch = results.slice(i, i + batchSize);
    const promises = batch.map((item: { name: string; url: string }) => {
      const parts = item.url.split('/').filter(Boolean);
      const id = Number(parts[parts.length - 1]);
      return fetchPokemon(id).catch((err) => {
        console.warn(`Error cargando #${id}:`, err);
        return null;
      });
    });

    const batchResults = await Promise.all(promises);
    batchResults.forEach((p) => {
      if (p) pokemonList.push(p);
    });
  }

  return pokemonList;
}
