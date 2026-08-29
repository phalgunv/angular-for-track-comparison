import React, { useState } from 'react';
import { Item, UncontrolledInputMap } from '../types';
import { AlertCircle, CheckCircle2, AlertTriangle, Cpu, Tag, Hash, Zap, RefreshCw, Clock } from 'lucide-react';

interface TrackComparisonViewProps {
  items: Item[];
  indexInputState: UncontrolledInputMap;
  idInputState: UncontrolledInputMap;
  inputOriginMap: Record<number, string>; // Maps slot index to the item name that originally had focus/input
  onIndexInputChange: (index: number, value: string, currentItemName: string) => void;
  onIdInputChange: (itemId: string, value: string) => void;
  onRemoveItem: (itemId: string) => void;
  onAddTop: () => void;
}

export const TrackComparisonView: React.FC<TrackComparisonViewProps> = ({
  items,
  indexInputState,
  idInputState,
  inputOriginMap,
  onIndexInputChange,
  onIdInputChange,
  onRemoveItem,
  onAddTop
}) => {
  const [highlightChanges, setHighlightChanges] = useState(true);

  return (
    <div className="space-y-4">
      {/* Top Banner Options */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-800">Side-by-Side DOM Analysis:</span>
          <span className="text-slate-500">
            Compare DOM node lifecycle and uncontrolled form element synchronization.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={highlightChanges}
              onChange={(e) => setHighlightChanges(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Highlight DOM Reconciliation Alerts
          </label>
        </div>
      </div>

      {/* 2-Column Comparison Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* ================= COLUMN 1: track $index (FLAWED) ================= */}
        <div className="bg-white rounded-xl border-2 border-red-200 shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-red-50/80 border-b border-red-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                Flawed Migration Fallback
              </span>
              <span className="text-xs font-mono font-bold text-red-700 bg-red-100/60 px-2 py-0.5 rounded">
                track $index
              </span>
            </div>
            
            <h3 className="text-base font-mono font-bold text-slate-900 mb-1">
              @for (item of items(); track $index)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Angular reuses existing DOM nodes by their numeric index. When array elements shift (e.g. via prepend or shuffle), data is pushed into old DOM elements without moving the actual DOM subtree.
            </p>

            <div className="mt-3 p-2 bg-red-100/70 rounded-lg border border-red-200 text-xs text-red-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong>The Critical Bug:</strong> Uncontrolled DOM inputs and internal component states stay attached to numeric index <code className="bg-red-200/80 px-1 py-0.5 rounded font-mono text-[11px]">0, 1, 2...</code>, resulting in silent data corruption!
              </div>
            </div>
          </div>

          {/* List Content */}
          <div className="p-4 space-y-3.5 flex-1 bg-slate-50/50">
            {items.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                No items in array. Click "Add Item to Top" or "Reset" above.
              </div>
            ) : (
              items.map((item, idx) => {
                const inputValue = indexInputState[idx] || '';
                const originItemName = inputOriginMap[idx];
                const isDesynchronized = originItemName && originItemName !== item.name && inputValue.length > 0;

                return (
                  <div
                    key={`index-slot-${idx}`}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      isDesynchronized && highlightChanges
                        ? 'bg-red-50/90 border-red-400 shadow-md ring-2 ring-red-400/30'
                        : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                    }`}
                  >
                    {/* Row Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 font-mono">
                          <Hash className="w-3 h-3 text-slate-400" />
                          Index: {idx}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700 font-mono">
                          <Cpu className="w-3 h-3 text-red-500" />
                          DOM Node Slot #{idx}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        Item ID: {item.id}
                      </span>
                    </div>

                    {/* Item Info */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          Created: {item.timestamp} &bull; {item.badge}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-slate-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition cursor-pointer"
                        title="Remove this item"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Interactive Input (Uncontrolled DOM State) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <label htmlFor={`track-index-input-${idx}`} className="flex items-center gap-1.5">
                          <span>Uncontrolled Input (Local Note):</span>
                          {inputValue && (
                            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-normal">
                              Active
                            </span>
                          )}
                        </label>
                        <span className="text-[11px] text-slate-400 font-normal">
                          Bound to DOM Slot #{idx}
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          id={`track-index-input-${idx}`}
                          type="text"
                          value={inputValue}
                          onChange={(e) => onIndexInputChange(idx, e.target.value, item.name)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              onAddTop();
                            }
                          }}
                          placeholder={`Type note for ${item.name}...`}
                          className={`w-full px-3 py-2 text-xs rounded-lg border outline-none transition font-sans ${
                            inputValue ? 'pr-28' : ''
                          } ${
                            isDesynchronized && highlightChanges
                              ? 'border-red-400 bg-red-50 text-red-950 font-medium focus:ring-2 focus:ring-red-400'
                              : 'border-slate-300 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                          }`}
                        />
                        {inputValue && (
                          <button
                            type="button"
                            onClick={onAddTop}
                            className="absolute right-1.5 px-2 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white rounded cursor-pointer transition shadow-xs flex items-center gap-1"
                            title="Press Enter or click here to prepend a new item and test DOM slot recycling"
                          >
                            <span>Test ↵</span>
                          </button>
                        )}
                      </div>
                      {inputValue && !isDesynchronized && (
                        <div className="text-[11px] text-blue-600 flex items-center gap-1">
                          <span>💡 Note typed! Press <strong>Enter ↵</strong> or click <strong>"Add Item to Top"</strong> above to see it shift.</span>
                        </div>
                      )}
                    </div>

                    {/* Desynchronization Warning Badge */}
                    {isDesynchronized && highlightChanges ? (
                      <div className="mt-2.5 p-2 bg-red-100 border border-red-300 rounded-md text-[11px] text-red-900 flex items-start gap-1.5 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>STATE LEAKAGE DETECTED!</strong> This input note was typed when <em className="font-semibold">{originItemName}</em> was at index {idx}. Because of <code className="font-mono bg-red-200/80 px-1 py-0.5 rounded">track $index</code>, the DOM node stayed at index {idx} and is now wrongly applied to <strong className="underline">{item.name}</strong>!
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 text-[11px] text-slate-400 italic">
                        DOM node recycled when array indices shift.
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= COLUMN 2: track item.id (RECOMMENDED) ================= */}
        <div className="bg-white rounded-xl border-2 border-emerald-300 shadow-sm overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-emerald-50/80 border-b border-emerald-100 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Enterprise Best Practice
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                track item.id
              </span>
            </div>

            <h3 className="text-base font-mono font-bold text-slate-900 mb-1">
              @for (item of items(); track item.id)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Angular tracks views by unique entity identity. When items are prepended, removed, or shuffled, the exact physical DOM subtree moves to its new position along with all internal state.
            </p>

            <div className="mt-3 p-2 bg-emerald-100/70 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Guaranteed State Integrity:</strong> Uncontrolled inputs, focus rings, scroll positions, animations, and child components remain 100% attached to the matching business entity.
              </div>
            </div>
          </div>

          {/* List Content */}
          <div className="p-4 space-y-3.5 flex-1 bg-slate-50/50">
            {items.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg">
                No items in array. Click "Add Item to Top" or "Reset" above.
              </div>
            ) : (
              items.map((item, idx) => {
                const inputValue = idInputState[item.id] || '';

                return (
                  <div
                    key={`id-slot-${item.id}`}
                    className="p-4 rounded-xl border border-emerald-200 bg-white shadow-sm hover:border-emerald-300 transition-all duration-200"
                  >
                    {/* Row Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700 font-mono">
                          <Hash className="w-3 h-3 text-slate-400" />
                          Index: {idx}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                          <Tag className="w-3 h-3 text-emerald-600" />
                          DOM Node Key: {item.id}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Identity Bound
                      </span>
                    </div>

                    {/* Item Info */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span>{item.name}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {item.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3 text-slate-400" />
                          Created: {item.timestamp} &bull; {item.badge}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-xs text-slate-400 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition cursor-pointer"
                        title="Remove this item"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Interactive Input (Preserved with Identity) */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                        <label htmlFor={`track-id-input-${item.id}`} className="flex items-center gap-1.5">
                          <span>Uncontrolled Input (Local Note):</span>
                          {inputValue && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-normal">
                              Active
                            </span>
                          )}
                        </label>
                        <span className="text-[11px] text-emerald-600 font-medium">
                          Securely Bound to '{item.id}'
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <input
                          id={`track-id-input-${item.id}`}
                          type="text"
                          value={inputValue}
                          onChange={(e) => onIdInputChange(item.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              onAddTop();
                            }
                          }}
                          placeholder={`Type note for ${item.name}...`}
                          className={`w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition font-sans ${
                            inputValue ? 'pr-28' : ''
                          }`}
                        />
                        {inputValue && (
                          <button
                            type="button"
                            onClick={onAddTop}
                            className="absolute right-1.5 px-2 py-1 text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded cursor-pointer transition shadow-xs flex items-center gap-1"
                            title="Press Enter or click here to prepend a new item and test identity preservation"
                          >
                            <span>Test ↵</span>
                          </button>
                        )}
                      </div>
                      {inputValue && (
                        <div className="text-[11px] text-emerald-700 flex items-center gap-1">
                          <span>💡 Note typed! Press <strong>Enter ↵</strong> or click <strong>"Add Item to Top"</strong> above to see identity stay intact.</span>
                        </div>
                      )}
                    </div>

                    {/* Verification Note */}
                    <div className="mt-2 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      DOM element retains state regardless of prepend or shuffle.
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
