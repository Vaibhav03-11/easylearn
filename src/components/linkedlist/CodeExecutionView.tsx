"use client";

import { LLAnimationStep } from '@/types/linkedlist.types';

interface Props {
  step: LLAnimationStep | null;
}

export default function CodeExecutionView({ step }: Props) {
  if (!step?.codeContext) return null;

  const { code, highlightLine, variables } = step.codeContext;

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-4">
      <div className="flex items-center justify-between p-3 bg-[#1E293B] border-b border-slate-700">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
          <span className="ml-2">Code Execution Flow</span>
        </h3>
        <span className="text-[10px] text-slate-500 font-mono">Java</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Code Panel */}
        <div className="md:col-span-2 bg-[#0F172A] overflow-x-auto">
          <pre className="text-sm font-mono leading-7 p-0">
            {code.map((line, idx) => {
              const isActive = idx === highlightLine;
              return (
                <div
                  key={idx}
                  className={`flex items-center transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-500/20 border-l-4 border-amber-400'
                      : 'border-l-4 border-transparent'
                  }`}
                >
                  {/* Line number */}
                  <span className={`w-10 text-right pr-3 text-xs select-none flex-shrink-0 ${
                    isActive ? 'text-amber-400 font-bold' : 'text-slate-600'
                  }`}>
                    {idx + 1}
                  </span>
                  {/* Code content */}
                  <span className={`flex-1 px-2 py-0.5 ${
                    isActive ? 'text-amber-100 font-semibold' : 'text-slate-400'
                  }`}>
                    {line}
                  </span>
                  {/* Active indicator */}
                  {isActive && (
                    <span className="text-amber-400 pr-4 text-xs animate-pulse">◀ executing</span>
                  )}
                </div>
              );
            })}
          </pre>
        </div>

        {/* Variables Panel */}
        <div className="bg-[#1E293B] border-l border-slate-700 p-4">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Live Variables
          </h4>
          <div className="space-y-2">
            {Object.entries(variables).map(([name, value]) => (
              <div key={name} className="flex items-center justify-between bg-slate-800/60 px-3 py-1.5 rounded-md">
                <span className="text-xs font-mono text-blue-300 font-semibold">{name}</span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  value === 'NULL'
                    ? 'text-red-400 bg-red-900/30'
                    : 'text-emerald-300 bg-emerald-900/30'
                }`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
