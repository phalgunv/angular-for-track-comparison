import React from 'react';
import { MutationLog } from '../types';
import { Activity, ShieldAlert, CheckCircle, Clock } from 'lucide-react';

interface MutationLogViewerProps {
  logs: MutationLog[];
  onClearLogs: () => void;
}

export const MutationLogViewer: React.FC<MutationLogViewerProps> = ({ logs, onClearLogs }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900">
            Real-Time Array Mutation &amp; DOM Event Stream
          </h3>
        </div>

        <button
          type="button"
          onClick={onClearLogs}
          className="text-xs text-slate-400 hover:text-slate-700 transition cursor-pointer"
        >
          Clear Log
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="text-xs text-slate-400 py-3 text-center">
          No mutations logged yet. Use the controls above to mutate the array.
        </div>
      ) : (
        <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
          {logs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  {log.action}
                </span>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {log.timestamp}
                </span>
              </div>
              <p className="text-slate-600 text-[11px]">{log.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/60 text-[11px]">
                <div className="text-red-700 bg-red-50 p-1.5 rounded border border-red-100 flex items-start gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>$index:</strong> {log.impactIndexTrack}</span>
                </div>
                <div className="text-emerald-800 bg-emerald-50 p-1.5 rounded border border-emerald-100 flex items-start gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>item.id:</strong> {log.impactIdTrack}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
