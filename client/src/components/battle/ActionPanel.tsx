import React from 'react';

export type SubAction = 'main' | 'move' | 'ball' | 'switch';

interface Props {
  onSelectAction: (actionType: number) => void;
  onSelectSub: (sub: SubAction) => void;
  currentSub: SubAction;
  disabled?: boolean;
  healCount: number;
  ballCount: number;
}

const ActionPanel: React.FC<Props> = ({ onSelectAction, onSelectSub, currentSub, disabled, healCount, ballCount }) => {
  if (currentSub !== 'main') return null;

  const actions = [
    { type: 1, label: '⚔️ 技能', desc: '使用技能攻击' },
    { type: 2, label: `🔵 精灵球 (${ballCount})`, desc: '捕捉野生宝可梦' },
    { type: 3, label: `💊 治疗 (${healCount})`, desc: '恢复HP' },
    { type: 4, label: '🔄 更换精灵', desc: '切换出战宝可梦' },
    { type: 5, label: '🏃 逃跑', desc: '尝试逃离战斗' },
  ];

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
      {actions.map(a => (
        <button
          key={a.type}
          disabled={disabled}
          onClick={() => {
            if (a.type === 1) onSelectSub('move');
            else if (a.type === 2) onSelectSub('ball');
            else if (a.type === 4) onSelectSub('switch');
            else onSelectAction(a.type);
          }}
          title={a.desc}
          style={{
            padding: '12px 20px', fontSize: 14, fontWeight: 'bold',
            borderRadius: 10, border: '1px solid #555',
            background: disabled ? '#222' : 'rgba(255,255,255,0.08)',
            color: disabled ? '#666' : '#FFF',
            cursor: disabled ? 'not-allowed' : 'pointer',
            minWidth: 100,
          }}
        >
          {a.label}
        </button>
      ))}
    </div>
  );
};

export default ActionPanel;
