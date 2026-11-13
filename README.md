# Cairo Vattene! 🐂

Un piccolo gioco 2D da browser/smartphone: guida il corteo granata per le strade di Torino, raccogli tifosi, supera gli ostacoli e metti pressione su Cairo finché non vende il Toro.

## Come si gioca
- **Tocca lo schermo** (o premi **spazio**) per saltare. Il telefono va tenuto in orizzontale.
- Raccogli i tifosi lungo la strada: il corteo cresce e si impila a piramide.
- Salta gli oggetti che Cairo lancia all'indietro e gli ostacoli sulla strada.
- I **tornelli** si sfondano solo con abbastanza tifosi.
- Il **fumogeno** attiva il *quarto d'ora granata*: per qualche secondo il corteo travolge tutto.
- Quando arriva l'**elicottero**, servono abbastanza tifosi per respingerlo.
- Ogni partita è una **giornata**: accumula pressione nelle 38 giornate della stagione per costringere Cairo a vendere.

## Avvio (versione Phaser)
Serve [Node.js](https://nodejs.org) (versione 20.19 o successiva). Poi, nella cartella del progetto:

```bash
npm install
```

```bash
npm run dev
```

Apri l'indirizzo che compare (es. `http://localhost:5173`). Il gioco si ricarica da solo a ogni modifica.
Con `--host`, dal telefono sulla stessa rete Wi-Fi puoi aprire l'indirizzo "Network" che compare.

Altri comandi utili:
- `npm test`: controlla automaticamente la logica di gioco.
- `npm run build`: crea in `dist/` la versione da pubblicare.
- `node tools/make-placeholders.mjs`: rigenera gli sprite segnaposto.
- Prova una zona: aggiungi `?metri=1300` all'indirizzo.

Il vecchio prototipo in un unico file è in `prototype/index.html` (si apre direttamente nel browser).

## Struttura
```
src/
  logic/     regole del gioco, senza grafica (testate con npm test)
  views/     disegno: tifosi e Cairo "a pezzi", sfondi a strati
  scenes/    schermate Phaser: caricamento, menu, partita
  config.js  costanti (misure, gravità, max tifosi...)
  palette.js colori della guida di stile
public/assets/  sprite e sfondi SVG
docs/style-guide.md  guida di stile
```

## Nota
Gioco satirico e amatoriale di un tifoso, senza affiliazione con il Torino FC. Il toro e tutti i personaggi sono disegni originali.
