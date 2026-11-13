// Le 4 zone di Torino (docs/style-guide.md, sezione 6), in ordine.

import { ZONE_LENGTH_M } from '../config.js';

export const ZONES = [
  { id: 'centro', name: 'VIA ROMA · VIA PO' },
  { id: 'po', name: 'LUNGO PO' },
  { id: 'filadelfia', name: 'VIA FILADELFIA' },
  { id: 'olimpico', name: 'STADIO OLIMPICO GRANDE TORINO' },
];

/** Indice della zona in cui ci si trova dopo `meters` metri (le zone si ripetono). */
export function zoneIndexAt(meters) {
  return Math.floor(Math.max(0, meters) / ZONE_LENGTH_M) % ZONES.length;
}
