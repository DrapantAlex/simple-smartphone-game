// Piccole funzioni di aiuto per la grafica, usate da tutte le scene.

import { W, H, RES } from '../config.js';
import { C } from '../palette.js';

/** La camera mostra sempre il mondo logico 640×360, ingrandito RES volte per essere nitido. */
export function setupCamera(scene) {
  scene.cameras.main.setZoom(RES).centerOn(W / 2, H / 2);
}

/** Aggiunge un'immagine caricata da SVG alla sua misura logica (le texture sono RES volte più grandi). */
export function sprite(scene, x, y, key) {
  return scene.add.image(x, y, key).setScale(1 / RES);
}

const FONTS = { hud: '"Lilita One", sans-serif', banner: '"Permanent Marker", cursive' };

/**
 * Testo nello stile della guida (sezione 5).
 * font: 'hud' per numeri e menu, 'banner' per titoli e striscioni.
 */
export function label(scene, x, y, text, { size = 16, font = 'hud', color = C.oro, stroke = C.contorno, strokeWidth = 2 } = {}) {
  return scene.add.text(x, y, text, {
    fontFamily: FONTS[font],
    fontSize: `${size}px`,
    color,
    stroke,
    strokeThickness: strokeWidth * 2,
    resolution: RES * 1.5,
    align: 'center',
  }).setOrigin(0.5);
}
