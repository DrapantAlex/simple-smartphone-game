// Disegno di un tifoso "a pezzi" (sezione 4.2 della guida).
// Riceve i dati dalla logica (posizione, salto) e muove testa, busto, braccia e gambe.

import Phaser from 'phaser';
import { RES } from '../config.js';
import { JEANS } from '../palette.js';

const S = 1 / RES;
// Le parti dietro sono un po' più scure: aiuta a dare volume (2.5D).
const darker = (c) => Phaser.Display.Color.IntegerToColor(c).darken(18).color;

export class FanView {
  constructor(scene, look) {
    this.look = look;
    const part = (key, x, y, ox, oy, tint) => {
      const img = scene.add.image(x, y, key).setScale(S).setOrigin(ox, oy);
      if (tint !== undefined) img.setTint(tint);
      return img;
    };
    // Coordinate rispetto ai piedi (0, 0). Ordine = dal fondo al primo piano.
    this.armBack = part('fan-arm', 3, -23, 0.5, 0.1, darker(look.skin));
    this.legBack = part('fan-leg', 2, -12, 0.5, 0.06, darker(JEANS));
    this.torso = part('fan-torso', 0, -10, 0.5, 1, look.shirt);
    this.legFront = part('fan-leg', -2, -12, 0.5, 0.06, JEANS);
    this.head = part('fan-head', 0, -24, 0.5, 1, look.skin);
    this.face = part('fan-face', 0, -24, 0.5, 1);
    this.hair = part('fan-hair', 0, -24, 0.5, 1, look.hair);
    this.cap = look.cap ? part('fan-cap', 0, -24, 0.5, 1, look.cap) : null;
    this.scarf = part('fan-scarf', 0, -24, 0.5, 0.5);
    this.armFront = part('fan-arm', -4, -23, 0.5, 0.1, look.skin);
    const parts = [this.armBack, this.legBack, this.torso, this.legFront, this.head, this.face, this.hair, this.cap, this.scarf, this.armFront];
    this.container = scene.add.container(0, 0, parts.filter(Boolean));
    this.body = [this.torso, this.armFront, this.armBack];
    this.headParts = [this.head, this.face, this.hair, this.cap, this.scarf].filter(Boolean);
    this.baseY = new Map([...this.body, ...this.headParts].map((img) => [img, img.y]));
  }

  /**
   * @param t      tempo in secondi
   * @param mode   'run' | 'air' | 'cheer' (fermo a braccia alzate, in attesa di unirsi)
   */
  update(x, y, t, mode = 'run') {
    this.container.setPosition(x, y);
    const p = t * 14 + this.look.phase;
    let legA = 0, armA = 0, bob = 0, headTilt = 0;
    if (mode === 'run') {
      legA = Math.sin(p) * 0.7;
      armA = -Math.sin(p) * 0.8;
      bob = -Math.abs(Math.cos(p)) * 1.5;
      headTilt = Math.sin(p) * 0.05;
    } else if (mode === 'air') {
      legA = 0.6;
      armA = -2.6; // braccia in alto mentre salta
    } else {
      armA = -2.8 + Math.sin(t * 8 + this.look.phase) * 0.3;
      bob = -Math.abs(Math.sin(t * 6 + this.look.phase)) * 2;
    }
    this.legFront.rotation = legA;
    this.legBack.rotation = mode === 'air' ? -0.3 : -legA;
    this.armFront.rotation = armA;
    this.armBack.rotation = mode === 'run' ? -armA : armA * 0.9;
    // busto e testa sobbalzano a ogni passo; la testa oscilla appena
    for (const img of this.body) img.y = this.baseY.get(img) + bob;
    for (const img of this.headParts) {
      img.y = this.baseY.get(img) + bob;
      if (img !== this.scarf) img.rotation = headTilt;
    }
  }

  setDepth(d) { this.container.setDepth(d); return this; }

  destroy() { this.container.destroy(); }
}
