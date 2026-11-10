import React, { useState } from 'react';
import {
  Search,
  X,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Heart,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { PokemonType, SortOption } from '../types/pokemon';
import { POKEMON_TYPES } from '../data/types';
import { TypeBadge } from './TypeBadge';
import { sound } from '../utils/audio';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedType: PokemonType | 'ALL';
  onTypeChange: (type: PokemonType | 'ALL') => void;
  selectedGeneration: string;
  onGenerationChange: (gen: string) => void;
  rarityFilter: 'all' | 'legendary' | 'mythical' | 'standard';
  onRarityFilterChange: (rarity: 'all' | 'legendary' | 'mythical' | 'standard') => void;
  onlyFavorites: boolean;
  onOnlyFavoritesChange: (val: boolean) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  totalFilteredCount: number;
  totalCount: number;
  isSearchingApi?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedGeneration,
  onGenerationChange,
  rarityFilter,
  onRarityFilterChange,
  onlyFavorites,
  onOnlyFavoritesChange,
  sortOption,
  onSortChange,
  onResetFilters,
  activeFilterCount,
  totalFilteredCount,
  totalCount,
  isSearchingApi = false,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const elementTypesList = Object.keys(POKEMON_TYPES) as PokemonType[];

  const generations = [
    'Kanto (Gen I)',
    'Johto (Gen II)',
    'Hoenn (Gen III)',
    'Sinnoh (Gen IV)',
    'Teselia (Gen V)',
    'Kalos (Gen VI)',
    'Alola (Gen VII)',
    'Galar (Gen VIII)',
    'Paldea (Gen IX)',
  ];

  return (
    <div className="w-full space-y-4">
      {/* Top Search & Primary Filter Row */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input Box */}
        <div className="relative flex-1">
          {isSearchingApi ? (
            <Loader2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500 animate-spin pointer-events-none" />
          ) : (
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          )}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre o número (#001, Pikachu, 150)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onSearchChange('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              title="Borrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right side toolbar: Sort + Advanced Filters + Favorites */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Favorites quick toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOnlyFavoritesChange(!onlyFavorites);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              onlyFavorites
                ? 'border-rose-500/40 bg-rose-500/10 text-rose-500 font-semibold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`} />
            <span>Favoritos</span>
          </button>

          {/* Sort Selector */}
          <div className="relative shrink-0">
            <select
              value={sortOption}
              onChange={(e) => {
                sound.playClick();
                onSortChange(e.target.value as SortOption);
              }}
              className="appearance-none pl-8 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
            >
              <option value="number-asc">Número (#001 → ...)</option>
              <option value="number-desc">Número (... → #001)</option>
              <option value="name-asc">Nombre (A - Z)</option>
              <option value="name-desc">Nombre (Z - A)</option>
              <option value="stats-desc">Mayor Estadística (BST)</option>
              <option value="stats-asc">Menor Estadística (BST)</option>
            </select>
            <ArrowUpDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Advanced Filters Button */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowAdvanced(!showAdvanced);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              showAdvanced || activeFilterCount > 0
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-500 font-semibold'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Reset Filters */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onResetFilters();
              }}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title="Restablecer todos los filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 18 Official Pokemon Types Horizontal Scroller */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onTypeChange('ALL');
          }}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            selectedType === 'ALL'
              ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-transparent shadow-sm'
              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          Todos los Tipos
        </button>

        {elementTypesList.map((type) => (
          <TypeBadge
            key={type}
            type={type}
            size="sm"
            interactive
            selected={selectedType === type}
            onClick={() => {
              sound.playClick();
              onTypeChange(selectedType === type ? 'ALL' : type);
            }}
          />
        ))}
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-top-2 duration-200 text-left">
          {/* Generation */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Región / Generación
            </label>
            <select
              value={selectedGeneration}
              onChange={(e) => {
                sound.playClick();
                onGenerationChange(e.target.value);
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="ALL">Todas las generaciones</option>
              {generations.map((gen) => (
                <option key={gen} value={gen}>
                  {gen}
                </option>
              ))}
            </select>
          </div>

          {/* Rarity / Classification */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Categoría
            </label>
            <select
              value={rarityFilter}
              onChange={(e) => {
                sound.playClick();
                onRarityFilterChange(e.target.value as 'all' | 'legendary' | 'mythical' | 'standard');
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="all">Todos los Pokémon</option>
              <option value="legendary">Sólo Legendarios</option>
              <option value="mythical">Sólo Míticos</option>
              <option value="standard">Comunes / Estándar</option>
            </select>
          </div>

          {/* Source indicator */}
          <div className="flex flex-col justify-center">
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Fuente de Datos
            </span>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Conectado a PokéAPI v2</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
        <span>
          Mostrando <strong className="text-slate-900 dark:text-slate-100">{totalFilteredCount}</strong> de {totalCount} Pokémon
        </span>
        {activeFilterCount > 0 && (
          <span className="text-amber-500 font-medium">
            {activeFilterCount} {activeFilterCount === 1 ? 'filtro activo' : 'filtros activos'}
          </span>
        )}
      </div>
    </div>
  );
};
