import React from 'react';

interface Props {
  current: number;
  max: number;
  color?: string;
  height?: number;
}

const HealthBar: React.FC<Props> = ({ current, max, color = '#4CAF50', height = 12 }) => {
  const pct = max > 0 ? Math.max(0, Math.min(100, (current / max) * 100)) : 0;
  const barColor = pct > 50 ? '#4CAF50' : pct > 20 ? '#FF9800' : '#F44336';

  return (
    <div style={{
      width: '100%', height, background: '#333',
      borderRadius: height / 2, overflow: 'hidden', border: '1px solid #555',
    }}>
      <div style={{
        width: `${pct}%`, height: '100%',
        background: color === '#4CAF50' ? barColor : color,
        transition: 'width 0.5s ease',
        borderRadius: height / 2,
      }} />
      <div style={{
        position: 'relative', top: `-${height + 2}px`,
        textAlign: 'center', fontSize: height > 10 ? 10 : 8,
        color: '#FFF', fontWeight: 'bold',
        textShadow: '1px 1px 1px #000',
      }}>
        {current}/{max}
      </div>
    </div>
  );
};

export default HealthBar;
