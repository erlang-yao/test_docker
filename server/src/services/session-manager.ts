import { v4 as uuidv4 } from 'uuid';
import { Player } from '../models/player';
import { GameMap } from '../models/map';
import { Battle } from '../models/battle';
import { Pokemon } from '../models/pokemon';
import { BattleStateData } from '../types';

export interface GameSession {
  sessionId: string;
  createdAt: number;
  player: Player;
  map: GameMap;
  battle: Battle;
}

class SessionManager {
  private sessions: Map<string, GameSession> = new Map();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // 每30分钟清理超过2小时的会话
    this.cleanupInterval = setInterval(() => this.cleanup(), 30 * 60 * 1000);
  }

  createSession(playerName: string, starterSpecies: string): GameSession {
    const sessionId = uuidv4();
    const player = new Player(playerName || 'Red');
    const map = new GameMap();

    const starter = new Pokemon(starterSpecies, 5);
    player.addPokemon(starter);

    const battle = new Battle(player);

    const session: GameSession = {
      sessionId,
      createdAt: Date.now(),
      player,
      map,
      battle,
    };

    this.sessions.set(sessionId, session);
    return session;
  }

  getSession(sessionId: string): GameSession | undefined {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.createdAt = Date.now(); // 刷新活动时间
    }
    return session;
  }

  deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  private cleanup(): void {
    const now = Date.now();
    const expiry = 2 * 60 * 60 * 1000; // 2小时
    for (const [id, session] of this.sessions) {
      if (now - session.createdAt > expiry) {
        this.sessions.delete(id);
      }
    }
  }

  getSessionCount(): number {
    return this.sessions.size;
  }
}

export const sessionManager = new SessionManager();
