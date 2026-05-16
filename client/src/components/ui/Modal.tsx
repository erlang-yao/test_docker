import React from 'react';

interface Props {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
}

const Modal: React.FC<Props> = ({ visible, title, onClose, children, width = 600 }) => {
  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }} onClick={onClose}>
      <div style={{
        background: '#1a1a2e', borderRadius: 12, width,
        maxHeight: '80vh', overflow: 'auto', padding: 20,
        border: '2px solid #444',
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: 16,
          borderBottom: '1px solid #333', paddingBottom: 10,
        }}>
          <h2 style={{ margin: 0, color: '#FFD700', fontSize: 20 }}>{title}</h2>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', color: '#999',
            fontSize: 24, cursor: 'pointer',
          }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
