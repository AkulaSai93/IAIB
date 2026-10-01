"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive dot field: a grid of dots that lifts toward the cursor and
 * sends ripples out along the pointer's trail, each dot projected with a
 * little perspective so the lift reads as depth.
 *
 * Ported from the Figma Make source; sized to its own box rather than the
 * window, and idle while off-screen.
 */

const SPACING = 28;
const DOT_R = 1.6;
const WAVE_RADIUS = 160;
const WAVE_DEPTH = 18;
const WAVE_SPEED = 0.06;
const DECAY = 4.5;

type Ripple = { x: number; y: number; t: number };

export default function DotWave({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };
    let ripples: Ripple[] = [];
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      mouse.x = mx;
      mouse.y = my;
      if (reduced) return;
      ripples.push({ x: mx, y: my, t: 0 });
      if (ripples.length > 8) ripples.shift();
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;

      ctx.clearRect(0, 0, width, height);

      ripples = ripples
        .map((r) => ({ ...r, t: r.t + WAVE_SPEED }))
        .filter((r) => r.t < Math.PI * 2.5);

      const vx = width * 0.5;
      const vy = height * 0.5;

      for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
          const bx = col * SPACING;
          const by = row * SPACING;

          let dz = 0;
          let alpha = 0.18;

          // lift from the live cursor
          const dx0 = bx - mouse.x;
          const dy0 = by - mouse.y;
          const dist0 = Math.sqrt(dx0 * dx0 + dy0 * dy0);
          if (dist0 < WAVE_RADIUS) {
            const falloff = 1 - dist0 / WAVE_RADIUS;
            dz += falloff * WAVE_DEPTH;
            alpha = 0.18 + falloff * 0.7;
          }

          // expanding rings left along the trail
          for (const r of ripples) {
            const dx = bx - r.x;
            const dy = by - r.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const waveFront = r.t * 80;
            const band = 60;
            const diff = Math.abs(dist - waveFront);
            if (diff < band) {
              const env = (1 - diff / band) * Math.exp(-r.t / DECAY);
              dz += Math.sin(r.t * 6 - dist * 0.06) * WAVE_DEPTH * env;
              alpha = Math.max(alpha, 0.18 + env * 0.6);
            }
          }

          // perspective: lift both enlarges the dot and pushes it outward
          const perspective = 300;
          const scale = perspective / (perspective - dz);
          const r = DOT_R * scale;
          const px = bx + (bx - vx) * (scale - 1) * 0.08;
          const py = by + (by - vy) * (scale - 1) * 0.08;

          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.5, r), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,0,0,${Math.min(1, alpha)})`;
          ctx.fill();
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
