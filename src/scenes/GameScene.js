// La partita ("giornata"). Per ora (passo 2a): corsa, salto a onda, raccolta tifosi, zone.

import Phaser from 'phaser';
import { W, MAX_FANS } from '../config.js';
import { C } from '../palette.js';
import { createRun, updateRun, jump } from '../logic/run.js';
import { ZONES } from '../logic/zones.js';
import { setupCamera, label } from '../views/helpers.js';
import { randomLook } from '../views/look.js';
import { Background } from '../views/Background.js';
import { WorldRenderer } from '../views/WorldRenderer.js';

export class GameScene extends Phaser.Scene {
  constructor() { super('game'); }

  create() {
    setupCamera(this);
    // Prova: apri il gioco con ?metri=1300 per partire direttamente da quel punto.
    const startMeters = Number(new URLSearchParams(location.search).get('metri')) || 0;
    this.run = createRun({ startMeters, makeLook: () => randomLook() });
    this.bg = new Background(this);
    this.bg.showZone(this.run.zone, true);
    this.world = new WorldRenderer(this);

    // HUD
    this.metersText = label(this, 14, 16, '0 m', { size: 20 }).setOrigin(0, 0.5).setDepth(100);
    this.fansText = label(this, 14, 40, '', { size: 14, color: C.panna }).setOrigin(0, 0.5).setDepth(100);
    const exit = label(this, W - 18, 18, '✕', { size: 20, color: C.panna }).setDepth(100).setInteractive({ useHandCursor: true });
    exit.on('pointerdown', (pointer, x, y, event) => { event.stopPropagation(); this.scene.start('menu'); });

    // Input: tocco ovunque o spazio/freccia su = salto
    this.input.on('pointerdown', () => jump(this.run));
    this.input.keyboard.on('keydown-SPACE', () => jump(this.run));
    this.input.keyboard.on('keydown-UP', () => jump(this.run));
    this.input.keyboard.on('keydown-ESC', () => this.scene.start('menu'));
  }

  showBanner(text) {
    const b = label(this, W / 2, 90, text, { font: 'banner', size: 30, color: C.panna, stroke: C.granata, strokeWidth: 3 })
      .setDepth(100).setScale(0.4).setAngle(-2);
    this.tweens.add({ targets: b, scale: 1, duration: 300, ease: 'Back.out' });
    this.tweens.add({ targets: b, alpha: 0, delay: 1700, duration: 400, onComplete: () => b.destroy() });
  }

  floatText(x, y, text) {
    const t = label(this, x, y, text, { size: 16, color: C.panna }).setDepth(90);
    this.tweens.add({ targets: t, y: y - 30, alpha: 0, duration: 900, onComplete: () => t.destroy() });
  }

  update(_, deltaMs) {
    const dt = Math.min(deltaMs / 1000, 1 / 20); // limite: niente salti enormi se il telefono rallenta
    const run = this.run;
    updateRun(run, dt);

    for (const e of run.events) {
      if (e.type === 'zone') { this.bg.showZone(e.index); if (run.meters > 5) this.showBanner(ZONES[e.index].name); }
      if (e.type === 'fanJoined') this.floatText(e.x, 230, '+1');
    }

    this.bg.update(run.scroll);
    this.world.update(run);
    this.metersText.setText(`${Math.floor(run.meters)} m`);
    this.fansText.setText(`TIFOSI ${run.crowd.fans.length}/${MAX_FANS}`);
  }
}
