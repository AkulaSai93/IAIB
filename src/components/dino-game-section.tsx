"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Playable Chrome-offline-style runner.
 *
 * Canvas + a fixed-timestep loop. Sprites are pixel maps baked once into
 * offscreen canvases, then blitted — so no per-frame rect churn.
 */

const CANVAS_H = 220;
const GROUND_Y = 176;
const DINO_PX = 3;
const CACTUS_PX = 3;
const DINO_X = 60;

const GRAVITY = 0.6;
const JUMP_V = -10.5;
const START_SPEED = 6;
const MAX_SPEED = 13;
const ACCEL = 0.0012;

const INK = "#535353";

const DINO_BODY = [
  "..............XXXXXXXXX.",
  ".............XXXXXXXXXXX",
  ".............XXXXXXXXXXX",
  ".............XXX.XXXXXXX",
  ".............XXXXXXXXXXX",
  ".............XXXXXXXXXXX",
  ".............XXXXXXX....",
  ".............XXXXXXXXX..",
  "X............XXXXXXXXXX.",
  "XX...........XXXXXXXXX..",
  "XXX..........XXXXXXXX...",
  "XXXX........XXXXXXXXX...",
  "XXXXX......XXXXXXXXXX...",
  "XXXXXX....XXXXXXXXXXX...",
  "XXXXXXXXXXXXXXXXXXXXX...",
  ".XXXXXXXXXXXXXXXXXXXX...",
  "..XXXXXXXXXXXXXXXXXX....",
  "...XXXXXXXXXXXXXXXX.....",
  "....XXXXXXXXXXXXXX......",
  ".....XXXXXXXXXXXX.......",
];
const LEGS_A = [
  "......XXX...XXXX........",
  "......XXX...XXXX........",
  "......XX....XXX.........",
  "......XX....XXX.........",
  "......XX................",
  "....XXXX................",
];
const LEGS_B = [
  "......XXX...XXXX........",
  "......XXX...XXXX........",
  "......XX....XXX.........",
  "............XXX.........",
  "............XXX.........",
  "..........XXXXX.........",
];
const CACTUS_TALL = [
  "...XX...",
  "...XX...",
  "X..XX...",
  "X..XX..X",
  "X..XX..X",
  "XX.XX..X",
  ".X.XX.XX",
  ".XXXX.X.",
  "...XXXX.",
  "...XX...",
  "...XX...",
  "...XX...",
  "...XX...",
];
const CACTUS_SMALL = [
  ".XX.",
  ".XX.",
  "X.XX",
  "XXXX",
  "..XX",
  "..XX",
  "..XX",
  "..XX",
];
const CLOUD = [
  ".....XXXXX....",
  "...XXXXXXXXX..",
  "..XXXXXXXXXXX.",
  "XXXXXXXXXXXXXX",
  "..XXXXXXXXX...",
];

function bake(map: string[], px: number, color = INK) {
  const c = document.createElement("canvas");
  c.width = map[0].length * px;
  c.height = map.length * px;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = color;
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === "X") ctx.fillRect(x * px, y * px, px, px);
    }
  });
  return c;
}

type Obstacle = { x: number; w: number; h: number; sprite: HTMLCanvasElement };
type Cloud = { x: number; y: number };
type Status = "idle" | "running" | "over";

export default function DinoGameSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  // The loop owns the real state; these mirror it for the overlay only.
  const statusRef = useRef<Status>("idle");
  const jumpRef = useRef(false);
  const restartRef = useRef(false);

  const press = useCallback(() => {
    if (statusRef.current === "over") restartRef.current = true;
    else jumpRef.current = true;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprites = {
      dinoA: bake([...DINO_BODY, ...LEGS_A], DINO_PX),
      dinoB: bake([...DINO_BODY, ...LEGS_B], DINO_PX),
      tall: bake(CACTUS_TALL, CACTUS_PX),
      small: bake(CACTUS_SMALL, CACTUS_PX),
      cloud: bake(CLOUD, 2, "#c4c4c4"),
    };
    const dinoW = sprites.dinoA.width;
    const dinoH = sprites.dinoA.height;

    let width = wrap.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      width = wrap.clientWidth;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(CANVAS_H * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${CANVAS_H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    // ---- game state ----
    let y = 0; // vertical offset above ground
    let vy = 0;
    let speed = START_SPEED;
    let obstacles: Obstacle[] = [];
    let clouds: Cloud[] = [
      { x: 300, y: 40 },
      { x: 700, y: 70 },
      { x: 1100, y: 50 },
    ];
    let groundOffset = 0;
    let nextSpawn = 600;
    let travelled = 0;
    let score = 0;
    let best = 0;
    try {
      best = Number(localStorage.getItem("iaib-dino-best") || 0) || 0;
    } catch {
      best = 0;
    }
    let legTimer = 0;
    let legFrame = 0;

    const reset = () => {
      y = 0;
      vy = 0;
      speed = START_SPEED;
      obstacles = [];
      travelled = 0;
      score = 0;
      nextSpawn = 600;
    };

    const spawn = () => {
      const tall = Math.random() > 0.45;
      const sprite = tall ? sprites.tall : sprites.small;
      const count = tall ? 1 : 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        obstacles.push({
          x: width + 20 + i * (sprite.width + 4),
          w: sprite.width,
          h: sprite.height,
          sprite,
        });
      }
      nextSpawn = 340 + Math.random() * 360;
    };

    const drawGround = () => {
      ctx.fillStyle = INK;
      ctx.fillRect(0, GROUND_Y, width, 2);
      // speckles, tied to distance so they scroll with the world
      const period = 130;
      for (let x = -(groundOffset % period); x < width; x += period) {
        ctx.globalAlpha = 0.45;
        ctx.fillRect(x + 20, GROUND_Y + 6, 8, 2);
        ctx.fillRect(x + 70, GROUND_Y + 9, 4, 2);
        ctx.globalAlpha = 1;
      }
    };

    const drawHud = () => {
      ctx.fillStyle = "#8a8a8a";
      ctx.font =
        "600 13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.textAlign = "right";
      const s = String(Math.floor(score)).padStart(5, "0");
      if (best > 0) {
        ctx.fillText(`HI ${String(best).padStart(5, "0")}  ${s}`, width - 16, 28);
      } else {
        ctx.fillText(s, width - 16, 28);
      }
      ctx.textAlign = "left";
    };

    let raf = 0;
    let last = performance.now();
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      // normalise to 60fps steps, clamped so a background tab can't teleport
      const dt = Math.min((now - last) / (1000 / 60), 3);
      last = now;
      if (!visible) return;

      const state = statusRef.current;

      if (restartRef.current) {
        restartRef.current = false;
        reset();
        statusRef.current = "running";
        setStatus("running");
      }

      if (jumpRef.current) {
        jumpRef.current = false;
        if (state === "idle") {
          statusRef.current = "running";
          setStatus("running");
        }
        if (y === 0 && statusRef.current === "running") vy = JUMP_V;
      }

      const live = statusRef.current;
      const moving = live !== "over";

      if (moving) {
        groundOffset += speed * dt;
        clouds.forEach((c) => (c.x -= speed * 0.28 * dt));
        clouds = clouds.filter((c) => c.x > -60);
        if (clouds.length < 3 && Math.random() < 0.006 * dt) {
          clouds.push({ x: width + 40, y: 30 + Math.random() * 55 });
        }
        legTimer += dt;
        if (legTimer > 6) {
          legTimer = 0;
          legFrame ^= 1;
        }
      }

      if (live === "running") {
        speed = Math.min(MAX_SPEED, speed + ACCEL * dt);
        travelled += speed * dt;
        score += 0.025 * speed * dt;

        vy += GRAVITY * dt;
        y += vy * dt;
        if (y > 0) {
          y = 0;
          vy = 0;
        }

        obstacles.forEach((o) => (o.x -= speed * dt));
        obstacles = obstacles.filter((o) => o.x + o.w > -10);

        nextSpawn -= speed * dt;
        if (nextSpawn <= 0) spawn();

        // collision, with a forgiving inset
        const dx = DINO_X + 8;
        const dy = GROUND_Y - dinoH + y + 6;
        const dw = dinoW - 18;
        const dh = dinoH - 10;
        for (const o of obstacles) {
          const ox = o.x + 2;
          const oy = GROUND_Y - o.h;
          const ow = o.w - 4;
          if (dx < ox + ow && dx + dw > ox && dy < oy + o.h && dy + dh > oy) {
            statusRef.current = "over";
            setStatus("over");
            const rounded = Math.floor(score);
            if (rounded > best) {
              best = rounded;
              try {
                localStorage.setItem("iaib-dino-best", String(best));
              } catch {
                /* private mode — high score just won't persist */
              }
            }
            break;
          }
        }
      }

      // ---- draw ----
      ctx.clearRect(0, 0, width, CANVAS_H);
      clouds.forEach((c) => ctx.drawImage(sprites.cloud, Math.round(c.x), c.y));
      drawGround();
      obstacles.forEach((o) =>
        ctx.drawImage(o.sprite, Math.round(o.x), GROUND_Y - o.h),
      );
      const airborne = y < 0;
      const dino =
        live === "over" || airborne
          ? sprites.dinoA
          : legFrame
            ? sprites.dinoB
            : sprites.dinoA;
      ctx.drawImage(dino, DINO_X, Math.round(GROUND_Y - dinoH + y));
      drawHud();

      if (live === "over") {
        ctx.fillStyle = "#535353";
        ctx.font = "700 16px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText("G A M E   O V E R", width / 2, 70);
        ctx.font = "500 12px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText("press space or tap to try again", width / 2, 92);
        ctx.textAlign = "left";
      }
    };

    raf = requestAnimationFrame(frame);

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        // only hijack the key once the player has engaged with the game
        if (statusRef.current !== "idle" || document.activeElement === canvas) {
          e.preventDefault();
          press();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [press]);

  return (
    <section
      id="dino"
      className="relative w-full overflow-hidden bg-canvas select-none"
    >
      <div ref={wrapRef} className="relative w-full" style={{ height: CANVAS_H }}>
        <canvas
          ref={canvasRef}
          tabIndex={0}
          role="img"
          aria-label="Playable dinosaur runner game. Press space or tap to jump."
          onPointerDown={(e) => {
            e.preventDefault();
            canvasRef.current?.focus();
            press();
          }}
          className="block cursor-pointer outline-none"
        />
        {status === "idle" && (
          <p className="pointer-events-none absolute inset-x-0 top-[26px] text-center font-display text-[13px] tracking-[-0.2px] text-[#8a8a8a]">
            Click or tap to play &middot;{" "}
            <span className="font-medium text-ink">space</span> to jump
          </p>
        )}
      </div>
    </section>
  );
}
