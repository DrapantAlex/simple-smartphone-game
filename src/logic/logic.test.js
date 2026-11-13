// Test automatici della logica: si lanciano con `npm test`.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SLOTS, createCrowd, createFan, addFan, requestJump, updateCrowd } from './crowd.js';
import { createCairo, updateCairo, CAIRO_MIN_X } from './cairo.js';
import { zoneIndexAt } from './zones.js';
import { LEADX, MAX_FANS } from '../config.js';

const run = (fn, seconds, dt = 1 / 60) => { for (let t = 0; t < seconds; t += dt) fn(dt); };

test('la piramide ha esattamente MAX_FANS posti', () => {
  assert.equal(SLOTS.length, MAX_FANS);
  assert.equal(SLOTS.filter((s) => s.row === 0).length, 8);
});

test('il corteo non supera MAX_FANS', () => {
  const c = createCrowd();
  for (let i = 0; i < 50; i++) addFan(c, createFan(LEADX));
  assert.equal(c.fans.length, MAX_FANS);
});

test("il salto è a onda: chi sta dietro salta dopo", () => {
  const c = createCrowd();
  for (let i = 0; i < 8; i++) addFan(c, createFan(LEADX + SLOTS[i].dx));
  assert.ok(requestJump(c, 200));
  updateCrowd(c, 1 / 60);
  assert.ok(c.fans[0].jy < 0, 'il capofila è già in aria');
  assert.equal(c.fans[7].jy, 0, "l'ultimo è ancora a terra");
  run((dt) => updateCrowd(c, dt), 0.7); // 126 px di ritardo a 200 px/s = 0,63 s
  assert.ok(c.fans[7].jy < 0, "poco dopo salta anche l'ultimo");
  run((dt) => updateCrowd(c, dt), 2);
  assert.ok(c.fans.every((f) => f.jy === 0), 'alla fine sono tutti di nuovo a terra');
});

test('non si può saltare se il capofila è in aria', () => {
  const c = createCrowd();
  addFan(c, createFan(LEADX));
  requestJump(c, 200);
  updateCrowd(c, 0.05);
  assert.equal(requestJump(c, 200), false);
});

test('Cairo resta sempre davanti al corteo', () => {
  const k = createCairo();
  for (const size of [0, 5, 36]) {
    run((dt) => updateCairo(k, dt, size), 5);
    assert.ok(k.x >= CAIRO_MIN_X && k.x > LEADX + 150);
  }
});

test('le zone cambiano ogni 600 m e si ripetono', () => {
  assert.deepEqual([0, 599, 600, 1200, 1800, 2400].map(zoneIndexAt), [0, 0, 1, 2, 3, 0]);
});

import { createRun, updateRun, jump } from './run.js';

test('in una giornata i tifosi raccolti fanno crescere il corteo', () => {
  let s = 1;
  const rng = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const r = createRun({ rng });
  const start = r.crowd.fans.length;
  run((dt) => updateRun(r, dt), 10);
  assert.ok(r.picked > 0, 'qualcuno è stato raccolto');
  assert.ok(r.crowd.fans.length > start);
  assert.ok(r.meters > 200 && r.meters < 300, `metri percorsi plausibili: ${r.meters}`);
  assert.ok(r.cairo.x > 400, 'Cairo è sempre davanti');
});

test('saltare produce un evento jump', () => {
  const r = createRun();
  updateRun(r, 1 / 60);
  jump(r);
  assert.deepEqual(r.events.at(-1), { type: 'jump' });
});
