import React from 'react';
import { Undo2, Redo2 } from 'lucide-react';

interface HistoryControlsProps {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const HistoryControls: React.FC<HistoryControlsProps> = ({ undo, redo, canUndo, canRedo }) => {
  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
      <button 
        onClick={undo}
        disabled={!canUndo}
        className="p-1.5 hover:bg-white rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        title="Undo (Ctrl+Z)"
      >
        <Undo2 className="w-4 h-4" />
      </button>
      <button 
        onClick={redo}
        disabled={!canRedo}
        className="p-1.5 hover:bg-white rounded-md disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        title="Redo (Ctrl+Y)"
      >
        <Redo2 className="w-4 h-4" />
      </button>
    </div>
  );
};
