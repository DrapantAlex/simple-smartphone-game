// Punto di partenza del gioco: configura Phaser e le scene.

import Phaser from 'phaser';
import '@fontsource/lilita-one';
import '@fontsource/permanent-marker';
import { W, H, RES } from './config.js';
import { C } from './palette.js';
import { BootScene } from './scenes/BootScene.js';
import { MenuScene } from './scenes/MenuScene.js';
import { GameScene } from './scenes/GameScene.js';

async function start() {
  // Aspetta i font, altrimenti i primi testi comparirebbero con un font di ripiego.
  try {
    await Promise.all(['"Lilita One"', '"Permanent Marker"'].map((f) => document.fonts.load(`32px ${f}`)));
  } catch { /* se i font non caricano, si gioca lo stesso */ }

  new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: W * RES,
    height: H * RES,
    backgroundColor: C.contorno,
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    input: { activePointers: 2 },
    scene: [BootScene, MenuScene, GameScene],
  });
}

start();
