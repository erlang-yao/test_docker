import React from 'react';

// 物种名 → 图片文件名 (不含扩展名)
const SPRITE_MAP: Record<string, string> = {
  '小火龙': 'Xiaohuolong',
  '杰尼龟': 'Jienigui',
  '妙蛙种子': 'Miaowazhongzi',
  '小拉达': 'Xiaolada',
  '波波': 'Bobo',
  '绿毛虫': 'Lvmaochong',
  '小雀蜂': 'Xiaoquefeng',
  '独角虫': 'Dujiaochong',
  '派拉斯': 'Pailasi',
  '皮卡丘': 'Pikaqiu',
  '可达鸭': 'Kedaya',
  '小海狮': 'Xiaohaishi',
  '角金鱼': 'Jiaojinyu',
  '小拳石': 'Xiaoquanshi',
  '大岩蛇': 'Dayanshe',
  '超音蝠': 'Chaoyinfu',
  '腕力': 'Wanli',
  '地鼠': 'Xiaolada',   // 无地鼠图片，用小拉达替代
  '铁甲蛹': 'Tiejiayong',
};

interface Props {
  species: string;
  flipped?: boolean;
  size?: number;
}

const PokemonSprite: React.FC<Props> = ({ species, flipped = false, size = 140 }) => {
  const name = SPRITE_MAP[species];
  const src = name ? `/pic/bb/${name}.png` : null;

  if (!src) {
    return (
      <div style={{
        width: size, height: size, borderRadius: 16,
        background: 'rgba(255,255,255,0.04)', border: '2px dashed #555',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#666', fontSize: 13,
      }}>
        ?
      </div>
    );
  }

  return (
    <div style={{
      width: size, height: size, borderRadius: 16, overflow: 'hidden',
      border: '3px solid #555',
      background: 'rgba(255,255,255,0.03)',
    }}>
      <img
        src={src}
        alt={species}
        style={{
          width: '100%', height: '100%', objectFit: 'contain',
          transform: flipped ? 'scaleX(-1)' : 'none',
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
  );
};

export default PokemonSprite;
