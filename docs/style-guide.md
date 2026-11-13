# Cairo Vattene! — Guida di stile

> Versione 1.0 · 13 novembre 2026
> Questo documento definisce **come deve apparire** il gioco. Ogni sprite, sfondo o scritta nuova deve rispettarlo.
> Se una regola non funziona più, si modifica questo file prima di disegnare.

---

## 0. In una frase

**Cartoon 2.5D, personaggi chibi con teste grandi, contorni spessi granata-scuro, colori saturi, luce da in alto a sinistra, Torino riconoscibile ma semplificata.**
Ispirazione: i runner cartoon per smartphone (es. Zombie Tsunami), **solo per l'atmosfera**: nessun asset, forma o personaggio va copiato.

---

## 1. Misure di base

Il gioco ragiona in **640 × 360 px logici** (poi scalati allo schermo). Tutte le misure qui sotto sono in px logici.

| Elemento | Valore |
|---|---|
| Linea del suolo (`GY`) | y = 300 |
| Altezza tifoso adulto | **48 px** (testa ~22 px) |
| Altezza Cairo | **56 px** (un po' più alto: deve "spiccare") |
| Bambino (sulle spalle) | 34 px |
| Contorno personaggi | **3 px** |
| Contorno oggetti piccoli (< 24 px) | 2 px |
| Contorno sfondi in primo piano | 3 px; sfondi lontani: **nessun contorno** |

**Perché disegnare in SVG grande:** gli SVG si disegnano con un `viewBox` 4 volte più grande (es. tifoso in `viewBox="0 0 96 192"`, quindi contorno 12 unità). Così restano nitidi anche su schermi ad alta densità.

---

## 2. Palette

### 2.1 Colori principali (validi ovunque)

| Nome | Hex | Uso |
|---|---|---|
| `granata` | `#8B1A2B` | colore base: sciarpe, maglie, bandiere |
| `granata-luce` | `#B8323F` | parte illuminata del granata |
| `granata-ombra` | `#5A0F1A` | parte in ombra del granata |
| `contorno` | `#2A0A10` | **tutti** i contorni (mai nero puro `#000`) |
| `bianco-panna` | `#F4EFE6` | scritte sugli striscioni, righe delle sciarpe |
| `oro` | `#FFD84A` | HUD, punteggi, "QUARTO D'ORA GRANATA!" |
| `oro-ombra` | `#D8A020` | ombra dell'oro, bordi dei pulsanti |
| `fumo` | `#E04050` → trasparente | fumogeni (il fumo è più chiaro e rosato del granata) |

### 2.2 Personaggi

| Nome | Hex | Uso |
|---|---|---|
| Pelle 1–5 | `#F6D2B0` `#E8B48C` `#C98E64` `#9A6440` `#6B4128` | varietà nel corteo (alternare sempre) |
| Capelli | `#2B1E18` `#5A3A22` `#A87A4A` `#C8C2BA` (grigio anziani) | |
| Jeans | `#3E5A86` / ombra `#2A3E60` | |
| Abito di Cairo | `#2B2F3A` / luce `#444A5A` | completo scuro |
| Cravatta di Cairo | `#3A6EA5` | colore freddo: lo "stacca" dal corteo granata |
| Camicia | `#EEF0F4` | |

> **Regola di contrasto:** il corteo è caldo (granata, oro, panna), Cairo e i suoi mezzi sono **freddi** (blu, grigio, nero). Il giocatore capisce subito "noi" e "lui".

### 2.3 Palette per zona (cielo e luce)

Ogni zona ha un momento della giornata diverso: si percepisce che la corsa avanza.

| Zona | Momento | Cielo (alto → basso) | Luce sui personaggi | Ombre |
|---|---|---|---|---|
| 1. Centro (Via Roma / Via Po) | pomeriggio | `#5BA8E6` → `#CDE8F7` | neutra, bianca | `#3A2A40` al 25% |
| 2. Lungo Po | tardo pomeriggio | `#7DB4E0` → `#F6D29A` | calda, dorata | `#4A2A30` al 25% |
| 3. Via Filadelfia | tramonto | `#6A3D7A` → `#F08A5D` | arancio, rim light rosa | `#3A1A3A` al 30% |
| 4. Olimpico Grande Torino | sera, riflettori | `#141C36` → `#3B3F6B` | bianca dai riflettori `#FFF6D0` | `#0A0A1A` al 40% |

**In zona 4 (sera)** il granata rischia di "sparire" sullo sfondo scuro: si aggiunge una **rim light** (bordo luminoso di 1–2 px `#FFB0A0`) sul lato dei personaggi rivolto ai riflettori.

---

## 3. Luci e volumi (il "2.5D")

- **Direzione della luce:** sempre **in alto a sinistra**. Il lato destro e il basso di ogni forma sono in ombra.
- **Ombreggiatura cel-shading a 3 toni:** base + un'ombra netta (un solo tono più scuro, senza sfumatura) + un piccolo riflesso chiaro. **Niente gradienti sui personaggi.**
- **Gradienti consentiti solo** per cielo, fumo, aloni dei riflettori e bagliori.
- **Ombra a terra:** ellisse `#000` al 20% sotto ogni personaggio, che si rimpicciolisce quando salta.
- **Profondità:** più un oggetto è lontano, più è chiaro, meno saturo e senza contorno (prospettiva aerea).

---

## 4. Personaggi

### 4.1 Proporzioni chibi

```
 adulto (48 px)        Cairo (56 px)        bambino (34 px)
  ┌──────┐              ┌──────┐              ┌────┐
  │ TESTA│ 22            │ TESTA│ 24            │TESTA│ 18
  └──────┘              └──────┘              └────┘
   busto   14            busto   18            busto 9
   gambe   12            gambe   14            gambe 7
  = ~2,2 teste          = ~2,3 teste          = ~1,9 teste
```

- Occhi grandi e ovali, a metà altezza della testa; pupilla nera + riflesso bianco.
- Mani a "moffola" (pollice + blocco unico delle dita): si leggono meglio a dimensione piccola.
- Piedi grandi e arrotondati.

### 4.2 Animazione "a pezzi"

Ogni personaggio è diviso in parti SVG separate, con un **punto di rotazione (pivot)** fisso:

| Pezzo | Pivot |
|---|---|
| testa | base del collo |
| busto | centro del bacino |
| braccio sx / dx | spalla |
| gamba sx / dx | anca |
| accessorio (sciarpa, bandiera, tamburo...) | punto di aggancio alla mano o al collo |

Ordine di disegno (dal fondo): braccio dietro → gamba dietro → busto → gamba davanti → testa → braccio davanti → accessorio.

### 4.3 Il tifoso e le sue varianti

Base comune: sciarpa granata a righe panna al collo e almeno **un elemento granata** visibile.

| Variante | Tratti distintivi |
|---|---|
| Ultrà | felpa granata, tamburo o megafono |
| Ragazza | coda di cavallo, bandierina |
| Papà + bambino | bambino sulle spalle (un solo "slot" della piramide) |
| Anziano | coppola, baffi bianchi, leggermente curvo, sciarpa vecchio stile |
| Portabandiera | bandierone granata con il toro stilizzato originale |
| Coppia striscione | due tifosi che reggono lo striscione in testa al corteo |
| Fumogeno | torcia in mano, scia di fumo rosso |

Ogni tifoso pesca a caso: pelle (5 toni), capelli (4), cappello sì/no, accessorio. **Mai due tifosi identici vicini.**

### 4.4 Cairo (caricatura generica)

- **Disegnato da zero**, non ricalcato da foto. Deve essere riconoscibile come "il presidente imprenditore", non come ritratto.
- Completo scuro, camicia chiara, cravatta blu.
- **Ventiquattrore** in una mano (oscilla mentre corre).
- **Telefono all'orecchio** nell'altra: gag ricorrente, è sempre al telefono anche mentre scappa.
- Espressione **furba e sorniona**: sopracciglio alzato, mezzo sorriso. Mai cattiva, mai umiliata, mai ferita.
- Quando lancia gli oggetti all'indietro: gesto "da noia", senza aggressività.
- **Nessun fumetto con frasi attribuite a lui.** Al massimo simboli (`...`, `?!`, una nota musicale).

### 4.5 Il toro stilizzato (simbolo del corteo)

- Toro **originale**, rampante o di profilo, in stile cartoon, disegnato con poche forme.
- **Vietato** riprodurre lo stemma ufficiale del Torino FC (scudo, corona, disposizione degli elementi).
- Si usa su bandieroni, sciarpe, HUD e icona del gioco.

---

## 5. Scritte e font

| Uso | Stile | Font proposti (licenza libera) |
|---|---|---|
| Striscioni, titoli, "QUARTO D'ORA GRANATA!" | stampatello spesso, irregolare, "dipinto a mano" | **Permanent Marker** (Apache 2.0) |
| HUD, numeri, menu | arrotondato, molto leggibile | **Lilita One** (OFL) |

- Le scritte HUD sono `oro` con contorno `contorno` di 2 px.
- Le scritte sugli striscioni sono `bianco-panna` (o `granata` su striscione bianco), leggermente storte (±2°).
- I font sono inclusi nel progetto tramite i pacchetti npm `@fontsource/...` (non caricati da CDN), così il gioco funziona anche offline.

### Striscioni sui palazzi

Sui palazzi compaiono **solo**:
- `CAIRO VATTENE`
- `CAIRO VENDI`

Tutto il resto delle decorazioni sono **sciarpe granata appese** a balconi e finestre. Nessun'altra scritta, nessun nome di testate, aziende o giocatori.

---

## 6. Le zone di Torino

Le zone si alternano ogni 600 m, in questo ordine e poi da capo:

**1. Centro → 2. Lungo Po → 3. Via Filadelfia → 4. Olimpico Grande Torino**

### 6.1 Livelli di parallasse (dal fondo al primo piano)

| Livello | Velocità | Contenuto | Contorno |
|---|---|---|---|
| L0 cielo | 0 | gradiente + sole/luna, nuvole | no |
| L1 lontano | 0,1× | colline, **Mole**, **Superga** | no |
| L2 medio | 0,4× | palazzi, monumenti | 2 px, colore desaturato |
| L3 strada | 1× | portici, lampioni, tornelli, ostacoli | 3 px |
| L4 primo piano | 1,3× | ringhiere, folla sfocata, fumo (rari, non devono coprire il gioco) | 3 px |

### 6.2 Contenuto di ogni zona

**Zona 1 — Centro (pomeriggio)**
- Portici con archi a tutto sesto (Via Roma / Via Po): ritmo regolare di arcate sul livello strada.
- Palazzi nei toni del giallo Torino e dell'ocra (`#E3B868`, `#D9A65A`, `#C98E5A`), persiane verde scuro (`#3D6B4A`).
- La **Mole Antonelliana** spunta sul livello L1, sempre visibile e riconoscibile dalla guglia.
- Binari del tram sulla strada.

**Zona 2 — Lungo Po (tardo pomeriggio)**
- **Piazza Vittorio Veneto**: portici più ampi, piazza aperta.
- **Murazzi**: arcate basse sul fiume; il corteo corre sulla banchina.
- Il **Po** occupa la parte bassa dello sfondo (`#4F86A6`, riflessi dorati `#F6D29A`); qui può comparire il **motoscafo** di Cairo.
- **Gran Madre** (facciata con colonne e cupola) sull'altra sponda, livello L2.
- **Superga** sulla collina, livello L1 (vedi regola 6.3).

**Zona 3 — Via Filadelfia (tramonto)**
- Palazzine residenziali più basse, alberi.
- **Stadio Filadelfia**: tribuna e cancellata; sciarpe granata appese ovunque.
- Atmosfera "di casa": il corteo diventa più fitto di bandiere.

**Zona 4 — Olimpico Grande Torino (sera)**
- Stadio con le sue tribune; la **torre Maratona** come elemento verticale riconoscibile.
- Riflettori accesi, aloni di luce, fumogeni granata nel cielo.
- Tornelli all'ingresso (ostacoli o porte di passaggio).

### 6.3 Superga: regola di rispetto

- La basilica appare **solo come sfondo lontano** (livello L1), sulla collina, in silhouette morbida.
- **Mai** vicino a striscioni, gag, oggetti lanciati, power-up o mezzi di Cairo.
- Nessuna animazione comica nella sua inquadratura.

---

## 7. Oggetti lanciati e mezzi di fuga

Tutti gli oggetti di Cairo usano colori **freddi o neutri**, contorno 2 px, e una sagoma leggibile a 20–28 px.

| Oggetto | Colori | Note |
|---|---|---|
| Giornale | panna `#F4EFE6`, righe grigie | testata **senza nome** (righe illeggibili) |
| Microfono | grigio metallo, spugna nera | nessun logo |
| Telecamera | nero/grigio | nessun logo |
| Faldone "CESSIONE" / "PLUSVALENZA" | cartone `#C9A46A`, etichetta bianca | unica scritta ammessa sull'oggetto |
| Panchina dell'allenatore esonerato | plexiglass azzurrino + sedile | oggetto grande, raro |
| Coppa del 10° posto | ottone opaco `#B89A50`, un "10" inciso | ironica, piccola e storta |

| Mezzo | Colori | Ingombro |
|---|---|---|
| Elicottero | nero/grigio scuro, vetri azzurri | in alto, ombra a terra |
| Berlina nera | `#1A1C22`, vetri oscurati | bassa e lunga |
| Furgone nero | `#22252C` | alto, porta laterale |
| Motoscafo (solo zona 2) | bianco e blu | sul Po |

Nessun marchio, nessun logo, nessuna targa leggibile.

---

## 8. Effetti

| Effetto | Stile |
|---|---|
| Fumogeno / "QUARTO D'ORA GRANATA!" | nuvole tonde granata → rosate, che si espandono e si dissolvono; scritta in `oro` con bordo tremolante |
| Salto a onda | piccola nuvoletta di polvere ai piedi |
| Raccolta tifoso | stellina `oro` + "+1" |
| Mezzo respinto | linee di velocità e "puff" grigio. **Nessuna esplosione, nessun danno.** |
| Pressione stagione | barra granata che si riempie con riflesso `oro` |

---

## 9. Regole tecniche per gli asset

- **Formato:** SVG, un file per pezzo o per oggetto.
- **Cartelle** (dentro `public/`, che Vite pubblica così com'è):
  ```
  public/assets/
    sprites/tifoso/      head_*.svg, torso_*.svg, arm_*.svg, leg_*.svg, acc_*.svg
    sprites/cairo/
    sprites/mezzi/
    sprites/oggetti/
    backgrounds/centro/  po/  filadelfia/  olimpico/   (far.svg, mid.svg, ground.svg)
  ```
- **Nomi file:** minuscolo, trattini, niente spazi (`faldone-cessione.svg`).
- **Contorni:** `stroke-linejoin="round"` e `stroke-linecap="round"`, colore `#2A0A10`.
- **Colori:** solo quelli di questa guida. Un colore nuovo si aggiunge prima qui.
- **Niente** testo convertito in tracciati negli SVG dei personaggi; il testo degli striscioni si genera nel gioco con il font.
- **Parti tintabili del tifoso** (`head`, `hair`, `cap`, `torso`, `arm`, `leg`): disegnate in bianco `#FFFFFF` con ombra grigia `#BDBDBD`; il gioco le colora con pelle, maglia ecc. Le altre parti (`face`, `scarf`, tutto Cairo) hanno colori fissi.
- I file attuali sono **segnaposto** generati da `tools/make-placeholders.mjs`: per sostituirne uno basta salvare lo sprite vero con lo stesso nome e le stesse misure.

---

## 10. Checklist prima di aggiungere uno sprite

- [ ] Rispetta proporzioni e contorno (sezioni 1 e 4)?
- [ ] Usa solo colori della palette?
- [ ] La luce arriva da in alto a sinistra?
- [ ] Si legge bene a dimensione reale sul telefono (provalo a 48 px)?
- [ ] Nessun marchio, logo, stemma, testata o nome reale?
- [ ] Nessuna violenza verso Cairo, nemmeno cartoon?
- [ ] Se è vicino a Superga: è rispettoso?
