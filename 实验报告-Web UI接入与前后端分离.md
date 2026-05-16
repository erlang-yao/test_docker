# 实验报告：宝可梦 MUD Web UI 接入与前后端分离

## 一、实验目标

1. **Web UI 接入**：引入 React 前端框架与 Canvas，将命令行 MUD 游戏重构为 2D 图形界面 Web 应用。
2. **前后端分离与联调**：通过 RESTful API，实现后端业务逻辑（迭代 3 剥离的纯逻辑模块）与前端界面的完整对接。

---

## 二、架构设计

```
浏览器 (React + Vite, 端口 5173)
  ├── StartScreen        (选择初始宝可梦)
  ├── GameScreen         (场景地图 + 方向按钮)
  ├── BattleScreen       (战斗界面 + 精灵贴图)
  └── TeamScreen         (队伍/仓库/物品管理)
         │
         ▼ REST API (JSON, X-Session-Id)
         │
服务器 (Express + TypeScript, 端口 4010)
  ├── 14 个 REST 端点
  ├── 会话管理 (内存 Map, UUID, 2h TTL)
  └── C++ 游戏逻辑 → TypeScript 完整移植
```

- **无数据库**：游戏状态全在内存会话中（与 C++ 原版一致）
- **无登录**：Session ID 即身份标识，通过 HTTP Header 传递
- **战斗状态机**：一次 HTTP 请求 = 玩家行动 + 敌方回合 + 结束判定

---

## 三、Web UI 接入

### 3.1 从 CLI 到 2D 图形界面

**原 CLI 界面**（`game.cpp`）：

```
📍 当前位置：【新手村】
一个宁静的小村庄...
🎒 精灵球：14
🧭 可移动方向：北 (n)、东 (e)
> e
```

**重构后的 Web 界面**：四个核心屏幕，分别负责不同游戏阶段。

#### StartScreen（初始宝可梦选择）
- 三张御三家卡片（小火龙 🔥 / 杰尼龟 💧 / 妙蛙种子 🌿）
- 输入训练家名字
- 点击"开始冒险"进入游戏

#### GameScreen（地图探索）
- **场景贴图**：画面正中央显示当前地点的 PNG 场景图（1080×1080）
  - 新手村 (Village.png) — 村庄
  - 望风坡 (Wind.png) — 山坡
  - 迷雾森林 (Foggy.png) — 密林
  - 湖边 (Lake.png) — 湖水
  - 精灵中心 (Center.png) — 红色建筑
  - 山洞入口 (Hole.png) — 洞口
  - 山洞深处 (Deep.png) — 洞穴
- **十字方向按钮**：↑北 ↓南 ←西 →东，无路方向灰显禁用
- **左侧信息栏**：地点名、描述、可能遭遇的野生宝可梦
- **键盘快捷键**：WASD / 方向键移动，T 打开队伍

#### BattleScreen（战斗界面）
- **精灵贴图**：左下角 280×280 我方精灵 PNG（朝右），右上角 280×280 敌方精灵 PNG（水平翻转向左）
- **HP 血条**：颜色随血量变化（绿→橙→红）
- **战斗日志**：滚动文本，伤害红色、治疗绿色、成功金色
- **5 个操作按钮**：技能/精灵球/治疗/更换/逃跑，带子选择器
- **键盘快捷键**：1-5 选择行动，Esc 返回

#### TeamScreen（队伍管理）
- 队伍列表（点击交换位置或使用物品）
- 仓库列表（移入/移出）
- 物品背包（治疗药水、经验药水、复活药剂）

### 3.2 前端技术栈

| 技术 | 说明 |
|------|------|
| React 18 + TypeScript | 组件化 UI |
| Vite 5 | 开发服务器 + 构建（代理 /api → 后端） |
| CSS Grid / Flexbox | 场景+方向按钮的十字布局 |
| PNG 场景图 / 精灵图 | 替换手绘 Canvas 图，使用实物图片 |

### 3.3 关键组件清单

```
client/src/
  components/screens/
    StartScreen.tsx         — 御三家选择
    GameScreen.tsx          — 主游戏（场景+方向键+侧栏）
    BattleScreen.tsx        — 战斗覆盖层（精灵+日志+操作）
    TeamScreen.tsx          — 队伍/仓库/物品模态框
  components/map/
    SceneCanvas.tsx         — 场景图片展示
  components/battle/
    BattleHud.tsx           — HP 血条
    BattleLog.tsx           — 滚动战斗文本
    ActionPanel.tsx         — 5 操作按钮
    MoveSelector.tsx        — 技能选择
    BallSelector.tsx        — 精灵球选择
    SwitchSelector.tsx      — 替换精灵选择
    PokemonSprite.tsx       — 精灵 PNG 贴图
  components/team/
    PokemonCard.tsx         — 宝可梦卡片
    TeamRoster.tsx          — 队伍列表
    StorageView.tsx         — 仓库列表
    ItemInventory.tsx       — 物品背包
  components/ui/
    HealthBar.tsx           — 动画 HP 条
    TypeBadge.tsx           — 属性彩色标签
    Modal.tsx               — 通用模态框
  hooks/
    useGame.ts              — 游戏生命周期（开始/移动/地图）
    useBattle.ts            — 战斗行动提交
    useTeam.ts              — 队伍/物品管理
  store/
    game-context.tsx        — React Context + useReducer
    game-reducer.ts         — 全局状态管理
  api/
    client.ts               — fetch 封装（自动附 Session ID）
```

---

## 四、前后端分离与联调

### 4.1 后端：C++ 游戏逻辑 → TypeScript REST API

原有 C++ 的 7 个模块，按 1:1 逻辑映射到 TypeScript：

| C++ 源文件 | TypeScript 模块 | 说明 |
|------------|----------------|------|
| `config.h` | `config.ts` | 25+ 游戏常量，逐字翻译 |
| `pokemon.cpp` | `models/pokemon.ts` + `data/species.ts` | 18 种宝可梦 + 9 属性克制表（数据驱动查表替代 if/else 链） |
| `map.cpp` | `models/map.ts` + `data/locations.ts` | 7 地点地图 + 移动/遭遇判定 |
| `player.cpp` | `models/player.ts` | 队伍/仓库/物品管理 |
| `battle_rules.cpp` | `models/battle-rules.ts` | 纯计算：伤害 / 逃跑概率 / 捕捉概率公式 |
| `battle.cpp` | `models/battle.ts` | 战斗状态机（核心改造，见 5.2） |

### 4.2 API 端点（14 个）

#### 遵循 api-contract.yaml 的 3 个端点

| 方法 | 路径 | 对应 C++ | 说明 |
|------|------|----------|------|
| GET | `/api/player/status` | `Game::printCurrentLocationInfo` | 玩家状态 |
| POST | `/api/game/move` | `Map::tryMove` | 移动 + 遭遇判定 |
| POST | `/api/battle/action` | `Battle::run` 单回合 | 战斗行动 |

#### 扩展端点（Web UI 需要）

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/game/start` | 创建会话 + 选初始宝可梦 |
| GET | `/api/map/current` | 完整地图数据 + 场景坐标 |
| GET | `/api/battle/state` | 战斗完整状态（含精灵列表/道具数/技能） |
| GET | `/api/team` | 队伍 + 仓库 |
| POST | `/api/team/swap` | 交换位置 |
| POST | `/api/team/storage/move-to` | 移入仓库 |
| POST | `/api/team/storage/move-from` | 移出仓库 |
| GET | `/api/items` | 物品背包 |
| POST | `/api/items/use` | 使用治疗/经验药水 |
| POST | `/api/items/revive` | 复活 |

### 4.3 前后端联调机制

- **会话管理**：`POST /api/game/start` 返回 UUID，前端存入 `localStorage`，后续请求通过 `X-Session-Id` Header 传递
- **API 客户端**（`api/client.ts`）：fetch 封装，自动附加 Session，统一错误处理
- **状态管理**（`store/game-context.tsx`）：React Context + `useReducer`，API 响应后 dispatch 更新全局状态，驱动 UI 重渲染
- **跨域处理**：Vite 开发代理将 `/api/*` 转发到 `http://127.0.0.1:4010`

### 4.4 数据流示例：玩家移动 → 遇敌 → 战斗

```
1. 用户点击「东」按钮
2. GameScreen → movePlayer("e")
3. POST /api/game/move { direction: "e" }
4. 后端: tryMove → update currentLocation → shouldEncounter() → battle.start()
5. 响应: { success: true, encounterWildPokemon: true, wildPokemonSpecies: "波波" }
6. 延迟 800ms 显示通知 → GET /api/battle/state
7. 后端返回完整战斗状态 → ENTER_BATTLE → 切换 BattleScreen
8. 用户点击「技能」→ 选择「撞击」→ submitAction(1, 0)
9. POST /api/battle/action { actionType: 1, targetIndex: 0 }
10. 后端: playerAction → useMove → enemyTurn → checkBattleEnd
11. 响应后前端 GET /api/battle/state 刷新完整状态
12. 战斗结束 → EXIT_BATTLE → 回到 GameScreen
```

---

## 五、遇到的问题与解决方案

### 5.1 战斗状态机改造（关键设计决策）

**问题**：C++ 中战斗是 `while (inBattle) { cin >> choice; }` 的同步阻塞循环，不适合 Web 请求-响应模型。

**方案**：将 `Battle::run()` 改造为状态机。每次 HTTP 请求执行一个完整回合：

```
POST /api/battle/action
  → playerAction(actionType, targetIndex)
    1. 执行玩家行动 (handleMove/handleCatch/handleHeal/handleSwitch/handleEscape)
    2. 执行敌方回合 enemyTurn()
    3. 检查战斗结束 checkBattleEnd()
  → 返回 { battleEnded, actionLog, hp... }
```

**影响**：无需 WebSocket 或长轮询，单次请求完成完整回合。

### 5.2 敌方先手回合卡死 Bug

**现象**：若敌方速度 > 我方速度（如杰尼龟 vs 小雀蜂），战斗直接卡住——按钮禁用但敌方不攻击。

**根因**：`battle.start()` 根据速度判定了 `playerTurn = false`，但 `enemyTurn()` 只在 `playerAction()` 内部被调用。若敌方先手，没有入口触发敌方回合。

**修复**：在 `battle.start()` 末尾增加：

```typescript
if (!this.playerTurn) {
  this.enemyTurn();
  this.checkBattleEnd();
}
```

### 5.3 更换精灵后界面信息不更新

**现象**：战斗中切换精灵或死亡自动换人后，显示的名字/技能/等级仍是旧精灵的数据。

**根因**：前端 `UPDATE_BATTLE` reducer 只更新 HP 和日志，不更新精灵名字、技能列表、等级。

**修复**：每次 `submitAction` 后始终调用 `GET /api/battle/state` 获取完整最新状态，用 `ENTER_BATTLE` 替换整个 battle 对象。

### 5.4 战斗中阵亡精灵自动首发出战

**问题**：`battle.start()` 始终设置 `playerPokeIndex = 0`。若队伍[0]在前一战中阵亡，新战斗以已阵亡精灵开始。

**修复**：`battle.start()` 中遍历队伍找到第一只存活的宝可梦出战。

### 5.5 治疗按钮数量显示错误

**问题**：BattleScreen 的 `healCount` 从 `state.items` 获取，但物品数据可能未加载，默认显示 5 但实际为 0。

**修复**：在 `GET /api/battle/state` 响应中增加 `healCount`、`ballCount`、`ballCounts` 字段，前端直接从战斗状态取值。

### 5.6 场景图布局错位

**问题**：`SceneCanvas` 组件在 CSS Grid 中没有显式指定 `gridRow`/`gridColumn`，被自动放置到第一行，与北按钮重叠。

**修复**：用 `<div style={{ gridRow: 2, gridColumn: 2 }}>` 包裹场景图，并移除多余的空白占位 `<div>`。

### 5.7 Node.js 环境配置

**问题**：Node.js 安装在 `G:\nodejs`，未加入系统 PATH，`npm install` 子进程（esbuild postinstall）找不到 `node` 命令。

**解决**：
- `npm install --ignore-scripts` 跳过原生二进制构建
- 用 `ts-node` 替代 `tsx`（避免 esbuild 依赖）
- 用完整路径 `G:\nodejs\node.exe` 直接启动
- 创建 `start-game.bat` 脚本自动设置 PATH 并启动

---

## 六、功能改进与修缮

| 改进 | 说明 |
|------|------|
| **场景图替换** | 手绘 Canvas 图 → PNG 实景图（1080×1080），7 个地点各有独特场景 |
| **精灵贴图替换** | 手绘 Canvas 精灵 → PNG 高清图（512×512），18 种宝可梦各一张 |
| **精灵图片放大** | 战斗中精灵显示从 140×140 增大到 280×280 |
| **场景+方向键布局** | 图片正中央，↑↓←→ 十字围绕，无路灰色禁用 |
| **战斗精灵排版** | 左下角我方（朝右），右上角敌方（flip 朝左） |
| **敌方先手修复** | 敌方速度更快时自动先执行回合，不卡住 |
| **切换精灵刷新** | 换人后名字/技能/等级立即更新 |
| **治疗精灵球计数** | 按钮显示实际道具数量，不再使用硬编码 |
| **阵亡自动跳过** | 战斗开始自动选择存活宝可梦，跳过已阵亡 |
| **一键启动脚本** | `start-game.bat` 编译后端 + 启动前后端 + 打开浏览器 |

---

## 七、项目文件结构总览

```
team_Software_Engineering_project/
  main.cpp                    ← C++ 原版（未修改）
  start-game.bat              ← 一键启动脚本
  api-contract.yaml           ← OpenAPI 3.0 契约（3 端点）
  pic/                        ← 原始场景图 + 精灵图
    *.png                     (7 张场景)
    bb/*.png                  (18 张精灵)
  server/                     ← 后端 (TypeScript)
    package.json
    src/
      index.ts                Express 入口
      config.ts               游戏常量
      types.ts                接口/枚举
      data/                   数据层 (species, type-chart, locations, items)
      models/                 模型层 (pokemon, player, map, battle, battle-rules)
      services/               会话管理
      routes/                 6 个路由文件 (14 端点)
      middleware/              Session + Error Handler
  client/                     ← 前端 (React + TypeScript)
    package.json
    vite.config.ts            Vite 配置（代理 /api → 4010）
    public/pic/               场景图 + 精灵图（Vite 静态资源）
    src/
      main.tsx / App.tsx      入口
      types.ts                前端类型
      api/client.ts           fetch 封装
      store/                  Context + Reducer
      hooks/                  useGame / useBattle / useTeam
      components/             20+ 组件
      utils/                  场景绘制 / 精灵绘制 / 布局
```

---

## 八、总结

本次实验完成了宝可梦 MUD 游戏从命令行到 Web 2D 图形界面的完整重构：

1. **前端**：React + TypeScript + Vite，Canvas 地图/战斗场景 + 20+ 组件，PNG 场景图与精灵图替代手绘
2. **后端**：Express + TypeScript，C++ 7 模块完整移植，14 个 REST 端点，内存会话管理
3. **联调**：Session ID 机制，React Context 状态管理，Vite 开发代理，RESTful JSON 通信
4. **修缮**：修复 6 个 Bug（敌方先手卡死、切换不刷新、治疗计数错误等），一键启动脚本
