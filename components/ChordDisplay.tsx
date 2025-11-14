
import React from 'react';
import type { SongData, HoveredChord } from '../types';
import { SHARP_SCALE, FLAT_SCALE, CHORD_ALIASES } from '../constants';

interface ChordDisplayProps {
  song: SongData;
  transposeOffset: number;
  onChordHover: (details: HoveredChord | null) => void;
}

const transposeChord = (chord: string, offset: number): string => {
  if (offset === 0) return chord;
  if (!chord || chord.startsWith('[') || chord.startsWith('(')) return chord;

  const regex = /^([A-G][#b]?)(.*)/;
  const match = chord.match(regex);

  if (!match) return chord;

  let root = match[1];
  const rest = match[2];

  root = CHORD_ALIASES[root] || root;

  const scale = root.includes('#') ? SHARP_SCALE : FLAT_SCALE;
  const scaleToUse = offset > 0 ? SHARP_SCALE : FLAT_SCALE;

  let index = scale.indexOf(root);
  if (index === -1) return chord;

  let newIndex = (index + offset) % 12;
  if (newIndex < 0) {
    newIndex += 12;
  }
  
  const newRoot = scaleToUse[newIndex];
  return newRoot + rest;
};

const Chord: React.FC<{ originalChord: string; transposeOffset: number; onChordHover: (details: HoveredChord | null) => void; }> = ({ originalChord, transposeOffset, onChordHover }) => {
  const transposedChord = transposeChord(originalChord, transposeOffset);

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    onChordHover({ name: transposedChord, rect: e.currentTarget.getBoundingClientRect() });
  };
  
  const handleMouseLeave = () => {
    onChordHover(null);
  };

  return (
    <span 
      className="font-bold text-cyan-400 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {transposedChord}
    </span>
  );
};


export const ChordDisplay: React.FC<ChordDisplayProps> = ({ song, transposeOffset, onChordHover }) => {
  return (
    <div className="text-left">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{song.title}</h2>
      <h3 className="text-xl md:text-2xl font-semibold text-slate-400 mb-8">{song.artist}</h3>

      <pre className="font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap overflow-x-auto">
        {song.content.map((line, index) => (
          <React.Fragment key={index}>
            <div className="text-cyan-400 font-bold min-h-[1.2em]">
              {line.chords.split(/(\s+)/).map((part, i) =>
                /\s+/.test(part) || part === '' ? (
                  <span key={i}>{part}</span>
                ) : (
                  <Chord key={i} originalChord={part} transposeOffset={transposeOffset} onChordHover={onChordHover} />
                )
              )}
            </div>
            <div className="text-slate-200 mb-4 min-h-[1.2em]">
              {line.lyrics || ' '}
            </div>
          </React.Fragment>
        ))}
      </pre>
    </div>
  );
};
