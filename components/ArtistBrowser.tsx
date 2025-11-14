
import React, { useState } from 'react';
import { ARTISTS_DATA } from '../data/artists';
import type { Artist } from '../types';
import { ChevronLeftIcon, MusicNoteIcon, UsersIcon, SearchIcon } from './icons';

interface ArtistBrowserProps {
  onSongSelect: (query: string) => void;
  onBack: () => void;
}

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

export const ArtistBrowser: React.FC<ArtistBrowserProps> = ({ onSongSelect, onBack }) => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const artists = ARTISTS_DATA[selectedLetter] || [];

  const handleArtistSelect = (artist: Artist) => {
    setSelectedArtist(artist);
  };

  const handleBackToArtists = () => {
    setSelectedArtist(null);
  };

  const handleSongSelect = (songTitle: string) => {
    if (selectedArtist) {
      onSongSelect(`${songTitle} by ${selectedArtist.name}`);
    }
  };

  return (
    <div className="w-full text-left">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ChevronLeftIcon className="w-5 h-5" />
            Back to Search
        </button>
      </div>
      
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-300 mb-2">Browse Artists</h2>
        <p className="text-slate-500 mb-6">Select a letter to find artists, then pick a song to see its chords.</p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
            {ALPHABET.map(letter => (
            <button
                key={letter}
                onClick={() => { setSelectedLetter(letter); setSelectedArtist(null); }}
                className={`w-8 h-8 rounded-md text-sm font-bold transition-colors duration-200 ${
                selectedLetter === letter 
                    ? 'bg-cyan-500 text-white' 
                    : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                }`}
            >
                {letter}
            </button>
            ))}
        </div>
      </div>


      <div className="bg-slate-800/50 p-4 sm:p-6 rounded-lg min-h-[40vh] transition-all duration-300">
        {!selectedArtist ? (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <UsersIcon className="w-6 h-6"/>
              Artists starting with "{selectedLetter}"
            </h3>
            {artists.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {artists.map(artist => (
                  <li key={artist.name}>
                    <button 
                      onClick={() => handleArtistSelect(artist)}
                      className="w-full text-left p-4 bg-slate-700 hover:bg-cyan-600 hover:text-white rounded-lg transition-all duration-200"
                    >
                      {artist.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400 mt-8 text-center">No artists found for this letter.</p>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center mb-4">
              <button onClick={handleBackToArtists} className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors">
                <ChevronLeftIcon className="w-5 h-5" />
                Back to Artists
              </button>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4 flex items-center justify-center gap-2">
              <MusicNoteIcon className="w-6 h-6" />
              Songs by {selectedArtist.name}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedArtist.songs.map(song => (
                <li key={song}>
                  <button
                    onClick={() => handleSongSelect(song)}
                    className="w-full text-left p-4 bg-slate-700 hover:bg-cyan-600 hover:text-white rounded-lg transition-all duration-200"
                  >
                    {song}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
