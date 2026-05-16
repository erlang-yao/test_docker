import { Type } from '../types';

export const TYPE_NAMES: Record<number, string> = {
  [Type.Normal]: '一般', [Type.Fire]: '火', [Type.Water]: '水',
  [Type.Grass]: '草', [Type.Electric]: '电', [Type.Ice]: '冰',
  [Type.Fighting]: '格斗', [Type.Ground]: '地面', [Type.Flying]: '飞行',
};

export const TYPE_COLORS: Record<number, string> = {
  [Type.Normal]: '#A8A878',
  [Type.Fire]: '#F08030',
  [Type.Water]: '#6890F0',
  [Type.Grass]: '#78C850',
  [Type.Electric]: '#F8D030',
  [Type.Ice]: '#98D8D8',
  [Type.Fighting]: '#C03028',
  [Type.Ground]: '#E0C068',
  [Type.Flying]: '#A890F0',
};

export function getTypeName(type: Type): string {
  return TYPE_NAMES[type] ?? '未知';
}

export function getTypeColor(type: Type): string {
  return TYPE_COLORS[type] ?? '#888';
}
