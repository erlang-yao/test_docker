import { Router, Request, Response } from 'express';
import { sessionMiddleware } from '../middleware/session';

const router = Router();

// GET /api/battle/state
router.get('/state', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const battle = session.battle;

  if (!battle.isInBattle()) {
    res.json({ inBattle: false });
    return;
  }

  const state = battle.getState();
  const playerPoke = session.player.team[state.playerPokeIndex];

  res.json({
    inBattle: true,
    playerPokeIndex: state.playerPokeIndex,
    playerPokeName: playerPoke?.name ?? '',
    playerPokeHp: playerPoke?.stats.hp ?? 0,
    playerPokeMaxHp: playerPoke?.stats.maxHp ?? 0,
    playerPokeLevel: playerPoke?.level ?? 0,
    playerPokeMoves: playerPoke?.moves ?? [],
    enemyPokeName: state.wildPokemon?.name ?? '',
    enemyPokeHp: state.wildPokemon?.stats.hp ?? 0,
    enemyPokeMaxHp: state.wildPokemon?.stats.maxHp ?? 0,
    enemyPokeLevel: state.wildPokemon?.level ?? 0,
    playerTurn: state.playerTurn,
    actionLog: state.actionLog,
    playerTeam: battle.getPlayerTeam(),
    healCount: session.player.getHealPotionCount(),
    ballCount: session.player.getTotalBalls(),
    ballCounts: [...session.player.pokeballs],
  });
});

// POST /api/battle/action (per api-contract.yaml)
router.post('/action', sessionMiddleware, (req: Request, res: Response) => {
  const session = req.gameSession!;
  const { actionType, targetIndex } = req.body;

  if (!actionType || actionType < 1 || actionType > 5) {
    res.status(400).json({
      battleEnded: false,
      actionLog: '无效操作或参数错误',
    });
    return;
  }

  if (!session.battle.isInBattle()) {
    res.status(400).json({
      battleEnded: true,
      actionLog: '当前没有进行中的战斗',
    });
    return;
  }

  const result = session.battle.playerAction(actionType, targetIndex);

  res.json({
    battleEnded: result.battleEnded,
    actionLog: result.actionLog,
    playerPokeHp: result.playerPokeHp,
    enemyPokeHp: result.enemyPokeHp,
    playerPokeName: result.playerPokeName,
    enemyPokeName: result.enemyPokeName,
  });
});

export default router;
