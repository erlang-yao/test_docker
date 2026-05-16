import { Request, Response, NextFunction } from 'express';
import { sessionManager, GameSession } from '../services/session-manager';

declare global {
  namespace Express {
    interface Request {
      gameSession?: GameSession;
    }
  }
}

export function sessionMiddleware(req: Request, res: Response, next: NextFunction): void {
  const sessionId = req.headers['x-session-id'] as string | undefined;
  if (!sessionId) {
    res.status(401).json({ success: false, error: '缺少 X-Session-Id 请求头' });
    return;
  }

  const session = sessionManager.getSession(sessionId);
  if (!session) {
    res.status(401).json({ success: false, error: '会话无效或已过期' });
    return;
  }

  req.gameSession = session;
  next();
}
