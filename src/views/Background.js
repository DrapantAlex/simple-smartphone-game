// Sfondo a strati (parallasse) per le 4 zone: sezione 6.1 della guida.
// Ogni zona ha cielo, strato lontano (far), strato medio (mid) e strada (ground).
// Al cambio di zona il nuovo sfondo appare in dissolvenza sopra il vecchio.

import { W, H, GY, RES } from '../config.js';
import { ZONES } from '../logic/zones.js';

const FAR_SPEED = 0.1;
const MID_SPEED = 0.4;

export class Background {
  constructor(scene) {
    this.scene = scene;
    this.layers = ZONES.map(({ id }) => {
      const sky = scene.add.image(0, 0, `sky-${id}`).setOrigin(0).setDisplaySize(W, GY);
      const far = scene.add.tileSprite(0, GY - 40, W, 170, `bg-${id}-far`).setOrigin(0, 1).setTileScale(1 / RES);
      const mid = scene.add.tileSprite(0, GY, W, 200, `bg-${id}-mid`).setOrigin(0, 1).setTileScale(1 / RES);
      const ground = scene.add.tileSprite(0, GY, W, H - GY, `bg-${id}-ground`).setOrigin(0).setTileScale(1 / RES);
      const container = scene.add.container(0, 0, [sky, far, mid, ground]).setDepth(0).setAlpha(0);
      return { container, far, mid, ground };
    });
    this.current = -1;
  }

  showZone(index, instant = false) {
    if (index === this.current) return;
    const next = this.layers[index];
    const prev = this.layers[this.current];
    this.current = index;
    next.container.setDepth(1);
    if (prev) prev.container.setDepth(0);
    if (instant) {
      this.layers.forEach((l) => l.container.setAlpha(l === next ? 1 : 0));
      return;
    }
    this.scene.tweens.add({
      targets: next.container, alpha: 1, duration: 1200,
      onComplete: () => prev && prev.container.setAlpha(0),
    });
  }

  /** scroll = metri percorsi in pixel. tilePosition è in pixel della texture, quindi ×RES. */
  update(scroll) {
    for (const l of this.layers) {
      if (l.container.alpha === 0) continue;
      l.far.tilePositionX = scroll * FAR_SPEED * RES;
      l.mid.tilePositionX = scroll * MID_SPEED * RES;
      l.ground.tilePositionX = scroll * RES;
    }
  }
}
