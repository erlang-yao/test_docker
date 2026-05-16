import React from 'react';
import { PokemonData } from '../../types';
import HealthBar from '../ui/HealthBar';
import TypeBadge from '../ui/TypeBadge';

interface Props {
  pokemon: PokemonData;
  selected?: boolean;
  onClick?: () => void;
  showMoves?: boolean;
  compact?: boolean;
}

const PokemonCard: React.FC<Props> = ({ pokemon, selected, onClick, showMoves, compact }) => {
  const fainted = pokemon.stats.hp <= 0;

  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? 'rgba(255,215,0,0.12)' : 'rgba(255,255,255,0.05)',
        border: selected ? '2px solid #FFD700' : '1px solid #333',
        borderRadius: 10, padding: compact ? 10 : 14,
        cursor: onClick ? 'pointer' : 'default',
        opacity: fainted ? 0.5 : 1,
        transition: 'all 0.2s',
        minWidth: compact ? 140 : 180,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontWeight: 'bold', fontSize: compact ? 14 : 16, color: '#FFF' }}>
          {fainted ? '💀 ' : ''}{pokemon.name}
        </span>
        <TypeBadge type={pokemon.type} size="small" />
      </div>
      <div style={{ fontSize: 12, color: '#AAA', marginBottom: 6 }}>
        Lv.{pokemon.level} · EXP {pokemon.exp}/{pokemon.maxExp}
      </div>
      <HealthBar current={pokemon.stats.hp} max={pokemon.stats.maxHp} height={10} />
      {!compact && (
        <div style={{ fontSize: 11, color: '#888', marginTop: 6, display: 'flex', gap: 12 }}>
          <span>攻:{pokemon.stats.attack}</span>
          <span>防:{pokemon.stats.defense}</span>
          <span>速:{pokemon.stats.speed}</span>
        </div>
      )}
      {showMoves && pokemon.moves.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {pokemon.moves.map((m, i) => (
            <div key={i} style={{ fontSize: 11, color: '#BBB', marginBottom: 2 }}>
              {m.name} <TypeBadge type={m.type} size="small" />
              {m.power > 0 ? ` 威力:${m.power}` : ' 变化'} · 命中:{m.accuracy}
              {m.isSpecial && <span style={{ color: '#FFD700' }}> ⭐</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
