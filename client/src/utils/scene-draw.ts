// 7 个地点场景绘制函数

const SCENE_W = 640;
const SCENE_H = 400;

// 天空渐变
function drawSky(ctx: CanvasRenderingContext2D, color: string) {
  const grad = ctx.createLinearGradient(0, 0, 0, SCENE_H * 0.55);
  grad.addColorStop(0, color);
  grad.addColorStop(1, '#fff');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, SCENE_W, SCENE_H * 0.55);
}

// 草地
function drawGrass(ctx: CanvasRenderingContext2D, y: number, h: number, c: string) {
  ctx.fillStyle = c;
  ctx.fillRect(0, y, SCENE_W, h);
  // 草纹理
  ctx.fillStyle = 'rgba(0,0,0,0.06)';
  for (let x = 0; x < SCENE_W; x += 8) {
    const gh = 4 + Math.sin(x * 0.3) * 6;
    ctx.fillRect(x, y - gh / 2, 2, gh);
  }
}

// 树
function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  // 树干
  ctx.fillStyle = '#6D4C41';
  ctx.fillRect(x - 4 * s, y - 20 * s, 8 * s, 20 * s);
  // 树冠
  ctx.fillStyle = '#388E3C';
  ctx.beginPath();
  ctx.arc(x, y - 30 * s, 16 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2E7D32';
  ctx.beginPath();
  ctx.arc(x - 5 * s, y - 26 * s, 10 * s, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + 5 * s, y - 28 * s, 9 * s, 0, Math.PI * 2);
  ctx.fill();
}

// 房子
function drawHouse(ctx: CanvasRenderingContext2D, x: number, y: number, bodyColor: string, roofColor: string) {
  ctx.fillStyle = bodyColor;
  ctx.fillRect(x - 25, y - 30, 50, 30);
  ctx.fillStyle = roofColor;
  ctx.beginPath();
  ctx.moveTo(x - 32, y - 30);
  ctx.lineTo(x, y - 52);
  ctx.lineTo(x + 32, y - 30);
  ctx.fill();
  // 门
  ctx.fillStyle = '#5D4037';
  ctx.fillRect(x - 6, y - 18, 12, 18);
  // 窗
  ctx.fillStyle = '#B3E5FC';
  ctx.fillRect(x - 18, y - 24, 10, 8);
  ctx.fillRect(x + 8, y - 24, 10, 8);
}

// 云
function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, s: number) {
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  ctx.beginPath();
  ctx.arc(x, y, 12 * s, 0, Math.PI * 2);
  ctx.arc(x + 14 * s, y - 4 * s, 10 * s, 0, Math.PI * 2);
  ctx.arc(x + 26 * s, y, 13 * s, 0, Math.PI * 2);
  ctx.arc(x + 12 * s, y + 3 * s, 9 * s, 0, Math.PI * 2);
  ctx.fill();
}

// 0: 新手村
export function drawVillage(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#87CEEB');
  drawCloud(ctx, 80, 50, 1);
  drawCloud(ctx, 400, 30, 0.8);
  drawGrass(ctx, SCENE_H * 0.55, SCENE_H * 0.45, '#7CB342');
  // 小路
  ctx.fillStyle = '#A0896C';
  ctx.fillRect(SCENE_W / 2 - 20, SCENE_H * 0.52, 40, SCENE_H * 0.48);
  drawTree(ctx, 100, SCENE_H * 0.58, 1.2);
  drawTree(ctx, 520, SCENE_H * 0.58, 1.0);
  drawHouse(ctx, 200, SCENE_H * 0.60, '#FFF9C4', '#E53935');
  drawHouse(ctx, 420, SCENE_H * 0.60, '#FFF9C4', '#E53935');
  drawHouse(ctx, 310, SCENE_H * 0.62, '#FFECB3', '#C62828');
}

// 1: 望风坡
export function drawWindyHill(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#90CAF9');
  drawCloud(ctx, 150, 60, 1.1);
  drawCloud(ctx, 350, 80, 0.7);
  drawCloud(ctx, 500, 40, 0.9);
  // 山坡
  ctx.fillStyle = '#8BC34A';
  ctx.beginPath();
  ctx.moveTo(0, SCENE_H);
  ctx.lineTo(0, SCENE_H * 0.45);
  ctx.quadraticCurveTo(SCENE_W * 0.5, SCENE_H * 0.25, SCENE_W, SCENE_H * 0.5);
  ctx.lineTo(SCENE_W, SCENE_H);
  ctx.fill();
  // 远景
  ctx.fillStyle = '#689F38';
  ctx.fillRect(0, SCENE_H * 0.65, SCENE_W, SCENE_H * 0.35);
  drawTree(ctx, 80, SCENE_H * 0.5, 1);
  drawTree(ctx, 560, SCENE_H * 0.52, 0.8);
  // 风线
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const wy = 90 + i * 45;
    ctx.beginPath();
    ctx.moveTo(30 + i * 20, wy);
    ctx.quadraticCurveTo(200 + i * 10, wy - 5, 350, wy + 3);
    ctx.stroke();
  }
}

// 2: 迷雾森林
export function drawForest(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#1a2a0a';
  ctx.fillRect(0, 0, SCENE_W, SCENE_H);
  // 大树
  const trees = [[60, SCENE_H * 0.6, 1.5], [180, SCENE_H * 0.55, 1.8], [300, SCENE_H * 0.62, 2.0],
    [420, SCENE_H * 0.58, 1.6], [540, SCENE_H * 0.60, 1.9], [130, SCENE_H * 0.70, 1.3],
    [380, SCENE_H * 0.72, 1.4], [480, SCENE_H * 0.68, 1.2]];
  for (const [tx, ty, ts] of trees) {
    ctx.fillStyle = '#2E4A1E';
    ctx.fillRect(tx as number - 5, ty as number - 15, 10, 15);
    ctx.fillStyle = '#1B5E20';
    ctx.beginPath();
    ctx.arc(tx as number, ty as number - 25, 22 * (ts as number), 0, Math.PI * 2);
    ctx.fill();
  }
  // 雾气
  const fogGrad = ctx.createRadialGradient(SCENE_W * 0.5, SCENE_H * 0.5, 50, SCENE_W * 0.5, SCENE_H * 0.5, 400);
  fogGrad.addColorStop(0, 'rgba(255,255,255,0)');
  fogGrad.addColorStop(0.5, 'rgba(255,255,255,0.08)');
  fogGrad.addColorStop(1, 'rgba(255,255,255,0.15)');
  ctx.fillStyle = fogGrad;
  ctx.fillRect(0, 0, SCENE_W, SCENE_H);
}

// 3: 湖边
export function drawLake(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#81D4FA');
  drawCloud(ctx, 200, 50, 0.9);
  // 远山
  ctx.fillStyle = '#78909C';
  ctx.beginPath();
  ctx.moveTo(0, SCENE_H * 0.35);
  ctx.quadraticCurveTo(SCENE_W * 0.3, SCENE_H * 0.15, SCENE_W * 0.5, SCENE_H * 0.3);
  ctx.quadraticCurveTo(SCENE_W * 0.7, SCENE_H * 0.2, SCENE_W, SCENE_H * 0.3);
  ctx.fill();
  // 湖水
  const waterGrad = ctx.createLinearGradient(0, SCENE_H * 0.35, 0, SCENE_H);
  waterGrad.addColorStop(0, '#42A5F5');
  waterGrad.addColorStop(0.3, '#1E88E5');
  waterGrad.addColorStop(1, '#0D47A1');
  ctx.fillStyle = waterGrad;
  ctx.fillRect(0, SCENE_H * 0.35, SCENE_W, SCENE_H * 0.65);
  // 水波
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const wy = SCENE_H * 0.42 + i * 28;
    ctx.beginPath();
    ctx.moveTo(0, wy);
    for (let x = 0; x < SCENE_W; x += 20) {
      ctx.lineTo(x, wy + Math.sin(x * 0.03 + i) * 4);
    }
    ctx.stroke();
  }
  // 岸边
  ctx.fillStyle = '#A5D6A7';
  ctx.fillRect(0, SCENE_H * 0.33, SCENE_W, SCENE_H * 0.05);
  ctx.fillStyle = '#795548';
  ctx.fillRect(60, SCENE_H * 0.31, 90, 8);
  ctx.fillRect(400, SCENE_H * 0.31, 70, 8);
  drawTree(ctx, 50, SCENE_H * 0.35, 0.9);
  drawTree(ctx, 580, SCENE_H * 0.36, 0.7);
}

// 4: 精灵中心
export function drawCenter(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#64B5F6');
  drawCloud(ctx, 120, 40, 0.7);
  drawCloud(ctx, 440, 55, 0.6);
  drawGrass(ctx, SCENE_H * 0.55, SCENE_H * 0.45, '#AED581');
  // 小路
  ctx.fillStyle = '#BDBDBD';
  ctx.fillRect(SCENE_W / 2 - 25, SCENE_H * 0.5, 50, SCENE_H * 0.5);
  // 精灵中心建筑
  const cx = SCENE_W / 2, cy = SCENE_H * 0.52;
  ctx.fillStyle = '#FFF';
  ctx.fillRect(cx - 80, cy - 60, 160, 60);
  ctx.fillStyle = '#E53935';
  ctx.beginPath();
  ctx.moveTo(cx - 90, cy - 60);
  ctx.lineTo(cx, cy - 100);
  ctx.lineTo(cx + 90, cy - 60);
  ctx.fill();
  // 精灵球标志
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.arc(cx, cy - 70, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy - 70, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#333';
  ctx.fillRect(cx - 12, cy - 72, 24, 4);
  ctx.beginPath();
  ctx.arc(cx, cy - 70, 4, 0, Math.PI * 2);
  ctx.fill();
  // 门
  ctx.fillStyle = '#42A5F5';
  ctx.fillRect(cx - 18, cy - 35, 36, 35);
  ctx.fillStyle = '#1E88E5';
  ctx.fillRect(cx - 8, cy - 35, 8, 35);
  // 窗户
  ctx.fillStyle = '#B3E5FC';
  ctx.fillRect(cx - 60, cy - 50, 20, 18);
  ctx.fillRect(cx + 40, cy - 50, 20, 18);
  // "PC" 标志
  ctx.fillStyle = '#FFF';
  ctx.font = 'bold 17px "Microsoft YaHei"';
  ctx.textAlign = 'center';
  ctx.fillText('精灵中心', cx, cy + 20);
}

// 5: 山洞入口
export function drawCaveEntrance(ctx: CanvasRenderingContext2D) {
  drawSky(ctx, '#9E9E9E');
  // 山体
  ctx.fillStyle = '#795548';
  ctx.beginPath();
  ctx.moveTo(0, SCENE_H * 0.3);
  ctx.lineTo(SCENE_W * 0.35, SCENE_H * 0.25);
  ctx.lineTo(SCENE_W * 0.38, SCENE_H * 0.15);
  ctx.lineTo(SCENE_W * 0.5, SCENE_H * 0.2);
  ctx.lineTo(SCENE_W * 0.62, SCENE_H * 0.1);
  ctx.lineTo(SCENE_W, SCENE_H * 0.25);
  ctx.lineTo(SCENE_W, SCENE_H);
  ctx.lineTo(0, SCENE_H);
  ctx.fill();
  // 山体层次
  ctx.fillStyle = '#6D4C41';
  ctx.beginPath();
  ctx.moveTo(0, SCENE_H * 0.45);
  ctx.quadraticCurveTo(SCENE_W * 0.5, SCENE_H * 0.35, SCENE_W, SCENE_H * 0.4);
  ctx.lineTo(SCENE_W, SCENE_H);
  ctx.lineTo(0, SCENE_H);
  ctx.fill();
  // 洞口
  const caveGrad = ctx.createRadialGradient(SCENE_W * 0.48, SCENE_H * 0.35, 10, SCENE_W * 0.48, SCENE_H * 0.35, 80);
  caveGrad.addColorStop(0, '#000');
  caveGrad.addColorStop(0.7, '#1a1a1a');
  caveGrad.addColorStop(1, '#5D4037');
  ctx.fillStyle = caveGrad;
  ctx.beginPath();
  ctx.ellipse(SCENE_W * 0.48, SCENE_H * 0.42, 70, 90, 0, 0, Math.PI * 2);
  ctx.fill();
  // 地面
  ctx.fillStyle = '#8D6E63';
  ctx.fillRect(0, SCENE_H * 0.75, SCENE_W, SCENE_H * 0.25);
}

// 6: 山洞深处
export function drawDeepCave(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, SCENE_W, SCENE_H);
  // 岩壁
  ctx.fillStyle = '#2a1a0a';
  ctx.fillRect(0, 0, 40, SCENE_H);
  ctx.fillRect(SCENE_W - 40, 0, 40, SCENE_H);
  ctx.fillRect(0, SCENE_H - 30, SCENE_W, 30);
  // 钟乳石
  ctx.fillStyle = '#3a2a1a';
  for (let x = 60; x < SCENE_W - 60; x += 80) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x - 15, 30 + Math.sin(x) * 20);
    ctx.lineTo(x + 15, 25 + Math.cos(x) * 15);
    ctx.fill();
  }
  // 石笋
  for (let x = 100; x < SCENE_W - 50; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x, SCENE_H);
    ctx.lineTo(x - 12, SCENE_H - 25 - Math.sin(x * 0.5) * 15);
    ctx.lineTo(x + 12, SCENE_H - 30 - Math.cos(x * 0.5) * 10);
    ctx.fill();
  }
  // 水晶发光
  const crystals = [[150, SCENE_H * 0.4, '#4FC3F7'], [320, SCENE_H * 0.3, '#81C784'],
    [480, SCENE_H * 0.5, '#CE93D8'], [400, SCENE_H * 0.65, '#4FC3F7']];
  for (const [cxv, cyv, color] of crystals) {
    const glow = ctx.createRadialGradient(cxv as number, cyv as number, 2, cxv as number, cyv as number, 40);
    glow.addColorStop(0, color as string);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect((cxv as number) - 40, (cyv as number) - 40, 80, 80);
    // 水晶形状
    ctx.fillStyle = color as string;
    ctx.beginPath();
    ctx.moveTo(cxv as number, (cyv as number) - 12);
    ctx.lineTo((cxv as number) + 6, cyv as number);
    ctx.lineTo(cxv as number, (cyv as number) + 8);
    ctx.lineTo((cxv as number) - 6, cyv as number);
    ctx.fill();
  }
}

export type SceneDrawFn = (ctx: CanvasRenderingContext2D) => void;

export const SCENE_FUNCTIONS: Record<number, SceneDrawFn> = {
  0: drawVillage,
  1: drawWindyHill,
  2: drawForest,
  3: drawLake,
  4: drawCenter,
  5: drawCaveEntrance,
  6: drawDeepCave,
};

export { SCENE_W, SCENE_H };
