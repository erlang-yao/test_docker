// 7个地点的Canvas坐标（与后端 LOCATION_COORDS 一致）
export const LOCATION_COORDS: { x: number; y: number }[] = [
  { x: 200, y: 380 },  // 0: 新手村
  { x: 200, y: 260 },  // 1: 望风坡
  { x: 200, y: 140 },  // 2: 迷雾森林
  { x: 440, y: 140 },  // 3: 湖边
  { x: 440, y: 380 },  // 4: 精灵中心
  { x: 440, y: 50 },   // 5: 山洞入口
  { x: 560, y: 20 },   // 6: 山洞深处
];

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 500;
export const NODE_RADIUS = 32;

export const LOCATION_COLORS: string[] = [
  '#7CB342',  // 新手村 - 绿色
  '#8BC34A',  // 望风坡 - 浅绿
  '#2E7D32',  // 迷雾森林 - 深绿
  '#1E88E5',  // 湖边 - 蓝色
  '#E53935',  // 精灵中心 - 红色
  '#6D4C41',  // 山洞入口 - 棕色
  '#3E2723',  // 山洞深处 - 深棕
];

export function getDirectionFromClick(
  clickX: number,
  clickY: number,
  currentIdx: number,
  connectionToIndex: number,
): string | null {
  // 检查点击位置是否在连接目标节点的范围内
  const target = LOCATION_COORDS[connectionToIndex];
  if (!target) return null;
  const dx = clickX - target.x;
  const dy = clickY - target.y;
  if (Math.sqrt(dx * dx + dy * dy) < NODE_RADIUS + 5) {
    const current = LOCATION_COORDS[currentIdx];
    const ddx = target.x - current.x;
    const ddy = target.y - current.y;
    if (Math.abs(ddx) > Math.abs(ddy)) {
      return ddx > 0 ? 'e' : 'w';
    } else {
      return ddy > 0 ? 's' : 'n';
    }
  }
  return null;
}
