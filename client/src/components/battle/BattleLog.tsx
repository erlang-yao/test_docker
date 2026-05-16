import React, { useRef, useEffect } from 'react';

interface Props {
  log: string[];
}

const BattleLog: React.FC<Props> = ({ log }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log.length]);

  return (
    <div style={{
      background: 'rgba(0,0,0,0.6)', borderRadius: 10, padding: 16,
      border: '1px solid #444', height: 160, overflowY: 'auto',
      fontSize: 14, lineHeight: 1.8, color: '#DDD',
    }}>
      {log.map((line, i) => {
        let color = '#DDD';
        if (line.includes('💥')) color = '#FF6B6B';
        else if (line.includes('❤️') || line.includes('恢复了')) color = '#4CAF50';
        else if (line.includes('🎉') || line.includes('成功')) color = '#FFD700';
        else if (line.includes('🔥')) color = '#FF9800';
        else if (line.includes('💨') || line.includes('🚫')) color = '#888';
        else if (line.includes('⚔️') || line.includes('===')) color = '#FFF';
        else if (line.includes('👉')) color = '#64B5F6';

        return (
          <div key={i} style={{ color }}>
            {line}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default BattleLog;
