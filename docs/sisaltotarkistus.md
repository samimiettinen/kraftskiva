# Sisältötarkistus 2026-09-05

HNKK-tuonti on tarkistettu käyttäjän PDF:n sivuja 2–7 vasten. Alkuperäiset 30 laulutunnusta säilyvät, jotta suosikit ja pisteet eivät katoa.

Toimitukselliset korjaukset:
- Punchen kommer → Punschen kommer (otsikko ja Spotify-haku yhdenmukaisiksi sanoituksen kanssa).
- Eurovision: Saksalla → Saksassa.
- Pienet käärmeet: saava → saavat.
- Toti: Väinäöinenkin → Väinämöinenkin; Sen on totia → Se on totia.
- Sörkan sallit: poistettu irrallinen sulkeva lainausmerkki säkeen lopusta. Pseudo-venäläinen sanoitus säilytetty, sitä ei ole tulkittu OCR-virheeksi.

Vihkon `:,:`, `:;:` ja `;:` näytetään yhtenäisinä `|:` / `:|` -kertausmerkkeinä. Käyttäjälle näytetään selite. Alkuperäinen kertauspunctuaatio säilyy datassa. Puuttuvia loppusäkeitä tai kertauskohtia ei keksitä; esimerkiksi “Ja alla jallutähden…” säilyy lähteen mukaisena.

Säkeistörajat tulevat lähteen tyhjistä riveistä. Karaoke ei luo ajastettuja sanoja eikä väitä seuraavansa Spotify-toistoa. Epätarkat sävelmerkinnät ja nimet säilyvät näkyvästi epävarmoina.

## Saavutettavuus- ja käyttötestaus

- Selain: 320 × 740 ja 390 × 844 pikselin näkymät; ei vaakaylivuotoa etusivulla, alapalkki pysyy näytön alareunassa ja arvontapainike näkyy heti.
- Näppäimistö: Enter avaa arvonnan, dialogi rajaa Tab-kohdistuksen, Escape sulkee ja palauttaa kohdistuksen avanneeseen painikkeeseen. Karaoken nuolinäppäimet vaihtavat säkeistöä.
- Toissijaisia tekstejä tummennettu; painikkeiden kosketusalueita kasvatettu. Reduced-motion-tyylit poistavat siirtymät ja animaatiot. Tämä ei ole kattava WCAG-sertifiointi.
- Tässä sovelluksen selaimessa Wake Lock -pyyntö hylättiin ja käyttöliittymä kertoi siitä oikein. Oikean puhelimen hereilläpitoa ei ole laitetestattu. Yksikkötestit kattavat lukon saamisen, hylkäyksen, vapauttamisen ja myöhäisen vastauksen käsittelyn.
- LinkedIn-kuvakaappaukset: `outputs/linkedin/`. Laulunäkymään valittiin sovellusta varten luotu Rapu kulta.
