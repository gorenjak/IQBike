## IQBike


IQBike naslavlja problem zagotavljanja realnočasovnih informacij o zasedenosti postaj za najem koles in pomaga uporabnikom pri načrtovanju najbolj učinkovitih poti. Trenutno se uporabniki pogosto soočajo s težavami pri izposoji ali vračanju koles, ker kolesa niso vedno na voljo ali pa so postajališča prepolna za vračanje koles. To povzroča nezadovoljstvo, izgubo časa in lahko spodbuja uporabo avtomobilov, kar prispeva k prometnim težavam in onesnaženju okolja. Naša rešitev bo temeljila na učinkovitem izkoriščanju podatkov, kot so informacije o vremenu in podatki o uporabi koles, za zagotavljanje boljše izkušnje uporabnikom in spodbujanje trajnostne mobilnosti.

## Kazalo vsebine

- [Določitev ciljev rešitve](#določitev-ciljev-rešitve)
- [Ciljni uporabniki](#ciljni-uporabniki)
- [Funkcionalnosti](#funkcionalnosti)
  - [Izposoja in vračilo koles](#izposoja-in-vračilo-koles)
  - [Izbira med naročninami in spletno plačevanje](#izbira-med-naročninami-in-spletno-plačevanje)
  - [Večjezičnost in temni/svetli način](#večjezičnost-in-temnisvetli-način)
  - [Enostavno najemanje koles preko QR kode](#enostavno-najemanje-koles-preko-qr-kode)
  - [Načrtovanje poti z upoštevanjem zasedenosti](#načrtovanje-poti-z-upoštevanjem-zasedenosti)
- [Prototip aplikacije](#prototip-aplikacije)
- [Žični diagrami](#žični-diagrami)
- [User-Flow diagram](#user-flow-diagram)
- [Zgradba in delovanje aplikacije](#zgradba-in-delovanje-aplikacije)
- [Namestitev aplikacije](#namstitev-aplikacije)
  - [Navodila za nameščanje aplikacije](#navodila-za-nameščanje-aplikacije)
  - [Vzpostavitev projekta](#vzpostavitev-projekta)
  - [Vzpostavitev serverja za plačila](#vzpostavitev-serverja-za-plačila)
- [Uporaba aplikacije](#uporaba-aplikacije)
  - [Pregled postajališč](#pregled-postajališč)
  - [Registracija](#registracija)
  - [Prijava](#prijava)
  - [Profil](#profil)
  - [Izposoja kolesa](#izposoja-kolesa)
  - [Vračilo kolesa](#vračilo-kolesa)
  - [Ocenjevanje in povratne informacije](#ocenjevanje-in-povratne-informacije)
  - [Naročnina](#naročnina)
  - [Napoved](#napoved)
  - [Temni/Svetli Način](#temnisvetli-način)
  - [Sprememba jezika](#sprememba-jezika)
  - [Odjava](#odjava)

## Določitev ciljev rešitve

Cilj naše predlagane rešitve, IQBike, je zagotoviti uporabnikom realnočasovne informacije o zasedenosti postaj za najem koles ter jim omogočiti načrtovanje najbolj učinkovitih poti. S tem želimo rešiti težave, s katerimi se uporabniki trenutno soočajo pri izposoji ali vračanju koles, kot so nedostopnost koles ali prepolna postajališča. Naša rešitev se razlikuje od obstoječih mobilnih aplikacij, kot so Mbajk, BicikeLJ itd., ker ne omogoča le izposoje in vračila koles, temveč tudi napoveduje razpoložljivost koles in postaj v prihodnosti. Poleg tega uporablja strojno učenje in regresijske modele za boljše napovedovanje zasedenosti postaj, kar uporabnikom omogoča boljše načrtovanje njihovih poti in izposoje koles. Želimo spodbujati trajnostno mobilnost ter prispevati k boljši izkušnji uporabnikov in zmanjšati prometne težave in onesnaženje okolja.

## Ciljni uporabniki

- Kolesarji
- Različne institucije (občine, drugi kolesarski sistemi, ...)

## Funkcionalnosti

### Izposoja in vračilo koles

Funkcionalnost izposoje in vračila koles preko aplikacije predstavlja sodoben in priročen način mobilnosti v urbanih okoljih. Ta inovativni pristop omogoča uporabnikom enostavno izposojo koles, kar spodbuja trajnostno prevozno sredstvo ter zmanjšuje obremenitev okolja.

### Izbira med naročninami in spletno plačevanje

Izbira med naročninami in spletno plačevanjem omogoča uporabnikom, da oblikujejo svojo pot v kolesarskem svetu po svojih željah. Ustvarite svojo edinstveno kolesarsko zgodbo in se pripravite na raziskovanje mesta na način, ki vam najbolj ustreza.

### Večjezičnost in temni/svetli način

Aplikacija je na voljo v slovenščini in angleščini, kar omogoča tujcem enostavno uporabo in razumevanje. Prav tako smo dodali funkcionalnost temni/svetli način.

### Enostavno najemanje koles preko QR kode

Uporabniki lahko s pomočjo QR kode na postaji enostavno in hitro najamejo kolo, brez potrebe po dodatnih vnosih ali obrazložitvah.

### Načrtovanje poti z upoštevanjem zasedenosti

S pomočjo naprednih regresijskih modelov aplikacija napoveduje zasedenost postaj v bližnji prihodnosti. Uporabnikom prikaže tri možne poti, ki upoštevajo razpoložljivost koles in postaj glede na vreme, kar omogoča boljše načrtovanje poti.

## Prototip aplikacije

Prototipi aplikacije so dostopni na [povezavi](https://github.com/gorenjak/IQBike/blob/main/docs/Prototipi%20aplikacije.pdf).

## Žični diagrami

Pripravljeni žični diagrami so dostopni na [povezavi](https://github.com/gorenjak/IQBike/blob/main/docs/%C5%BDi%C4%8Dni%20digrami.pdf).

## User-Flow diagram

User-flow diagram, ki prikazuje delovanje naše aplikacije, je dostopen na [povezavi](https://github.com/gorenjak/IQBike/blob/main/docs/User%20Flow%20Diagram.pdf).

## Zgradba in delovanje aplikacije

![](https://github.com/gorenjak/IQBike/blob/main/docs/sl/zgradba-in-delovanje.png)

## Namestitev aplikacije

### Navodila za nameščanje aplikacije.

Predpogoji mobilne aplikacije, ki jih morate izpolniti preden začnete z vzpostavitvijo:
- Nameščen `Node.js`.
- Nameščen `Expo CLI`.
- Nameščen `Git`.
- Nameščen `Yarn`.
- Dostop do `GitHub repozitorija` ter kloniran projekt.

### Vzpostavitev projekta

1. Korak: **Premik v mapo IQBike**
    - Odprite ukazno vrstico (terminal) na vašem računalniku.
    - Pojdite v mapo IQBike mape, kjer ste klonirali repozitorij: 
        `cd pot/do/ime_mape_projekta/IQBike`

2. Korak: **Namestitev knjižnice Expo CLI**
    - Uporabite ukaz `npm install -g expo-cli` za namestitev knjižnice Expo CLI, če tega še niste storili.
    - Nato izvedite `yarn install` za namestitev vseh potrebnih odvisnosti.

3. Korak: **Zagon projekta**
    - Uporabite ukaz `npx expo` za zagon projekta.
    - Odpre se Expo Developer Tools v terminalu, kjer boste imeli možnost zagona aplikacije na fizični napravi (prek QR kode) ali na Android/iOS emulatorju.

4. Korak: **Testiranje na napravi ali emulatorju**
    - Za testiranje na fizični napravi:
        * Namestite Expo Go aplikacijo na vašo napravo (iz trgovine z aplikacijami).
        * Skenirajte QR kodo iz terminala Expo Developer Tools, da zaženete aplikacijo na svoji napravi.

    - Za testiranje na emulatorju:
        * Sledite navodilom zapisanim v terminalu Expo Developer Tools za zagon na Android ali iOS emulatorju.

### Vzpostavitev serverja za plačila

1. Korak: **Premik v mapo IQBike/mobile/server**
    - Odprite ukazno vrstico (terminal) na vašem računalniku.
    - Pojdite v mapo IQBike/mobile/server mape, kjer ste klonirali repozitorij: 
        `cd pot/do/ime_mape_projekta/IQBike/mobile/server`

2. Korak: **Namestitev knjižnic**
    - Uporabite ukaz `npm install` za namestitev vseh potrebnih odvisnosti.

3. Korak: **Zagon strežnika**
    - Uporabite ukaz `nodemon server.js` za zagon serverja. Nato lahko nemoteno uporabljate aplikacijo.

## Uporaba aplikacije

### Pregled postajališč

- Na zemljevidu so prikazana postajališča koles ter njihova trenutna zasedenost.
- S klikom na zelene označbe dobite več informacij o postajališču ter seznam koles, ki se nahajajo na postajališču.
- Izposoja koles je na voljo le prijavljenim uporabnikom z aktivno naročnino.

### Registracija:

Če še nimate računa, lahko ustvarite novega:

- Na domači strani kliknite zgornjo desno ikono za direktno prijavo/registracijo ali zgornjo levo ikono za meni, kjer je zavihek Prijava.
- Izberite možnost "Registracija".
- Sledite preprostim korakom za ustvarjanje vašega računa.

### Prijava

Če že imate račun, se prijavite z vašimi poverilnicami:

- Na domači strani kliknite zgornjo desno ikono za direktno prijavo/registracijo ali zgornjo levo ikono za meni, kjer je zavihek Prijava.
- Vnesite svoje poverilnice in se prijavite.
- Če ste pozabili svoje geslo, lahko izberete možnost "Ste pozabili geslo?", kamor boste vnesli svoj e-poštni naslov, preko katerega lahko spremenite geslo.

### Profil

Na domači strani kliknite zgornjo desno ikono ali zgornjo levo ikono za meni, kjer je zavihek Profil.

Na vašem profilu imate naslednje možnosti:
- Pregled vaših informacij (ime in e-poštni naslov).
- Podrobnosti o vaših naročninah, plačilih in preteklih vožnjah.
- Vpogled politike varstva podatkov in pravnega obvestila naše aplikacije.
- Brisanja vašega profila, če se za to  odločite.

### Izposoja kolesa

- Na začetnem zaslonu boste videli zemljevid s postajami za izposojo koles.
- Uporabite funkcijo povečave in pomanjšave, da poiščete postaje v vaši bližini.
- Če imate aktivno naročnino imate dve možnosti za izposojo koles:
    1. Izberite postajo, na kateri želite izposoditi kolo:
        - Izberite kolo in kliknite gumb Izposodi.
        - Pokaže se okno, kjer morate potrditi izposojo.
        - Po uspešni izposoji lahko uporabljate kolo.
    2. Uporabite gumb "Odkleni kolo", ki je na dnu zemljevida: 
        - Skenirajte kodo na kolesu s kamero vašega telefona.
        - Pokaže se okno, kjer morate potrditi izposojo.
        - Po uspešni izposoji lahko uporabljate kolo.

### Vračilo kolesa

- Ko končate s kolesarjenjem, se odpeljite do najbližje postaje IQBike.
- Zaklenite kolo nazaj na postajo in sledite navodilom v aplikaciji za zaključek najema.

### Ocenjevanje in povratne Informacije

- Po končanem najemu imate možnost oceniti svoje kolo.
- Izberite zvezdice in ocenite kolo 1-5.

### Naročnina

- Na domači strani kliknite zgornjo levo ikono za meni.
- Izberite zavihek "Naročnina".
- Na tej strani boste našli podatke o različnih vrstah naročnin:
    * Letna naročnina
    * Tedenska naročnina
- Z drsanjem levo ali desno lahko preberete več o vsaki naročnini.
- Ko se odločite, katera naročnina vam najbolj ustreza, preprosto kliknite gumb "Izberi".
- Če ste prijavljeni in še nimate aktivne naročnine, sledite tem korakom:
    * Ko izberete želeno naročnino, se bo prikazal okvir.
    * V okvir vnesite svoje bančne podatke in poštno številko za plačilo.
    * Po uspešnem plačilu boste imeli aktivno naročnino, s katero boste lahko brezskrbno najemali kolo ter uživali v kolesarskih pustolovščinah.

### Napoved

- Na domači strani kliknite zgornjo levo ikono za meni.
- Izberite zavihek "Napoved".
- Na tej strani uporabnik vnese začetno in končno postajo ter datum in čas vožnje.
- Klikne na gumb "Prikaži poti".
- Napovedni model bo izračunal tri poti, ki bodo glede na podatke najboljši:
    * Prva pot vsebuje začetno in končno postajo glede na najboljšo napoved, zadnja pa najslabšo.

### Temni/Svetli Način

- Na domači strani kliknite zgornjo desno ikono za meni.
- Na dnu menija imate preklop za "Temni/Svetli Način". 
- Izberite želeni način: 
    1. "Temni način" za temnejši videz ali 
    2. "Svetli način" za svetlejši videz.

### Sprememba jezika

- Na domači strani kliknite zgornjo desno ikono za meni.
- Na dnu menija imate preklop za "Jezik".
- Izberite želeni jezik:
    1. Slovenščina
    2. Angleščina

### Odjava
- Na domači strani kliknite zgornjo desno ikono za meni.
- Izberite možnost "Odjava".
- Vaša seja bo varno zaključena in boste izpisani iz svojega računa.