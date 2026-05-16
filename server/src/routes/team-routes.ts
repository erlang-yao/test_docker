import { Router, Request, Response } from 'express';
import { sessionMiddleware } from '../middleware/session';

const router = Router();

// GET /api/team
router.get('/', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  res.json({
    team: session.player.getTeamData(),
    storage: session.player.getStorageData(),
  });
});

// POST /api/team/swap
router.post('/swap', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const { index1, index2 } = req.body;

  if (session.battle.isInBattle()) {
    res.status(409).json({ success: false, message: '战斗中无法调整队伍！' });
    return;
  }

  const ok = session.player.swapTeamPokemon(index1, index2);
  res.json({
    success: ok,
    message: ok ? '交换成功' : '交换失败，请检查索引',
    team: session.player.getTeamData(),
  });
});

// POST /api/team/storage/move-to
router.post('/storage/move-to', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const { teamIndex } = req.body;

  if (session.battle.isInBattle()) {
    res.status(409).json({ success: false, message: '战斗中无法调整队伍！' });
    return;
  }

  const ok = session.player.movePokemonToStorage(teamIndex);
  res.json({
    success: ok,
    message: ok ? '已移至仓库' : '移动失败（至少保留一只精灵或索引错误）',
    team: session.player.getTeamData(),
    storage: session.player.getStorageData(),
  });
});

// POST /api/team/storage/move-from
router.post('/storage/move-from', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const { storageIndex } = req.body;

  if (session.battle.isInBattle()) {
    res.status(409).json({ success: false, message: '战斗中无法调整队伍！' });
    return;
  }

  const ok = session.player.movePokemonFromStorage(storageIndex);
  res.json({
    success: ok,
    message: ok ? '已从仓库取出' : '取出失败（队伍已满或索引错误）',
    team: session.player.getTeamData(),
    storage: session.player.getStorageData(),
  });
});

export default router;
