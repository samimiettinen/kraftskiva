# Kräftskiva · Laulukirja

Rapujuhlien mobiiliin mukautuva laulukirja suomeksi ja ruotsiksi. React, TypeScript ja Vite; alkuperäinen Lovable-arkkitehtuuri säilyy.

## Käyttö

- `/`: 10 laulun sanat, melodian mukaan muodostettu Spotify-haku, kielisuodattimet, sanahaku ja suosikit.
- Pöytähaasteet: kolme yhteislauluhaastetta ja linkki alkuperäiseen maaotteluun.
- Illan saldo: 10 pistettä eri laulusta, 20 eri haasteesta. 40 pisteellä Laulava teekkari, 100 pisteellä Raputohtori.
- `/maaottelu`: repon alkuperäinen Suomi–Ruotsi-peli.

Pisteet ja suosikit tallentuvat selaimen localStorageen (`kraftskiva-book-v1`). Pöydän yhteiseen pistepeliin käytetään yhtä laitetta; laitteiden välistä synkronointia ei ole. Uusi ilta nollaa pisteet vahvistuksen jälkeen ja säilyttää suosikit. Tallennuksen estyminen ei estä pelaamista.

## Laulut ja Spotify

Seitsemän alkuperäisen repon sanoitusta on säilytetty. Rapu kulta, Integraali on valmis ja Rapupöydän marssi ovat tätä versiota varten kirjoitettuja uusia sanoituksia. Lähdetyyppi näkyy jokaisessa laulussa. Alkuperäisten laulujen sanoituksia ei ole ulkoisesti toimitettu tai oikeustarkistettu tässä muutoksessa.

Uuden laulukirjan Spotify-painike avaa **melodian haun**, ei ennalta varmennettua äänitettä. Käyttäjä valitsee esityksen Spotifyssa. Alkuperäisen maaottelun olemassa olevat Spotify-upotukset on säilytetty; niiden kappaletunnuksia ei ole tässä varmennettu. Rapujuhlakuvitus on luotu tätä versiota varten.

## Kehitys

```sh
npm ci
npm run dev
npm run build
npm test
npx tsc --noEmit -p tsconfig.app.json
```

Npm-lukituksesta puuttuneet vertaisriippuvuudet on täydennetty, jotta `npm ci` onnistuu.

## Lovable ja julkaisu

Uudistus tehdään haaralla `codex/laulukirja`. Älä yhdistä päähaaraan kesken Lovable-muutosten. Tarkista ensin päähaaran uudet muutokset ja yhdistä ne tällä haaralla. Sovelluksen Vite-rakennetta, Lovable-taggeria tai päähaaran kytkentää ei ole muutettu.

`.openai/hosting.json` kohdistaa erilliseen Sites-versioon. Se ei muuta Lovablen julkaisua. Sites-versio on aluksi vain omistajan käytössä. Julkinen vieraskäyttö edellyttää erillistä jakamista/julkaisua.

## Tarkistukset

Uuden laulukirjan testit kattavat sanoilla hakemisen, melodian hakulinkin, pisteiden kertakirjauksen ja säilymisen, vahvistetun nollauksen sekä rikkoutuneen tallennustiedon käsittelyn. Koko repon lintissä on ennestään viisi virhettä tiedostoissa `command.tsx`, `textarea.tsx`, `sounds.ts` ja `tailwind.config.ts`; niitä ei muuteta osana laulukirjaa. Riippuvuusasennuksen audit raportoi myös olemassa olevan riippuvuuskannan haavoittuvuuksia; niitä ei automaattisesti päivitetä tässä ominaisuusmuutoksessa.
