import React from 'react';
import { Play, RotateCcw, Shuffle, Plus, Sparkles, AlertTriangle, ArrowDown } from 'lucide-react';

interface MutationControlsProps {
  onAddTop: () => void;
  onShuffle: () => void;
  onAddBottom: () => void;
  onRemoveTop: () => void;
  onReset: () => void;
  onPrefill: () => void;
  itemCount: number;
}

export const MutationControls: React.FC<MutationControlsProps> = ({
  onAddTop,
  onShuffle,
  onAddBottom,
  onRemoveTop,
  onReset,
  onPrefill,
  itemCount
}) => {
  return (
    <div className="bg-slate-900 text-white rounded-xl p-5 shadow-lg border border-slate-800 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Angular 21 Reactive Signal Mutators
            </span>
            <span className="text-xs text-slate-400 font-mono">
              items.length = {itemCount}
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Array Mutation Controls
          </h2>
          <p className="text-xs text-slate-400">
            Trigger array mutations to observe real-time DOM reconciliation differences.
          </p>
        </div>

        {/* Quick Test Helper */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            id="btn-prefill"
            onClick={onPrefill}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition shadow-sm cursor-pointer"
            title="Auto-fill sample text into Item Alpha and Item Beta to test immediately"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            1-Click: Auto-Fill Notes
          </button>
        </div>
      </div>

      {/* Button Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mt-4">
        <button
          type="button"
          id="btn-add-top"
          onClick={onAddTop}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shadow-sm cursor-pointer active:scale-98"
        >
          <Plus className="w-4 h-4" />
          Add Item to Top (Prepend)
        </button>

        <button
          type="button"
          id="btn-shuffle"
          onClick={onShuffle}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm cursor-pointer active:scale-98"
        >
          <Shuffle className="w-4 h-4" />
          Random Shuffle
        </button>

        <button
          type="button"
          id="btn-add-bottom"
          onClick={onAddBottom}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition shadow-sm cursor-pointer active:scale-98"
        >
          <ArrowDown className="w-4 h-4" />
          Add to Bottom (Append)
        </button>

        <button
          type="button"
          id="btn-remove-top"
          onClick={onRemoveTop}
          disabled={itemCount === 0}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-800/60 transition shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-98"
        >
          <AlertTriangle className="w-4 h-4" />
          Remove First Item
        </button>

        <button
          type="button"
          id="btn-reset"
          onClick={onReset}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition shadow-sm cursor-pointer active:scale-98 col-span-2 sm:col-span-1"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Baseline
        </button>
      </div>

      {/* Guided Walkthrough Callout */}
      <div className="mt-4 p-3 bg-slate-950/60 border border-slate-800 rounded-lg flex items-start gap-2.5 text-xs text-slate-300">
        <div className="p-1 rounded bg-blue-500/20 text-blue-400 mt-0.5">
          <Play className="w-3.5 h-3.5" />
        </div>
        <div className="flex-1">
          <strong className="text-white">How to reproduce the bug in 5 seconds:</strong>
          <span className="text-slate-300 ml-1">
            Click <strong>"1-Click: Auto-Fill Notes"</strong> (or type your own note in Item Alpha's input), then click <strong>"Add Item to Top"</strong>. Watch how the red left column incorrectly sticks the note to the newly inserted item, while the green right column moves the note down with Item Alpha.
          </span>
        </div>
      </div>
    </div>
  );
};
