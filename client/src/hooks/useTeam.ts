import { useGameState } from '../store/game-context';
import { api } from '../api/client';
import { TeamResponse, ItemsResponse, PokemonData, ItemData } from '../types';

export function useTeam() {
  const { dispatch } = useGameState();

  async function fetchTeam() {
    try {
      const data = await api.get<TeamResponse>('/team');
      dispatch({ type: 'UPDATE_TEAM', team: data.team, storage: data.storage });
    } catch { /* ignore */ }
  }

  async function fetchItems() {
    try {
      const data = await api.get<ItemsResponse>('/items');
      dispatch({ type: 'UPDATE_ITEMS', items: data.items });
    } catch { /* ignore */ }
  }

  async function swapPokemon(index1: number, index2: number) {
    try {
      const res = await api.post<{ success: boolean; message: string; team: PokemonData[] }>(
        '/team/swap', { index1, index2 },
      );
      if (res.success) {
        dispatch({ type: 'UPDATE_TEAM', team: res.team, storage: [] });
        await fetchTeam();
      }
      dispatch({ type: 'SET_NOTIFICATION', notification: res.message });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '交换失败';
      dispatch({ type: 'SET_ERROR', error: msg });
    }
  }

  async function moveToStorage(teamIndex: number) {
    try {
      const res = await api.post<{ success: boolean; message: string; team: PokemonData[]; storage: PokemonData[] }>(
        '/team/storage/move-to', { teamIndex },
      );
      if (res.success) {
        dispatch({ type: 'UPDATE_TEAM', team: res.team, storage: res.storage });
      }
      dispatch({ type: 'SET_NOTIFICATION', notification: res.message });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '移入仓库失败';
      dispatch({ type: 'SET_ERROR', error: msg });
    }
  }

  async function moveFromStorage(storageIndex: number) {
    try {
      const res = await api.post<{ success: boolean; message: string; team: PokemonData[]; storage: PokemonData[] }>(
        '/team/storage/move-from', { storageIndex },
      );
      if (res.success) {
        dispatch({ type: 'UPDATE_TEAM', team: res.team, storage: res.storage });
      }
      dispatch({ type: 'SET_NOTIFICATION', notification: res.message });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '从仓库取出失败';
      dispatch({ type: 'SET_ERROR', error: msg });
    }
  }

  async function useItem(itemIndex: number, pokemonIndex: number, isTeam: boolean) {
    try {
      const res = await api.post<{
        success: boolean; message: string; items: ItemData[]; team: PokemonData[];
      }>('/items/use', { itemIndex, pokemonIndex, isTeam });
      if (res.success) {
        dispatch({ type: 'UPDATE_ITEMS', items: res.items });
        dispatch({ type: 'UPDATE_TEAM', team: res.team, storage: [] });
        await fetchTeam();
      }
      dispatch({ type: 'SET_NOTIFICATION', notification: res.message });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '使用物品失败';
      dispatch({ type: 'SET_ERROR', error: msg });
    }
  }

  async function revivePokemon(itemIndex: number, pokemonIndex: number) {
    try {
      const res = await api.post<{
        success: boolean; message: string; items: ItemData[]; team: PokemonData[];
      }>('/items/revive', { itemIndex, pokemonIndex });
      if (res.success) {
        dispatch({ type: 'UPDATE_ITEMS', items: res.items });
        dispatch({ type: 'UPDATE_TEAM', team: res.team, storage: [] });
        await fetchTeam();
      }
      dispatch({ type: 'SET_NOTIFICATION', notification: res.message });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '复活失败';
      dispatch({ type: 'SET_ERROR', error: msg });
    }
  }

  return { fetchTeam, fetchItems, swapPokemon, moveToStorage, moveFromStorage, useItem, revivePokemon };
}
