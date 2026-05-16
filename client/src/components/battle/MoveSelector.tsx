import React from 'react';
import { Move } from '../../types';
import TypeBadge from '../ui/TypeBadge';

interface Props {
  moves: Move[];
  onSelect: (index: number) => void;
  onBack: () => void;
}

const MoveSelector: React.FC<Props> = ({ moves, onSelect, onBack }) => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 8, color: '#AAA', fontSize: 14 }}>
        选择技能：
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {moves.map((move, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            style={{
              padding: '10px 16px', fontSize: 13, borderRadius: 10,
              border: '1px solid #555', background: 'rgba(255,255,255,0.08)',
              color: '#FFF', cursor: 'pointer', minWidth: 140, textAlign: 'left',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
              {move.name} {move.isSpecial && '⭐'}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 11, color: '#AAA' }}>
              <TypeBadge type={move.type} size="small" />
              <span>威力:{move.power || '-'}</span>
              <span>命中:{move.accuracy}</span>
            </div>
          </button>
        ))}
        <button
          onClick={onBack}
          style={{
            padding: '10px 16px', fontSize: 13, borderRadius: 10,
            border: '1px solid #555', background: 'rgba(255,255,255,0.04)',
            color: '#999', cursor: 'pointer',
          }}
        >
          返回
        </button>
      </div>
    </div>
  );
};

export default MoveSelector;
