import React, { useRef, useEffect, useCallback } from 'react';
import { MapLocation } from '../../types';
import {
  drawBackground, drawPaths, drawLocationNode, drawPlayerMarker,
} from '../../utils/canvas-draw';
import { CANVAS_WIDTH, CANVAS_HEIGHT, getDirectionFromClick } from '../../utils/map-layout';

interface Props {
  locations: MapLocation[];
  currentLocationIndex: number;
  onMove: (direction: string) => void;
}

const MapCanvas: React.FC<Props> = ({ locations, currentLocationIndex, onMove }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const time = Date.now();
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBackground(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawPaths(ctx, locations, currentLocationIndex);

    for (const loc of locations) {
      drawLocationNode(ctx, loc, loc.index === currentLocationIndex, time);
    }

    drawPlayerMarker(ctx, currentLocationIndex);
  }, [locations, currentLocationIndex]);

  useEffect(() => {
    let running = true;
    const loop = () => {
      if (!running) return;
      draw();
      animRef.current = requestAnimationFrame(loop);
    };
    loop();
    return () => { running = false; cancelAnimationFrame(animRef.current); };
  }, [draw]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const scaleY = CANVAS_HEIGHT / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const current = locations.find(l => l.index === currentLocationIndex);
    if (!current) return;

    for (const conn of current.connections) {
      const dir = getDirectionFromClick(x, y, currentLocationIndex, conn.toIndex);
      if (dir) {
        onMove(dir);
        return;
      }
    }
  }, [locations, currentLocationIndex, onMove]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      onClick={handleClick}
      style={{
        width: '100%', maxWidth: CANVAS_WIDTH,
        height: 'auto', aspectRatio: `${CANVAS_WIDTH}/${CANVAS_HEIGHT}`,
        borderRadius: 8, cursor: 'pointer',
        border: '2px solid #333',
      }}
    />
  );
};

export default MapCanvas;
