// Collega i dati della logica (run) ai disegni: corteo, Cairo, tifosi in attesa, ombre.

import { GY } from '../config.js';
import { SLOTS } from '../logic/crowd.js';
import { FanView } from './FanView.js';
import { CairoView } from './CairoView.js';

// Profondità di disegno (più alto = più davanti)
const DEPTH = { shadows: 5, pickups: 20, cairo: 30, crowdBase: 40 };

export class WorldRenderer {
  constructor(scene) {
    this.scene = scene;
    this.shadows = scene.add.graphics().setDepth(DEPTH.shadows);
    this.cairo = new CairoView(scene).setDepth(DEPTH.cairo);
    this.fanViews = new Map(); // dati del tifoso → disegno
    this.pickupViews = new Map();
  }

  viewFor(map, key, look, depth) {
    let v = map.get(key);
    if (!v) { v = new FanView(this.scene, look).setDepth(depth); map.set(key, v); }
    return v;
  }

  /** Elimina i disegni di chi non c'è più. */
  prune(map, alive) {
    for (const [key, v] of map) if (!alive.has(key)) { v.destroy(); map.delete(key); }
  }

  update(run) {
    const t = run.crowd.time;
    const fans = run.crowd.fans;
    this.shadows.clear();
    const shadow = (x, lift, size) => {
      const k = Math.max(0.4, 1 - lift / 160);
      this.shadows.fillStyle(0x000000, 0.2 * k).fillEllipse(x, GY + 1, size * k, size * 0.28 * k);
    };

    fans.forEach((f, i) => {
      const slot = SLOTS[Math.min(i, SLOTS.length - 1)];
      // chi è più in alto nella piramide sta dietro; chi è in testa sta davanti
      const v = this.viewFor(this.fanViews, f, f.look, DEPTH.crowdBase - slot.row * 2 + (slot.dx + 200) / 1000);
      v.update(f.x, GY + f.oy + f.jy, t, f.jy < -1 ? 'air' : 'run');
      if (slot.row === 0) shadow(f.x, -f.jy, 18);
    });
    this.prune(this.fanViews, new Set(fans));

    for (const p of run.pickups) {
      this.viewFor(this.pickupViews, p, p.look, DEPTH.pickups).update(p.x, GY, t, 'cheer');
      shadow(p.x, 0, 18);
    }
    this.prune(this.pickupViews, new Set(run.pickups));

    const c = run.cairo;
    this.cairo.update(c.x, c.y, t, c.y < GY - 1);
    shadow(c.x, GY - c.y, 22);
  }
}
