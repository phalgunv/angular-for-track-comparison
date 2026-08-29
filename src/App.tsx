/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Item, UncontrolledInputMap, MutationLog, ActiveTab } from './types';
import { INITIAL_ITEMS } from './data/angularCode';
import { MutationControls } from './components/MutationControls';
import { TrackComparisonView } from './components/TrackComparisonView';
import { AngularCodeView } from './components/AngularCodeView';
import { DomReconciliationInspector } from './components/DomReconciliationInspector';
import { ArchitectureGuide } from './components/ArchitectureGuide';
import { MutationLogViewer } from './components/MutationLogViewer';
import {
  Code2,
  Cpu,
  BookOpen,
  LayoutGrid,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('interactive-demo');
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [newItemCounter, setNewItemCounter] = useState(1);

  // Uncontrolled DOM input simulation
  // For index tracking: key is slot index 0, 1, 2, ...
  const [indexInputState, setIndexInputState] = useState<UncontrolledInputMap>({});
  // For identity tracking: key is item.id ('item-alpha', 'item-beta', ...)
  const [idInputState, setIdInputState] = useState<UncontrolledInputMap>({});
  // Track what item was in slot index when user typed it
  const [inputOriginMap, setInputOriginMap] = useState<Record<number, string>>({});

  // Event Logs
  const [logs, setLogs] = useState<MutationLog[]>([
    {
      id: 'init-log',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action: 'Initial State Loaded',
      description: 'Initialized 4 baseline items in signal array (Item Alpha, Beta, Gamma, Delta).',
      type: 'reset',
      impactIndexTrack: 'Indexed 0..3 to 4 DOM slots.',
      impactIdTrack: 'Bound 4 DOM nodes by ID.'
    }
  ]);

  const addLog = (
    action: string,
    description: string,
    type: MutationLog['type'],
    impactIndexTrack: string,
    impactIdTrack: string
  ) => {
    const newLog: MutationLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action,
      description,
      type,
      impactIndexTrack,
      impactIdTrack
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // Handler for typing in Index Track column
  const handleIndexInputChange = (index: number, value: string, currentItemName: string) => {
    setIndexInputState((prev) => ({
      ...prev,
      [index]: value
    }));
    setInputOriginMap((prev) => ({
      ...prev,
      [index]: currentItemName
    }));
  };

  // Handler for typing in Identity Track column
  const handleIdInputChange = (itemId: string, value: string) => {
    setIdInputState((prev) => ({
      ...prev,
      [itemId]: value
    }));
  };

  // 1. Add Item to Top (Prepend) - The critical bug trigger!
  const handleAddTop = () => {
    const id = `item-new-${Date.now()}`;
    const name = `Item New ${newItemCounter} (Prepended Ingress)`;
    const newItem: Item = {
      id,
      name,
      category: 'Ingress',
      initials: `N${newItemCounter}`,
      color: 'blue',
      badge: 'v1.0.0',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setNewItemCounter((c) => c + 1);
    setItems((prev) => [newItem, ...prev]);

    addLog(
      'Prepend Item to Top',
      `Inserted "${name}" at index 0.`,
      'prepend',
      '⚠️ CRITICAL: DOM Slot #0 retained previous uncontrolled input state!',
      '✅ Created 1 new DOM node at top; existing nodes shifted down intact.'
    );
  };

  // 2. Random Shuffle
  const handleShuffle = () => {
    setItems((prev) => {
      const cloned = [...prev];
      for (let i = cloned.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
      }
      return cloned;
    });

    addLog(
      'Random Shuffle Array',
      'Re-ordered all elements in the array.',
      'shuffle',
      '⚠️ CRITICAL: All DOM inputs remained fixed at numeric slots 0, 1, 2... while data swapped underneath!',
      '✅ DOM nodes moved to their corresponding new positions seamlessly.'
    );
  };

  // 3. Add Item to Bottom (Append)
  const handleAddBottom = () => {
    const id = `item-bottom-${Date.now()}`;
    const name = `Item Tail ${newItemCounter} (Appended Service)`;
    const newItem: Item = {
      id,
      name,
      category: 'Worker',
      initials: `W${newItemCounter}`,
      color: 'slate',
      badge: 'v1.0.0',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setNewItemCounter((c) => c + 1);
    setItems((prev) => [...prev, newItem]);

    addLog(
      'Append Item to Bottom',
      `Appended "${name}" to the end of the array.`,
      'append',
      'Appended to new slot index (no index collision on existing items).',
      '✅ Appended new DOM node mapped to ID.'
    );
  };

  // 4. Remove Item from Top
  const handleRemoveTop = () => {
    if (items.length === 0) return;
    const removedItem = items[0];
    setItems((prev) => prev.slice(1));

    addLog(
      'Remove Top Item',
      `Removed "${removedItem.name}" from index 0.`,
      'remove',
      '⚠️ DOM slot at end was destroyed; remaining slots shifted data up into old DOM nodes!',
      '✅ Destroyed exactly the DOM node for removed item; others preserved.'
    );
  };

  // 5. Remove Specific Item
  const handleRemoveItem = (itemId: string) => {
    const itemToRemove = items.find((i) => i.id === itemId);
    setItems((prev) => prev.filter((i) => i.id !== itemId));

    addLog(
      'Remove Item by ID',
      `Deleted item "${itemToRemove?.name || itemId}".`,
      'remove',
      '⚠️ Items below deleted index shifted data into previous DOM slots, mixing up form state.',
      '✅ Single target DOM subtree cleanly removed from DOM tree.'
    );
  };

  // 6. Reset Baseline
  const handleReset = () => {
    setItems(INITIAL_ITEMS);
    setNewItemCounter(1);
    setIndexInputState({});
    setIdInputState({});
    setInputOriginMap({});

    addLog(
      'Reset Array & DOM State',
      'Restored initial 4 items and cleared all input values.',
      'reset',
      'Reset all slots to 0..3.',
      'Reset all nodes by ID.'
    );
  };

  // 7. Auto-fill sample notes for 1-click testing
  const handlePrefill = () => {
    // Fill slot 0 and slot 1 for index track
    setIndexInputState({
      0: 'Alpha critical auth note: DO NOT OVERWRITE',
      1: 'Beta security audit note: PENDING REVIEW'
    });
    setInputOriginMap({
      0: items[0]?.name || 'Item Alpha',
      1: items[1]?.name || 'Item Beta'
    });

    // Fill item-alpha and item-beta for id track
    setIdInputState({
      'item-alpha': 'Alpha critical auth note: DO NOT OVERWRITE',
      'item-beta': 'Beta security audit note: PENDING REVIEW'
    });

    addLog(
      '1-Click Sample Notes Injected',
      'Populated sample notes into Item Alpha and Item Beta. Now click "Add Item to Top" to observe the bug!',
      'input',
      'Typed values stored in DOM Slots #0 and #1.',
      'Typed values stored under entity keys "item-alpha" and "item-beta".'
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navigation Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3.5 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center font-black text-white text-base shadow-sm">
                A
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold text-slate-100 leading-tight">
                    Angular 21 Control Flow Audit Workbench
                  </h1>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    v21.0
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Visualizing <code className="font-mono text-red-400">track $index</code> state-loss flaws vs <code className="font-mono text-emerald-400">track item.id</code> identity tracking
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 self-start sm:self-auto overflow-x-auto">
              <button
                type="button"
                id="tab-interactive-demo"
                onClick={() => setActiveTab('interactive-demo')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeTab === 'interactive-demo'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Live Demo
              </button>

              <button
                type="button"
                id="tab-angular-code"
                onClick={() => setActiveTab('angular-code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeTab === 'angular-code'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                Angular 21 Component TS
              </button>

              <button
                type="button"
                id="tab-dom-reconciliation"
                onClick={() => setActiveTab('dom-reconciliation')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeTab === 'dom-reconciliation'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                DOM &amp; LView Engine
              </button>

              <button
                type="button"
                id="tab-migration-guide"
                onClick={() => setActiveTab('migration-guide')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  activeTab === 'migration-guide'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Architecture &amp; Migration Guide
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'interactive-demo' && (
          <div className="space-y-6">
            {/* Mutation Controls Toolbar */}
            <MutationControls
              onAddTop={handleAddTop}
              onShuffle={handleShuffle}
              onAddBottom={handleAddBottom}
              onRemoveTop={handleRemoveTop}
              onReset={handleReset}
              onPrefill={handlePrefill}
              itemCount={items.length}
            />

            {/* Side-by-Side Live Visualizer */}
            <TrackComparisonView
              items={items}
              indexInputState={indexInputState}
              idInputState={idInputState}
              inputOriginMap={inputOriginMap}
              onIndexInputChange={handleIndexInputChange}
              onIdInputChange={handleIdInputChange}
              onRemoveItem={handleRemoveItem}
              onAddTop={handleAddTop}
            />

            {/* Live Mutation Event Stream */}
            <MutationLogViewer
              logs={logs}
              onClearLogs={() => setLogs([])}
            />
          </div>
        )}

        {activeTab === 'angular-code' && <AngularCodeView />}

        {activeTab === 'dom-reconciliation' && <DomReconciliationInspector items={items} />}

        {activeTab === 'migration-guide' && <ArchitectureGuide />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Angular 21 Architecture Reference</span>
            <span>&bull;</span>
            <span>Signals &amp; Modern <code className="font-mono text-slate-600">@for</code> Control Flow</span>
          </div>
          <div>
            Built for enterprise frontend architectural demonstrations and migration auditing.
          </div>
        </div>
      </footer>
    </div>
  );
}
