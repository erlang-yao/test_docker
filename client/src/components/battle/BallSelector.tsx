import React from 'react';

const BALLS = [
  { name: '精灵球', rate: '1x' },
  { name: '超级球', rate: '1.5x' },
  { name: '高级球', rate: '2x' },
  { name: '大师球', rate: '必中' },
];

interface Props {
  ballCounts: number[]; // [poke, great, ultra, master]
  onSelect: (index: number) => void;
  onBack: () => void;
}

const BallSelector: React.FC<Props> = ({ ballCounts, onSelect, onBack }) => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 8, color: '#AAA', fontSize: 14 }}>
        选择精灵球：
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {BALLS.map((ball, i) => (
          <button
            key={i}
            disabled={ballCounts[i] <= 0}
            onClick={() => onSelect(i)}
            style={{
              padding: '10px 16px', fontSize: 13, borderRadius: 10,
              border: '1px solid #555',
              background: ballCounts[i] > 0 ? 'rgba(255,255,255,0.08)' : '#222',
              color: ballCounts[i] > 0 ? '#FFF' : '#666',
              cursor: ballCounts[i] > 0 ? 'pointer' : 'not-allowed',
              minWidth: 120,
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{ball.name}</div>
            <div style={{ fontSize: 11, color: '#AAA' }}>
              持有: {ballCounts[i]} · 倍率: {ball.rate}
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

export default BallSelector;
