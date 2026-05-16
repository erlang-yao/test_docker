import { Router, Request, Response } from 'express';
import { sessionMiddleware } from '../middleware/session';

const router = Router();

// GET /api/items
router.get('/', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const items = session.player.items.map(item => ({
    name: item.name,
    count: item.count,
    healPercent: item.healPercent,
    expAmount: item.expAmount,
    isRevive: item.isRevive,
  }));
  res.json({ items });
});

// POST /api/items/use
router.post('/use', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const { itemIndex, pokemonIndex, isTeam } = req.body;

  if (session.battle.isInBattle()) {
    res.status(409).json({ success: false, message: '战斗中无法使用物品！' });
    return;
  }

  const ok = session.player.useItemOnPokemon(itemIndex, pokemonIndex, isTeam);
  res.json({
    success: ok,
    message: ok ? '物品使用成功' : '使用失败，请检查参数',
    items: session.player.items.map(item => ({
      name: item.name,
      count: item.count,
      healPercent: item.healPercent,
      expAmount: item.expAmount,
      isRevive: item.isRevive,
    })),
    team: session.player.getTeamData(),
  });
});

// POST /api/items/revive
router.post('/revive', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const { itemIndex, pokemonIndex } = req.body;

  if (session.battle.isInBattle()) {
    res.status(409).json({ success: false, message: '战斗中无法使用复活药剂！' });
    return;
  }

  const ok = session.player.revivePokemon(itemIndex, pokemonIndex);
  res.json({
    success: ok,
    message: ok ? '复活成功' : '复活失败，请检查参数（可能精灵未阵亡或不是复活药剂）',
    items: session.player.items.map(item => ({
      name: item.name,
      count: item.count,
      healPercent: item.healPercent,
      expAmount: item.expAmount,
      isRevive: item.isRevive,
    })),
    team: session.player.getTeamData(),
  });
});

export default router;
