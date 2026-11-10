import React, { useEffect, useState } from 'react';
import {
  X,
  Heart,
  ChevronLeft,
  ChevronRight,
  Volume2,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  Sparkles,
  ArrowRight,
  Compass,
  Ruler,
  Weight,
  Crown,
  Loader2,
} from 'lucide-react';
import { Pokemon, EvolutionNode } from '../types/pokemon';
import { calculateMatchups, POKEMON_TYPES } from '../data/types';
import { fetchPokemon } from '../services/pokeapi';
import { TypeBadge } from './TypeBadge';
import { sound } from '../utils/audio';

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectPokemon: (pokemon: Pokemon) => void;
  allPokemon: Pokemon[];
  isFavorite: boolean;
  onToggleFavorite: (id: number, e: React.MouseEvent) => void;
}

export const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  isOpen,
  onClose,
  onSelectPokemon,
  allPokemon,
  isFavorite,
  onToggleFavorite,
}) => {
  const [enrichedPokemon, setEnrichedPokemon] = useState<Pokemon | null>(pokemon);
  const [loadingEvo, setLoadingEvo] = useState(false);

  // When pokemon opens, ensure its full species & evolution data are loaded
  useEffect(() => {
    if (!isOpen || !pokemon) return;
    setEnrichedPokemon(pokemon);

    if (!pokemon.evolutionChain) {
      setLoadingEvo(true);
      fetchPokemon(pokemon.id)
        .then((full) => {
          setEnrichedPokemon(full);
        })
        .catch((err) => {
          console.warn('Error enriqueciendo Pokémon:', err);
        })
        .finally(() => {
          setLoadingEvo(false);
        });
    }

    // Play real cry if available
    playPokemonCry(pokemon);
  }, [isOpen, pokemon?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !pokemon) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pokemon, allPokemon]);

  if (!isOpen || !pokemon) return null;

  const current = enrichedPokemon || pokemon;

  const currentIndex = allPokemon.findIndex((p) => p.id === current.id);
  const prevPokemon =
    currentIndex > 0
      ? allPokemon[currentIndex - 1]
      : allPokemon[allPokemon.length - 1];
  const nextPokemon =
    currentIndex < allPokemon.length - 1
      ? allPokemon[currentIndex + 1]
      : allPokemon[0];

  const handlePrev = () => {
    sound.playClick();
    if (prevPokemon) onSelectPokemon(prevPokemon);
  };

  const handleNext = () => {
    sound.playClick();
    if (nextPokemon) onSelectPokemon(nextPokemon);
  };

  const playPokemonCry = (p: Pokemon) => {
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

  const primaryType = current.types[0];
  const secondaryType = current.types[1];
  const primaryDef = POKEMON_TYPES[primaryType];
  const secondaryDef = secondaryType ? POKEMON_TYPES[secondaryType] : null;

  const totalStats =
    current.stats.hp +
    current.stats.attack +
    current.stats.defense +
    current.stats.specialAttack +
    current.stats.specialDefense +
    current.stats.speed;

  const statConfig = [
    { key: 'hp', label: 'PS', value: current.stats.hp, max: 255, barColor: 'bg-emerald-500' },
    { key: 'attack', label: 'Ataque', value: current.stats.attack, max: 200, barColor: 'bg-red-500' },
    { key: 'defense', label: 'Defensa', value: current.stats.defense, max: 250, barColor: 'bg-amber-500' },
    { key: 'specialAttack', label: 'Atq. Especial', value: current.stats.specialAttack, max: 200, barColor: 'bg-cyan-500' },
    { key: 'specialDefense', label: 'Def. Especial', value: current.stats.specialDefense, max: 250, barColor: 'bg-indigo-500' },
    { key: 'speed', label: 'Velocidad', value: current.stats.speed, max: 200, barColor: 'bg-pink-500' },
  ];

  const matchups = calculateMatchups(current.types);
  const formattedId = String(current.id).padStart(3, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Card */}
      <div
        className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl text-slate-900 dark:text-slate-100 transition-all flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic elemental header banner */}
        <div
          className="relative px-6 py-6 sm:px-8 sm:py-8 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          style={{
            background: `radial-gradient(ellipse at top, ${primaryDef?.color || '#3B82F6'}25 0%, ${
              secondaryDef?.color || 'transparent'
            }15 60%, transparent 100%)`,
          }}
        >
          {/* Top action controls */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              {prevPokemon && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all"
                  title="Pokémon anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline font-mono">#{String(prevPokemon.id).padStart(3, '0')}</span>
                </button>
              )}

              {nextPokemon && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all"
                  title="Siguiente Pokémon"
                >
                  <span className="hidden sm:inline font-mono">#{String(nextPokemon.id).padStart(3, '0')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => playPokemonCry(current)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="Escuchar grito oficial del Pokémon (PokéAPI)"
              >
                <Volume2 className="w-5 h-5 text-amber-500" />
              </button>

              <button
                type="button"
                onClick={(e) => onToggleFavorite(current.id, e)}
                className={`p-2 rounded-xl border transition-all ${
                  isFavorite
                    ? 'border-rose-500/30 bg-rose-500/15 text-rose-500'
                    : 'border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-rose-500'
                }`}
                title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors ml-1"
                title="Cerrar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Split inside Banner: Art on Left, Core Identity on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual Box */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div
                className="absolute inset-0 rounded-full opacity-35 blur-3xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${primaryDef?.color || '#3B82F6'} 0%, ${
                    secondaryDef?.color || primaryDef?.color || '#3B82F6'
                  } 60%, transparent 80%)`,
                }}
              />
              <img
                src={current.spriteUrl}
                alt={current.name}
                className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] hover:scale-105 transition-transform duration-300"
              />
              <span className="font-mono text-xs text-slate-400 mt-2">
                Datos oficiales de PokéAPI
              </span>
            </div>

            {/* Identity Info */}
            <div className="md:col-span-7 flex flex-col gap-3 text-left">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-mono text-sm px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold tracking-wider">
                  #{formattedId}
                </span>
                {current.isLegendary && (
                  <span className="inline-flex items-center gap-1 text-xs uppercase font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-lg">
                    <Crown className="w-3.5 h-3.5" />
                    Legendario
                  </span>
                )}
                {current.isMythical && (
                  <span className="inline-flex items-center gap-1 text-xs uppercase font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    Mítico
                  </span>
                )}
                <span className="text-xs text-slate-400">· {current.generation}</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
                {current.name}
              </h2>

              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {current.genus}
              </p>

              {/* Types */}
              <div className="flex items-center gap-2 pt-1">
                <TypeBadge type={current.types[0]} size="lg" />
                {current.types[1] && <TypeBadge type={current.types[1]} size="lg" />}
              </div>

              {/* Flavor Text Lore in Spanish */}
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mt-2 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                {current.description}
              </p>

              {/* Physical Properties Strip */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Altura</span>
                  </div>
                  <span className="font-mono text-sm font-semibold">{current.height} m</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                    <Weight className="w-3.5 h-3.5" />
                    <span>Peso</span>
                  </div>
                  <span className="font-mono text-sm font-semibold">{current.weight} kg</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200/50 dark:border-slate-700/50">
                  <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-0.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Hábitat</span>
                  </div>
                  <span className="text-xs font-medium truncate block">
                    {current.habitat || 'Desconocido'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body Details: Stats + Abilities + Type Matchups + Evolutions */}
        <div className="p-6 sm:p-8 space-y-8 text-left">
          {/* Combat Stats Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <span>Estadísticas Base</span>
              </h3>
              <span className="font-mono text-sm font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-xl flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Total: {totalStats} BST
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
              {statConfig.map((stat) => {
                const percentage = Math.min(100, Math.round((stat.value / stat.max) * 100));
                return (
                  <div key={stat.key} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500 dark:text-slate-400">{stat.label}</span>
                      <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${stat.barColor}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Abilities Section */}
          <div>
            <h3 className="font-display text-lg font-bold mb-3">Habilidades</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.abilities.map((ability, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                      {ability.name}
                    </span>
                    {ability.isHidden ? (
                      <span className="text-[10px] uppercase font-bold text-amber-500 px-2 py-0.5 rounded bg-amber-500/10">
                        Oculta
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase text-slate-400 font-medium">
                        {idx === 0 ? 'Principal' : 'Secundaria'}
                      </span>
                    )}
                  </div>
                  {ability.description && (
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 mt-1">
                      {ability.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Type Effectiveness (18 types) */}
          <div>
            <h3 className="font-display text-lg font-bold mb-3 flex items-center gap-2">
              <span>Efectividad y Vulnerabilidades de Tipo</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Weaknesses */}
              <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5">
                <div className="flex items-center gap-1.5 text-red-500 font-bold text-xs mb-3">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Vulnerable (x2 / x4)</span>
                </div>
                {matchups.extremeWeaknesses.length === 0 && matchups.weaknesses.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Sin debilidades destacadas.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {matchups.extremeWeaknesses.map((t) => (
                      <div key={t} className="flex items-center gap-1">
                        <TypeBadge type={t} size="sm" />
                        <span className="text-[10px] font-mono font-bold text-red-500">4x</span>
                      </div>
                    ))}
                    {matchups.weaknesses.map((t) => (
                      <div key={t} className="flex items-center gap-1">
                        <TypeBadge type={t} size="sm" />
                        <span className="text-[10px] font-mono text-red-400">2x</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Resistances */}
              <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                <div className="flex items-center gap-1.5 text-blue-500 font-bold text-xs mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Resistente (½ / ¼)</span>
                </div>
                {matchups.resistances.length === 0 && matchups.extremeResistances.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No presenta resistencias.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {matchups.extremeResistances.map((t) => (
                      <div key={t} className="flex items-center gap-1">
                        <TypeBadge type={t} size="sm" />
                        <span className="text-[10px] font-mono font-bold text-blue-500">¼x</span>
                      </div>
                    ))}
                    {matchups.resistances.map((t) => (
                      <div key={t} className="flex items-center gap-1">
                        <TypeBadge type={t} size="sm" />
                        <span className="text-[10px] font-mono text-blue-400">½x</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Immunities */}
              <div className="p-4 rounded-2xl border border-purple-500/20 bg-purple-500/5">
                <div className="flex items-center gap-1.5 text-purple-500 font-bold text-xs mb-3">
                  <ShieldOff className="w-4 h-4" />
                  <span>Inmune (0x)</span>
                </div>
                {matchups.immunities.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">Sin inmunidades elementales.</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {matchups.immunities.map((t) => (
                      <div key={t} className="flex items-center gap-1">
                        <TypeBadge type={t} size="sm" />
                        <span className="text-[10px] font-mono font-bold text-purple-400">0x</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Evolution Chain Section */}
          <div>
            <h3 className="font-display text-lg font-bold mb-3 flex items-center justify-between">
              <span>Cadena Evolutiva</span>
              <span className="text-xs font-normal text-slate-400">
                Pulsa cualquier Pokémon para ver su ficha
              </span>
            </h3>

            {loadingEvo ? (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                <span>Consultando árbol evolutivo en PokéAPI...</span>
              </div>
            ) : current.evolutionChain ? (
              <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/30 overflow-x-auto">
                <EvolutionChainViewer
                  node={current.evolutionChain}
                  currentId={current.id}
                  onSelectId={async (targetId) => {
                    sound.playClick();
                    const existing = allPokemon.find((p) => p.id === targetId);
                    if (existing) {
                      onSelectPokemon(existing);
                    } else {
                      try {
                        const fetched = await fetchPokemon(targetId);
                        onSelectPokemon(fetched);
                      } catch {
                        // ignore
                      }
                    }
                  }}
                />
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 text-center text-sm text-slate-500">
                Este Pokémon no tiene evoluciones conocidas en la Pokédex.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Evolution Chain recursive component
const EvolutionChainViewer: React.FC<{
  node: EvolutionNode;
  currentId: number;
  onSelectId: (id: number) => void;
}> = ({ node, currentId, onSelectId }) => {
  return (
    <div className="flex items-center justify-center min-w-[400px] py-4 gap-4 sm:gap-6 flex-wrap md:flex-nowrap">
      {/* Root Node */}
      <EvolutionNodeCard
        node={node}
        isCurrent={node.id === currentId}
        onSelect={() => onSelectId(node.id)}
      />

      {/* Children */}
      {node.evolvesTo && node.evolvesTo.length > 0 && (
        <>
          {node.evolvesTo.length === 1 ? (
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex flex-col items-center justify-center px-2 text-center">
                <span className="text-[10px] text-amber-500 font-semibold max-w-[120px] leading-tight mb-1">
                  {node.evolvesTo[0].triggerText || 'Evolución'}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
              <EvolutionChainViewer
                node={node.evolvesTo[0]}
                currentId={currentId}
                onSelectId={onSelectId}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {node.evolvesTo.map((child) => (
                <div key={child.id} className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center px-2 text-center">
                    <span className="text-[10px] text-amber-500 font-semibold max-w-[120px] leading-tight mb-1">
                      {child.triggerText || 'Evolución'}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                  <EvolutionChainViewer
                    node={child}
                    currentId={currentId}
                    onSelectId={onSelectId}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const EvolutionNodeCard: React.FC<{
  node: EvolutionNode;
  isCurrent: boolean;
  onSelect: () => void;
}> = ({ node, isCurrent, onSelect }) => {
  const formattedId = String(node.id).padStart(3, '0');

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group flex flex-col items-center p-3 rounded-2xl border transition-all duration-200 text-center cursor-pointer ${
        isCurrent
          ? 'ring-2 ring-amber-500 border-amber-500/50 bg-amber-500/10 shadow-lg'
          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 hover:scale-105'
      }`}
    >
      <div className="w-20 h-20 flex items-center justify-center">
        <img
          src={node.spriteUrl}
          alt={node.name}
          className="w-16 h-16 object-contain drop-shadow"
        />
      </div>
      <span className="font-mono text-[11px] text-slate-400 mt-1">#{formattedId}</span>
      <span className="font-display text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
        {node.name}
      </span>
    </button>
  );
};
