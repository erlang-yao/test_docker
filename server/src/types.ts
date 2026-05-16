// ==================== 枚举 ====================
export enum Type {
  Normal,
  Fire,
  Water,
  Grass,
  Electric,
  Ice,
  Fighting,
  Ground,
  Flying,
}

export enum PokeBallType {
  PokeBall,
  GreatBall,
  UltraBall,
  MasterBall,
}

// ==================== 数据结构 ====================
export interface Stats {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface Move {
  name: string;
  type: Type;
  power: number;
  accuracy: number;
  isSpecial: boolean;
}

export interface PokeBall {
  type: PokeBallType;
  name: string;
  catchRate: number;
}

export interface Item {
  name: string;
  count: number;
  healAmount: number;
  healPercent: number;
  expAmount: number;
  isRevive: boolean;
}

export interface LocationData {
  name: string;
  description: string;
  connections: Record<string, number>;
  wildPokemons: string[];
}

export interface PokemonData {
  name: string;
  species: string;
  type: Type;
  level: number;
  stats: Stats;
  exp: number;
  maxExp: number;
  moves: Move[];
}

export interface BattleStateData {
  inBattle: boolean;
  wildPokemon: PokemonData | null;
  playerPokeIndex: number;
  playerTurn: boolean;
  actionLog: string[];
}

// ==================== API 请求/响应 ====================
export interface GameStartRequest {
  playerName?: string;
  starterIndex: number; // 1=小火龙, 2=杰尼龟, 3=妙蛙种子
}

export interface GameStartResponse {
  sessionId: string;
  playerName: string;
  currentLocation: string;
  locationDescription: string;
  totalPokeBalls: number;
  teamCount: number;
  maxTeamSize: number;
  team: PokemonData[];
}

export interface PlayerStatusResponse {
  playerName: string;
  currentLocation: string;
  locationDescription: string;
  totalPokeBalls: number;
  teamCount: number;
  maxTeamSize: number;
}

export interface MoveRequest {
  direction: string;
}

export interface MoveResponse {
  success: boolean;
  message: string;
  encounterWildPokemon: boolean;
  wildPokemonSpecies: string | null;
  newLocation?: string;
  newLocationDescription?: string;
}

export interface BattleStateResponse {
  inBattle: boolean;
  playerPokeName: string;
  playerPokeHp: number;
  playerPokeMaxHp: number;
  playerPokeLevel: number;
  playerPokeMoves: Move[];
  enemyPokeName: string;
  enemyPokeHp: number;
  enemyPokeMaxHp: number;
  enemyPokeLevel: number;
  playerTurn: boolean;
  actionLog: string[];
  playerTeam: PokemonData[];
}

export interface BattleActionRequest {
  actionType: number; // 1=技能, 2=精灵球, 3=治疗, 4=更换, 5=逃跑
  targetIndex?: number;
}

export interface BattleActionResponse {
  battleEnded: boolean;
  actionLog: string;
  playerPokeHp: number;
  enemyPokeHp: number;
  playerPokeName?: string;
  enemyPokeName?: string;
  caughtPokemon?: string;
}

export interface TeamResponse {
  team: PokemonData[];
  storage: PokemonData[];
}

export interface ItemData {
  name: string;
  count: number;
  healPercent: number;
  expAmount: number;
  isRevive: boolean;
}

export interface ItemsResponse {
  items: ItemData[];
}

export interface MapLocation {
  index: number;
  name: string;
  x: number;
  y: number;
  connections: { direction: string; toIndex: number }[];
  wildPokemons: string[];
}

export interface MapCurrentResponse {
  currentLocationIndex: number;
  locationName: string;
  locationDescription: string;
  availableDirections: string[];
  wildPokemons: string[];
  allLocations: MapLocation[];
}
