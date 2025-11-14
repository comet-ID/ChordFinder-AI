
import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter song title or artist..."
          className="w-full pl-4 pr-12 py-3 bg-slate-800 text-white border-2 border-slate-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute inset-y-0 right-0 flex items-center justify-center px-4 text-slate-400 hover:text-cyan-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          <SearchIcon className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};
