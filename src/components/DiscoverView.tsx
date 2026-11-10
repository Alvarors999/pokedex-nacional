import React, { useState, useEffect } from 'react';
import { Dices, Eye, Compass, Heart, ArrowRight, Volume2, Crown, Sparkles } from 'lucide-react';
import { Pokemon } from '../types/pokemon';
import { POKEMON_TYPES } from '../data/types';
import { TypeBadge } from './TypeBadge';
import { sound } from '../utils/audio';

interface DiscoverViewProps {
  allPokemon: Pokemon[];
  onOpenDetail: (pokemon: Pokemon) => void;
  favorites: number[];
  onToggleFavorite: (id: number, e: React.MouseEvent) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  allPokemon,
  onOpenDetail,
  favorites,
  onToggleFavorite,
}) => {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>(() => {
    const randomIndex = Math.floor(Math.random() * allPokemon.length);
    return allPokemon[randomIndex] || allPokemon[0];
  });
  const [isRevealing, setIsRevealing] = useState(false);
  const [scanPulse, setScanPulse] = useState(false);

  const playCry = (p: Pokemon) => {
    if (sound.getMuted()) return;
    if (p.cryUrl) {
      try {
        const audio = new Audio(p.cryUrl);
        audio.volume = 0.35;
        audio.play().catch(() => {
          sound.playCreatureCry(p.types[0]);
        });
      } catch {
        sound.playCreatureCry(p.types[0]);
      }
    } else {
      sound.playCreatureCry(p.types[0]);
    }
  };

  const rollNewPokemon = () => {
    sound.playClick();
    setIsRevealing(true);
    setScanPulse(true);

    setTimeout(() => {
      let next: Pokemon;
      do {
        const randomIndex = Math.floor(Math.random() * allPokemon.length);
        next = allPokemon[randomIndex];
      } while (next.id === currentPokemon.id && allPokemon.length > 1);

      setCurrentPokemon(next);
      setIsRevealing(false);
      setScanPulse(false);
      sound.playDiscoverChime();
      playCry(next);
    }, 450);
  };

  useEffect(() => {
    sound.playDiscoverChime();
  }, []);

  const primaryDef = POKEMON_TYPES[currentPokemon.types[0]];
  const secondaryDef = currentPokemon.types[1]
    ? POKEMON_TYPES[currentPokemon.types[1]]
    : null;
  const isFavorite = favorites.includes(currentPokemon.id);

  const totalStats =
    currentPokemon.stats.hp +
    currentPokemon.stats.attack +
    currentPokemon.stats.defense +
    currentPokemon.stats.specialAttack +
    currentPokemon.stats.specialDefense +
    currentPokemon.stats.speed;

  const formattedId = String(currentPokemon.id).padStart(3, '0');

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8 px-4 flex flex-col items-center">
      {/* Intro Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Radar de PokéAPI</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
          Encuentro Salvaje
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          El sensor de campo ha detectado una señal salvaje en el hábitat natural.
        </p>
      </div>

      {/* Main Encounter Stage Card */}
      <div
        className="relative w-full rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-2xl p-6 sm:p-10 overflow-hidden text-left transition-all"
        style={{
          boxShadow: `0 20px 50px -10px ${primaryDef?.color || '#3B82F6'}25`,
        }}
      >
        {/* Dynamic elemental radial backdrop */}
        <div
          className={`absolute inset-0 opacity-20 dark:opacity-30 pointer-events-none transition-all duration-700 ${
            scanPulse ? 'scale-110 opacity-50' : 'scale-100'
          }`}
          style={{
            background: `radial-gradient(circle at 50% 40%, ${primaryDef?.color || '#3B82F6'} 0%, ${
              secondaryDef?.color || 'transparent'
            } 50%, transparent 80%)`,
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Center: Mysterious Pokemon Spotlight */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div
              className={`relative flex items-center justify-center transition-all duration-500 ${
                isRevealing ? 'scale-90 opacity-20 blur-md' : 'scale-100 opacity-100 blur-0'
              }`}
            >
              <div
                className="absolute inset-0 rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${primaryDef?.color || '#3B82F6'} 0%, ${
                    secondaryDef?.color || primaryDef?.color || '#3B82F6'
                  } 60%, transparent 80%)`,
                }}
              />
              <img
                src={currentPokemon.spriteUrl}
                alt={currentPokemon.name}
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold tracking-wider">
                #{formattedId}
              </span>
              {currentPokemon.isLegendary && (
                <span className="inline-flex items-center gap-1 text-xs uppercase font-bold text-amber-500">
                  <Crown className="w-3.5 h-3.5" />
                  Legendario
                </span>
              )}
              {currentPokemon.isMythical && (
                <span className="inline-flex items-center gap-1 text-xs uppercase font-bold text-purple-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  Mítico
                </span>
              )}
              <span className="text-xs text-slate-400">· {currentPokemon.generation}</span>
            </div>
          </div>

          {/* Right: Pokemon Data Dossier */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {currentPokemon.genus}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => playCry(currentPokemon)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-amber-500 transition-colors"
                    title="Escuchar sonido"
                  >
                    <Volume2 className="w-4 h-4 text-amber-500" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      onToggleFavorite(currentPokemon.id, e);
                    }}
                    className={`p-2 rounded-xl border transition-all ${
                      isFavorite
                        ? 'border-rose-500/30 bg-rose-500/15 text-rose-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500'
                    }`}
                    title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                {currentPokemon.name}
              </h3>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <TypeBadge type={currentPokemon.types[0]} size="md" />
                {currentPokemon.types[1] && <TypeBadge type={currentPokemon.types[1]} size="md" />}
              </div>
            </div>

            {/* Lore */}
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {currentPokemon.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[11px] text-slate-400 block mb-0.5">Potencial (BST)</span>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-slate-100">
                  {totalStats}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[11px] text-slate-400 block mb-0.5">Altura / Peso</span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {currentPokemon.height}m · {currentPokemon.weight}kg
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                <span className="text-[11px] text-slate-400 block mb-0.5">Hábitat</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate block">
                  {currentPokemon.habitat || 'Silvestre'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onOpenDetail(currentPokemon);
                }}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-amber-400 transition-all cursor-pointer shadow-lg hover:shadow-xl"
              >
                <Eye className="w-4 h-4" />
                <span>Ver Ficha Completa</span>
                <ArrowRight className="w-4 h-4 ml-auto" />
              </button>

              <button
                type="button"
                onClick={rollNewPokemon}
                disabled={isRevealing}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
              >
                <Dices className={`w-4 h-4 ${isRevealing ? 'animate-spin' : ''}`} />
                <span>Descubrir Otro Pokémon</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
