import React from 'react';
import { PokemonData } from '../../types';
import PokemonCard from './PokemonCard';

interface Props {
  team: PokemonData[];
  onPokemonClick?: (index: number) => void;
  selectedIndex?: number;
}

const TeamRoster: React.FC<Props> = ({ team, onPokemonClick, selectedIndex }) => {
  return (
    <div>
      <h4 style={{ color: '#CCC', marginTop: 0, marginBottom: 8 }}>
        👥 队伍 ({team.length}/6)
      </h4>
      {team.length === 0 ? (
        <div style={{ color: '#666', fontSize: 14 }}>队伍为空</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {team.map((p, i) => (
            <PokemonCard
              key={i}
              pokemon={p}
              selected={selectedIndex === i}
              onClick={onPokemonClick ? () => onPokemonClick(i) : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamRoster;
