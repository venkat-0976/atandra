import React, { useRef, useEffect } from 'react';

const STRAND_COLOR = 'rgba(80, 180, 255, 0.7)';
const RUNG_COLOR = 'rgba(120, 120, 255, 0.25)';
const DOT_COLOR = 'rgba(255,255,255,0.9)';
const STRAND_WIDTH = 3;
const RUNG_WIDTH = 2;
const DOT_RADIUS = 5;
const RUNG_COUNT = 24;
const DOT_COUNT = 12;
const ANIMATION_SPEED = 0.7; // radians per second

const DNABackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const scrollPhaseRef = useRef(0);

  // Update scroll phase on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Use scrollY for phase, scale for smoothness
      scrollPhaseRef.current = window.scrollY / 200; // Adjust denominator for speed
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Resize canvas
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime = performance.now();

    function drawDNA(time: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      // Diagonal vector from (pad, pad) to (w-pad, h-pad)
      const pad = Math.min(w, h) * 0.08;
      const x0 = pad, y0 = pad;
      const x1 = w - pad, y1 = h - pad;
      const helixLength = Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2);
      const amplitude = Math.min(w, h) * 0.13;
      const freq = 2.5; // number of helix turns
      // Calculate angle of diagonal
      const angle = Math.atan2(y1 - y0, x1 - x0);
      // Phase is based on scroll position
      const phase = scrollPhaseRef.current + ((time - startTime) / 1000) * ANIMATION_SPEED;

      // Helper to get point along diagonal
      const getPoint = (t: number, offset: number) => {
        // t: 0 (start) to 1 (end)
        // offset: perpendicular offset
        const baseX = x0 + t * (x1 - x0);
        const baseY = y0 + t * (y1 - y0);
        // Perpendicular direction
        const perpAngle = angle - Math.PI / 2;
        const x = baseX + offset * Math.cos(perpAngle);
        const y = baseY + offset * Math.sin(perpAngle);
        return { x, y };
      };

      // Draw rungs
      for (let i = 0; i < RUNG_COUNT; i++) {
        const t = i / (RUNG_COUNT - 1);
        const offset = amplitude * Math.sin(freq * Math.PI * t + phase);
        const p1 = getPoint(t, offset);
        const p2 = getPoint(t, -offset);
        ctx.save();
        ctx.strokeStyle = RUNG_COLOR;
        ctx.lineWidth = RUNG_WIDTH;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        ctx.restore();
      }

      // Draw strands
      for (let strand = 0; strand < 2; strand++) {
        ctx.save();
        ctx.strokeStyle = STRAND_COLOR;
        ctx.lineWidth = STRAND_WIDTH;
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
          const t = i / 100;
          const sign = strand === 0 ? 1 : -1;
          const offset = sign * amplitude * Math.sin(freq * Math.PI * t + phase);
          const { x, y } = getPoint(t, offset);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Draw moving dots on each strand
      for (let strand = 0; strand < 2; strand++) {
        for (let i = 0; i < DOT_COUNT; i++) {
          // Dots move along the strand, phase offset for animation
          const t = ((i / DOT_COUNT) + (phase / (2 * Math.PI))) % 1;
          const sign = strand === 0 ? 1 : -1;
          const offset = sign * amplitude * Math.sin(freq * Math.PI * t + phase);
          const { x, y } = getPoint(t, offset);
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI);
          ctx.fillStyle = DOT_COLOR;
          ctx.shadowColor = 'white';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.restore();
        }
      }
    }

    function animate(time: number) {
      drawDNA(time);
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  );
};

export default DNABackground; 