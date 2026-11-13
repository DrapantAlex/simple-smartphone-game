// Carica tutti gli asset grafici e prepara i cieli delle zone.

import Phaser from 'phaser';
import { W, H, RES } from '../config.js';
import { C, SKY } from '../palette.js';
import { ZONES } from '../logic/zones.js';
import { setupCamera } from '../views/helpers.js';

// chiave della texture → file in public/assets/
const SPRITES = {
  'fan-head': 'sprites/tifoso/head.svg',
  'fan-face': 'sprites/tifoso/face.svg',
  'fan-hair': 'sprites/tifoso/hair.svg',
  'fan-cap': 'sprites/tifoso/cap.svg',
  'fan-torso': 'sprites/tifoso/torso.svg',
  'fan-scarf': 'sprites/tifoso/scarf.svg',
  'fan-arm': 'sprites/tifoso/arm.svg',
  'fan-leg': 'sprites/tifoso/leg.svg',
  'cairo-head': 'sprites/cairo/head.svg',
  'cairo-torso': 'sprites/cairo/torso.svg',
  'cairo-leg': 'sprites/cairo/leg.svg',
  'cairo-arm-case': 'sprites/cairo/arm-case.svg',
  'cairo-arm-phone': 'sprites/cairo/arm-phone.svg',
};

export class BootScene extends Phaser.Scene {
  constructor() { super('boot'); }

  preload() {
    setupCamera(this);
    const bar = this.add.rectangle(W / 2 - 100, H / 2, 0, 10, Phaser.Display.Color.HexStringToColor(C.granataLuce).color).setOrigin(0, 0.5);
    this.add.rectangle(W / 2, H / 2, 204, 14).setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(C.panna).color);
    this.load.on('progress', (v) => { bar.width = 200 * v; });

    this.load.setPath('assets/');
    // scale: RES → le texture sono più grandi della misura logica, così restano nitide
    for (const [key, file] of Object.entries(SPRITES)) this.load.svg(key, file, { scale: RES });
    for (const { id } of ZONES) {
      for (const layer of ['far', 'mid', 'ground']) {
        this.load.svg(`bg-${id}-${layer}`, `backgrounds/${id}/${layer}.svg`, { scale: RES });
      }
    }
  }

  create() {
    // Il cielo è un gradiente (unico caso in cui la guida li ammette, insieme a fumo e luci).
    for (const { id } of ZONES) {
      const [top, bottom] = SKY[id];
      const tex = this.textures.createCanvas(`sky-${id}`, 4, 256);
      const ctx = tex.getContext();
      const g = ctx.createLinearGradient(0, 0, 0, 256);
      g.addColorStop(0, top);
      g.addColorStop(1, bottom);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 4, 256);
      tex.refresh();
    }
    this.scene.start('menu');
  }
}
