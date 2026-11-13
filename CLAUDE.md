# Cairo Vattene! — istruzioni per Claude

Gioco 2D per browser/smartphone, satirico e non violento, che rappresenta la protesta dei tifosi del Torino FC contro il presidente Urbano Cairo. Il corteo granata cresce raccogliendo tifosi e insegue Cairo, che scappa senza mai essere raggiunto.

## Chi ci lavora
Alex non ha mai sviluppato un'applicazione. Spiega ogni passaggio in modo semplice, procedi a piccoli passi e, quando ci sono scelte tecniche, presenta le alternative con pro e contro e una raccomandazione. Rispondi in italiano.

## Stato attuale
- `index.html`: prototipo giocabile in un unico file (canvas 2D, grafica disegnata via codice, 640×360 logici, scalato allo schermo).
- I progressi (stagione, missioni, sblocchi) sono salvati in `localStorage`.
- Il "corteo collettivo" usa `window.claude.use('db')`, che esiste solo quando il gioco gira come artifact su claude.ai. Fuori da lì il gioco ricade su "solo locale". Per una versione pubblica servirà un backend esterno (es. Firebase o Supabase).

## Dinamica di gioco (confermata da Alex, non stravolgerla)
- **Corsa infinita**: ogni partita è una "giornata". Tocca/spazio per saltare; il corteo salta a onda e si impila a piramide (max 36 tifosi).
- **Cairo** corre davanti, lancia oggetti all'indietro e periodicamente tenta la fuga con un mezzo: servono N tifosi per respingerlo.
- **Stagione** di 38 giornate: la "pressione" accumulata deve superare una soglia per costringere Cairo a vendere.
- **Missioni** (3 attive alla volta) che sbloccano extra estetici e piccoli vantaggi.
- **Zone** che si alternano ogni 600 m: Via Roma → Via Filadelfia → Stadio Grande Torino.
- Power-up **fumogeno** → "QUARTO D'ORA GRANATA!" (invincibilità per 5 s).

## Prossimi passi (roadmap concordata)
1. **Guida di stile** (`docs/style-guide.md`): proporzioni dei personaggi, palette granata, contorni, luci, riferimenti ai luoghi veri di Torino (portici di Via Po, Piazza Vittorio e Gran Madre, Mole, Superga, Murazzi, Stadio Filadelfia, Olimpico Grande Torino con la torre Maratona).
2. **Motore a sprite**: ristrutturare il gioco in Phaser 3 (o un'architettura equivalente) separando la logica dagli asset grafici (`assets/`), con sprite segnaposto.
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
