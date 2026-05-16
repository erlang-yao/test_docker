import React from 'react';
import HealthBar from '../ui/HealthBar';

interface Props {
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  isEnemy?: boolean;
}

const BattleHud: React.FC<Props> = ({ name, level, hp, maxHp, isEnemy }) => {
  return (
    <div style={{ textAlign: isEnemy ? 'left' : 'right' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: isEnemy ? 'flex-start' : 'flex-end' }}>
        <span style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>{name}</span>
        <span style={{ color: '#AAA', fontSize: 14 }}>Lv.{level}</span>
      </div>
      <div style={{ maxWidth: 300, marginTop: 4, marginLeft: isEnemy ? 0 : 'auto' }}>
        <HealthBar current={hp} max={maxHp} height={14} />
      </div>
    </div>
  );
};

export default BattleHud;
