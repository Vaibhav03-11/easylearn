"use client";

import { LLAnimationStep } from '@/types/linkedlist.types';

interface Props {
  step: LLAnimationStep | null;
}

// Substitutes variable values directly into the code line
// e.g., "Node temp = head;" → "Node temp = head;"  with annotation "// temp=10, head=10"
function buildAnnotatedLine(line: string, variables: Record<string, string>): {
  codePart: string;
  annotation: string;
} {
  // Build annotation showing current values of variables that appear in this line
  const relevantVars: string[] = [];

  for (const [name, value] of Object.entries(variables)) {
    // Check if the variable name appears in the code line (as a word boundary)
    // Handle compound names like "temp.next" → look for "temp" or "temp.next"
    const simpleCheck = line.includes(name) || line.includes(name.split('.')[0]);
    if (simpleCheck && value !== undefined) {
      relevantVars.push(`${name} = ${value}`);
    }
  }

  return {
    codePart: line,
    annotation: relevantVars.length > 0 ? relevantVars.join(', ') : '',
  };
}

export default function CodeExecutionView({ step }: Props) {
  if (!step?.codeContext) return null;

  const { code, highlightLine, variables } = step.codeContext;

  return (
    <div className="w-full h-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1E293B] border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
          <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Code Flow</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono bg-slate-800 px-2 py-0.5 rounded">Java</span>
      </div>

      {/* Code Panel */}
      <div className="bg-[#0F172A] overflow-x-auto flex-1">
        <pre className="text-[13px] font-mono leading-[28px] p-0">
          {code.map((line, idx) => {
            const isActive = idx === highlightLine;
            const { annotation } = isActive
              ? buildAnnotatedLine(line, variables)
              : { annotation: '' };

            return (
              <div
                key={idx}
                className={`flex items-center transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-500/20 border-l-[3px] border-amber-400'
                    : 'border-l-[3px] border-transparent'
                }`}
              >
                {/* Line number */}
                <span className={`w-8 text-right pr-2 text-[10px] select-none flex-shrink-0 ${
                  isActive ? 'text-amber-400 font-bold' : 'text-slate-600'
                }`}>
                  {idx + 1}
                </span>
                {/* Code content */}
                <code className={`px-1 whitespace-pre ${
                  isActive ? 'text-amber-100 font-semibold' : 'text-slate-400'
                }`}>
                  {line}
                </code>
                {/* Inline value annotation on the active line */}
                {isActive && annotation && (
                  <span className="ml-3 text-[11px] text-emerald-400 bg-emerald-900/30 px-2 py-0.5 rounded font-mono flex-shrink-0 whitespace-nowrap">
                    // {annotation}
                  </span>
                )}
                {/* Active arrow */}
                {isActive && (
                  <span className="text-amber-400 pr-2 text-[10px] animate-pulse flex-shrink-0 ml-auto">◀</span>
                )}
              </div>
            );
          })}
        </pre>
      </div>

      {/* Variables Panel — below the code */}
      <div className="bg-[#1E293B] border-t border-slate-700 p-3">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          Live Variables
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {Object.entries(variables).map(([name, value]) => (
            <div key={name} className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-md">
              <span className="text-[11px] font-mono text-blue-300">{name}</span>
              <span className="text-[10px] text-slate-500">=</span>
              <span className={`text-[11px] font-mono font-bold ${
                value === 'NULL' || value.includes('freed')
                  ? 'text-red-400'
                  : 'text-emerald-300'
              }`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
