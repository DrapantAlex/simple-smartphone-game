// Sceglie a caso l'aspetto di un tifoso (sezione 4.3 della guida).
import { SKINS, HAIRS, SHIRTS, CAPS } from '../palette.js';

const pick = (a, rng) => a[Math.floor(rng() * a.length)];

export function randomLook(rng = Math.random) {
  return {
    skin: pick(SKINS, rng),
    hair: pick(HAIRS, rng),
    shirt: pick(SHIRTS, rng),
    cap: rng() < 0.3 ? pick(CAPS, rng) : null,
    phase: rng() * Math.PI * 2, // così non corrono tutti allo stesso passo
  };
}
