import React from 'react';
import { Type } from '../../types';
import { getTypeName, getTypeColor } from '../../utils/type-colors';

interface Props {
  type: Type;
  size?: 'small' | 'normal';
}

const TypeBadge: React.FC<Props> = ({ type, size = 'normal' }) => {
  const color = getTypeColor(type);
  const name = getTypeName(type);
  const fontSize = size === 'small' ? 10 : 12;
  const padding = size === 'small' ? '2px 6px' : '3px 10px';

  return (
    <span style={{
      display: 'inline-block',
      background: color,
      color: '#FFF',
      padding,
      borderRadius: 12,
      fontSize,
      fontWeight: 'bold',
      textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
    }}>
      {name}
    </span>
  );
};

export default TypeBadge;
