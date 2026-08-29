import React from 'react';
import { BookOpen, ShieldAlert, CheckCircle, AlertOctagon, Terminal, FileCheck, Search } from 'lucide-react';

export const ArchitectureGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Introduction Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
            Angular 19 &rarr; 21 Migration Post-Mortem
          </span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Why Automated Migration Schematics Inserted <code className="text-red-600 font-mono text-base font-bold">track $index</code>
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          When running <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-slate-800">ng generate @angular/core:control-flow</code>, the Angular CLI AST transformer migrated legacy <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-slate-800">*ngFor="let item of items"</code> loops. Because <code className="font-mono text-xs text-slate-800">trackBy</code> was optional in Angular 2-16, loops lacking a <code className="font-mono text-xs text-slate-800">trackBy</code> function had no known unique property for the schematic to parse.
        </p>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          To prevent compilation errors (since <code className="font-mono text-xs text-slate-800">track</code> is mandatory in modern <code className="font-mono text-xs text-slate-800">@for</code>), the schematic fell back to <code className="font-mono text-xs text-red-600 font-bold">track $index</code> as the lowest-common-denominator fallback.
        </p>
      </div>

      {/* The 4 Catastrophic Production Bug Classes */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          The 4 Critical Bug Classes Introduced by <code className="text-red-600 font-mono text-sm">track $index</code>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-red-50/60 border border-red-200 rounded-xl">
            <h4 className="text-sm font-bold text-red-900 flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              1. Uncontrolled Form State Desynchronization
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Native HTML elements (<code className="font-mono">&lt;input&gt;</code>, <code className="font-mono">&lt;textarea&gt;</code>, <code className="font-mono">&lt;select&gt;</code>, checkboxes, file uploads) maintain internal browser DOM state. When array items move, the typed values remain in slot 0, corrupting user data.
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl">
            <h4 className="text-sm font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              2. Focus &amp; A11y / Keyboard Accessibility Breakers
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              If an engineer is typing in row 3 and a real-time WebSocket push adds an item to the top, <code className="font-mono text-xs">track $index</code> keeps the browser focus in row 3, suddenly focusing a completely different business record.
            </p>
          </div>

          <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-xl">
            <h4 className="text-sm font-bold text-purple-900 flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              3. Micro-Frontend &amp; Canvas / Leaflet / Monaco Leakage
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Custom web components, third-party chart canvases (Chart.js, D3), and code editors initialized inside child views are tied to DOM references. Recycling DOM nodes triggers severe memory leaks and stale canvas overlays.
            </p>
          </div>

          <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl">
            <h4 className="text-sm font-bold text-blue-900 flex items-center gap-1.5 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              4. Heavy Re-Render Spikes on Dynamic Streams
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              Instead of moving 1 view node, prepending to an array of 500 items causes Angular to dirty-check and re-render template expressions across all 500 DOM rows, causing severe frame drops.
            </p>
          </div>
        </div>
      </div>

      {/* Codebase Audit & Remediation Guide */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-xl border border-slate-800 shadow-xl">
        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-blue-400" />
          Engineering Team Remediation Checklist
        </h3>

        <div className="space-y-4 text-xs text-slate-300">
          <div>
            <h4 className="text-slate-100 font-semibold mb-1 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
              Grep / Search your repository for dangerous tracking fallback:
            </h4>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-emerald-400">
              rg "track \$index" src/app/
            </div>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-1 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">2</span>
              When is <code className="font-mono text-amber-300">track $index</code> genuinely safe?
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
              <li>Strictly static, immutable arrays that never re-order, prepend, or mutate during component lifetime (e.g. static navigation menu items).</li>
              <li>Primitive arrays without identity (e.g., <code className="font-mono text-slate-200">['Red', 'Green', 'Blue']</code> where duplicates exist).</li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-100 font-semibold mb-1 flex items-center gap-2">
              <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">3</span>
              Enforce via ESLint &amp; Angular Template Rules:
            </h4>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-slate-300 text-[11px] leading-relaxed">
              <span className="text-slate-500">// .eslintrc.json or eslint.config.js</span>
              <br />
              {`{
  "rules": {
    "@angular-eslint/template/prefer-control-flow": "error",
    "@angular-eslint/template/no-index-tracking": "warn"
  }
}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
