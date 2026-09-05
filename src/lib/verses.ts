/** Blank lines in the source denote stanza boundaries; never guess missing words. */
export function splitVerses(lyrics: string[]): string[][] {
  return lyrics.reduce<string[][]>((verses, line) => {
    if (!line.trim()) { if (verses.at(-1)?.length) verses.push([]); }
    else { if (!verses.length) verses.push([]); verses[verses.length - 1].push(line); }
    return verses;
  }, []).filter(verse => verse.length);
}
/** Display the booklet's inconsistent repeat punctuation as conventional bar signs. */
export function displayRepeats(lyrics: string[]): string[] {
  let opening = true;
  return lyrics.map(line => line.replace(/:[,;]:|(?<!:);:/g, () => {
    const sign = opening ? "|:" : ":|";
    opening = !opening;
    return sign;
  }));
}
