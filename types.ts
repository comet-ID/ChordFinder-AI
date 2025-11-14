
export interface SongLine {
  chords: string;
  lyrics: string;
}

export interface SongData {
  title: string;
  artist: string;
  content: SongLine[];
}

export interface HoveredChord {
  name: string;
  rect: DOMRect;
}

export interface Artist {
  name: string;
  songs: string[];
}

export interface ArtistData {
  [key: string]: Artist[];
}
