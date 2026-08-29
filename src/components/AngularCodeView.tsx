import React, { useState } from 'react';
import { ANGULAR_21_COMPONENT_CODE } from '../data/angularCode';
import { Copy, Check, Download, Code2, Sparkles, FileCode, CheckCircle } from 'lucide-react';

export const AngularCodeView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ANGULAR_21_COMPONENT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([ANGULAR_21_COMPONENT_CODE], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'track-comparison.component.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                Angular 21 Standalone Component
              </span>
              <span className="text-xs text-slate-500 font-mono">
                track-comparison.component.ts
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Complete Production-Ready Angular 21 Source Code
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Fully compliant with Angular 21 Standalone APIs, Signals reactivity (<code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">signal()</code>, <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">update()</code>, <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">set()</code>), modern <code className="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">@for</code> control flow blocks, and inline styles.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              id="btn-copy-code"
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Component TS
                </>
              )}
            </button>

            <button
              type="button"
              id="btn-download-code"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-sm"
              title="Download track-comparison.component.ts"
            >
              <Download className="w-4 h-4" />
              Download .ts
            </button>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Angular 21 Standalone:</strong> Zero <code className="font-mono">NgModule</code> boilerplate; imports built-in control flow directly.
            </div>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Angular Signals Architecture:</strong> Immutable updates via <code className="font-mono">items.update(...)</code>.
            </div>
          </div>
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Self-Contained Styling:</strong> Embedded CSS Grid within <code className="font-mono">styles: [...]</code> for zero-dependency portability.
            </div>
          </div>
        </div>
      </div>

      {/* Code Display Container */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <span className="text-xs font-mono text-slate-400 ml-2">
              src/app/track-comparison.component.ts
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <pre className="p-5 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-[680px] select-text">
          <code>{ANGULAR_21_COMPONENT_CODE}</code>
        </pre>
      </div>
    </div>
  );
};
