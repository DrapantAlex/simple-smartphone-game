// Menu: titolo e corteo dimostrativo che corre. Un tocco avvia la giornata.

import Phaser from 'phaser';
import { W, GY } from '../config.js';
import { C } from '../palette.js';
import { createRun, updateRun } from '../logic/run.js';
import { setupCamera, label } from '../views/helpers.js';
import { randomLook } from '../views/look.js';
import { Background } from '../views/Background.js';
import { WorldRenderer } from '../views/WorldRenderer.js';

export class MenuScene extends Phaser.Scene {
  constructor() { super('menu'); }

  create() {
    setupCamera(this);
    this.run = createRun({ demo: true, startFans: 14, makeLook: () => randomLook() });
    this.bg = new Background(this);
    this.bg.showZone(0, true);
    this.world = new WorldRenderer(this);

    const title = label(this, W / 2, 70, 'CAIRO VATTENE!', { font: 'banner', size: 46, color: C.panna, stroke: C.granata, strokeWidth: 4 }).setDepth(100).setAngle(-2);
    this.tweens.add({ targets: title, scale: 1.05, yoyo: true, repeat: -1, duration: 700, ease: 'Sine.inOut' });
    const tap = label(this, W / 2, 128, 'TOCCA PER INIZIARE', { size: 20 }).setDepth(100);
    this.tweens.add({ targets: tap, alpha: 0.3, yoyo: true, repeat: -1, duration: 600 });
    label(this, W / 2, GY + 44, 'Gioco satirico amatoriale · nessuna affiliazione con il Torino FC', { size: 10, color: C.panna, strokeWidth: 1 }).setDepth(100);

    const start = () => this.scene.start('game');
    this.input.once('pointerdown', start);
    this.input.keyboard.once('keydown-SPACE', start);
    this.input.keyboard.once('keydown-ENTER', start);
  }

  update(_, deltaMs) {
    const dt = Math.min(deltaMs / 1000, 1 / 20);
    updateRun(this.run, dt);
    this.bg.update(this.run.scroll);
    this.world.update(this.run);
  }
}
