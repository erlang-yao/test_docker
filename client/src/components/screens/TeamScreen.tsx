import React, { useEffect, useState } from 'react';
import { useGameState } from '../../store/game-context';
import { useTeam } from '../../hooks/useTeam';
import Modal from '../ui/Modal';
import TeamRoster from '../team/TeamRoster';
import StorageView from '../team/StorageView';
import ItemInventory from '../team/ItemInventory';

type Tab = 'team' | 'storage' | 'items';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const TeamScreen: React.FC<Props> = ({ visible, onClose }) => {
  const { state } = useGameState();
  const { fetchTeam, fetchItems, swapPokemon, moveToStorage, moveFromStorage, useItem, revivePokemon } = useTeam();
  const [tab, setTab] = useState<Tab>('team');
  const [selectedPoke, setSelectedPoke] = useState<number | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selItem, setSelItem] = useState<number | null>(null);

  useEffect(() => {
    if (visible) {
      fetchTeam();
      fetchItems();
    }
  }, [visible]);

  const handleSwap = () => {
    if (selectedPoke != null && selectedStorage == null && state.team.length >= 2) {
      // 两个队伍精灵交换：绑定第二次点击
      // 简单实现：点击第一个选中，再点击同一个 tab 内精灵时交换
    }
  };

  const handleTeamPokeClick = (index: number) => {
    if (selItem != null) {
      const item = state.items[selItem];
      if (item.isRevive) {
        revivePokemon(selItem, index);
      } else {
        useItem(selItem, index, true);
      }
      setSelItem(null);
      return;
    }
    if (selectedPoke == null) {
      setSelectedPoke(index);
      setSelectedStorage(null);
    } else if (selectedPoke !== index) {
      swapPokemon(selectedPoke, index);
      setSelectedPoke(null);
    } else {
      setSelectedPoke(null);
    }
  };

  const handleStorageClick = (index: number) => {
    if (selectedPoke != null) {
      moveToStorage(selectedPoke);
      setSelectedPoke(null);
    } else {
      moveFromStorage(index);
    }
  };

  const handleUseItem = (itemIndex: number) => {
    const item = state.items[itemIndex];
    if (!item || item.count <= 0) return;
    if (item.isRevive) {
      setSelItem(itemIndex);
      setTab('team');
    } else {
      setSelItem(itemIndex);
      setTab('team');
    }
  };

  return (
    <Modal visible={visible} title="队伍管理" onClose={onClose} width={650}>
      {/* 标签页 */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, borderBottom: '1px solid #333', paddingBottom: 8 }}>
        {([
          ['team', '👥 队伍'],
          ['storage', '📦 仓库'],
          ['items', '🎒 物品'],
        ] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => { setTab(t); setSelectedPoke(null); setSelectedStorage(null); setSelItem(null); }}
            style={{
              padding: '8px 20px', borderRadius: '8px 8px 0 0', border: 'none',
              background: tab === t ? 'rgba(255,215,0,0.12)' : 'transparent',
              color: tab === t ? '#FFD700' : '#888',
              fontWeight: 'bold', cursor: 'pointer', fontSize: 14,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 提示信息 */}
      {selItem != null && (
        <div style={{
          padding: '8px 14px', marginBottom: 12, borderRadius: 8,
          background: 'rgba(255,215,0,0.1)', color: '#FFD700', fontSize: 13,
          border: '1px solid rgba(255,215,0,0.3)',
        }}>
          请点击要{state.items[selItem]?.isRevive ? '复活' : '使用物品'}的目标精灵
          <button onClick={() => setSelItem(null)} style={{
            marginLeft: 12, padding: '2px 8px', borderRadius: 4,
            border: '1px solid #555', background: 'none', color: '#999',
            cursor: 'pointer', fontSize: 11,
          }}>
            取消
          </button>
        </div>
      )}

      {selectedPoke != null && tab === 'team' && selItem == null && (
        <div style={{
          padding: '8px 14px', marginBottom: 12, borderRadius: 8,
          background: 'rgba(100,180,255,0.1)', color: '#64B5F6', fontSize: 13,
          border: '1px solid rgba(100,180,255,0.3)',
        }}>
          已选中 {state.team[selectedPoke]?.name} — 点击另一精灵交换位置，或切换到仓库标签移入仓库
          <button onClick={() => setSelectedPoke(null)} style={{
            marginLeft: 12, padding: '2px 8px', borderRadius: 4,
            border: '1px solid #555', background: 'none', color: '#999',
            cursor: 'pointer', fontSize: 11,
          }}>
            取消
          </button>
        </div>
      )}

      {/* 内容 */}
      {tab === 'team' && (
        <TeamRoster
          team={state.team}
          onPokemonClick={handleTeamPokeClick}
          selectedIndex={selectedPoke ?? undefined}
        />
      )}
      {tab === 'storage' && (
        <StorageView
          storage={state.storage}
          onPokemonClick={handleStorageClick}
          selectedIndex={selectedStorage ?? undefined}
        />
      )}
      {tab === 'items' && (
        <ItemInventory
          items={state.items}
          onUseItem={handleUseItem}
        />
      )}
    </Modal>
  );
};

export default TeamScreen;
