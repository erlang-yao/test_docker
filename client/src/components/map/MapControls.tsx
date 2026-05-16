import React from 'react';

interface Props {
  availableDirections: string[];
  onMove: (direction: string) => void;
  disabled?: boolean;
}

const DIR_LABELS: Record<string, { label: string; symbol: string }> = {
  n: { label: '北', symbol: '↑' },
  s: { label: '南', symbol: '↓' },
  e: { label: '东', symbol: '→' },
  w: { label: '西', symbol: '←' },
};

const MapControls: React.FC<Props> = ({ availableDirections, onMove, disabled }) => {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      {['n', 's', 'e', 'w'].map(dir => {
        const isAvailable = availableDirections.includes(dir);
        const info = DIR_LABELS[dir];
        return (
          <button
            key={dir}
            disabled={!isAvailable || disabled}
            onClick={() => isAvailable && onMove(dir)}
            title={info.label}
            style={{
              width: 56, height: 40, fontSize: 20, fontWeight: 'bold',
              borderRadius: 8, border: 'none', cursor: isAvailable ? 'pointer' : 'not-allowed',
              background: isAvailable
                ? 'linear-gradient(135deg, #FFD700, #FFA000)'
                : '#333',
              color: isAvailable ? '#1a1a2e' : '#666',
              opacity: isAvailable ? 1 : 0.4,
              transition: 'all 0.2s',
            }}
          >
            {info.symbol} {info.label}
          </button>
        );
      })}
    </div>
  );
};

export default MapControls;
