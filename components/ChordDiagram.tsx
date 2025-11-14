
import React from 'react';
import { CHORD_DIAGRAMS } from '../constants';
import type { HoveredChord } from '../types';

interface ChordDiagramProps {
    hoveredChord: HoveredChord | null;
}

const parseDiagram = (diagram: string) => {
    const frets = diagram.split('');
    const numericFrets = frets.map(f => (f === 'x' ? -1 : parseInt(f, 10)));
    const maxFret = Math.max(...numericFrets.filter(f => f > 0), 4);
    const minFret = Math.min(...numericFrets.filter(f => f > 0 && f !== -1), 1);
    const fretCount = Math.max(4, maxFret - minFret + 1);
    const baseFret = minFret > 1 ? minFret : 1;

    return { frets, baseFret, fretCount };
};

export const ChordDiagram: React.FC<ChordDiagramProps> = ({ hoveredChord }) => {
    if (!hoveredChord) return null;

    const diagramString = CHORD_DIAGRAMS[hoveredChord.name];
    if (!diagramString) return null;

    const { frets, baseFret, fretCount } = parseDiagram(diagramString);

    const PADDING = 10;
    const FRET_HEIGHT = 20;
    const STRING_SPACING = 15;
    const DIAGRAM_WIDTH = STRING_SPACING * 5 + PADDING * 2;
    const DIAGRAM_HEIGHT = FRET_HEIGHT * fretCount + PADDING * 2 + 30;

    const style: React.CSSProperties = {
        position: 'fixed',
        top: `${hoveredChord.rect.bottom + 10}px`,
        left: `${hoveredChord.rect.left + hoveredChord.rect.width / 2 - DIAGRAM_WIDTH / 2}px`,
        width: `${DIAGRAM_WIDTH}px`,
        height: `${DIAGRAM_HEIGHT}px`,
        transform: 'translateY(0)',
        transition: 'opacity 0.2s, transform 0.2s',
        zIndex: 50,
    };

    return (
        <div style={style} className="bg-slate-800 border border-slate-600 rounded-lg shadow-2xl p-4 animate-fade-in">
            <h4 className="text-center font-bold text-cyan-400 mb-2">{hoveredChord.name}</h4>
            <svg width="100%" height="100%" viewBox={`0 0 ${DIAGRAM_WIDTH} ${DIAGRAM_HEIGHT}`}>
                {baseFret > 1 && (
                    <text x={PADDING - 8} y={PADDING + FRET_HEIGHT / 2 + 5} fontSize="12" fill="#94a3b8" textAnchor="end">{baseFret}fr</text>
                )}
                {/* Strings */}
                {[...Array(6)].map((_, i) => (
                    <line key={i} x1={PADDING + i * STRING_SPACING} y1={PADDING + 15} x2={PADDING + i * STRING_SPACING} y2={PADDING + FRET_HEIGHT * fretCount + 15} stroke="#475569" strokeWidth="1" />
                ))}
                {/* Frets */}
                {[...Array(fretCount + 1)].map((_, i) => (
                     <line key={i} x1={PADDING} y1={PADDING + i * FRET_HEIGHT + 15} x2={PADDING + 5 * STRING_SPACING} y2={PADDING + i * FRET_HEIGHT + 15} stroke="#475569" strokeWidth={i === 0 ? 3 : 1} />
                ))}

                {/* Notes */}
                {frets.map((fret, i) => {
                    if (fret === 'x') {
                        return <text key={i} x={PADDING + i * STRING_SPACING} y={PADDING + 8} fontSize="12" fill="#94a3b8" textAnchor="middle">x</text>;
                    }
                    if (fret === '0') {
                        return <circle key={i} cx={PADDING + i * STRING_SPACING} cy={PADDING + 8} r="4" stroke="#e2e8f0" strokeWidth="1" fill="none" />;
                    }
                    const fretNum = parseInt(fret, 10);
                    const yPos = PADDING + (fretNum - (baseFret > 1 ? baseFret -1 : 0)) * FRET_HEIGHT - FRET_HEIGHT / 2 + 15;
                    return <circle key={i} cx={PADDING + i * STRING_SPACING} cy={yPos} r="5" fill="#e2e8f0" />;
                })}
            </svg>
        </div>
    );
};
