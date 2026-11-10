import React from 'react';
import { Heart, Compass, Moon, Sun, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  activeTab: 'enciclopedia' | 'favoritos' | 'descubrir';
  onTabChange: (tab: 'enciclopedia' | 'favoritos' | 'descubrir') => void;
  favoritesCount: number;
  totalPokemon: number;
  isDark: boolean;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  totalPokemon,
  isDark,
  onToggleTheme,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 sm:px-8 py-3.5">
        {/* Zone 1: Brand Wordmark with Pokeball symbol */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onTabChange('enciclopedia');
          }}
          className="group flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 cursor-pointer"
        >
          {/* Pokéball Icon */}
          <div className="w-8 h-8 rounded-full border-2 border-slate-900 dark:border-slate-100 bg-gradient-to-b from-red-500 from-50% to-white to-50% flex items-center justify-center relative shadow-md group-hover:scale-105 transition-transform overflow-hidden">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-slate-900 dark:bg-slate-900" />
            <div className="w-2.5 h-2.5 rounded-full bg-white border border-slate-900 z-10" />
          </div>
          <span className="font-display text-xl font-black tracking-wider text-slate-900 dark:text-slate-100 group-hover:text-red-500 transition-colors">
            POKÉDEX
          </span>
        </button>

        {/* Zone 2: Navigation Links (Single line, quiet typography) */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onTabChange('enciclopedia');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'enciclopedia'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-amber-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Enciclopedia</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onTabChange('favoritos');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'favoritos'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-rose-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Favoritos</span>
            {favoritesCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onTabChange('descubrir');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'descubrir'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-amber-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Descubrir</span>
          </button>
        </nav>

        {/* Zone 3: Primary Utility Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Loaded Pokemon count */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="font-bold text-slate-900 dark:text-slate-200">{totalPokemon}</span>
            <span>Pokémon</span>
          </div>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={onToggleMute}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Dark / Light toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onToggleTheme();
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
