// Costanti di gioco. Tutte le misure sono in px "logici" (schermo 640×360).

export const W = 640;
export const H = 360;
/** Fattore di nitidezza: il canvas reale è W×RES per H×RES, la camera fa zoom RES. */
export const RES = 2;

export const GY = 300; // linea del suolo
export const LEADX = 250; // x del tifoso in testa al corteo
export const JUMP_V = -520; // velocità iniziale del salto (verso l'alto)
export const GRAVITY = 1500;
export const MAX_FANS = 36;

export const ZONE_LENGTH_M = 600; // ogni quanti metri cambia zona
export const PX_PER_M = 10; // 10 px percorsi = 1 metro

export const START_FANS = 5;
