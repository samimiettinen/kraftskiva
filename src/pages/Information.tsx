import { useEffect } from "react";
import { Link } from "react-router-dom";
import Responsibility from "@/components/songbook/Responsibility";
import "./songbook.css";
const pages = {
  tietosuoja: { title: "Tietosuoja", content: <>
    <h2>Mitä sovellus tallentaa?</h2><p>Laulukirjan suosikit, lauletut laulut ja haastepisteet tallentuvat tämän laitteen selaimeen. Sovelluksen koodi ei lähetä niitä palvelimelle. Alkuperäisessä maaottelussa syötetyt pelaajanimet käsitellään pelin aikana selaimessa. Äänivalinta voidaan säilyttää selaimessa. Tallennuksen voi poistaa selaimen sivustotietojen asetuksista.</p>
    <h2>Seuranta ja ulkopuoliset palvelut</h2><p>Sovellukseen ei ole lisätty analytiikkaa, mainosseurantaa, yhteydenottolomaketta tai henkilötietojen keruuta. Kirjasimet ladataan laitteen omista fonteista. Spotify-haku avautuu vasta, kun valitset linkin. Maaottelun Spotify-soitin latautuu vain erillisellä hyväksynnällä; silloin Spotify saa yhteyden teknisiä tietoja ja käsittelee niitä omien käytäntöjensä mukaisesti.</p>
    <h2>Palvelualusta ja yhteydenotot</h2><p>Palvelu on julkaistu OpenAI Sites -alustalla. Alusta voi käsitellä palvelun toimittamiseen ja turvallisuuteen liittyviä teknisiä tietoja, kuten verkkopyyntöjä ja IP-osoitteita. Sovelluksen ylläpitäjä ei tässä lupaa, ettei hosting-palvelu käsittelisi tietoja. Alustan käsittely kuvataan sen omissa tietosuojatiedoissa.</p><p>Jos lähetät sähköpostia, vastaanottaja saa viestin ja lähettäjätietosi pyynnön käsittelyä varten. Älä lähetä arkaluonteisia tai tarpeettomia henkilötietoja.</p><p><Link to="/yhteydenotto">Tietosuojaa koskevat yhteydenotot</Link> · <a href="https://openai.com/policies/privacy-policy/" target="_blank" rel="noopener noreferrer">OpenAI:n tietosuojakäytäntö</a> · <a href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Spotifyn tietosuojakäytäntö</a></p>
  </>},
  "tekoalyn-kaytto": { title: "Tekoälyn käyttö", content: <>
    <p>Tekoälyä on käytetty sovelluksen koodin, käyttöliittymän ja rapuaiheisten kuvitusten tekemiseen sekä lauluvihkon tekstin siirtämisen ja tarkistamisen apuna. Rapukuvat ovat tekoälyllä luotuja kuvituksia, eivät dokumentaarisia kuvia tapahtumasta.</p>
    <p>Rapu kulta, Integraali on valmis ja Rapupöydän marssi ovat tätä palvelua varten tekoälyn avulla tuotettuja uusia sanoituksia. Laulukohtainen lähdemerkintä erottaa ne HNKK-lauluvihkon ja alkuperäisen repon sanoituksista.</p>
    <p>Laulukirjan käyttäminen ei lähetä syötteitä tekoälymallille eikä sovellus kuuntele tai tallenna laulamista. Karaoke vaihtaa säkeistöä käyttäjän painalluksella; se ei tunnista ääntä tai seuraa Spotify-toiston ajoitusta.</p>
    <p>Tekoäly voi tehdä virheitä. Sisällön ja julkaisun vastuuhenkilöt on nimetty alla. <Link to="/yhteydenotto">Ilmoita havaitsemastasi virheestä.</Link></p>
  </>},
  "lahteet-ja-oikeudet": { title: "Lähteet ja oikeudet", content: <>
    <h2>Laulujen lähteet</h2><p>30 laulua on tuotu ylläpitäjän toimittamasta HNKK_Lauluvihko.pdf-vihkosta. Laulujen yhteydessä näkyvät lähteen sivu ja laulunumero. Seitsemän laulua on alkuperäisestä Kräftskiva-reposta. Lisäksi mukana on kolme tätä palvelua varten kirjoitettua sanoitusta sekä Veeran toimittama Rapumaan marssi. Rapumaan marssi on kirjoitettu pääkaupunkiseudun nuorkauppakamarien rapujuhlissa 2024 ja saanut kunniamaininnan isänmaallisimmasta rapulaulusta. Sen sanat on tallennettu toimittajan antamassa muodossa.</p>
    <p>Helan går, Internationalen ja Olutkaanon säilyvät erillisinä HNKK-versioina. Selviä kirjoitusvirheitä on toimituksellisesti korjattu ja kertausmerkkien ulkoasu yhtenäistetty. Epätarkkoja sävelmerkintöjä ei esitetä varmennettuina.</p>
    <h2>Oikeudet ja julkaiseminen</h2><p>Lähdeviite ei itsessään merkitse julkaisulupaa. Laulujen ja HNKK-aineiston julkaisulupia ei ole tämän teknisen toteutuksen yhteydessä varmennettu. Vastuulauseke ei korvaa oikeudenhaltijoiden lupia. Spotify-linkki tai -upotus ei anna lupaa sanoitusten julkaisemiseen.</p>
    <p>Helsingin Nuorkauppakamarin logo on ylläpitäjän toimittama tunnus. Sen esittäminen ei merkitse, että kamari vastaisi palvelusta tai tekoälysisällöstä. Tunnuksen tai aineiston käyttöä koskevat huomautukset voi osoittaa ylläpitäjälle.</p>
    <p><Link to="/yhteydenotto">Ilmoita lähdevirheestä, oikeuspuutteesta tai pyydä aineiston poistamista.</Link></p>
  </>},
  yhteydenotto: { title: "Virheet ja poistopyynnöt", content: <>
    <p>Palvelun sisältö- ja julkaisuvastuusta vastaavat Sami Miettinen ja DCM Capital Oy.</p>
    <p>Ilmoita viestissä laulun tai sivun nimi, havaittu virhe tai poistettava kohta ja pyyntösi peruste. Oikeuksia koskevassa asiassa kerro, mitä aineistoa oikeus koskee ja miten edustat oikeudenhaltijaa. Liitä vain pyynnön käsittelyyn tarvittavat tiedot.</p>
    <p className="contact-address"><a href="mailto:sami.miettinen@neuvottelija.com">sami.miettinen@neuvottelija.com</a></p>
    <p>Palvelussa ei ole yhteydenottolomaketta. Sähköpostilinkki avaa oman sähköpostiohjelmasi; viesti lähetetään vasta, kun lähetät sen itse.</p>
  </>},
};
export default function Information({ page }: { page: keyof typeof pages }) {
  const info = pages[page];
  useEffect(() => { document.title = `${info.title} – Kräftskiva`; window.scrollTo(0,0); return () => { document.title = "Kräftskiva – rapujuhlien laulukirja"; }; }, [info.title]);
  return <div className="songbook information-page"><header className="book-header"><Link to="/" className="wordmark">Kräftskiva</Link><Link to="/" className="text-button">← Takaisin laulukirjaan</Link></header><main><article className="information-content"><h1>{info.title}</h1>{info.content}</article><Responsibility/></main></div>;
}
