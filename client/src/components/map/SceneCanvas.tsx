import React from 'react';

const IMG_NAMES: Record<number, string> = {
  0: 'Village',
  1: 'Wind',
  2: 'Foggy',
  3: 'Lake',
  4: 'Center',
  5: 'Hole',
  6: 'Deep',
};

interface Props {
  locationIndex: number;
  locationName: string;
}

const DISPLAY_SIZE = 540;

const SceneCanvas: React.FC<Props> = ({ locationIndex, locationName }) => {
  const imgName = IMG_NAMES[locationIndex] ?? 'Village';
  const src = `/pic/${imgName}.png`;

  return (
    <div style={{
      width: DISPLAY_SIZE, height: DISPLAY_SIZE,
      borderRadius: 12, overflow: 'hidden',
      border: '3px solid #444', position: 'relative',
    }}>
      <img
        src={src}
        alt={locationName}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => {
          // 图片加载失败时显示占位
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      {/* 场景名标签 */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(0,0,0,0.55)', textAlign: 'center',
        padding: '6px 0',
      }}>
        <span style={{
          color: '#FFD700', fontSize: 16, fontWeight: 'bold',
          fontFamily: '"Microsoft YaHei", "SimHei", sans-serif',
        }}>
          {locationName}
        </span>
      </div>
    </div>
  );
};

export default SceneCanvas;
