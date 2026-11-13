// Disegno di Cairo "a pezzi": corre con la ventiquattrore e il telefono all'orecchio.
// Nessun danno, nessun colpo: è sempre davanti e mai raggiunto.

import { RES } from '../config.js';

const S = 1 / RES;

export class CairoView {
  constructor(scene) {
    const part = (key, x, y, ox, oy) => scene.add.image(x, y, key).setScale(S).setOrigin(ox, oy);
    this.legBack = part('cairo-leg', 2, -14, 0.5, 0.05).setTint(0xbbbbbb);
    this.armCase = part('cairo-arm-case', 5, -29, 0.55, 0.08);
    this.torso = part('cairo-torso', 0, -12, 0.5, 1);
    this.legFront = part('cairo-leg', -2, -14, 0.5, 0.05);
    this.head = part('cairo-head', 1, -30, 0.5, 1);
    this.armPhone = part('cairo-arm-phone', -6, -27, 0.5, 0.92); // telefono all'orecchio
    this.container = scene.add.container(0, 0, [this.legBack, this.armCase, this.torso, this.legFront, this.head, this.armPhone]);
    this.y0 = { torso: this.torso.y, head: this.head.y, armCase: this.armCase.y, armPhone: this.armPhone.y };
  }

  update(x, y, t, inAir) {
    this.container.setPosition(x, y);
    const p = t * 13;
    const legA = inAir ? 0.5 : Math.sin(p) * 0.75;
    const bob = inAir ? 0 : -Math.abs(Math.cos(p)) * 1.5;
    this.legFront.rotation = legA;
    this.legBack.rotation = inAir ? -0.4 : -legA;
    this.armCase.rotation = Math.sin(p) * 0.35; // la valigetta oscilla
    this.torso.y = this.y0.torso + bob;
    this.head.y = this.y0.head + bob;
    this.head.rotation = -0.06 + Math.sin(p * 0.5) * 0.03;
    this.armCase.y = this.y0.armCase + bob;
    this.armPhone.y = this.y0.armPhone + bob;
  }

  setDepth(d) { this.container.setDepth(d); return this; }
}
