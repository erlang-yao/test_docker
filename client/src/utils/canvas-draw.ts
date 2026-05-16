import { MapLocation } from '../types';
import { LOCATION_COORDS, LOCATION_COLORS, NODE_RADIUS } from './map-layout';

export function drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#1a3a1a');
  gradient.addColorStop(0.5, '#2d5a1e');
  gradient.addColorStop(1, '#1a3a1a');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  // 装饰性草地纹理
  ctx.fillStyle = 'rgba(255,255,255,0.02)';
  for (let i = 0; i < 30; i++) {
    const x = (i * 137 + 50) % w;
    const y = (i * 251 + 30) % h;
    ctx.beginPath();
    ctx.arc(x, y, 3 + (i % 4), 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawPaths(
  ctx: CanvasRenderingContext2D,
  locations: MapLocation[],
  currentIdx: number,
): void {
  const drawn = new Set<string>();

  for (const loc of locations) {
    for (const conn of loc.connections) {
      const key = [loc.index, conn.toIndex].sort().join('-');
      if (drawn.has(key)) continue;
      drawn.add(key);

      const from = LOCATION_COORDS[loc.index];
      const to = LOCATION_COORDS[conn.toIndex];
      if (!from || !to) continue;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.strokeStyle = '#8B7355';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 方向箭头（路径中点）
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      const angle = Math.atan2(to.y - from.y, to.x - from.x);
      drawArrow(ctx, mx, my, angle);
    }
  }
}

function drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number): void {
  const size = 8;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.fillStyle = '#FFD700';
  ctx.beginPath();
  ctx.moveTo(size, 0);
  ctx.lineTo(-size, -size * 0.6);
  ctx.lineTo(-size, size * 0.6);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawLocationNode(
  ctx: CanvasRenderingContext2D,
  loc: MapLocation,
  isCurrent: boolean,
  _time: number,
): void {
  const coords = LOCATION_COORDS[loc.index];
  if (!coords) return;

  const { x, y } = coords;
  const color = LOCATION_COLORS[loc.index] ?? '#666';

  // 节点圆
  ctx.beginPath();
  ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 当前节点高亮
  if (isCurrent) {
    ctx.beginPath();
    ctx.arc(x, y, NODE_RADIUS + 4, 0, Math.PI * 2);
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // 地名
  ctx.fillStyle = '#FFF';
  ctx.font = 'bold 13px "Microsoft YaHei", "SimHei", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(loc.name, x, y);
}

export function drawPlayerMarker(
  ctx: CanvasRenderingContext2D,
  currentIdx: number,
): void {
  const coords = LOCATION_COORDS[currentIdx];
  if (!coords) return;

  const { x, y } = coords;
  // 训练师标记（三角帽）
  ctx.fillStyle = '#FF4444';
  ctx.beginPath();
  ctx.arc(x, y - NODE_RADIUS - 10, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FFF';
  ctx.lineWidth = 2;
  ctx.stroke();
}
