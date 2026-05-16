import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { GameState, GameAction } from '../types';
import { gameReducer, initialState } from './game-reducer';

const GameContext = createContext<{ state: GameState; dispatch: Dispatch<GameAction> }>({
  state: initialState,
  dispatch: () => {},
});

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameContext);
}
