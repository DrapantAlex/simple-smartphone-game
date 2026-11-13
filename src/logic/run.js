// Una "giornata": il mondo di gioco durante una corsa.
// Solo logica: la scena Phaser legge questi dati per disegnarli.
// (Passo 2b: qui arriveranno ostacoli, mezzi di fuga, fumogeno, missioni.)

import { W, GY, LEADX, START_FANS, PX_PER_M } from '../config.js';
import { SLOTS, createCrowd, createFan, addFan, requestJump, updateCrowd } from './crowd.js';
import { createCairo, updateCairo } from './cairo.js';
import { zoneIndexAt } from './zones.js';

const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const fanBox = (x, feetY) => ({ x: x - 8, y: feetY - 46, w: 16, h: 46 });

/**
 * @param opts.demo        true = corsa dimostrativa del menu (nessuno da raccogliere)
 * @param opts.startFans   tifosi iniziali
 * @param opts.makeLook    funzione che sceglie l'aspetto di un nuovo tifoso
 * @param opts.rng         generatore di numeri casuali (sostituibile nei test)
 */
export function createRun({ startMeters = 0, demo = false, startFans = START_FANS, makeLook = () => ({}), rng = Math.random } = {}) {
  const run = {
    demo, rng, makeLook,
    crowd: createCrowd(),
    cairo: createCairo(),
    pickups: [], // tifosi a bordo strada che aspettano di unirsi
    events: [], // cosa è successo in questo frame (per suoni e scritte)
    speed: 0, scroll: 0, meters: 0,
    zone: zoneIndexAt(startMeters), gap: 420, picked: 0,
  };
  run.scroll = startMeters * PX_PER_M; // per provare subito una zona lontana
  run.meters = startMeters;
  for (let i = 0; i < startFans; i++) addFan(run.crowd, createFan(LEADX + SLOTS[i].dx, makeLook()));
  return run;
}

export function jump(run) {
  if (requestJump(run.crowd, run.speed)) run.events.push({ type: 'jump' });
}

function spawnPickups(run) {
  const n = 1 + Math.floor(run.rng() * 3);
  for (let i = 0; i < n; i++) {
    run.pickups.push({ x: W + 30 + i * 24, look: run.makeLook() });
  }
  run.gap = (140 + run.rng() * 160) * (run.speed / 210);
}

export function updateRun(run, dt) {
  run.events.length = 0;
  run.speed = run.demo ? 150 : 210 + Math.min(170, run.meters * 0.07);
  run.scroll += run.speed * dt;
  if (!run.demo) run.meters = run.scroll / PX_PER_M;

  const z = zoneIndexAt(run.meters);
  if (z !== run.zone) { run.zone = z; run.events.push({ type: 'zone', index: z }); }

  if (!run.demo) {
    run.gap -= run.speed * dt;
    if (run.gap <= 0) spawnPickups(run);
  } else if (run.rng() < dt * 0.5) {
    jump(run); // nel menu il corteo salta da solo ogni tanto
  }

  for (const p of run.pickups) p.x -= run.speed * dt;
  run.pickups = run.pickups.filter((p) => p.x > -40);

  updateCrowd(run.crowd, dt);
  updateCairo(run.cairo, dt, run.crowd.fans.length, run.pickups.map((p) => p.x));

  // un tifoso del corteo tocca chi aspetta → si unisce
  for (let j = run.pickups.length - 1; j >= 0; j--) {
    const p = run.pickups[j];
    const touched = run.crowd.fans.some((f) => hit(fanBox(f.x, GY + f.oy + f.jy), fanBox(p.x, GY)));
    if (!touched) continue;
    run.pickups.splice(j, 1);
    run.picked++;
    const joined = addFan(run.crowd, createFan(p.x, p.look));
    run.events.push({ type: 'fanJoined', x: p.x, joined, look: p.look });
  }
}
