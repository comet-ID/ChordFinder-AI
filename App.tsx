
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { ChordDisplay } from './components/ChordDisplay';
import { Controls } from './components/Controls';
import { findSongChords } from './services/geminiService';
import type { SongData, HoveredChord } from './types';
import { GuitarIcon, LoaderIcon, ErrorIcon, UsersIcon } from './components/icons';
import { ChordDiagram } from './components/ChordDiagram';
import { ArtistBrowser } from './components/ArtistBrowser';

const App: React.FC = () => {
  const [songData, setSongData] = useState<SongData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [transposeOffset, setTransposeOffset] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(50);
  const [hoveredChord, setHoveredChord] = useState<HoveredChord | null>(null);
  const [showArtistBrowser, setShowArtistBrowser] = useState(false);

  const scrollIntervalRef = useRef<number | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setSongData(null);
    setTransposeOffset(0);
    setIsScrolling(false);
    setShowArtistBrowser(false);
    window.scrollTo(0, 0);

    try {
      const data = await findSongChords(query);
      if (data) {
        setSongData(data);
      } else {
        setError('Could not find chords for this song. Please try another one.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching chords. Please check your connection or API key.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetApp = () => {
    setSongData(null);
    setError(null);
    setIsLoading(false);
    setTransposeOffset(0);
    setIsScrolling(false);
    setShowArtistBrowser(false);
  };

  const toggleScrolling = useCallback(() => {
    setIsScrolling(prev => !prev);
  }, []);

  useEffect(() => {
    if (isScrolling) {
      scrollIntervalRef.current = window.setInterval(() => {
        window.scrollBy(0, 1);
      }, Math.max(10, 100 - scrollSpeed));
    } else {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    }
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [isScrolling, scrollSpeed]);
  
  const renderMainContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
          <LoaderIcon className="w-16 h-16 text-cyan-400 animate-spin" />
          <p className="mt-4 text-lg">Finding chords for you...</p>
        </div>
      );
    }
    if (error) {
       return (
         <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
          <ErrorIcon className="w-16 h-16 text-red-500" />
          <p className="mt-4 text-lg text-red-400">{error}</p>
        </div>
       );
    }
    if (songData) {
      return (
         <ChordDisplay song={songData} transposeOffset={transposeOffset} onChordHover={setHoveredChord} />
      );
    }
    if (showArtistBrowser) {
        return <ArtistBrowser onSongSelect={handleSearch} onBack={() => setShowArtistBrowser(false)} />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white">The Ultimate Chord Finder</h2>
            <p className="mt-4 mb-8 text-lg text-slate-400 max-w-2xl">Powered by AI, our database is limitless. Search for any song from any artist in the world.</p>
            <div className="w-full max-w-xl mb-6">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
            <button
                onClick={() => setShowArtistBrowser(true)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-full transition-colors duration-300"
            >
                <UsersIcon className="w-5 h-5" />
                Or, Browse by Artist A-Z
            </button>
        </div>
    );
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-slate-800 text-slate-200">
      <header className="sticky top-0 z-20 bg-gray-900/80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetApp} title="Back to Home">
            <GuitarIcon className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-wider">ChordFinder <span className="text-cyan-400">AI</span></h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="relative">
          {songData && (
            <Controls
              transposeOffset={transposeOffset}
              onTranspose={setTransposeOffset}
              isScrolling={isScrolling}
              onToggleScrolling={toggleScrolling}
              scrollSpeed={scrollSpeed}
              onSetScrollSpeed={setScrollSpeed}
            />
          )}

          <div className="mt-8 bg-slate-900/50 rounded-lg p-4 md:p-8 shadow-xl min-h-[60vh]">
            {renderMainContent()}
          </div>
        </div>
      </main>
      <ChordDiagram hoveredChord={hoveredChord} />
       <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Powered by Gemini API. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default App;
