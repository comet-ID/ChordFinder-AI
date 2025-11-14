
export const SHARP_SCALE: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const FLAT_SCALE: string[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

export const CHORD_ALIASES: { [key: string]: string } = {
  'Db': 'C#',
  'Eb': 'D#',
  'Gb': 'F#',
  'Ab': 'G#',
  'Bb': 'A#',
};

// Simplified chord diagrams: strings EADGBe, x=mute, 0=open, 1-N=fret
export const CHORD_DIAGRAMS: { [key: string]: string } = {
    'C': 'x32010', 'Cmaj7': 'x32000', 'C7': 'x32310', 'Cm': 'x35543',
    'G': '320003', 'G7': '320001', 'Gm': '355333',
    'D': 'xx0232', 'D7': 'xx0212', 'Dm': 'xx0231',
    'A': 'x02220', 'A7': 'x02020', 'Am': 'x02210',
    'E': '022100', 'E7': '020100', 'Em': '022000',
    'F': '133211', 'Fm': '133111',
    'B': 'x24442', 'B7': 'x21202', 'Bm': 'x24432',
    'C#': 'x46664', 'Db': 'x46664', 'C#m': 'x46654',
    'D#': 'x68886', 'Eb': 'x68886', 'D#m': 'x68876',
    'F#': '244322', 'Gb': '244322', 'F#m': '244222',
    'G#': '466544', 'Ab': '466544', 'G#m': '466444',
    'A#': 'x13331', 'Bb': 'x13331', 'A#m': 'x13321',
};
