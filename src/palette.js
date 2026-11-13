// Palette ufficiale: copiata da docs/style-guide.md (sezione 2).
// Un colore nuovo va aggiunto prima nella guida, poi qui.

const hex = (s) => parseInt(s.slice(1), 16);

export const C = {
  granata: '#8B1A2B',
  granataLuce: '#B8323F',
  granataOmbra: '#5A0F1A',
  contorno: '#2A0A10',
  panna: '#F4EFE6',
  oro: '#FFD84A',
  oroOmbra: '#D8A020',
};

export const SKINS = ['#F6D2B0', '#E8B48C', '#C98E64', '#9A6440', '#6B4128'].map(hex);
export const HAIRS = ['#2B1E18', '#5A3A22', '#A87A4A', '#C8C2BA'].map(hex);
export const SHIRTS = [C.granata, C.granata, C.granataLuce, C.panna].map(hex);
export const JEANS = hex('#3E5A86');
export const CAPS = [C.granata, C.panna, C.granataOmbra].map(hex);

/** Cielo (alto → basso) per ogni zona: sezione 2.3 della guida. */
export const SKY = {
  centro: ['#5BA8E6', '#CDE8F7'],
  po: ['#7DB4E0', '#F6D29A'],
  filadelfia: ['#6A3D7A', '#F08A5D'],
  olimpico: ['#141C36', '#3B3F6B'],
};

export { hex };
