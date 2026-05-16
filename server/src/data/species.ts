import { Type, Stats, Move } from '../types';

export interface SpeciesDef {
  species: string;
  type: Type;
  baseStats: Stats;
  specialMove?: Move;
}

function m(name: string, type: Type, power: number, accuracy: number, isSpecial = false): Move {
  return { name, type, power, accuracy, isSpecial };
}

export const SPECIES: Record<string, SpeciesDef> = {
  '小火龙': {
    species: '小火龙', type: Type.Fire,
    baseStats: { hp: 30, maxHp: 30, attack: 10, defense: 8, speed: 10 },
    specialMove: m('喷射火焰', Type.Fire, 90, 100, true),
  },
  '杰尼龟': {
    species: '杰尼龟', type: Type.Water,
    baseStats: { hp: 32, maxHp: 32, attack: 9, defense: 10, speed: 7 },
    specialMove: m('水炮', Type.Water, 110, 80, true),
  },
  '妙蛙种子': {
    species: '妙蛙种子', type: Type.Grass,
    baseStats: { hp: 31, maxHp: 31, attack: 10, defense: 9, speed: 8 },
    specialMove: m('日光束', Type.Grass, 120, 100, true),
  },
  '小拉达': {
    species: '小拉达', type: Type.Normal,
    baseStats: { hp: 25, maxHp: 25, attack: 9, defense: 7, speed: 11 },
  },
  '波波': {
    species: '波波', type: Type.Flying,
    baseStats: { hp: 26, maxHp: 26, attack: 8, defense: 8, speed: 10 },
    specialMove: m('暴风', Type.Flying, 110, 70, true),
  },
  '绿毛虫': {
    species: '绿毛虫', type: Type.Grass,
    baseStats: { hp: 24, maxHp: 24, attack: 7, defense: 7, speed: 7 },
  },
  '小雀蜂': {
    species: '小雀蜂', type: Type.Flying,
    baseStats: { hp: 23, maxHp: 23, attack: 8, defense: 7, speed: 9 },
  },
  '独角虫': {
    species: '独角虫', type: Type.Grass,
    baseStats: { hp: 24, maxHp: 24, attack: 7, defense: 7, speed: 7 },
  },
  '派拉斯': {
    species: '派拉斯', type: Type.Grass,
    baseStats: { hp: 27, maxHp: 27, attack: 9, defense: 8, speed: 6 },
  },
  '皮卡丘': {
    species: '皮卡丘', type: Type.Electric,
    baseStats: { hp: 26, maxHp: 26, attack: 10, defense: 7, speed: 12 },
    specialMove: m('十万伏特', Type.Electric, 90, 100, true),
  },
  '可达鸭': {
    species: '可达鸭', type: Type.Water,
    baseStats: { hp: 28, maxHp: 28, attack: 9, defense: 9, speed: 7 },
  },
  '小海狮': {
    species: '小海狮', type: Type.Ice,
    baseStats: { hp: 27, maxHp: 27, attack: 8, defense: 8, speed: 8 },
  },
  '角金鱼': {
    species: '角金鱼', type: Type.Water,
    baseStats: { hp: 26, maxHp: 26, attack: 9, defense: 8, speed: 9 },
  },
  '小拳石': {
    species: '小拳石', type: Type.Ground,
    baseStats: { hp: 30, maxHp: 30, attack: 10, defense: 11, speed: 5 },
  },
  '大岩蛇': {
    species: '大岩蛇', type: Type.Ground,
    baseStats: { hp: 35, maxHp: 35, attack: 9, defense: 13, speed: 6 },
  },
  '超音蝠': {
    species: '超音蝠', type: Type.Flying,
    baseStats: { hp: 25, maxHp: 25, attack: 8, defense: 7, speed: 11 },
  },
  '腕力': {
    species: '腕力', type: Type.Fighting,
    baseStats: { hp: 30, maxHp: 30, attack: 11, defense: 8, speed: 6 },
    specialMove: m('十字劈', Type.Fighting, 100, 80, true),
  },
  '地鼠': {
    species: '地鼠', type: Type.Ground,
    baseStats: { hp: 26, maxHp: 26, attack: 9, defense: 8, speed: 10 },
  },
};

export const DEFAULT_SPECIES: SpeciesDef = {
  species: 'unknown', type: Type.Normal,
  baseStats: { hp: 25, maxHp: 25, attack: 9, defense: 9, speed: 9 },
};

// 通用技能
export const COMMON_MOVES: Move[] = [
  m('撞击', Type.Normal, 40, 100),
  m('叫声', Type.Normal, 0, 100),
];

// 属性对应的类型技能
export const TYPE_MOVES: Record<number, Move> = {
  [Type.Fire]: m('火花', Type.Fire, 40, 100),
  [Type.Water]: m('水枪', Type.Water, 40, 100),
  [Type.Grass]: m('藤鞭', Type.Grass, 45, 100),
  [Type.Electric]: m('电击', Type.Electric, 40, 100),
  [Type.Ice]: m('粉末雪', Type.Ice, 40, 100),
  [Type.Fighting]: m('踢倒', Type.Fighting, 50, 100),
  [Type.Ground]: m('掷泥', Type.Ground, 20, 100),
  [Type.Flying]: m('起风', Type.Flying, 40, 100),
};

export const START_SPECIES = ['小火龙', '杰尼龟', '妙蛙种子'];
