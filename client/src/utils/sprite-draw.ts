// 宝可梦精灵贴图绘制

export type SpriteFn = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, flipped: boolean) => void;

function drawCharmander(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  // 身体
  ctx.fillStyle = '#F57C00';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.6, s * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  // 肚子
  ctx.fillStyle = '#FFF3E0';
  ctx.beginPath();
  ctx.ellipse(x, y + s * 0.05, s * 0.35, s * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  // 头
  ctx.fillStyle = '#F57C00';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.1, y - s * 0.45, s * 0.4, 0, Math.PI * 2);
  ctx.fill();
  // 眼睛
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.2, y - s * 0.5, s * 0.13, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.22, y - s * 0.5, s * 0.06, 0, Math.PI * 2);
  ctx.fill();
  // 尾巴
  ctx.strokeStyle = '#F57C00';
  ctx.lineWidth = s * 0.12;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - f * s * 0.3, y + s * 0.2);
  ctx.quadraticCurveTo(x - f * s * 0.7, y - s * 0.1, x - f * s * 0.6, y - s * 0.5);
  ctx.stroke();
  // 火焰
  ctx.fillStyle = '#FF6F00';
  ctx.beginPath();
  ctx.moveTo(x - f * s * 0.6, y - s * 0.5);
  ctx.lineTo(x - f * s * 0.5, y - s * 0.8);
  ctx.lineTo(x - f * s * 0.7, y - s * 0.65);
  ctx.fill();
  ctx.fillStyle = '#FFEB3B';
  ctx.beginPath();
  ctx.moveTo(x - f * s * 0.6, y - s * 0.55);
  ctx.lineTo(x - f * s * 0.53, y - s * 0.72);
  ctx.lineTo(x - f * s * 0.66, y - s * 0.6);
  ctx.fill();
  // 脚
  ctx.fillStyle = '#F57C00';
  ctx.fillRect(x - f * s * 0.2, y + s * 0.35, s * 0.2, s * 0.15);
  ctx.fillRect(x + f * s * 0.05, y + s * 0.35, s * 0.2, s * 0.15);
}

function drawSquirtle(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  // 壳
  ctx.fillStyle = '#795548';
  ctx.beginPath();
  ctx.ellipse(x, y - s * 0.05, s * 0.55, s * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#A1887F';
  ctx.beginPath();
  ctx.ellipse(x, y - s * 0.05, s * 0.35, s * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  // 身体（壳前面）
  ctx.fillStyle = '#90CAF9';
  ctx.beginPath();
  ctx.ellipse(x, y + s * 0.05, s * 0.35, s * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  // 头
  ctx.fillStyle = '#90CAF9';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.2, y - s * 0.35, s * 0.3, 0, Math.PI * 2);
  ctx.fill();
  // 眼睛
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.3, y - s * 0.4, s * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.32, y - s * 0.4, s * 0.05, 0, Math.PI * 2);
  ctx.fill();
  // 尾巴
  ctx.fillStyle = '#64B5F6';
  ctx.beginPath();
  ctx.moveTo(x - f * s * 0.2, y + s * 0.1);
  ctx.quadraticCurveTo(x - f * s * 0.5, y + s * 0.2, x - f * s * 0.4, y - s * 0.05);
  ctx.quadraticCurveTo(x - f * s * 0.3, y - s * 0.15, x - f * s * 0.1, y + s * 0.05);
  ctx.fill();
}

function drawBulbasaur(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  // 身体
  ctx.fillStyle = '#66BB6A';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.5, s * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  // 背上的种子
  ctx.fillStyle = '#43A047';
  ctx.beginPath();
  ctx.arc(x, y - s * 0.25, s * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2E7D32';
  ctx.beginPath();
  ctx.arc(x, y - s * 0.25, s * 0.2, 0, Math.PI * 2);
  ctx.fill();
  // 头
  ctx.fillStyle = '#66BB6A';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.15, y - s * 0.35, s * 0.28, 0, Math.PI * 2);
  ctx.fill();
  // 眼睛
  ctx.fillStyle = '#E53935';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.22, y - s * 0.4, s * 0.08, 0, Math.PI * 2);
  ctx.fill();
  // 斑纹
  ctx.fillStyle = '#388E3C';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.05, y - s * 0.05, s * 0.13, 0, Math.PI * 2);
  ctx.fill();
}

function drawRattata(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#9E9E9E';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.55, s * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#BDBDBD';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.35, y - s * 0.15, s * 0.25, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.4, y - s * 0.18, s * 0.05, 0, Math.PI * 2);
  ctx.fill();
  // 耳朵
  ctx.fillStyle = '#9E9E9E';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.25, y - s * 0.35, s * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

function drawPidgey(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  // 身体
  ctx.fillStyle = '#8D6E63';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.45, s * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  // 腹部
  ctx.fillStyle = '#FFECB3';
  ctx.beginPath();
  ctx.ellipse(x - f * s * 0.05, y + s * 0.05, s * 0.25, s * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  // 头
  ctx.fillStyle = '#8D6E63';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.2, y - s * 0.2, s * 0.2, 0, Math.PI * 2);
  ctx.fill();
  // 喙
  ctx.fillStyle = '#FF8F00';
  ctx.beginPath();
  ctx.moveTo(x + f * s * 0.38, y - s * 0.22);
  ctx.lineTo(x + f * s * 0.5, y - s * 0.18);
  ctx.lineTo(x + f * s * 0.38, y - s * 0.12);
  ctx.fill();
  // 翅膀
  ctx.fillStyle = '#6D4C41';
  ctx.beginPath();
  ctx.ellipse(x - f * s * 0.1, y - s * 0.15, s * 0.3, s * 0.15, -0.3, 0, Math.PI * 2);
  ctx.fill();
}

function drawCaterpie(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  // 身体段
  const colors = ['#66BB6A', '#4CAF50', '#43A047', '#388E3C', '#2E7D32'];
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = colors[i];
    ctx.beginPath();
    ctx.arc(x + f * (i - 2) * s * 0.2, y + Math.sin(i) * s * 0.08, s * 0.15, 0, Math.PI * 2);
    ctx.fill();
  }
  // 头
  ctx.fillStyle = '#66BB6A';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.5, y, s * 0.18, 0, Math.PI * 2);
  ctx.fill();
  // 触角
  ctx.strokeStyle = '#FFD54F';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + f * s * 0.6, y - s * 0.1);
  ctx.lineTo(x + f * s * 0.7, y - s * 0.35);
  ctx.stroke();
  ctx.fillStyle = '#F44336';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.7, y - s * 0.35, s * 0.05, 0, Math.PI * 2);
  ctx.fill();
}

function drawWeedle(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#FFD54F';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.5, s * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFA000';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.4, y, s * 0.2, 0, Math.PI * 2);
  ctx.fill();
  // 角
  ctx.strokeStyle = '#FFA000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + f * s * 0.45, y - s * 0.15);
  ctx.lineTo(x + f * s * 0.55, y - s * 0.4);
  ctx.stroke();
}

function drawPikachu(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  // 身体
  ctx.fillStyle = '#FDD835';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.5, s * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();
  // 头
  ctx.fillStyle = '#FDD835';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.05, y - s * 0.45, s * 0.38, 0, Math.PI * 2);
  ctx.fill();
  // 耳朵
  ctx.fillStyle = '#FDD835';
  ctx.beginPath();
  ctx.moveTo(x + f * s * 0.1, y - s * 0.75);
  ctx.lineTo(x + f * s * 0.28, y - s * 0.65);
  ctx.lineTo(x + f * s * 0.05, y - s * 0.5);
  ctx.fill();
  // 耳尖
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(x + f * s * 0.08, y - s * 0.72);
  ctx.lineTo(x + f * s * 0.22, y - s * 0.65);
  ctx.lineTo(x + f * s * 0.1, y - s * 0.61);
  ctx.fill();
  // 脸颊
  ctx.fillStyle = '#F44336';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.28, y - s * 0.38, s * 0.1, 0, Math.PI * 2);
  ctx.fill();
  // 眼睛
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.2, y - s * 0.5, s * 0.06, 0, Math.PI * 2);
  ctx.fill();
  // 尾巴
  ctx.strokeStyle = '#FFA000';
  ctx.lineWidth = s * 0.1;
  ctx.beginPath();
  ctx.moveTo(x - f * s * 0.3, y + s * 0.1);
  ctx.quadraticCurveTo(x - f * s * 0.5, y - s * 0.1, x - f * s * 0.4, y - s * 0.3);
  ctx.stroke();
  ctx.fillStyle = '#FFA000';
  ctx.beginPath();
  ctx.moveTo(x - f * s * 0.4, y - s * 0.3);
  ctx.lineTo(x - f * s * 0.5, y - s * 0.35);
  ctx.lineTo(x - f * s * 0.42, y - s * 0.22);
  ctx.fill();
}

function drawPsyduck(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#FDD835';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.5, s * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFF9C4';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.05, y - s * 0.35, s * 0.38, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.15, y - s * 0.4, s * 0.06, 0, Math.PI * 2);
  ctx.fill();
  // 鸭嘴
  ctx.fillStyle = '#FF8F00';
  ctx.beginPath();
  ctx.ellipse(x + f * s * 0.28, y - s * 0.3, s * 0.14, s * 0.06, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawSeel(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#E0E0E0';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.55, s * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FAFAFA';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.25, y - s * 0.15, s * 0.28, 0, Math.PI * 2);
  ctx.fill();
  // 角
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.moveTo(x + f * s * 0.25, y - s * 0.4);
  ctx.lineTo(x + f * s * 0.2, y - s * 0.3);
  ctx.lineTo(x + f * s * 0.3, y - s * 0.3);
  ctx.fill();
}

function drawKrabby(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#F44336';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.4, s * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#E53935';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.2, y - s * 0.2, s * 0.22, 0, Math.PI * 2);
  ctx.fill();
  // 钳子
  ctx.fillStyle = '#EF5350';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.4, y - s * 0.15, s * 0.15, 0, Math.PI * 2);
  ctx.fill();
}

function drawGeodude(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#9E9E9E';
  ctx.beginPath();
  ctx.arc(x, y, s * 0.45, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#757575';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x, y, s * 0.45, 0, Math.PI * 2);
  ctx.stroke();
  // 拳头
  ctx.fillStyle = '#BDBDBD';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.35, y - s * 0.15, s * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + f * s * 0.3, y + s * 0.2, s * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

function drawOnix(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  const segments = 6;
  for (let i = 0; i < segments; i++) {
    ctx.fillStyle = i % 2 === 0 ? '#9E9E9E' : '#757575';
    ctx.beginPath();
    ctx.arc(x + f * (i - segments / 2 + 0.5) * s * 0.22, y + Math.sin(i * 0.5) * s * 0.1, s * 0.14, 0, Math.PI * 2);
    ctx.fill();
  }
  // 头
  ctx.fillStyle = '#9E9E9E';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.7, y - s * 0.05, s * 0.2, 0, Math.PI * 2);
  ctx.fill();
  // 角
  ctx.fillStyle = '#616161';
  ctx.beginPath();
  ctx.moveTo(x + f * s * 0.75, y - s * 0.2);
  ctx.lineTo(x + f * s * 0.9, y - s * 0.35);
  ctx.lineTo(x + f * s * 0.7, y - s * 0.1);
  ctx.fill();
}

function drawZubat(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  // 身体
  ctx.fillStyle = '#7B1FA2';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.3, s * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();
  // 翅膀
  ctx.fillStyle = '#9C27B0';
  ctx.beginPath();
  ctx.moveTo(x + f * s * 0.05, y - s * 0.15);
  ctx.lineTo(x + f * s * 0.3, y - s * 0.55);
  ctx.lineTo(x + f * s * 0.4, y - s * 0.45);
  ctx.lineTo(x + f * s * 0.2, y + s * 0.1);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x - f * s * 0.05, y - s * 0.15);
  ctx.lineTo(x - f * s * 0.3, y - s * 0.55);
  ctx.lineTo(x - f * s * 0.4, y - s * 0.45);
  ctx.lineTo(x - f * s * 0.2, y + s * 0.1);
  ctx.fill();
  // 头
  ctx.fillStyle = '#7B1FA2';
  ctx.beginPath();
  ctx.arc(x, y - s * 0.15, s * 0.18, 0, Math.PI * 2);
  ctx.fill();
}

function drawMachop(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#90A4AE';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.4, s * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#B0BEC5';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.05, y - s * 0.45, s * 0.3, 0, Math.PI * 2);
  ctx.fill();
  // 鸡冠
  ctx.fillStyle = '#E53935';
  ctx.beginPath();
  ctx.moveTo(x, y - s * 0.7);
  ctx.quadraticCurveTo(x + f * s * 0.1, y - s * 0.8, x, y - s * 0.65);
  ctx.fill();
  // 手臂
  ctx.fillStyle = '#90A4AE';
  ctx.fillRect(x + f * s * 0.25, y - s * 0.2, s * 0.2, s * 0.1);
}

function drawDiglett(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  // 地面
  ctx.fillStyle = '#6D4C41';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.5, s * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();
  // 身体
  ctx.fillStyle = '#8D6E63';
  ctx.beginPath();
  ctx.ellipse(x, y - s * 0.2, s * 0.3, s * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();
  // 鼻子
  ctx.fillStyle = '#FF8A80';
  ctx.beginPath();
  ctx.arc(x, y - s * 0.25, s * 0.08, 0, Math.PI * 2);
  ctx.fill();
}

function drawVenonat(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#7B1FA2';
  ctx.beginPath();
  ctx.arc(x, y, s * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#CE93D8';
  ctx.beginPath();
  ctx.arc(x, y, s * 0.2, 0, Math.PI * 2);
  ctx.fill();
  // 触角
  ctx.strokeStyle = '#7B1FA2';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y - s * 0.3);
  ctx.lineTo(x + f * s * 0.15, y - s * 0.5);
  ctx.stroke();
}

function drawParas(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#F44336';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.4, s * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FF8A80';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.2, y - s * 0.2, s * 0.22, 0, Math.PI * 2);
  ctx.fill();
  // 蘑菇
  ctx.fillStyle = '#FFCC80';
  ctx.beginPath();
  ctx.arc(x, y - s * 0.35, s * 0.25, Math.PI, 0);
  ctx.fill();
}

function drawGoldeen(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, flipped: boolean) {
  const f = flipped ? -1 : 1;
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.ellipse(x, y, s * 0.45, s * 0.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#F44336';
  ctx.beginPath();
  ctx.arc(x + f * s * 0.2, y - s * 0.1, s * 0.22, 0, Math.PI * 2);
  ctx.fill();
  // 尾鳍
  ctx.fillStyle = '#FFF';
  ctx.beginPath();
  ctx.moveTo(x - f * s * 0.4, y);
  ctx.lineTo(x - f * s * 0.6, y - s * 0.2);
  ctx.lineTo(x - f * s * 0.5, y + s * 0.15);
  ctx.fill();
}

// 物种→绘制函数映射
export const SPRITE_FUNCTIONS: Record<string, SpriteFn> = {
  '小火龙': drawCharmander,
  '杰尼龟': drawSquirtle,
  '妙蛙种子': drawBulbasaur,
  '小拉达': drawRattata,
  '波波': drawPidgey,
  '绿毛虫': drawCaterpie,
  '小雀蜂': drawPidgey,   // 类似波波
  '独角虫': drawWeedle,
  '派拉斯': drawParas,
  '皮卡丘': drawPikachu,
  '可达鸭': drawPsyduck,
  '小海狮': drawSeel,
  '角金鱼': drawGoldeen,
  '小拳石': drawGeodude,
  '大岩蛇': drawOnix,
  '超音蝠': drawZubat,
  '腕力': drawMachop,
  '地鼠': drawDiglett,
  '铁甲蛹': drawCaterpie,  // fallback
};

// 默认未知精灵
export function drawUnknownSprite(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, _f: boolean) {
  ctx.fillStyle = '#9E9E9E';
  ctx.beginPath();
  ctx.arc(x, y, s * 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFF';
  ctx.font = `${s * 0.4}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', x, y);
}
