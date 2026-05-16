import React from 'react';
import { PokemonData } from '../../types';
import PokemonCard from './PokemonCard';

interface Props {
  storage: PokemonData[];
  onPokemonClick?: (index: number) => void;
  selectedIndex?: number;
}

const StorageView: React.FC<Props> = ({ storage, onPokemonClick, selectedIndex }) => {
  return (
    <div>
      <h4 style={{ color: '#CCC', marginTop: 0, marginBottom: 8 }}>
        📦 仓库 ({storage.length})
      </h4>
      {storage.length === 0 ? (
        <div style={{ color: '#666', fontSize: 14 }}>仓库为空</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {storage.map((p, i) => (
            <PokemonCard
              key={i}
              pokemon={p}
              selected={selectedIndex === i}
              onClick={onPokemonClick ? () => onPokemonClick(i) : undefined}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StorageView;
