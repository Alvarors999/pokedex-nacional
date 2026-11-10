import React from 'react';
import { Heart, Sparkles, Crown } from 'lucide-react';
import { Pokemon } from '../types/pokemon';
import { POKEMON_TYPES } from '../data/types';
import { TypeBadge } from './TypeBadge';
import { sound } from '../utils/audio';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: number, e: React.MouseEvent) => void;
  onSelect: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  const primaryType = pokemon.types[0];
  const secondaryType = pokemon.types[1];
  const primaryDef = POKEMON_TYPES[primaryType];
  const secondaryDef = secondaryType ? POKEMON_TYPES[secondaryType] : null;

  const totalStats =
    pokemon.stats.hp +
    pokemon.stats.attack +
    pokemon.stats.defense +
    pokemon.stats.specialAttack +
    pokemon.stats.specialDefense +
    pokemon.stats.speed;

  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <div
      onClick={() => {
        sound.playClick();
        onSelect(pokemon);
      }}
      className="group relative flex flex-col rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm overflow-hidden p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 text-left"
    >
      {/* Dynamic elemental gradient tint overlay */}
      <div
        className="absolute inset-0 opacity-15 dark:opacity-25 transition-opacity duration-300 group-hover:opacity-30 dark:group-hover:opacity-45 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top right, ${primaryDef?.color || '#3B82F6'} 0%, ${
            secondaryDef?.color || 'transparent'
          } 50%, transparent 80%)`,
        }}
      />

      {/* Top Bar inside Card: Number + Classification / Legendary + Favorite Button */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
            #{formattedId}
          </span>
          {pokemon.isLegendary && (
            <span className="inline-flex items-center gap-0.5 text-[10px] uppercase font-bold text-amber-500 px-1.5 py-0.2 rounded bg-amber-500/10">
              <Crown className="w-2.5 h-2.5" />
              Legendario
            </span>
          )}
          {pokemon.isMythical && (
            <span className="inline-flex items-center gap-0.5 text-[10px] uppercase font-bold text-purple-400 px-1.5 py-0.2 rounded bg-purple-500/10">
              <Sparkles className="w-2.5 h-2.5" />
              Mítico
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pokemon.id, e);
          }}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          className={`relative p-2 rounded-xl transition-all duration-200 ${
            isFavorite
              ? 'text-rose-500 bg-rose-500/10 hover:bg-rose-500/20'
              : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800/80'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavorite ? 'fill-current scale-110' : 'group-hover:scale-110'
            }`}
          />
        </button>
      </div>

      {/* Official Artwork Box */}
      <div className="relative z-10 flex items-center justify-center my-2 h-44 sm:h-48 overflow-hidden">
        {/* Ambient glow behind sprite */}
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-2xl transition-all duration-500 group-hover:opacity-60 group-hover:scale-110"
          style={{
            background: `radial-gradient(circle, ${primaryDef?.color || '#3B82F6'} 0%, ${
              secondaryDef?.color || primaryDef?.color || '#3B82F6'
            } 60%, transparent 80%)`,
          }}
        />
        <img
          src={pokemon.spriteUrl}
          alt={pokemon.name}
          loading="lazy"
          className="relative z-10 max-h-40 sm:max-h-44 w-auto object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Pokemon Info & Types */}
      <div className="relative z-10 mt-2 flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {pokemon.name}
          </h3>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate max-w-[120px]">
            {pokemon.genus}
          </span>
        </div>

        {/* Type Badges */}
        <div className="flex items-center gap-1.5 mt-2 flex-wrap">
          <TypeBadge type={pokemon.types[0]} size="sm" />
          {pokemon.types[1] && <TypeBadge type={pokemon.types[1]} size="sm" />}
        </div>

        {/* Footer info: Generation & BST */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-3 mt-2 border-t border-slate-100 dark:border-slate-800/80">
          <span className="truncate max-w-[130px]">{pokemon.generation}</span>
          <span className="font-mono tabular-nums font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            {totalStats} BST
          </span>
        </div>
      </div>
    </div>
  );
};
