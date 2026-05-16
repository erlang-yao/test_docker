import { LocationData } from '../types';

export const LOCATIONS: LocationData[] = [
  {
    name: '新手村',
    description: '一个宁静的小村庄，训练家们在这里开始他们的旅程',
    connections: { n: 1, e: 4 },
    wildPokemons: ['小拉达', '波波', '绿毛虫'],
  },
  {
    name: '望风坡',
    description: '可以俯瞰整个新手村的高坡，微风拂面',
    connections: { s: 0, n: 2 },
    wildPokemons: ['波波', '小雀蜂', '独角虫'],
  },
  {
    name: '迷雾森林',
    description: '被薄雾笼罩的神秘森林，隐藏着许多野生宝可梦',
    connections: { s: 1, e: 3 },
    wildPokemons: ['绿毛虫', '铁甲蛹', '派拉斯', '皮卡丘'],
  },
  {
    name: '湖边',
    description: '清澈的湖泊，水面如镜',
    connections: { w: 2, n: 5 },
    wildPokemons: ['可达鸭', '小海狮', '角金鱼'],
  },
  {
    name: '精灵中心',
    description: '训练家们休息和治疗宝可梦的地方',
    connections: { w: 0 },
    wildPokemons: [],
  },
  {
    name: '山洞入口',
    description: '阴暗的山洞入口，里面传来神秘的气息',
    connections: { s: 3, n: 6 },
    wildPokemons: ['小拳石', '大岩蛇', '超音蝠'],
  },
  {
    name: '山洞深处',
    description: '山洞的最深处，传说中有稀有的宝可梦出没',
    connections: { s: 5 },
    wildPokemons: ['大岩蛇', '腕力', '小拳石', '地鼠'],
  },
];

// Canvas 坐标布局 (用于前端渲染)
export const LOCATION_COORDS: { x: number; y: number }[] = [
  { x: 200, y: 380 },  // 0: 新手村
  { x: 200, y: 260 },  // 1: 望风坡
  { x: 200, y: 140 },  // 2: 迷雾森林
  { x: 440, y: 140 },  // 3: 湖边
  { x: 440, y: 380 },  // 4: 精灵中心
  { x: 440, y: 50 },   // 5: 山洞入口
  { x: 560, y: 20 },   // 6: 山洞深处
];

export const DIRECTION_NAMES: Record<string, string> = {
  e: '东', w: '西', s: '南', n: '北',
};

export const DIRECTION_DISPLAY: Record<string, string> = {
  e: '东 (e)', w: '西 (w)', s: '南 (s)', n: '北 (n)',
};
