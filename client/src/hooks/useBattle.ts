import { useGameState } from '../store/game-context';
import { api } from '../api/client';
import { BattleActionResponse, BattleStateResponse } from '../types';

export function useBattle() {
  const { dispatch } = useGameState();

  async function submitAction(actionType: number, targetIndex?: number) {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const data = await api.post<BattleActionResponse>('/battle/action', { actionType, targetIndex });

      // 每次行动后都重新获取完整战斗状态（切换精灵/死亡换人后名字技能等会变）
      const stateData = await api.get<BattleStateResponse>('/battle/state');

      if (!stateData.inBattle) {
        // 战斗已结束
        dispatch({ type: 'EXIT_BATTLE' });
        const [mapData, statusData] = await Promise.all([
          api.get<import('../types').MapCurrentResponse>('/map/current'),
          api.get<import('../types').PlayerStatusResponse>('/player/status'),
        ]);
        dispatch({ type: 'UPDATE_MAP', map: mapData });
        dispatch({ type: 'UPDATE_PLAYER', status: statusData });
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: data.actionLog.includes('战斗胜利') ? '🎉 战斗胜利！' : '🏃 已脱离战斗',
        });
      } else {
        // 战斗继续，用完整状态替换（含正确的名字/技能/等级）
        dispatch({ type: 'ENTER_BATTLE', battle: stateData });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '战斗操作失败';
      dispatch({ type: 'SET_ERROR', error: msg });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }

  async function refreshBattleState() {
    try {
      const data = await api.get<BattleStateResponse>('/battle/state');
      if (!data.inBattle) {
        dispatch({ type: 'EXIT_BATTLE' });
      }
    } catch { /* ignore */ }
  }

  return { submitAction, refreshBattleState };
}
