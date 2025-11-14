
import React from 'react';
import { PlusIcon, MinusIcon, PlayIcon, PauseIcon } from './icons';

interface ControlsProps {
  transposeOffset: number;
  onTranspose: (offset: number) => void;
  isScrolling: boolean;
  onToggleScrolling: () => void;
  scrollSpeed: number;
  onSetScrollSpeed: (speed: number) => void;
}

const ControlButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string; title: string }> = ({ onClick, children, className = '', title }) => (
    <button
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center w-10 h-10 bg-slate-700 hover:bg-cyan-600 rounded-md transition-all duration-200 text-white ${className}`}
    >
      {children}
    </button>
);

export const Controls: React.FC<ControlsProps> = ({
  transposeOffset,
  onTranspose,
  isScrolling,
  onToggleScrolling,
  scrollSpeed,
  onSetScrollSpeed,
}) => {
  return (
    <div className="sticky top-[90px] z-10 flex flex-wrap gap-4 items-center bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg mb-6 shadow-md">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm mr-2">Transpose</span>
        <ControlButton onClick={() => onTranspose(transposeOffset - 1)} title="Transpose Down">
          <MinusIcon className="w-5 h-5" />
        </ControlButton>
        <span className="font-bold text-lg w-12 text-center text-cyan-400">
          {transposeOffset > 0 ? `+${transposeOffset}` : transposeOffset}
        </span>
        <ControlButton onClick={() => onTranspose(transposeOffset + 1)} title="Transpose Up">
          <PlusIcon className="w-5 h-5" />
        </ControlButton>
      </div>

      <div className="flex items-center gap-2">
         <span className="font-semibold text-sm mr-2">Auto Scroll</span>
        <ControlButton onClick={onToggleScrolling} title={isScrolling ? "Pause Scrolling" : "Start Scrolling"}>
          {isScrolling ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
        </ControlButton>
        <input
            type="range"
            min="1"
            max="100"
            value={scrollSpeed}
            onChange={(e) => onSetScrollSpeed(Number(e.target.value))}
            className="w-24 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            title={`Scroll Speed: ${scrollSpeed}`}
        />
      </div>
    </div>
  );
};
