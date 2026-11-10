import { PokemonType, TypeDef } from '../types/pokemon';

export const POKEMON_TYPES: Record<PokemonType, TypeDef> = {
  Acero: {
    name: 'Acero',
    apiName: 'steel',
    color: '#94A3B8',
    badgeBg: 'bg-slate-400/20 border-slate-400/40 text-slate-300',
    badgeText: 'text-slate-300',
    gradient: 'from-slate-500/25 via-zinc-600/10 to-transparent',
    borderGlow: 'hover:border-slate-400/50 hover:shadow-slate-400/15',
    description: 'Defensa férrea y aleaciones impenetrables.',
  },
  Agua: {
    name: 'Agua',
    apiName: 'water',
    color: '#3B82F6',
    badgeBg: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
    badgeText: 'text-blue-300',
    gradient: 'from-blue-500/25 via-cyan-600/10 to-transparent',
    borderGlow: 'hover:border-blue-400/50 hover:shadow-blue-500/15',
    description: 'Fluidez y corrientes torrenciales de lagos y océanos.',
  },
  Bicho: {
    name: 'Bicho',
    apiName: 'bug',
    color: '#84CC16',
    badgeBg: 'bg-lime-500/20 border-lime-500/40 text-lime-300',
    badgeText: 'text-lime-300',
    gradient: 'from-lime-500/25 via-emerald-600/10 to-transparent',
    borderGlow: 'hover:border-lime-400/50 hover:shadow-lime-500/15',
    description: 'Criaturas ágiles de exoesqueleto y seda boscosa.',
  },
  Dragón: {
    name: 'Dragón',
    apiName: 'dragon',
    color: '#6366F1',
    badgeBg: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300',
    badgeText: 'text-indigo-300',
    gradient: 'from-indigo-600/25 via-purple-700/10 to-transparent',
    borderGlow: 'hover:border-indigo-400/50 hover:shadow-indigo-500/15',
    description: 'Poder místico ancestral y aliento destructor.',
  },
  Eléctrico: {
    name: 'Eléctrico',
    apiName: 'electric',
    color: '#EAB308',
    badgeBg: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
    badgeText: 'text-yellow-300',
    gradient: 'from-amber-400/25 via-yellow-500/10 to-transparent',
    borderGlow: 'hover:border-yellow-400/50 hover:shadow-yellow-400/15',
    description: 'Descargas de alto voltaje y ráfagas estáticas.',
  },
  Fantasma: {
    name: 'Fantasma',
    apiName: 'ghost',
    color: '#7C3AED',
    badgeBg: 'bg-purple-600/20 border-purple-500/40 text-purple-300',
    badgeText: 'text-purple-300',
    gradient: 'from-purple-700/25 via-indigo-900/10 to-transparent',
    borderGlow: 'hover:border-purple-400/50 hover:shadow-purple-500/15',
    description: 'Energías ectoplasmáticas y apariciones sombrías.',
  },
  Fuego: {
    name: 'Fuego',
    apiName: 'fire',
    color: '#EF4444',
    badgeBg: 'bg-red-500/20 border-red-500/40 text-red-300',
    badgeText: 'text-red-300',
    gradient: 'from-red-500/25 via-orange-500/10 to-transparent',
    borderGlow: 'hover:border-red-400/50 hover:shadow-red-500/15',
    description: 'Llamaradas ardientes capaces de fundir la roca.',
  },
  Hada: {
    name: 'Hada',
    apiName: 'fairy',
    color: '#F472B6',
    badgeBg: 'bg-pink-400/20 border-pink-400/40 text-pink-300',
    badgeText: 'text-pink-300',
    gradient: 'from-pink-400/25 via-rose-300/10 to-transparent',
    borderGlow: 'hover:border-pink-300/50 hover:shadow-pink-400/15',
    description: 'Magia feérica y resplandor lunar purificador.',
  },
  Hielo: {
    name: 'Hielo',
    apiName: 'ice',
    color: '#06B6D4',
    badgeBg: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
    badgeText: 'text-cyan-300',
    gradient: 'from-sky-400/25 via-cyan-500/10 to-transparent',
    borderGlow: 'hover:border-cyan-300/50 hover:shadow-cyan-400/15',
    description: 'Cero absoluto y cristales de escarcha perpetua.',
  },
  Lucha: {
    name: 'Lucha',
    apiName: 'fighting',
    color: '#EA580C',
    badgeBg: 'bg-orange-600/20 border-orange-500/40 text-orange-300',
    badgeText: 'text-orange-300',
    gradient: 'from-orange-600/25 via-amber-700/10 to-transparent',
    borderGlow: 'hover:border-orange-400/50 hover:shadow-orange-500/15',
    description: 'Disciplina física y golpes devastadores.',
  },
  Normal: {
    name: 'Normal',
    apiName: 'normal',
    color: '#A8A29E',
    badgeBg: 'bg-stone-400/20 border-stone-400/40 text-stone-300',
    badgeText: 'text-stone-300',
    gradient: 'from-stone-400/25 via-zinc-500/10 to-transparent',
    borderGlow: 'hover:border-stone-300/50 hover:shadow-stone-400/15',
    description: 'Versatilidad innata y adaptabilidad natural.',
  },
  Planta: {
    name: 'Planta',
    apiName: 'grass',
    color: '#10B981',
    badgeBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    badgeText: 'text-emerald-300',
    gradient: 'from-emerald-500/25 via-green-600/10 to-transparent',
    borderGlow: 'hover:border-emerald-400/50 hover:shadow-emerald-500/15',
    description: 'Vigor fotosintético y fuerza de las raíces.',
  },
  Psíquico: {
    name: 'Psíquico',
    apiName: 'psychic',
    color: '#EC4899',
    badgeBg: 'bg-pink-600/20 border-pink-500/40 text-pink-300',
    badgeText: 'text-pink-300',
    gradient: 'from-pink-600/25 via-fuchsia-600/10 to-transparent',
    borderGlow: 'hover:border-pink-400/50 hover:shadow-pink-500/15',
    description: 'Telequinesis y control mental sobre la materia.',
  },
  Roca: {
    name: 'Roca',
    apiName: 'rock',
    color: '#B45309',
    badgeBg: 'bg-amber-700/20 border-amber-600/40 text-amber-300',
    badgeText: 'text-amber-300',
    gradient: 'from-amber-700/25 via-stone-700/10 to-transparent',
    borderGlow: 'hover:border-amber-500/50 hover:shadow-amber-600/15',
    description: 'Minerales sólidos y cantos rodados impenetrables.',
  },
  Siniestro: {
    name: 'Siniestro',
    apiName: 'dark',
    color: '#475569',
    badgeBg: 'bg-slate-700/30 border-slate-600/40 text-slate-300',
    badgeText: 'text-slate-300',
    gradient: 'from-slate-800/35 via-zinc-900/20 to-transparent',
    borderGlow: 'hover:border-slate-500/50 hover:shadow-slate-700/20',
    description: 'Tácticas sigilosas y el poder de la penumbra.',
  },
  Tierra: {
    name: 'Tierra',
    apiName: 'ground',
    color: '#D97706',
    badgeBg: 'bg-amber-600/20 border-amber-500/40 text-amber-300',
    badgeText: 'text-amber-300',
    gradient: 'from-yellow-700/25 via-amber-800/10 to-transparent',
    borderGlow: 'hover:border-amber-400/50 hover:shadow-amber-500/15',
    description: 'Temblores sísmicos y arenas movedizas.',
  },
  Veneno: {
    name: 'Veneno',
    apiName: 'poison',
    color: '#A855F7',
    badgeBg: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    badgeText: 'text-purple-300',
    gradient: 'from-purple-600/25 via-fuchsia-800/10 to-transparent',
    borderGlow: 'hover:border-purple-400/50 hover:shadow-purple-500/15',
    description: 'Toxinas biológicas y nieblas corrosivas.',
  },
  Volador: {
    name: 'Volador',
    apiName: 'flying',
    color: '#38BDF8',
    badgeBg: 'bg-sky-500/20 border-sky-400/40 text-sky-300',
    badgeText: 'text-sky-300',
    gradient: 'from-sky-400/25 via-indigo-500/10 to-transparent',
    borderGlow: 'hover:border-sky-300/50 hover:shadow-sky-400/15',
    description: 'Dominio de las alturas y corrientes atmosféricas.',
  },
};

export const API_TO_POKEMON_TYPE: Record<string, PokemonType> = {
  steel: 'Acero',
  water: 'Agua',
  bug: 'Bicho',
  dragon: 'Dragón',
  electric: 'Eléctrico',
  ghost: 'Fantasma',
  fire: 'Fuego',
  fairy: 'Hada',
  ice: 'Hielo',
  fighting: 'Lucha',
  normal: 'Normal',
  grass: 'Planta',
  psychic: 'Psíquico',
  rock: 'Roca',
  dark: 'Siniestro',
  ground: 'Tierra',
  poison: 'Veneno',
  flying: 'Volador',
};

// Official Pokémon 18x18 type effectiveness chart: [Attacking][Defending]
export const TYPE_CHART: Record<PokemonType, Record<PokemonType, number>> = {
  Acero: {
    Acero: 0.5, Agua: 0.5, Bicho: 1, Dragón: 1, Eléctrico: 0.5, Fantasma: 1, Fuego: 0.5, Hada: 2, Hielo: 2, Lucha: 1, Normal: 1, Planta: 1, Psíquico: 1, Roca: 2, Siniestro: 1, Tierra: 1, Veneno: 1, Volador: 1
  },
  Agua: {
    Acero: 1, Agua: 0.5, Bicho: 1, Dragón: 0.5, Eléctrico: 1, Fantasma: 1, Fuego: 2, Hada: 1, Hielo: 1, Lucha: 1, Normal: 1, Planta: 0.5, Psíquico: 1, Roca: 2, Siniestro: 1, Tierra: 2, Veneno: 1, Volador: 1
  },
  Bicho: {
    Acero: 0.5, Agua: 1, Bicho: 1, Dragón: 1, Eléctrico: 1, Fantasma: 0.5, Fuego: 0.5, Hada: 0.5, Hielo: 1, Lucha: 0.5, Normal: 1, Planta: 2, Psíquico: 2, Roca: 1, Siniestro: 2, Tierra: 1, Veneno: 0.5, Volador: 0.5
  },
  Dragón: {
    Acero: 0.5, Agua: 1, Bicho: 1, Dragón: 2, Eléctrico: 1, Fantasma: 1, Fuego: 1, Hada: 0, Hielo: 1, Lucha: 1, Normal: 1, Planta: 1, Psíquico: 1, Roca: 1, Siniestro: 1, Tierra: 1, Veneno: 1, Volador: 1
  },
  Eléctrico: {
    Acero: 1, Agua: 2, Bicho: 1, Dragón: 0.5, Eléctrico: 0.5, Fantasma: 1, Fuego: 1, Hada: 1, Hielo: 1, Lucha: 1, Normal: 1, Planta: 0.5, Psíquico: 1, Roca: 1, Siniestro: 1, Tierra: 0, Veneno: 1, Volador: 2
  },
  Fantasma: {
    Acero: 1, Agua: 1, Bicho: 1, Dragón: 1, Eléctrico: 1, Fantasma: 2, Fuego: 1, Hada: 1, Hielo: 1, Lucha: 1, Normal: 0, Planta: 1, Psíquico: 2, Roca: 1, Siniestro: 0.5, Tierra: 1, Veneno: 1, Volador: 1
  },
  Fuego: {
    Acero: 2, Agua: 0.5, Bicho: 2, Dragón: 0.5, Eléctrico: 1, Fantasma: 1, Fuego: 0.5, Hada: 1, Hielo: 2, Lucha: 1, Normal: 1, Planta: 2, Psíquico: 1, Roca: 0.5, Siniestro: 1, Tierra: 1, Veneno: 1, Volador: 1
  },
  Hada: {
    Acero: 0.5, Agua: 1, Bicho: 1, Dragón: 2, Eléctrico: 1, Fantasma: 1, Fuego: 0.5, Hada: 1, Hielo: 1, Lucha: 2, Normal: 1, Planta: 1, Psíquico: 1, Roca: 1, Siniestro: 2, Tierra: 1, Veneno: 0.5, Volador: 1
  },
  Hielo: {
    Acero: 0.5, Agua: 0.5, Bicho: 1, Dragón: 2, Eléctrico: 1, Fantasma: 1, Fuego: 0.5, Hada: 1, Hielo: 0.5, Lucha: 1, Normal: 1, Planta: 2, Psíquico: 1, Roca: 1, Siniestro: 1, Tierra: 2, Veneno: 1, Volador: 2
  },
  Lucha: {
    Acero: 2, Agua: 1, Bicho: 0.5, Dragón: 1, Eléctrico: 1, Fantasma: 0, Fuego: 1, Hada: 0.5, Hielo: 2, Lucha: 1, Normal: 2, Planta: 1, Psíquico: 0.5, Roca: 2, Siniestro: 2, Tierra: 1, Veneno: 0.5, Volador: 0.5
  },
  Normal: {
    Acero: 0.5, Agua: 1, Bicho: 1, Dragón: 1, Eléctrico: 1, Fantasma: 0, Fuego: 1, Hada: 1, Hielo: 1, Lucha: 1, Normal: 1, Planta: 1, Psíquico: 1, Roca: 0.5, Siniestro: 1, Tierra: 1, Veneno: 1, Volador: 1
  },
  Planta: {
    Acero: 0.5, Agua: 2, Bicho: 0.5, Dragón: 0.5, Eléctrico: 1, Fantasma: 1, Fuego: 0.5, Hada: 1, Hielo: 1, Lucha: 1, Normal: 1, Planta: 0.5, Psíquico: 1, Roca: 2, Siniestro: 1, Tierra: 2, Veneno: 0.5, Volador: 0.5
  },
  Psíquico: {
    Acero: 0.5, Agua: 1, Bicho: 1, Dragón: 1, Eléctrico: 1, Fantasma: 1, Fuego: 1, Hada: 1, Hielo: 1, Lucha: 2, Normal: 1, Planta: 1, Psíquico: 0.5, Roca: 1, Siniestro: 0, Tierra: 1, Veneno: 2, Volador: 1
  },
  Roca: {
    Acero: 0.5, Agua: 1, Bicho: 2, Dragón: 1, Eléctrico: 1, Fantasma: 1, Fuego: 2, Hada: 1, Hielo: 2, Lucha: 0.5, Normal: 1, Planta: 1, Psíquico: 1, Roca: 1, Siniestro: 1, Tierra: 0.5, Veneno: 1, Volador: 2
  },
  Siniestro: {
    Acero: 1, Agua: 1, Bicho: 1, Dragón: 1, Eléctrico: 1, Fantasma: 2, Fuego: 1, Hada: 0.5, Hielo: 1, Lucha: 0.5, Normal: 1, Planta: 1, Psíquico: 2, Roca: 1, Siniestro: 0.5, Tierra: 1, Veneno: 1, Volador: 1
  },
  Tierra: {
    Acero: 2, Agua: 1, Bicho: 0.5, Dragón: 1, Eléctrico: 2, Fantasma: 1, Fuego: 2, Hada: 1, Hielo: 1, Lucha: 1, Normal: 1, Planta: 0.5, Psíquico: 1, Roca: 2, Siniestro: 1, Tierra: 1, Veneno: 2, Volador: 0
  },
  Veneno: {
    Acero: 0, Agua: 1, Bicho: 1, Dragón: 1, Eléctrico: 1, Fantasma: 0.5, Fuego: 1, Hada: 2, Hielo: 1, Lucha: 1, Normal: 1, Planta: 2, Psíquico: 1, Roca: 0.5, Siniestro: 1, Tierra: 0.5, Veneno: 0.5, Volador: 1
  },
  Volador: {
    Acero: 0.5, Agua: 1, Bicho: 2, Dragón: 1, Eléctrico: 0.5, Fantasma: 1, Fuego: 1, Hada: 1, Hielo: 1, Lucha: 2, Normal: 1, Planta: 2, Psíquico: 1, Roca: 0.5, Siniestro: 1, Tierra: 1, Veneno: 1, Volador: 1
  },
};

export interface MatchupResult {
  extremeWeaknesses: PokemonType[]; // 4x
  weaknesses: PokemonType[]; // 2x
  resistances: PokemonType[]; // 0.5x
  extremeResistances: PokemonType[]; // 0.25x
  immunities: PokemonType[]; // 0x
  normal: PokemonType[]; // 1x
}

export function calculateMatchups(defendingTypes: PokemonType[]): MatchupResult {
  const allTypes = Object.keys(POKEMON_TYPES) as PokemonType[];
  const result: MatchupResult = {
    extremeWeaknesses: [],
    weaknesses: [],
    resistances: [],
    extremeResistances: [],
    immunities: [],
    normal: [],
  };

  for (const attackingType of allTypes) {
    let multiplier = 1;
    for (const defType of defendingTypes) {
      multiplier *= TYPE_CHART[attackingType][defType];
    }

    if (multiplier === 0) {
      result.immunities.push(attackingType);
    } else if (multiplier >= 3.9) {
      result.extremeWeaknesses.push(attackingType);
    } else if (multiplier > 1) {
      result.weaknesses.push(attackingType);
    } else if (multiplier <= 0.26) {
      result.extremeResistances.push(attackingType);
    } else if (multiplier < 1) {
      result.resistances.push(attackingType);
    } else {
      result.normal.push(attackingType);
    }
  }

  return result;
}
