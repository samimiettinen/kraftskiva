export interface Song {
  id: string;
  title: string;
  melody: string;
  lyrics: string[];
  isRefrain?: boolean;
  note?: string;
}

export const helanGar: Song = {
  id: "helan-gar",
  title: "Helan Går",
  melody: "Traditionell",
  lyrics: [
    "Helan går!",
    "Sjung hopp faderallan lallan lej!",
    "Helan går!",
    "Sjung hopp faderallan lej!",
    "Och den som inte helan tar,",
    "han heller inte halvan får.",
    "Helan gååår!",
    "(Sjung hopp faderallan lej!)",
  ],
};

export const songs: Song[] = [
  {
    id: "abc",
    title: "ABC",
    melody: "ABC",
    isRefrain: true,
    lyrics: [
      "ABC, i kudden jag drunknar.",
      "CDE, mitt huvud det dunkar.",
      "EFG, jag ångrar alla snapsar jag drack.",
      "ABC, vi sjöng och var glada,",
      "CDE, och badade nakna,",
      "EFG, jag vill till Bacchus rikta ett tack!",
    ],
  },
  {
    id: "festen-i-mitt-hjarta",
    title: "Festen i mitt hjärta",
    melody: "Stockholm i mitt hjärta",
    lyrics: [
      "Festen i mitt hjärta,",
      "låt oss besjunga en skål.",
      "Här utpå våran veranda,",
      "vi dricker så mycket vi tål.",
      "Med kräftor från hela världen",
      "suger vi i oss allt.",
      "Genom kräftornas kärlek till magen",
      "får vi blandning av dill och salt.",
    ],
  },
  {
    id: "vara-vanner",
    title: "Våra vänner",
    melody: "Flickan hon går i ringen",
    lyrics: [
      "Vi skålar för våra vänner,",
      "och dom som vi känner,",
      "och dom som vi inte känner –",
      "dom skiter vi i!",
      "Vi skiter i våra vänner,",
      "och dom som vi känner,",
      "och dom som vi inte känner –",
      "dom skålar vi för!",
    ],
  },
  {
    id: "bara-dricka-nubbe",
    title: "Bara dricka nubbe",
    melody: "Bara bada bastu",
    note: "Klang: Finlandssvensk",
    isRefrain: true,
    lyrics: [
      "Vi ska dricka nubbe, nubbe",
      "Hällon åpp och släpp all stress idag",
      "Nubbebröder – det är vi som glöder",
      "En beski dropp, nåja!",
      "Bara dricka nubbe, nubbe",
      "Botten åpp, så huvet ditt blir yr",
      "Ooh-whoa, dricka nubbe, jåå!",
    ],
  },
  {
    id: "genom-snaps-och-dimma",
    title: "Genom snaps och dimma",
    melody: "Genom eld och vatten",
    isRefrain: true,
    lyrics: [
      "Jag ska guida dig i berusat tillstånd",
      "Till en hemlig plats",
      "Där vi ska sätta oss och nubbe ska du få",
      "(OCH VI DRICKER ALLTID TVÅ)",
      "Från en krokig stig",
      "Till den djupaste av skogar ska vi gå",
      "Om du frågar snällt",
      "Så alla mina snapsar ska du få",
      "(OCH VI DRICKER ALLTID TVÅ)",
    ],
  },
  {
    id: "kraftor-kraver",
    title: "Kräftor kräver ju små nubbar",
    melody: "Räven raskar över isen",
    lyrics: [
      "Kräftor kräver ju små nubbar,",
      "Kräftor kräver ju små nubbar.",
      "En liten snaps, till varje klo,",
      "det är för strupen en lisa.",
      "Så här gör kräftvännen när det står,",
      "kräftor på bordet och när han får,",
      "en liten snaps, till varje klo.",
      "Nu är det slut på vår visa.",
    ],
  },
  {
    id: "sma-kraftorna",
    title: "Små kräftorna",
    melody: "Små grodorna",
    lyrics: [
      "Små kräftorna, små kräftorna är tråkiga att se,",
      "Ej öron, ej nypor ej, ej rumpor hava de.",
      "Kloak ka ka Kloak ka ka så smakar deras spad,",
      "Klorin klorin klorin klorin den snapsen får mej glad!",
    ],
  },
  {
    id: "kraftan",
    title: "Kräftan",
    melody: "Jänta å ja",
    lyrics: [
      "Kräftan och jag, kräftan och jag,",
      "vi trivs så bra tillsammans, hon och jag.",
      "Kräftan och jag, kräftan och jag,",
      "vi trivs i fröjd och gamman.",
      "Där ligger hon på ett fat mellan dill",
      "och lovar precis så mycket du vill.",
      "Och får man en iskall nubbe därtill",
      "av glädje man faller samman.",
    ],
  },
  {
    id: "supen-den-rinner",
    title: "Supen den rinner",
    melody: "Mors lilla Olle",
    lyrics: [
      "Supen den rinner längs strupen fram,",
      "den värmer och gör att det fest blir med glam,",
      "och äta sin kräfta med smak utav dill,",
      "Man kan inte motstå,",
      "det kräver en till.",
    ],
  },
  {
    id: "droppar-faller",
    title: "Droppar faller lätt",
    melody: "Bä, bä vita lamm",
    lyrics: [
      "Droppar faller lätt",
      "uti kräftans dar.",
      "Droppar titt och tätt",
      "vi tillsammans tar.",
      "Vi tar en snaps för far",
      "och sedan en för mor",
      "och kräftans klo för lille, lille bror.",
    ],
  },
  {
    id: "ta-en-sup",
    title: "Ta en sup",
    melody: "Tänd ett ljus",
    lyrics: [
      "Ta en sup och låt det bränna",
      "låt aldrig halsen få känna, det är svalt nu",
      "men du blir varmare igen",
      "ta en sup för kräftan du käka",
      "akta mattan, sluta och kräka",
      "Ta en sup… för kräftans dag.",
    ],
  },
  {
    id: "dillprydda-berg",
    title: "Dillprydda berg",
    melody: "Vi går över daggstänkta berg",
    lyrics: [
      "Vi går mot de dillprydda berg, fallera,",
      "som lånat av rubinerna sin färg, fallera!",
      "Så skön på stora faten ligger kräftan, gudamaten,",
      "vilken stärker och styrker vår märg, fallera!",
    ],
  },
  {
    id: "lille-sup",
    title: "Lille sup",
    melody: "Lille katt",
    lyrics: [
      "Lille sup, lille sup,",
      "lille söte supen",
      "nu ska du, nu ska du,",
      "ner igenom strupen.",
    ],
  },
  {
    id: "krafta-med-dill",
    title: "Kräfta med dill",
    melody: "Blinka lilla stjärna",
    lyrics: [
      "Kräfta, kräfta prydd med dill,",
      "och en immig sup därtill,",
      "bröd och smör och ost och sill",
      "och så några supar till.",
      "Kräfta, kräfta prydd med dill,",
      "nu vi får allt vad vi vill.",
    ],
  },
  {
    id: "uppaa-kraftkalaset",
    title: "Uppå kräftkalaset",
    melody: "Uppå källarbacken",
    lyrics: [
      "Uppå kräftkalaset, uppå kräftkalaset",
      "där må ni tro",
      "tar man sig en liten, tar man sig en liten",
      "till varje klo!",
      "Genom strupen, lilla supen",
      "rinner ner och gör oss glada!",
      "Dill i kronor, vackra honor",
      "– hoppa i så får ni bada!",
    ],
  },
];

export function getShuffledSongs(): Song[] {
  return [...songs].sort(() => Math.random() - 0.5);
}

export function getShuffledSwedishSongs(): Song[] {
  return [...songs].sort(() => Math.random() - 0.5);
}
