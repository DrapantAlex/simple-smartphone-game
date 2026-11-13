# Cairo Vattene! — istruzioni per Claude

Gioco 2D per browser/smartphone, satirico e non violento, che rappresenta la protesta dei tifosi del Torino FC contro il presidente Urbano Cairo. Il corteo granata cresce raccogliendo tifosi e insegue Cairo, che scappa senza mai essere raggiunto.

## Chi ci lavora
Alex non ha mai sviluppato un'applicazione. Spiega ogni passaggio in modo semplice, procedi a piccoli passi e, quando ci sono scelte tecniche, presenta le alternative con pro e contro e una raccomandazione. Rispondi in italiano.

## Stato attuale
- **Versione Phaser 3 + Vite** (passo 2a fatto): `src/logic/` (regole pure, testate con `npm test`), `src/views/` (sprite a pezzi, sfondi a parallasse), `src/scenes/` (Boot, Menu, Game). Mondo logico 640×360, canvas 1280×720 con zoom camera ×2 per la nitidezza. Sprite SVG segnaposto in `public/assets/`, generati da `tools/make-placeholders.mjs`.
- Nella versione Phaser per ora ci sono: corsa, salto a onda, piramide, raccolta tifosi, Cairo in fuga, 4 zone. **Mancano (passo 2b)**: ostacoli lanciati, tornelli, mezzi di fuga, fumogeno, fine giornata, stagione, missioni, salvataggi, suoni.
- `prototype/index.html`: vecchio prototipo in un unico file, completo di tutte le meccaniche; è il riferimento per il passo 2b (ma non portare i "sacchi di soldi" né striscioni diversi da CAIRO VATTENE / CAIRO VENDI).
- Nel prototipo i progressi (stagione, missioni, sblocchi) sono salvati in `localStorage`.
- Il "corteo collettivo" del prototipo usa `window.claude.use('db')`, che esiste solo quando il gioco gira come artifact su claude.ai. Fuori da lì il gioco ricade su "solo locale". Per una versione pubblica servirà un backend esterno (es. Firebase o Supabase).

## Dinamica di gioco (confermata da Alex, non stravolgerla)
- **Corsa infinita**: ogni partita è una "giornata". Tocca/spazio per saltare; il corteo salta a onda e si impila a piramide (max 36 tifosi).
- **Cairo** corre davanti, lancia oggetti all'indietro e periodicamente tenta la fuga con un mezzo: servono N tifosi per respingerlo.
- **Stagione** di 38 giornate: la "pressione" accumulata deve superare una soglia per costringere Cairo a vendere.
- **Missioni** (3 attive alla volta) che sbloccano extra estetici e piccoli vantaggi.
- **Zone** che si alternano ogni 600 m: Centro (Via Roma/Via Po) → Lungo Po (Piazza Vittorio, Murazzi, Gran Madre) → Via Filadelfia → Stadio Olimpico Grande Torino. Il prototipo ha ancora 3 zone; la quarta (Lungo Po) è stata decisa con la guida di stile e va aggiunta con il motore a sprite.
- Power-up **fumogeno** → "QUARTO D'ORA GRANATA!" (invincibilità per 5 s).

## Prossimi passi (roadmap concordata)
1. ✅ **Guida di stile** (`docs/style-guide.md`, fatta: seguila per ogni asset): proporzioni dei personaggi, palette granata, contorni, luci, riferimenti ai luoghi veri di Torino (portici di Via Po, Piazza Vittorio e Gran Madre, Mole, Superga, Murazzi, Stadio Filadelfia, Olimpico Grande Torino con la torre Maratona).
2. **Motore a sprite** (Phaser 3 + Vite): ✅ 2a struttura e nucleo giocabile; ⏳ 2b portare le altre meccaniche del prototipo.
3. **Nuove meccaniche**:
   - oggetti lanciati più credibili (giornali, microfoni e telecamere, faldoni "CESSIONE"/"PLUSVALENZA", panchina dell'allenatore esonerato, coppa del 10° posto), niente sacchi di soldi;
   - mezzi di fuga diversi (elicottero, berlina nera, furgone nero, eventuale motoscafo sul Po), ognuno con una meccanica propria;
   - sui palazzi solo striscioni "CAIRO VATTENE" / "CAIRO VENDI", il resto sciarpe granata appese;
   - più dettagli nel corteo (tamburi, megafono, fumogeni, bandierone, striscione in testa, bambini sulle spalle, anziani con la coppola).
4. **Sprite** (SVG originali), un gruppo alla volta: tifoso con varianti → Cairo → mezzi → oggetti → sfondi di Torino → stadi e tornelli. Animazione "a pezzi" (testa, busto, braccia e gambe separati).
5. Rifinitura: luci, particelle, cori, musica. Pubblicazione con GitHub Pages.

Riferimento di stile: Zombie Tsunami (cartoon 2.5D, contorni marcati, volumi, colori saturi). Solo come ispirazione: non usare né imitare i suoi asset.

## Regole da rispettare sempre
- **Nessuna violenza verso Cairo**: il corteo non lo raggiunge mai, nessun colpo e nessun danno, nemmeno cartoon. La pressione si fa con i numeri.
- **Cairo è una caricatura generica disegnata da zero**: niente foto o immagini reali e niente frasi inventate attribuite a lui.
- **Niente stemma ufficiale del Torino FC né marchi registrati**: si usano il colore granata e un toro stilizzato originale.
- **Niente nomi di testate, aziende o giocatori reali** sugli oggetti.
- Tono: ironico e affettuoso verso il Toro, satirico ma rispettoso. I riferimenti al Grande Torino e a Superga vanno trattati con rispetto.
