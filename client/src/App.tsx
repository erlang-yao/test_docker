import React, { useEffect } from 'react';
import { useGameState } from './store/game-context';
import StartScreen from './components/screens/StartScreen';
import GameScreen from './components/screens/GameScreen';
import BattleScreen from './components/screens/BattleScreen';

const App: React.FC = () => {
  const { state, dispatch } = useGameState();

  // 清除通知
  useEffect(() => {
    if (state.notification) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_NOTIFICATION', notification: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.notification, dispatch]);

  // 清除错误
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_ERROR', error: null });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.error, dispatch]);

  return (
    <div style={{ width: '100vw', minHeight: '100vh', background: '#0a0a1a' }}>
      {state.screen === 'start' && <StartScreen />}
      {state.screen === 'game' && <GameScreen />}
      {state.screen === 'battle' && (
        <>
          <GameScreen />
          <BattleScreen />
        </>
      )}

      {/* 全局加载遮罩 */}
      {state.loading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          height: 3, background: '#FFD700', zIndex: 2000,
          animation: 'loadingBar 1s infinite',
        }} />
      )}

      {/* 全局错误提示 */}
      {state.error && (
        <div style={{
          position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(244,67,54,0.95)', color: '#FFF',
          padding: '12px 24px', borderRadius: 10, fontSize: 14,
          zIndex: 2000, maxWidth: 500, textAlign: 'center',
        }}>
          {state.error}
        </div>
      )}
    </div>
  );
};

export default App;
