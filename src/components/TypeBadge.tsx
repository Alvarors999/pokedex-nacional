import React from 'react';
import {
  Flame,
  Droplets,
  Leaf,
  Zap,
  Snowflake,
  Mountain,
  Wind,
  Shield,
  Moon,
  Eye,
  Sparkles,
  Bug,
  Ghost,
  Swords,
  Circle,
  Skull,
  Wand2,
  Feather,
} from 'lucide-react';
import { PokemonType } from '../types/pokemon';
import { POKEMON_TYPES } from '../data/types';

interface TypeBadgeProps {
  type: PokemonType;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  selected?: boolean;
  onClick?: () => void;
  showIcon?: boolean;
}

export const TypeIcon: React.FC<{ type: PokemonType; className?: string }> = ({
  type,
  className = 'w-3.5 h-3.5',
}) => {
  switch (type) {
    case 'Acero':
      return <Shield className={className} />;
    case 'Agua':
      return <Droplets className={className} />;
    case 'Bicho':
      return <Bug className={className} />;
    case 'Dragón':
      return <Sparkles className={className} />;
    case 'Eléctrico':
      return <Zap className={className} />;
    case 'Fantasma':
      return <Ghost className={className} />;
    case 'Fuego':
      return <Flame className={className} />;
    case 'Hada':
      return <Wand2 className={className} />;
    case 'Hielo':
      return <Snowflake className={className} />;
    case 'Lucha':
      return <Swords className={className} />;
    case 'Normal':
      return <Circle className={className} />;
    case 'Planta':
      return <Leaf className={className} />;
    case 'Psíquico':
      return <Eye className={className} />;
    case 'Roca':
      return <Mountain className={className} />;
    case 'Siniestro':
      return <Moon className={className} />;
    case 'Tierra':
      return <Mountain className={className} />;
    case 'Veneno':
      return <Skull className={className} />;
    case 'Volador':
      return <Feather className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  size = 'md',
  interactive = false,
  selected = false,
  onClick,
  showIcon = true,
}) => {
  const def = POKEMON_TYPES[type];
  if (!def) return null;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium',
  }[size];

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  }[size];

  const Component = interactive ? 'button' : 'span';

  return (
    <Component
      type={interactive ? 'button' : undefined}
      onClick={onClick}
      className={`inline-flex items-center rounded-lg border font-medium transition-all duration-200 select-none ${sizeClasses} ${
        interactive
          ? selected
            ? 'shadow-sm ring-2 ring-offset-1 ring-offset-slate-900'
            : 'opacity-75 hover:opacity-100 hover:scale-[1.03] cursor-pointer'
          : ''
      } ${def.badgeBg}`}
      style={{
        borderColor: selected ? def.color : undefined,
        boxShadow: selected ? `0 0 14px ${def.color}40` : undefined,
      }}
    >
      {showIcon && <TypeIcon type={type} className={iconSizes} />}
      <span className="whitespace-nowrap font-medium tracking-wide">{type}</span>
    </Component>
  );
};
