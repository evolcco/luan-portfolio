"use client";

import { useEffect, useRef } from "react";
import styles from "./TetrisFooter.module.css";

type Piece = { m: number[][]; x: number; y: number };

/**
 * L-Tetris played on the background grid cells (piece = 1 cell). Mouse positions,
 * click rotates, hold soft-drops. On game over the footer flips dark ↔ light — the
 * contact type stays readable because it's mix-blend inverted.
 */
export function TetrisFooter() {
  const footRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const foot = footRef.current;
    const canvas = canvasRef.current;
    const scoreEl = scoreRef.current;
    const btn = btnRef.current;
    if (!foot || !canvas || !scoreEl || !btn) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SH: Record<string, number[][]> = {
      L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
      J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
    };
    const rot = (m: number[][]) => {
      const n = m.length;
      const r: number[][] = [];
      for (let i = 0; i < n; i++) {
        r[i] = [];
        for (let j = 0; j < n; j++) r[i][j] = m[n - 1 - j][i];
      }
      return r;
    };

    let GCOLS = 12;
    let GROWS = 8;
    let board: number[][] = [];
    let piece: Piece | null = null;
    let running = false;
    let soft = false;
    let last = 0;
    let acc = 0;
    let score = 0;
    let downT = 0;
    let over = 0;
    let raf = 0;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    const dropMs = 560;

    const cellPx = () => {
      const root = document.documentElement;
      const v = parseFloat(getComputedStyle(root).getPropertyValue("--cell"));
      if (v) return v;
      const cols = parseFloat(getComputedStyle(root).getPropertyValue("--cols")) || 12;
      return root.clientWidth / cols;
    };
    const newBoard = () => {
      board = [];
      for (let y = 0; y < GROWS; y++) {
        board[y] = [];
        for (let x = 0; x < GCOLS; x++) board[y][x] = 0;
      }
    };
    const pick = (): Piece => {
      const k = Math.random() < 0.5 ? "L" : "J";
      return { m: SH[k].map((r) => r.slice()), x: Math.floor(GCOLS / 2) - 1, y: 0 };
    };
    const hit = (m: number[][], px: number, py: number) => {
      for (let i = 0; i < m.length; i++)
        for (let j = 0; j < m[i].length; j++) {
          if (m[i][j]) {
            const bx = px + j;
            const by = py + i;
            if (bx < 0 || bx >= GCOLS || by >= GROWS) return true;
            if (by >= 0 && board[by][bx]) return true;
          }
        }
      return false;
    };
    const setScore = () => {
      scoreEl.textContent = String(score).padStart(3, "0");
    };
    const clearLines = () => {
      let n = 0;
      for (let y = GROWS - 1; y >= 0; y--) {
        let full = true;
        for (let x = 0; x < GCOLS; x++)
          if (!board[y][x]) {
            full = false;
            break;
          }
        if (full) {
          board.splice(y, 1);
          board.unshift(new Array(GCOLS).fill(0));
          n++;
          y++;
        }
      }
      if (n) {
        score += n;
        setScore();
      }
    };
    const spawn = () => {
      piece = pick();
      if (hit(piece.m, piece.x, piece.y)) {
        over = 8;
        newBoard();
        score = 0;
        setScore();
      }
    };
    const lock = () => {
      if (!piece) return;
      for (let i = 0; i < piece.m.length; i++)
        for (let j = 0; j < piece.m[i].length; j++) {
          if (piece.m[i][j]) {
            const by = piece.y + i;
            const bx = piece.x + j;
            if (by >= 0) board[by][bx] = 1;
          }
        }
      clearLines();
      spawn();
    };
    const ghostY = () => {
      if (!piece) return 0;
      let g = piece.y;
      while (!hit(piece.m, piece.x, g + 1)) g++;
      return g;
    };

    const sizeGame = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * d;
      canvas.height = r.height * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      const CELL = cellPx();
      GCOLS = Math.max(4, Math.round(r.width / CELL));
      GROWS = Math.max(4, Math.round(r.height / CELL));
      if (!board.length || board.length !== GROWS || board[0].length !== GCOLS) newBoard();
      draw();
    };

    const draw = () => {
      const r = canvas.getBoundingClientRect();
      const w = r.width;
      const h = r.height;
      const cw = w / GCOLS;
      const ch = h / GROWS;
      ctx.clearRect(0, 0, w, h);
      const lit = foot.classList.contains(styles.lit);
      const fill = lit ? "#0b0c0e" : "#f5f4f1";
      ctx.fillStyle = fill;
      for (let y = 0; y < GROWS; y++)
        for (let x = 0; x < GCOLS; x++) {
          if (board[y][x]) ctx.fillRect(x * cw + 1, y * ch + 1, cw - 2, ch - 2);
        }
      if (piece) {
        const gy = ghostY();
        ctx.strokeStyle = lit ? "rgba(11,12,14,.35)" : "rgba(245,244,241,.35)";
        ctx.lineWidth = 1;
        for (let i = 0; i < piece.m.length; i++)
          for (let j = 0; j < piece.m[i].length; j++) {
            if (piece.m[i][j])
              ctx.strokeRect((piece.x + j) * cw + 1.5, (gy + i) * ch + 1.5, cw - 3, ch - 3);
          }
        ctx.fillStyle = fill;
        for (let a = 0; a < piece.m.length; a++)
          for (let b = 0; b < piece.m[a].length; b++) {
            if (piece.m[a][b]) {
              const by = piece.y + a;
              if (by >= 0) ctx.fillRect((piece.x + b) * cw + 1, by * ch + 1, cw - 2, ch - 2);
            }
          }
      }
    };

    const step = (ts: number) => {
      if (!running) return;
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;
      acc += dt;
      if (over > 0) {
        if (Math.floor(ts / 220) % 2 === 0) foot.classList.add(styles.lit);
        else foot.classList.remove(styles.lit);
        over -= dt / 220;
        if (over <= 0) foot.classList.remove(styles.lit);
      }
      if (acc >= (soft ? 45 : dropMs)) {
        acc = 0;
        if (piece) {
          if (!hit(piece.m, piece.x, piece.y + 1)) piece.y++;
          else lock();
        }
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const startGame = () => {
      if (running) return;
      sizeGame();
      newBoard();
      score = 0;
      setScore();
      spawn();
      running = true;
      last = 0;
      acc = 0;
      btn.style.opacity = "0.35";
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      if (!running || !piece) return;
      const r = canvas.getBoundingClientRect();
      const col = Math.floor((e.clientX - r.left) / (r.width / GCOLS));
      const t = col - 1;
      const dir = t > piece.x ? 1 : -1;
      let g = 0;
      while (piece.x !== t && !hit(piece.m, piece.x + dir, piece.y) && g++ < GCOLS) piece.x += dir;
    };
    const onDown = (e: MouseEvent) => {
      if (!running) return;
      e.preventDefault();
      downT = performance.now();
      clearTimeout(holdTimer);
      holdTimer = setTimeout(() => {
        soft = true;
      }, 180);
    };
    const onUp = () => {
      if (!running) return;
      clearTimeout(holdTimer);
      soft = false;
      if (performance.now() - downT < 180 && piece) {
        const nm = rot(piece.m);
        const kicks = [0, -1, 1, -2, 2];
        for (const k of kicks) {
          if (!hit(nm, piece.x + k, piece.y)) {
            piece.m = nm;
            piece.x += k;
            break;
          }
        }
      }
    };
    const onCtx = (e: Event) => e.preventDefault();
    const onPlay = (e: Event) => {
      e.stopPropagation();
      startGame();
    };
    let ro2: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(ro2);
      ro2 = setTimeout(sizeGame, 150);
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("contextmenu", onCtx);
    btn.addEventListener("click", onPlay);
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(() => sizeGame());
    ro.observe(canvas);
    sizeGame();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
      clearTimeout(ro2);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("contextmenu", onCtx);
      btn.removeEventListener("click", onPlay);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={footRef} className={styles.foot} id="footer">
      <canvas ref={canvasRef} className={styles.game} />
      <div className={styles.over}>
        <div className={styles.top}>
          <div className={styles.head}>
            <div className={`mono blend ${styles.k}`}>Footer / Easter egg</div>
            <div className={`mono blend ${styles.hud}`}>
              <b ref={scoreRef}>000</b> linhas
            </div>
          </div>
          <h2 className={`blend ${styles.fh}`}>
            Feito de <span>L</span>s.
          </h2>
          <p className={`mono blend ${styles.fp}`}>
            Peças L (de Luan) girando, do tamanho das células do fundo. Mouse
            posiciona · clique gira · segure desce. Ao perder, o footer pisca.
          </p>
          <div className={styles.playwrap}>
            <button ref={btnRef} type="button" className={styles.play}>
              Jogar / Play
            </button>
          </div>
        </div>
        <div className={`blend ${styles.contact}`}>
          <a className={styles.mail} href="mailto:contato@luanandrade.me">
            contato@luanandrade.me
          </a>
          <div className={`mono ${styles.links}`}>
            <a href="/trabalho">Trabalho — Work</a>
            <a href="#">Sobre — About</a>
            <a href="#">LinkedIn ↗</a>
            <a href="#">Instagram ↗</a>
          </div>
          <div className={`mono ${styles.copy}`}>© 2026 — Luan Andrade</div>
        </div>
      </div>
    </section>
  );
}
