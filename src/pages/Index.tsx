import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  ExternalLink,
  Heart,
  Music2,
  Search,
  Shuffle,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import {
  bookSongs,
  challenges,
  pointsFor,
  readProgress,
  spotifySearch,
  type BookSong,
} from "@/data/songbook";
import hero from "@/assets/rapujuhla-hero.jpg";
import "./songbook.css";

type View = "book" | "challenges" | "evening";
export default function Index() {
  const [view, setView] = useState<View>("book");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Kaikki");
  const [selected, setSelected] = useState<BookSong | null>(null);
  const [progress, setProgress] = useState(readProgress);
  const [large, setLarge] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      localStorage.setItem("kraftskiva-book-v1", JSON.stringify(progress));
    } catch {
      setNotice(
        "Selain ei tallenna edistymistä. Voit jatkaa tämän istunnon ajan.",
      );
    }
  }, [progress]);
  const points = pointsFor(progress);
  const level =
    points >= 100
      ? "Raputohtori"
      : points >= 40
        ? "Laulava teekkari"
        : "Rapufuksi";
  const filtered = bookSongs.filter(
    (s) =>
      (filter === "Kaikki" ||
        (filter === "Suomeksi" && s.language === "fi") ||
        (filter === "Ruotsiksi" && s.language === "sv") ||
        (filter === "Suosikit" && progress.favorites.includes(s.id)) ||
        s.category === filter) &&
      `${s.title} ${s.melody} ${s.lyrics.join(" ")}`
        .toLocaleLowerCase("fi")
        .includes(query.toLocaleLowerCase("fi")),
  );
  function favorite(id: string) {
    setProgress((p) => ({
      ...p,
      favorites: p.favorites.includes(id)
        ? p.favorites.filter((s) => s !== id)
        : [...p.favorites, id],
    }));
  }
  function sing(id: string) {
    setProgress((p) =>
      p.sung.includes(id) ? p : { ...p, sung: [...p.sung, id] },
    );
  }
  function randomSong() {
    const pool = filtered.length ? filtered : bookSongs;
    setSelected(pool[Math.floor(Math.random() * pool.length)]);
  }
  return (
    <div className="songbook">
      <a className="skip-link" href="#book-content">
        Siirry sisältöön
      </a>
      <header className="book-header">
        <a href="/" className="wordmark">
          Kräftskiva<span>LAULUKIRJA & HYVÄ SEURA</span>
        </a>
        <nav aria-label="Päänavigaatio">
          {(
            [
              ["book", "Laulukirja", BookOpen],
              ["challenges", "Pöytähaasteet", Sparkles],
              ["evening", "Illan saldo", Trophy],
            ] as const
          ).map(([key, label, Icon]) => (
            <button
              key={key}
              className={view === key ? "nav-active" : ""}
              aria-current={view === key ? "page" : undefined}
              onClick={() => setView(key)}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <span className="header-score">
          <Trophy size={16} />
          {points} p
        </span>
      </header>
      <main id="book-content">
        <section className="book-intro">
          <div>
            <p className="eyebrow">RAPUJA. LAULUJA. PIENI PILKE.</p>
            <h1>
              {view === "book" ? (
                <>
                  Vielä yksi <em>säkeistö.</em>
                </>
              ) : view === "challenges" ? (
                <>
                  Pöytä täynnä <em>pelihenkeä.</em>
                </>
              ) : (
                <>
                  Tästä illasta <em>jää laulu.</em>
                </>
              )}
            </h1>
            <p>
              {view === "book"
                ? "Sanoista kiinni, sävelestä viis. Suomalaiset ja ruotsalaiset pöytälaulut, yhteisen illan kunniaksi."
                : view === "challenges"
                  ? "Kolme pientä haastetta koko seurueelle. Suoritus hyväksytään yhteisellä, sopivan epätieteellisellä päätöksellä."
                  : "Jokainen yhdessä laulettu laulu on pieni voitto. Tässä teidän pöytänne saavutukset."}
            </p>
          </div>
          <div className="intro-seal">
            <span>RAPUJUHLAT</span>
            <strong>Skål!</strong>
            <span>HYVÄLLE SEURALLE</span>
          </div>
        </section>
        <div className="book-layout">
          <section className="primary-column">
            {view === "book" && (
              <>
                <article className="opening-song">
                  <img
                    src={hero}
                    alt="Rapujuhlapöytä ja lyhtyjen lämmin valo"
                  />
                  <div className="opening-shade" />
                  <div className="opening-copy">
                    <p className="eyebrow">ILLAN ENSIMMÄINEN · 01</p>
                    <h2>Helan går</h2>
                    <p>Kaikki osaavat ainakin alun.</p>
                    <button
                      className="cream-button"
                      onClick={() => setSelected(bookSongs[0])}
                    >
                      Avataan ilta <ArrowRight size={18} />
                    </button>
                  </div>
                  <span className="photo-caption">
                    TILLIN TUOKSUA & YHTEISLAULUA
                  </span>
                </article>
                <div className="collection-heading">
                  <div>
                    <p className="eyebrow">POIMITAAN SEURAAVA</p>
                    <h2>
                      Illan laulukirja <span>{bookSongs.length}</span>
                    </h2>
                  </div>
                  <button className="text-button" onClick={randomSong}>
                    <Shuffle size={17} />
                    Arvo laulu
                  </button>
                </div>
                <label className="song-search">
                  <Search size={19} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Etsi laulua, säveltä tai sanoja…"
                    aria-label="Etsi laulua"
                  />
                  {query && (
                    <button
                      aria-label="Tyhjennä haku"
                      onClick={() => setQuery("")}
                    >
                      <X size={17} />
                    </button>
                  )}
                </label>
                <div className="filter-row" aria-label="Laulujen suodatus">
                  {[
                    "Kaikki",
                    "Suomeksi",
                    "Ruotsiksi",
                    "Teekkarit",
                    "Suosikit",
                  ].map((f) => (
                    <button
                      key={f}
                      aria-pressed={filter === f}
                      className={filter === f ? "chosen" : ""}
                      onClick={() => setFilter(f)}
                    >
                      {f === "Suosikit" && <Heart size={14} />} {f}
                    </button>
                  ))}
                </div>
                <div className="song-list">
                  {filtered.map((song) => (
                    <article className="song-row" key={song.id}>
                      <button
                        className="song-open"
                        onClick={() => setSelected(song)}
                      >
                        <span className="song-number">
                          {String(bookSongs.indexOf(song) + 1).padStart(2, "0")}
                        </span>
                        <span className="song-summary">
                          <strong>{song.title}</strong>
                          <span>
                            <Music2 size={13} />
                            {song.melody}
                          </span>
                        </span>
                        <span className="song-language">
                          {song.language.toUpperCase()}
                        </span>
                        {progress.sung.includes(song.id) ? (
                          <Check className="sung-check" size={19} />
                        ) : (
                          <ChevronRight size={18} />
                        )}
                      </button>
                      <button
                        className={`favorite ${progress.favorites.includes(song.id) ? "is-favorite" : ""}`}
                        aria-label={`${progress.favorites.includes(song.id) ? "Poista suosikeista" : "Lisää suosikkeihin"}: ${song.title}`}
                        aria-pressed={progress.favorites.includes(song.id)}
                        onClick={() => favorite(song.id)}
                      >
                        <Heart size={18} />
                      </button>
                    </article>
                  ))}
                  {!filtered.length && (
                    <div className="empty-state">
                      <BookOpen />
                      <h3>
                        {filter === "Suosikit"
                          ? "Omat klassikot odottavat."
                          : "Tällä haulla ei löytynyt laulua."}
                      </h3>
                      <p>
                        {filter === "Suosikit"
                          ? "Tallenna laulut sydämestä tähän."
                          : "Kokeile laulun nimeä tai sanoituksen katkelmaa."}
                      </p>
                      <button
                        className="text-button"
                        onClick={() => {
                          setQuery("");
                          setFilter("Kaikki");
                        }}
                      >
                        Näytä kaikki laulut <ArrowRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            {view === "challenges" && (
              <div className="challenge-list">
                {challenges.map((c, i) => (
                  <article className="challenge-card" key={c.title}>
                    <span className="challenge-index">
                      0{i + 1} / PÖYTÄHAASTE
                    </span>
                    <h2>{c.title}</h2>
                    <p>{c.text}</p>
                    <div>
                      <button
                        className="text-button"
                        onClick={() =>
                          setSelected(bookSongs.find((s) => s.id === c.songId)!)
                        }
                      >
                        Avaa laulun sanat <ArrowRight size={17} />
                      </button>
                      <button
                        className="red-button"
                        disabled={progress.challenges.includes(i)}
                        onClick={() =>
                          setProgress((p) =>
                            p.challenges.includes(i)
                              ? p
                              : { ...p, challenges: [...p.challenges, i] },
                          )
                        }
                      >
                        {progress.challenges.includes(i) ? (
                          <>
                            <Check size={17} />
                            Suoritettu
                          </>
                        ) : (
                          "Haaste tehty +20 p"
                        )}
                      </button>
                    </div>
                  </article>
                ))}
                <Link className="legacy-link" to="/maaottelu">
                  Suomi–Ruotsi-maaottelu <ArrowRight size={18} />
                  <span>Alkuperäinen kahden pelaajan laulukisa</span>
                </Link>
              </div>
            )}
            {view === "evening" && (
              <section className="evening-panel">
                <Trophy size={36} />
                <p className="eyebrow">PÖYDÄN YHTEINEN ARVONIMI</p>
                <h2>{level}</h2>
                <div className="evening-stats">
                  <div>
                    <strong>{points}</strong>
                    <span>pistettä</span>
                  </div>
                  <div>
                    <strong>{progress.sung.length}</strong>
                    <span>laulua</span>
                  </div>
                  <div>
                    <strong>{progress.challenges.length}/3</strong>
                    <span>haastetta</span>
                  </div>
                </div>
                <p>
                  10 pistettä jokaisesta eri laulusta, 20 jokaisesta
                  pöytähaasteesta. Laulava teekkari: 40 p. Raputohtori: 100 p.
                </p>
                <div className="earned-songs">
                  {bookSongs
                    .filter((s) => progress.sung.includes(s.id))
                    .map((s) => (
                      <button
                        className="text-button"
                        key={s.id}
                        onClick={() => setSelected(s)}
                      >
                        <Check size={16} />
                        {s.title}
                        <ChevronRight size={16} />
                      </button>
                    ))}
                </div>
                <p className="storage-note">
                  Saldo ja suosikit tallentuvat tähän selaimeen. Käyttäkää
                  pöydän yhteiseen pistepeliin yhtä laitetta.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button className="text-button reset-button">
                      Aloita uusi ilta
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Aloitetaanko uusi ilta?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Laulumerkinnät ja haastepisteet nollataan tässä
                        selaimessa. Suosikit säilyvät.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Jatketaan iltaa</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          setProgress((p) => ({
                            ...p,
                            sung: [],
                            challenges: [],
                          }))
                        }
                      >
                        Aloita uusi ilta
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </section>
            )}
          </section>
          <aside className="book-aside">
            <section className="score-card">
              <div className="aside-label">
                <span>TEIDÄN PÖYTÄNNE</span>
                <Trophy size={17} />
              </div>
              <h2>{level}</h2>
              <p>
                <strong>{points}</strong> pistettä yhteislaulusta
              </p>
              <Progress
                value={Math.min(points, 100)}
                aria-label={`${points} pistettä, raputohtoriksi 100 pistettä`}
              />
              <div className="score-meta">
                <span>
                  {progress.sung.length} / {bookSongs.length} laulettu
                </span>
                <button onClick={() => setView("evening")}>
                  Illan saldo <ArrowRight size={14} />
                </button>
              </div>
            </section>
            <section className="challenge-teaser">
              <span className="small-icon">
                <Sparkles size={21} />
              </span>
              <p className="eyebrow">VÄHÄN TEEKKARIMAISTA KUNNIANHIMOA</p>
              <h2>
                Kaanon.
                <br />
                Kuinka vaikeaa
                <br />
                <em>se voi olla?</em>
              </h2>
              <p>
                Kaksi puolta pöytää, yksi tuttu sävel. Katsotaan, kohtaavatko ne
                koskaan.
              </p>
              <button
                className="text-button"
                onClick={() => setView("challenges")}
              >
                Katso pöytähaasteet <ArrowRight size={17} />
              </button>
              <span className="bonus-label">+20 P / HAASTE</span>
            </section>
            <section className="table-note">
              <p className="eyebrow">LAULUNJOHTAJAN MUISTILAPPU</p>
              <h3>
                Ensin laulu.
                <br />
                Sitten skål.
              </h3>
              <p>
                Anna aloitusääni ja odota, että pöytä on mukana. Nostetaan malja
                omalla juomalla – pisteet tulevat laulusta.
              </p>
              <span>Hyvä seura pitää tahdin.</span>
            </section>
          </aside>
        </div>
        <footer className="book-footer">
          <span className="footer-brand">Kräftskiva</span>
          <span>Teekkarin tarkkuudella. Pöytäseuran armoilla.</span>
          <span>FI / SV · SKÅL!</span>
        </footer>
        {notice && (
          <p role="status" className="storage-note">
            {notice}
          </p>
        )}
      </main>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="song-dialog">
          {selected && (
            <>
              <div className="song-dialog-top">
                <span className="eyebrow">
                  LAULU{" "}
                  {String(bookSongs.indexOf(selected) + 1).padStart(2, "0")} ·{" "}
                  {selected.language === "fi" ? "SUOMEKSI" : "PÅ SVENSKA"}
                </span>
                <button
                  className="text-button"
                  aria-pressed={large}
                  onClick={() => setLarge((v) => !v)}
                >
                  A<span style={{ fontSize: "1.3em" }}>A</span>
                  <span className="sr-only">Suurenna laulun sanoja</span>
                </button>
              </div>
              <DialogTitle>{selected.title}</DialogTitle>
              <DialogDescription>Sävel: {selected.melody}</DialogDescription>
              <a
                className="spotify-link"
                href={spotifySearch(selected)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Music2 size={18} />
                Etsi melodia Spotifysta
                <ExternalLink size={16} />
              </a>
              <p className="spotify-note">
                Avaa sävelen haku Spotifyssa ja valitse sopiva esitys.
              </p>
              <div
                className={`lyrics ${large ? "large-lyrics" : ""}`}
                lang={selected.language}
              >
                {selected.lyrics.map((line, i) =>
                  line ? <p key={i}>{line}</p> : <br key={i} />,
                )}
              </div>
              {selected.note && (
                <p className="singing-note">
                  <Sparkles size={16} />
                  {selected.note}
                </p>
              )}
              <p className="source-note">{selected.source}</p>
              <div className="song-dialog-actions">
                <button
                  className="red-button"
                  disabled={progress.sung.includes(selected.id)}
                  onClick={() => sing(selected.id)}
                >
                  <Check size={18} />
                  {progress.sung.includes(selected.id)
                    ? "Laulettu – skål!"
                    : "Laulettu! +10 p"}
                </button>
                <button
                  className="favorite"
                  aria-label="Suosikki"
                  aria-pressed={progress.favorites.includes(selected.id)}
                  onClick={() => favorite(selected.id)}
                >
                  <Heart
                    size={20}
                    fill={
                      progress.favorites.includes(selected.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
                <button
                  className="text-button"
                  onClick={() =>
                    setSelected(
                      bookSongs[
                        (bookSongs.indexOf(selected) + 1) % bookSongs.length
                      ],
                    )
                  }
                >
                  Seuraava
                  <ArrowRight size={17} />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
