import { useGameState } from '../store/game-context';
import { api, setSessionId, clearSessionId } from '../api/client';
import {
  GameStartResponse, MoveResponse, MapCurrentResponse, PlayerStatusResponse,
  BattleStateResponse,
} from '../types';

export function useGame() {
  const { dispatch } = useGameState();

  async function startGame(playerName: string, starterIndex: number) {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const data = await api.post<GameStartResponse>('/game/start', { playerName, starterIndex });
      setSessionId(data.sessionId);
      dispatch({ type: 'SET_SESSION', sessionId: data.sessionId });
      dispatch({
        type: 'UPDATE_PLAYER',
        status: {
          playerName: data.playerName,
          currentLocation: data.currentLocation,
          locationDescription: data.locationDescription,
          totalPokeBalls: data.totalPokeBalls,
          teamCount: data.teamCount,
          maxTeamSize: data.maxTeamSize,
        },
      });
      dispatch({ type: 'UPDATE_TEAM', team: data.team, storage: [] });
      // 获取地图数据
      await fetchMap();
      dispatch({ type: 'SET_SCREEN', screen: 'game' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '启动游戏失败';
      dispatch({ type: 'SET_ERROR', error: msg });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }

  async function movePlayer(direction: string) {
    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const data = await api.post<MoveResponse>('/game/move', { direction });
      if (data.success) {
        dispatch({
          type: 'SET_NOTIFICATION',
          notification: data.message,
        });
        await fetchMap();
        await fetchStatus();

        if (data.encounterWildPokemon) {
          dispatch({
            type: 'SET_NOTIFICATION',
            notification: `⚠️ 野生的【${data.wildPokemonSpecies}】出现了！`,
          });
          // 给一点延迟让通知显示
          await new Promise(r => setTimeout(r, 800));
          await fetchBattleState();
        }
      } else {
        dispatch({ type: 'SET_ERROR', error: data.message });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '移动失败';
      dispatch({ type: 'SET_ERROR', error: msg });
    } finally {
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  }

  async function fetchMap() {
    try {
      const data = await api.get<MapCurrentResponse>('/map/current');
      dispatch({ type: 'UPDATE_MAP', map: data });
    } catch { /* ignore */ }
  }

  async function fetchStatus() {
    try {
      const data = await api.get<PlayerStatusResponse>('/player/status');
      dispatch({ type: 'UPDATE_PLAYER', status: data });
    } catch { /* ignore */ }
  }

  async function fetchBattleState() {
    try {
      const data = await api.get<BattleStateResponse>('/battle/state');
      if (data.inBattle) {
        dispatch({ type: 'ENTER_BATTLE', battle: data });
      }
    } catch { /* ignore */ }
  }

  function quitGame() {
    clearSessionId();
    dispatch({ type: 'RESET' });
  }

  return { startGame, movePlayer, fetchMap, fetchStatus, fetchBattleState, quitGame };
}
