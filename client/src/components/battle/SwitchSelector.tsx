import React from 'react';
import { PokemonData } from '../../types';
import HealthBar from '../ui/HealthBar';

interface Props {
  team: PokemonData[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onBack: () => void;
}

const SwitchSelector: React.FC<Props> = ({ team, currentIndex, onSelect, onBack }) => {
  const aliveCount = team.filter(p => p.stats.hp > 0 && team.indexOf(p) !== currentIndex).length;

  if (aliveCount === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: '#F44336', marginBottom: 8 }}>没有其他可以出战的精灵了！</div>
        <button onClick={onBack} style={{
          padding: '8px 16px', borderRadius: 8, border: '1px solid #555',
          background: 'rgba(255,255,255,0.04)', color: '#999', cursor: 'pointer',
        }}>
          返回
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 8, color: '#AAA', fontSize: 14 }}>
        选择出战的精灵：
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {team.map((p, i) => {
          const isCurrent = i === currentIndex;
          const isFainted = p.stats.hp <= 0;
          return (
            <button
              key={i}
              disabled={isCurrent || isFainted}
              onClick={() => onSelect(i)}
              style={{
                padding: '10px 14px', fontSize: 13, borderRadius: 10,
                border: isCurrent ? '2px solid #FFD700' : '1px solid #555',
                background: isCurrent ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.06)',
                color: isFainted ? '#666' : '#FFF',
                cursor: (isCurrent || isFainted) ? 'not-allowed' : 'pointer',
                minWidth: 180, textAlign: 'left', opacity: isFainted ? 0.4 : 1,
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                {p.name} Lv.{p.level}
                {isCurrent ? ' [当前]' : ''}
                {isFainted ? ' [无法战斗]' : ''}
              </div>
              <HealthBar current={p.stats.hp} max={p.stats.maxHp} height={8} />
            </button>
          );
        })}
        <button
          onClick={onBack}
          style={{
            padding: '10px 16px', fontSize: 13, borderRadius: 10,
            border: '1px solid #555', background: 'rgba(255,255,255,0.04)',
            color: '#999', cursor: 'pointer', alignSelf: 'center',
          }}
        >
          返回
        </button>
      </div>
    </div>
  );
};

export default SwitchSelector;
