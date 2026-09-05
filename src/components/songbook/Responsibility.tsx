import { Link } from "react-router-dom";
export const responsibility = "Kehitetty 4.9.2026 rapujuhlien jälkilöylyissä yhdessä Helsingin Nuorkauppakamarin nuorten kanssa. Sisältö- ja julkaisuvastuusta vastaa Sami Miettinen ja hänen yhtiönsä DCM Capital Oy. Helsingin Nuorkauppakamari ei vastaa palvelun teknisestä toteutuksesta, henkilötietojen käsittelystä tai tekoälyn tuottamasta sisällöstä.";
export default function Responsibility() {
  return <section className="responsibility" aria-label="Palvelun vastuut ja tiedot">
    <img src="/jci-helsinki.png" alt="Helsingin Nuorkauppakamari" width="687" height="351" loading="lazy"/>
    <div><p>{responsibility}</p><nav aria-label="Palvelun tiedot">
      <Link to="/tietosuoja">Tietosuoja</Link>
      <Link to="/tekoalyn-kaytto">Tekoälyn käyttö</Link>
      <Link to="/lahteet-ja-oikeudet">Lähteet ja oikeudet</Link>
      <Link to="/yhteydenotto">Virheet ja poistopyynnöt</Link>
    </nav></div>
  </section>;
}
