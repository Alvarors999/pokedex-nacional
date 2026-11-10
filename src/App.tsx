import React, { useState, useEffect, useMemo, useTransition } from 'react';
import {
  Sparkles,
  RotateCcw,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { Pokemon, PokemonType, SortOption } from './types/pokemon';
import { INITIAL_POKEMON_SEED } from './data/pokemonSeed';
import { fetchPokemon, fetchPokemonList } from './services/pokeapi';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FilterBar } from './components/FilterBar';
import { PokemonCard } from './components/PokemonCard';
import { PokemonDetailModal } from './components/PokemonDetailModal';
import { FavoritesView } from './components/FavoritesView';
import { DiscoverView } from './components/DiscoverView';
import { sound } from './utils/audio';

export default function App() {
  const [, startTransition] = useTransition();

  // Dark / Light Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pokedex_theme');
      if (saved) return saved === 'dark';
    }
    return true; // Default dark RPG theme
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pokedex_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pokedex_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Sound Mute state
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const toggleMute = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  // Favorites state (array of Pokemon IDs)
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pokedex_favorites');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [4, 6, 25, 150]; // Charmander, Charizard, Pikachu, Mewtwo as initial favorites
  });

  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(id);
      sound.playFavorite(!exists);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('pokedex_favorites', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'enciclopedia' | 'favoritos' | 'descubrir'>('enciclopedia');

  // Pokémon State: initial seed + PokéAPI background loading
  const [pokemonList, setPokemonList] = useState<Pokemon[]>(INITIAL_POKEMON_SEED);
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  // Load broader Gen 1 Pokémon from PokéAPI in the background
  useEffect(() => {
    let isMounted = true;
    setIsLoadingApi(true);

    fetchPokemonList(151)
      .then((apiList) => {
        if (!isMounted) return;
        if (apiList && apiList.length > 0) {
          setPokemonList((prev) => {
            const map = new Map<number, Pokemon>();
            // Add previous ones first
            prev.forEach((p) => map.set(p.id, p));
            // Add or enrich with API data
            apiList.forEach((p) => map.set(p.id, p));
            return Array.from(map.values()).sort((a, b) => a.id - b.id);
          });
        }
      })
      .catch((err) => {
        console.warn('PokéAPI background loading:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingApi(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Selected Pokemon for detailed modal
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<PokemonType | 'ALL'>('ALL');
  const [selectedGeneration, setSelectedGeneration] = useState<string>('ALL');
  const [rarityFilter, setRarityFilter] = useState<'all' | 'legendary' | 'mythical' | 'standard'>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('number-asc');

  // Dynamic PokéAPI search: if user types a query not found locally, attempt to query PokéAPI directly
  useEffect(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed || trimmed.length < 3) return;

    const existsLocally = pokemonList.some(
      (p) =>
        p.name.toLowerCase() === trimmed ||
        String(p.id) === trimmed.replace('#', '')
    );

    if (!existsLocally) {
      const timer = setTimeout(async () => {
        try {
          setIsSearchingApi(true);
          const searched = await fetchPokemon(trimmed.replace('#', ''));
          if (searched) {
            setPokemonList((prev) => {
              if (prev.some((p) => p.id === searched.id)) return prev;
              return [...prev, searched].sort((a, b) => a.id - b.id);
            });
          }
        } catch {
          // not found in API, silently ignore
        } finally {
          setIsSearchingApi(false);
        }
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [searchTerm, pokemonList]);

  // Active filters count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchTerm.trim()) count++;
    if (selectedType !== 'ALL') count++;
    if (selectedGeneration !== 'ALL') count++;
    if (rarityFilter !== 'all') count++;
    if (onlyFavorites) count++;
    return count;
  }, [searchTerm, selectedType, selectedGeneration, rarityFilter, onlyFavorites]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedType('ALL');
    setSelectedGeneration('ALL');
    setRarityFilter('all');
    setOnlyFavorites(false);
  };

  // Filtered & Sorted Pokemon
  const filteredPokemon = useMemo(() => {
    return pokemonList.filter((pokemon) => {
      // Search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = pokemon.name.toLowerCase().includes(query);
        const matchesId =
          String(pokemon.id).includes(query) ||
          `#${pokemon.id}`.includes(query) ||
          `#${String(pokemon.id).padStart(3, '0')}`.includes(query);
        const matchesType = pokemon.types.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesId && !matchesType) return false;
      }

      // Type filter
      if (selectedType !== 'ALL') {
        if (!pokemon.types.includes(selectedType)) return false;
      }

      // Generation filter
      if (selectedGeneration !== 'ALL') {
        if (pokemon.generation !== selectedGeneration) return false;
      }

      // Rarity filter
      if (rarityFilter === 'legendary') {
        if (!pokemon.isLegendary) return false;
      } else if (rarityFilter === 'mythical') {
        if (!pokemon.isMythical) return false;
      } else if (rarityFilter === 'standard') {
        if (pokemon.isLegendary || pokemon.isMythical) return false;
      }

      // Favorites only
      if (onlyFavorites) {
        if (!favorites.includes(pokemon.id)) return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'number-asc':
          return a.id - b.id;
        case 'number-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'stats-desc': {
          const totalA = a.stats.hp + a.stats.attack + a.stats.defense + a.stats.specialAttack + a.stats.specialDefense + a.stats.speed;
          const totalB = b.stats.hp + b.stats.attack + b.stats.defense + b.stats.specialAttack + b.stats.specialDefense + b.stats.speed;
          return totalB - totalA;
        }
        case 'stats-asc': {
          const totalA = a.stats.hp + a.stats.attack + a.stats.defense + a.stats.specialAttack + a.stats.specialDefense + a.stats.speed;
          const totalB = b.stats.hp + b.stats.attack + b.stats.defense + b.stats.specialAttack + b.stats.specialDefense + b.stats.speed;
          return totalA - totalB;
        }
        default:
          return 0;
      }
    });
  }, [
    searchTerm,
    selectedType,
    selectedGeneration,
    rarityFilter,
    onlyFavorites,
    favorites,
    sortOption,
    pokemonList,
  ]);

  const favoritePokemonList = useMemo(() => {
    return pokemonList.filter((p) => favorites.includes(p.id));
  }, [pokemonList, favorites]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col selection:bg-amber-500/20 selection:text-amber-500">
      {/* Universal Top Bar */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          startTransition(() => {
            setActiveTab(tab);
          });
        }}
        favoritesCount={favorites.length}
        totalPokemon={pokemonList.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {activeTab === 'enciclopedia' && (
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 space-y-6">
            {/* Lore & Universe Presentation */}
            <HeroSection loadedCount={pokemonList.length} />

            {/* Combinable Filters & Realtime Search Bar */}
            <FilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedType={selectedType}
              onTypeChange={setSelectedType}
              selectedGeneration={selectedGeneration}
              onGenerationChange={setSelectedGeneration}
              rarityFilter={rarityFilter}
              onRarityFilterChange={setRarityFilter}
              onlyFavorites={onlyFavorites}
              onOnlyFavoritesChange={setOnlyFavorites}
              sortOption={sortOption}
              onSortChange={setSortOption}
              onResetFilters={handleResetFilters}
              activeFilterCount={activeFilterCount}
              totalFilteredCount={filteredPokemon.length}
              totalCount={pokemonList.length}
              isSearchingApi={isSearchingApi}
            />

            {/* Background syncing status banner */}
            {isLoadingApi && (
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-1 bg-amber-500/5 rounded-xl border border-amber-500/10">
                <RefreshCw className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span>Sincronizando catálogo completo con PokéAPI en segundo plano...</span>
              </div>
            )}

            {/* Pokemon Grid or Empty State */}
            {filteredPokemon.length === 0 ? (
              <div className="py-20 text-center max-w-md mx-auto px-4 flex flex-col items-center">
                <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                  Sin resultados en la Pokédex
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-6 leading-relaxed">
                  No se encontraron Pokémon con los criterios seleccionados. Puedes buscar por
                  cualquier nombre oficial (ej. &quot;Gengar&quot;, &quot;Lucario&quot;) o número (#001).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    handleResetFilters();
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restablecer Filtros</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredPokemon.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    isFavorite={favorites.includes(pokemon.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelect={(p) => setSelectedPokemon(p)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'favoritos' && (
          <FavoritesView
            favoritePokemon={favoritePokemonList}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectPokemon={(p) => setSelectedPokemon(p)}
            onNavigateToEncyclopedia={() => setActiveTab('enciclopedia')}
          />
        )}

        {activeTab === 'descubrir' && (
          <DiscoverView
            allPokemon={pokemonList}
            onOpenDetail={(p) => setSelectedPokemon(p)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* Individual Pokemon Sheet Modal */}
      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={Boolean(selectedPokemon)}
        onClose={() => setSelectedPokemon(null)}
        onSelectPokemon={(p) => setSelectedPokemon(p)}
        allPokemon={pokemonList}
        isFavorite={selectedPokemon ? favorites.includes(selectedPokemon.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Subtle Pokédex Footer */}
      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-slate-700 dark:text-slate-300">
              POKÉDEX
            </span>
            <span>·</span>
            <span>Alimentado por PokéAPI v2</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Sprites Oficiales</span>
            <span>·</span>
            <span>18 Tipos Elementales</span>
            <span>·</span>
            <span>Gritos Reales</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
