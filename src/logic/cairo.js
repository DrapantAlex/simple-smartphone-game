// Logica di Cairo: corre sempre davanti al corteo, che non lo raggiunge mai.

import { GY, JUMP_V, GRAVITY, MAX_FANS } from '../config.js';

export const CAIRO_MIN_X = 470; // il corteo (LEADX = 250) resta sempre ben dietro

export function createCairo() {
  return { x: 500, y: GY, vy: 0, time: 0 };
}

/**
 * @param crowdSize quanti tifosi ha il corteo: più è grande, più Cairo si allontana (è preoccupato!)
 * @param hurdlesAhead posizioni x di cose a terra che Cairo deve scavalcare
 */
export function updateCairo(c, dt, crowdSize, hurdlesAhead = []) {
  c.time += dt;
  const target = 490 + Math.min(crowdSize, MAX_FANS) * 1.6 + Math.sin(c.time * 1.3) * 14;
  c.x += (target - c.x) * Math.min(1, dt * 1.5);
  c.x = Math.max(CAIRO_MIN_X, c.x);
  const grounded = c.y >= GY - 0.5;
  if (grounded && hurdlesAhead.some((hx) => hx - c.x > 0 && hx - c.x < 30)) c.vy = JUMP_V * 0.9;
  c.vy += GRAVITY * dt;
  c.y += c.vy * dt;
  if (c.y > GY) { c.y = GY; c.vy = 0; }
}
