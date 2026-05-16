import { Type } from '../types';

// typeChart[attackType][defendType] = 倍率
export const TYPE_CHART: Record<number, Record<number, number>> = {
  [Type.Normal]: {
    [Type.Normal]: 1, [Type.Fire]: 1, [Type.Water]: 1, [Type.Grass]: 1,
    [Type.Electric]: 1, [Type.Ice]: 1, [Type.Fighting]: 1, [Type.Ground]: 1, [Type.Flying]: 1,
  },
  [Type.Fire]: {
    [Type.Normal]: 1, [Type.Fire]: 0.5, [Type.Water]: 0.5, [Type.Grass]: 2,
    [Type.Electric]: 1, [Type.Ice]: 2, [Type.Fighting]: 1, [Type.Ground]: 1, [Type.Flying]: 1,
  },
  [Type.Water]: {
    [Type.Normal]: 1, [Type.Fire]: 2, [Type.Water]: 0.5, [Type.Grass]: 0.5,
    [Type.Electric]: 1, [Type.Ice]: 1, [Type.Fighting]: 1, [Type.Ground]: 2, [Type.Flying]: 1,
  },
  [Type.Grass]: {
    [Type.Normal]: 1, [Type.Fire]: 0.5, [Type.Water]: 2, [Type.Grass]: 0.5,
    [Type.Electric]: 1, [Type.Ice]: 1, [Type.Fighting]: 1, [Type.Ground]: 2, [Type.Flying]: 1,
  },
  [Type.Electric]: {
    [Type.Normal]: 1, [Type.Fire]: 1, [Type.Water]: 2, [Type.Grass]: 0.5,
    [Type.Electric]: 0.5, [Type.Ice]: 1, [Type.Fighting]: 1, [Type.Ground]: 0, [Type.Flying]: 2,
  },
  [Type.Ice]: {
    [Type.Normal]: 1, [Type.Fire]: 0.5, [Type.Water]: 1, [Type.Grass]: 2,
    [Type.Electric]: 1, [Type.Ice]: 0.5, [Type.Fighting]: 1, [Type.Ground]: 2, [Type.Flying]: 2,
  },
  [Type.Fighting]: {
    [Type.Normal]: 2, [Type.Fire]: 1, [Type.Water]: 1, [Type.Grass]: 1,
    [Type.Electric]: 1, [Type.Ice]: 2, [Type.Fighting]: 1, [Type.Ground]: 1, [Type.Flying]: 0.5,
  },
  [Type.Ground]: {
    [Type.Normal]: 1, [Type.Fire]: 2, [Type.Water]: 1, [Type.Grass]: 0.5,
    [Type.Electric]: 2, [Type.Ice]: 1, [Type.Fighting]: 1, [Type.Ground]: 1, [Type.Flying]: 0,
  },
  [Type.Flying]: {
    [Type.Normal]: 1, [Type.Fire]: 1, [Type.Water]: 1, [Type.Grass]: 2,
    [Type.Electric]: 0.5, [Type.Ice]: 0.5, [Type.Fighting]: 2, [Type.Ground]: 1, [Type.Flying]: 1,
  },
};

export function getTypeEffectiveness(attackType: Type, defendType: Type): number {
  return TYPE_CHART[attackType]?.[defendType] ?? 1.0;
}

const TYPE_NAMES: Record<number, string> = {
  [Type.Normal]: '一般', [Type.Fire]: '火', [Type.Water]: '水',
  [Type.Grass]: '草', [Type.Electric]: '电', [Type.Ice]: '冰',
  [Type.Fighting]: '格斗', [Type.Ground]: '地面', [Type.Flying]: '飞行',
};

export function getTypeName(type: Type): string {
  return TYPE_NAMES[type] ?? '未知';
}
