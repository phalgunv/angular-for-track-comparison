import React from 'react';
import { Item } from '../types';
import { Layers, ArrowRight, CheckCircle2, XCircle, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface DomReconciliationInspectorProps {
  items: Item[];
}

export const DomReconciliationInspector: React.FC<DomReconciliationInspectorProps> = ({ items }) => {
  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
            Angular Internal Engine Mechanics
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          How Angular 21's LView Reconciles `@for` Loops in Memory
        </h2>
        <p className="text-sm text-slate-600 mt-1">
          Visualizing the difference between <strong>Index-Based Slot Recycling</strong> and <strong>Identity Map View Relocation</strong> during dynamic array mutations.
        </p>
      </div>

      {/* Side-by-Side Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Index Tracking Diagram */}
        <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-red-900/60 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="font-mono font-bold text-sm text-red-400">track $index</span>
            </div>
            <span className="text-[11px] font-mono bg-red-950/80 text-red-300 px-2 py-0.5 rounded border border-red-800/60">
              Positional Slot Lookup
            </span>
          </div>

          <div className="text-xs text-slate-300 space-y-3 mb-4">
            <p>
              When tracking with <code className="text-red-300 font-mono font-bold">$index</code>, Angular stores views in a linear array indexed by <code className="text-red-300 font-mono">0, 1, 2...</code>:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1.5">
              <div className="text-slate-500">// ViewContainer LView slots:</div>
              {items.slice(0, 4).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-slate-300">
                  <span>Slot[{idx}] &rarr; &lt;div DOM Node #{idx}&gt;</span>
                  <span className="text-amber-400">// Bound to Item: "{item.id}"</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-red-950/50 border border-red-900/80 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-red-300">
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              What Happens on Prepend (Add to Top):
            </div>
            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 pl-1 leading-relaxed">
              <li>Angular evaluates slot index 0. The slot already exists in the DOM.</li>
              <li>Angular updates the interpolated text expressions in Node #0 with the new item's properties.</li>
              <li><strong className="text-red-300">Crucial Flaw:</strong> Uncontrolled DOM values (e.g. <code className="text-slate-100">&lt;input&gt;.value</code>, selection range, active focus, video playback timestamp) are NOT bound to interpolation. They remain frozen inside DOM Node #0!</li>
              <li>The user sees their note for "Item Alpha" suddenly attached to "Item New"!</li>
            </ol>
          </div>
        </div>

        {/* Identity Tracking Diagram */}
        <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-emerald-900/60 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-mono font-bold text-sm text-emerald-400">track item.id</span>
            </div>
            <span className="text-[11px] font-mono bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/60">
              Identity Key Map
            </span>
          </div>

          <div className="text-xs text-slate-300 space-y-3 mb-4">
            <p>
              When tracking with <code className="text-emerald-300 font-mono font-bold">item.id</code>, Angular maintains a keyed map of view records:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1.5">
              <div className="text-slate-500">// ViewContainer Map&lt;RecordKey, EmbeddedViewRef&gt;:</div>
              {items.slice(0, 4).map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between text-slate-300">
                  <span>Key("{item.id}") &rarr; ViewNode[{item.id}]</span>
                  <span className="text-emerald-400">// Current Index: {idx}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-emerald-950/50 border border-emerald-900/80 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              What Happens on Prepend (Add to Top):
            </div>
            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 pl-1 leading-relaxed">
              <li>Angular looks up the new item's ID in its Key Map. It does not exist, so it creates 1 new DOM subtree.</li>
              <li>For existing items ("item-alpha", "item-beta"), Angular finds their existing <code className="text-slate-100">EmbeddedViewRef</code> nodes in memory.</li>
              <li>Angular uses <code className="text-emerald-300 font-mono">insertBefore()</code> / DOM repositioning to shift the exact physical DOM elements down by 1 index.</li>
              <li>All internal DOM states, focus, inputs, and listeners remain 100% intact!</li>
            </ol>
          </div>
        </div>

      </div>

      {/* Summary Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm overflow-x-auto">
        <h3 className="text-sm font-bold text-slate-900 mb-3">
          Feature Comparison Matrix
        </h3>
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-2.5 font-semibold text-slate-700">Metric / Behavior</th>
              <th className="p-2.5 font-semibold text-red-700 font-mono">track $index</th>
              <th className="p-2.5 font-semibold text-emerald-700 font-mono">track item.id</th>
              <th className="p-2.5 font-semibold text-slate-700">Architectural Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="p-2.5 font-medium text-slate-900">Uncontrolled Input State (&lt;input&gt;, &lt;textarea&gt;)</td>
              <td className="p-2.5 text-red-600 font-semibold">⚠️ Leaks / Reassigned to wrong item</td>
              <td className="p-2.5 text-emerald-600 font-semibold">✅ 100% Preserved</td>
              <td className="p-2.5 text-slate-600">Must use unique ID for interactive lists</td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-slate-900">Active Keyboard Focus / Cursor Position</td>
              <td className="p-2.5 text-red-600 font-semibold">⚠️ Jumps to new row index</td>
              <td className="p-2.5 text-emerald-600 font-semibold">✅ Follows item smoothly</td>
              <td className="p-2.5 text-slate-600">Essential for accessibility (WCAG / a11y)</td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-slate-900">CSS Entry / Exit Transitions</td>
              <td className="p-2.5 text-red-600 font-semibold">⚠️ Triggers animation on every item</td>
              <td className="p-2.5 text-emerald-600 font-semibold">✅ Animates only inserted/removed item</td>
              <td className="p-2.5 text-slate-600">Prevents whole-list layout flickering</td>
            </tr>
            <tr>
              <td className="p-2.5 font-medium text-slate-900">Embedded Heavy Components (Charts/Editors)</td>
              <td className="p-2.5 text-red-600 font-semibold">⚠️ Full teardown / re-init cycles</td>
              <td className="p-2.5 text-emerald-600 font-semibold">✅ Reused without teardown</td>
              <td className="p-2.5 text-slate-600">Massive performance gain on large datasets</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
