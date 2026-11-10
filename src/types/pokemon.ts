export type PokemonType =
  | 'Acero'
  | 'Agua'
  | 'Bicho'
  | 'Dragón'
  | 'Eléctrico'
  | 'Fantasma'
  | 'Fuego'
  | 'Hada'
  | 'Hielo'
  | 'Lucha'
  | 'Normal'
  | 'Planta'
  | 'Psíquico'
  | 'Roca'
  | 'Siniestro'
  | 'Tierra'
  | 'Veneno'
  | 'Volador';

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
  description?: string;
}

export interface EvolutionNode {
  id: number;
  name: string;
  spriteUrl: string;
  types: PokemonType[];
  triggerText?: string;
  evolvesTo: EvolutionNode[];
}

export interface Pokemon {
  id: number;
  name: string;
  genus: string;
  types: [PokemonType] | [PokemonType, PokemonType];
  stats: PokemonStats;
  height: number; // in meters
  weight: number; // in kg
  abilities: PokemonAbility[];
  description: string;
  generation: string;
  habitat?: string;
  isLegendary: boolean;
  isMythical: boolean;
  spriteUrl: string;
  cryUrl?: string;
  evolutionChain?: EvolutionNode;
}

export interface TypeDef {
  name: PokemonType;
  apiName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  gradient: string;
  borderGlow: string;
  description: string;
}

export type SortOption =
  | 'number-asc'
  | 'number-desc'
  | 'name-asc'
  | 'name-desc'
  | 'stats-desc'
  | 'stats-asc';
