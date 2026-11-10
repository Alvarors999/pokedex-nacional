import React from 'react';
import { Sparkles, Layers, Globe2, Volume2 } from 'lucide-react';

interface HeroSectionProps {
  loadedCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ loadedCount }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 text-center">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-3xl h-44 bg-gradient-to-r from-red-500/15 via-amber-500/10 to-blue-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight text-balance leading-tight">
          Pokédex Nacional de Aventura
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-pretty">
          Enciclopedia interactiva con datos oficiales de{' '}
          <span className="font-semibold text-amber-500">PokéAPI</span>. Explora estadísticas
          reales, líneas evolutivas completas, debilidades elementales de 18 tipos y gritos
          oficiales de cada Pokémon.
        </p>

        {/* Live Universe Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 sm:mt-8 max-w-2xl mx-auto">
          <div className="p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm text-center">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 font-mono tabular-nums block">
              {loadedCount}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1 mt-0.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Pokémon listos
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm text-center">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 font-mono tabular-nums block">
              18
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1 mt-0.5">
              <Layers className="w-3 h-3 text-blue-500" />
              Tipos elementales
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm text-center">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 font-mono tabular-nums block">
              9
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1 mt-0.5">
              <Globe2 className="w-3 h-3 text-emerald-500" />
              Generaciones
            </span>
          </div>

          <div className="p-3 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/60 backdrop-blur-sm text-center">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 font-mono tabular-nums block">
              PokéAPI
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1 mt-0.5">
              <Volume2 className="w-3 h-3 text-purple-500" />
              Gritos y Datos v2
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
