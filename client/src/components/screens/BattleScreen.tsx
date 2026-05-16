import React, { useState, useEffect } from 'react';
import { useGameState } from '../../store/game-context';
import { useBattle } from '../../hooks/useBattle';
import BattleHud from '../battle/BattleHud';
import BattleLog from '../battle/BattleLog';
import PokemonSprite from '../battle/PokemonSprite';
import ActionPanel, { SubAction } from '../battle/ActionPanel';
import MoveSelector from '../battle/MoveSelector';
import BallSelector from '../battle/BallSelector';
import SwitchSelector from '../battle/SwitchSelector';

const BattleScreen: React.FC = () => {
  const { state } = useGameState();
  const { submitAction } = useBattle();
  const [subAction, setSubAction] = useState<SubAction>('main');

  const battle = state.battle;
  if (!battle || !battle.inBattle) return null;

  const canAct = battle.playerTurn && !state.loading;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (subAction === 'main') {
        const nums: Record<string, [number, SubAction?]> = {
          '1': [1, 'move'], '2': [2, 'ball'], '3': [3], '4': [4, 'switch'], '5': [5],
        };
        const act = nums[e.key];
        if (act) {
          e.preventDefault();
          if (act[1]) setSubAction(act[1]);
          else submitAction(act[0]);
        }
      } else if (e.key === 'Escape') {
        setSubAction('main');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [subAction, submitAction]);

  const handleSubAction = (sub: SubAction) => setSubAction(sub);
  const handleBack = () => setSubAction('main');
  const handleSelectMove = (index: number) => { setSubAction('main'); submitAction(1, index); };
  const handleSelectBall = (index: number) => { setSubAction('main'); submitAction(2, index); };
  const handleSelectSwitch = (index: number) => { setSubAction('main'); submitAction(4, index); };

  const healCount = battle.healCount ?? 0;
  const ballCount = battle.ballCount ?? 0;
  const currentPokeIndex = battle.playerPokeIndex ?? 0;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 900,
      background: 'linear-gradient(180deg, #0a0a2e 0%, #1a1a3e 50%, #0a1a0a 100%)',
      color: '#FFF', fontFamily: '"Microsoft YaHei", "SimHei", sans-serif',
    }}>
      {/* 战斗场景 — 背景画布占满全屏 */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>

        {/* 场景层：左下角我方精灵 + 右上角敌方精灵 */}
        <div style={{ flex: 1, position: 'relative' }}>
          {/* 敌方精灵 — 右上角 */}
          <div style={{ position: 'absolute', top: 20, right: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <BattleHud
                name={battle.enemyPokeName} level={battle.enemyPokeLevel}
                hp={battle.enemyPokeHp} maxHp={battle.enemyPokeMaxHp} isEnemy
              />
            </div>
            <div style={{
              border: '3px solid #555', borderRadius: 16, overflow: 'hidden',
              background: 'rgba(244,67,54,0.06)',
            }}>
              <PokemonSprite species={battle.enemyPokeName} flipped size={280} />
            </div>
          </div>

          {/* 我方精灵 — 左下角 */}
          <div style={{ position: 'absolute', bottom: 20, left: 40, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              border: '3px solid #555', borderRadius: 16, overflow: 'hidden',
              background: 'rgba(76,175,80,0.06)',
            }}>
              <PokemonSprite species={battle.playerPokeName} size={280} />
            </div>
            <div>
              <BattleHud
                name={battle.playerPokeName} level={battle.playerPokeLevel}
                hp={battle.playerPokeHp} maxHp={battle.playerPokeMaxHp}
              />
            </div>
          </div>
        </div>

        {/* 回合指示 + 日志 + 操作区 */}
        <div style={{
          background: 'rgba(0,0,0,0.7)', padding: '12px 20px 16px',
          borderTop: '2px solid #333',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            {battle.playerTurn ? (
              <span style={{ color: '#64B5F6', fontSize: 16, fontWeight: 'bold' }}>👉 你的回合！选择行动：</span>
            ) : (
              <span style={{ color: '#F44336', fontSize: 16, fontWeight: 'bold' }}>⏳ 敌方回合...</span>
            )}
          </div>

          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <BattleLog log={battle.actionLog} />

            <div style={{ marginTop: 10, padding: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 12, border: '1px solid #333' }}>
              {subAction === 'main' && (
                <ActionPanel
                  onSelectAction={(type) => submitAction(type)}
                  onSelectSub={handleSubAction}
                  currentSub={subAction}
                  disabled={!canAct}
                  healCount={healCount}
                  ballCount={ballCount}
                />
              )}
              {subAction === 'move' && (
                <MoveSelector moves={battle.playerPokeMoves} onSelect={handleSelectMove} onBack={handleBack} />
              )}
              {subAction === 'ball' && (
                <BallSelector ballCounts={battle.ballCounts ?? [0, 0, 0, 0]} onSelect={handleSelectBall} onBack={handleBack} />
              )}
              {subAction === 'switch' && (
                <SwitchSelector team={battle.playerTeam} currentIndex={currentPokeIndex} onSelect={handleSelectSwitch} onBack={handleBack} />
              )}
            </div>

            <div style={{ textAlign: 'center', marginTop: 6, color: '#555', fontSize: 11 }}>
              快捷键: 1-5 选择行动 · Esc 返回
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleScreen;
