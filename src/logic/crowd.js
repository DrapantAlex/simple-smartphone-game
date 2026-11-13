// Logica del corteo: posizioni a piramide e salto "a onda".
// Nessuna dipendenza da Phaser: qui ci sono solo numeri.

import { LEADX, JUMP_V, GRAVITY, MAX_FANS } from '../config.js';

/**
 * Posti della piramide. Riga 0 (a terra) ha 8 posti, poi 7, 6... fino a 1: 36 in tutto.
 * dx = distanza orizzontale dal capofila, dy = altezza (negativa = più in alto).
 */
export const SLOTS = (() => {
  const caps = [8, 7, 6, 5, 4, 3, 2, 1];
  const out = [];
  caps.forEach((n, row) => {
    for (let i = 0; i < n; i++) out.push({ dx: -i * 18 - row * 9, dy: -row * 28, row });
  });
  return out;
})();

/** Crea i dati di un tifoso. `look` descrive l'aspetto (lo usa solo la grafica). */
export function createFan(x, look = {}) {
  return { x, oy: 0, jy: 0, vy: 0, jumpQueue: [], look };
}

export function createCrowd() {
  return { fans: [], time: 0 };
}

/** Aggiunge un tifoso se c'è posto. Restituisce true se è stato aggiunto. */
export function addFan(crowd, fan) {
  if (crowd.fans.length >= MAX_FANS) return false;
  crowd.fans.push(fan);
  return true;
}

const onGround = (f) => f.jy >= -0.5;

/**
 * Salto a onda: ogni tifoso salta quando arriva nel punto in cui ha saltato il capofila.
 * Chi sta più indietro di `d` pixel salta dopo d/velocità secondi.
 */
export function requestJump(crowd, speed) {
  const lead = crowd.fans[0];
  if (!lead || !onGround(lead)) return false;
  for (const f of crowd.fans) {
    const delay = Math.max(0, LEADX - f.x) / Math.max(speed, 1);
    f.jumpQueue.push(crowd.time + delay);
  }
  return true;
}

export function updateCrowd(crowd, dt) {
  crowd.time += dt;
  crowd.fans.forEach((f, i) => {
    const slot = SLOTS[Math.min(i, SLOTS.length - 1)];
    // ogni tifoso scivola dolcemente verso il suo posto nella piramide
    f.x += (LEADX + slot.dx - f.x) * Math.min(1, dt * 5);
    f.oy += (slot.dy - f.oy) * Math.min(1, dt * 7);
    if (f.jumpQueue.length && crowd.time >= f.jumpQueue[0]) {
      f.jumpQueue.shift();
      if (onGround(f)) f.vy = JUMP_V;
    }
    f.vy += GRAVITY * dt;
    f.jy += f.vy * dt;
    if (f.jy > 0) { f.jy = 0; f.vy = 0; }
  });
}
