import React from 'react';
import { ItemData } from '../../types';

interface Props {
  items: ItemData[];
  onUseItem: (itemIndex: number) => void;
}

const ItemInventory: React.FC<Props> = ({ items, onUseItem }) => {
  return (
    <div>
      <h4 style={{ color: '#CCC', marginTop: 0, marginBottom: 8 }}>🎒 物品</h4>
      {items.length === 0 ? (
        <div style={{ color: '#666', fontSize: 14 }}>没有任何物品</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 14px', background: 'rgba(255,255,255,0.04)',
              borderRadius: 8, border: '1px solid #333',
            }}>
              <div>
                <div style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>
                  {item.name}
                </div>
                <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>
                  {item.healPercent > 0 && `恢复 ${item.healPercent}% HP`}
                  {item.expAmount > 0 && `获得 ${item.expAmount} EXP`}
                  {item.isRevive && '复活阵亡宝可梦'}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  color: item.count > 0 ? '#FFD700' : '#F44336',
                  fontWeight: 'bold', fontSize: 16,
                }}>
                  x{item.count}
                </span>
                <button
                  disabled={item.count <= 0}
                  onClick={() => onUseItem(i)}
                  style={{
                    padding: '6px 14px', borderRadius: 6,
                    border: '1px solid #555', fontSize: 12,
                    background: item.count > 0 ? 'rgba(255,255,255,0.08)' : '#222',
                    color: item.count > 0 ? '#FFF' : '#666',
                    cursor: item.count > 0 ? 'pointer' : 'not-allowed',
                  }}
                >
                  使用
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemInventory;
