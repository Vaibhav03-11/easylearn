"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { LLAnimationStep } from '@/types/linkedlist.types';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  step: LLAnimationStep | null;
  nodes: { id: string; value: number; address: string; isHighlighted: boolean; isNew: boolean; isDeleting: boolean; isFound: boolean }[];
  isCircular?: boolean;
  isDoubly?: boolean;
}

export default function LinkedListCanvas({ step, nodes, isCircular = false, isDoubly = false }: Props) {
  const displayNodes = step ? step.nodes : nodes;
  const headIndex = step ? step.headIndex : (displayNodes.length > 0 ? 0 : null);
  const currentPointer = step?.currentPointer ?? null;

  const getNodeStyle = (node: typeof displayNodes[0], idx: number) => {
    if (node.isFound) {
      return {
        bg: 'bg-emerald-500',
        ring: 'ring-4 ring-emerald-300',
        shadow: 'shadow-[0_0_30px_rgba(16,185,129,0.6)]',
        scale: 1.1,
      };
    }
    if (node.isDeleting) {
      return {
        bg: 'bg-red-500',
        ring: 'ring-4 ring-red-300',
        shadow: 'shadow-[0_0_30px_rgba(239,68,68,0.6)]',
        scale: 0.8,
      };
    }
    if (node.isNew) {
      return {
        bg: 'bg-amber-500',
        ring: 'ring-4 ring-amber-300',
        shadow: 'shadow-[0_0_30px_rgba(245,158,11,0.7)]',
        scale: 1.15,
      };
    }
    if (node.isHighlighted || currentPointer === idx) {
      return {
        bg: 'bg-amber-500',
        ring: 'ring-4 ring-amber-200',
        shadow: 'shadow-[0_0_25px_rgba(245,158,11,0.5)]',
        scale: 1.05,
      };
    }
    return {
      bg: 'bg-blue-600',
      ring: '',
      shadow: 'shadow-md',
      scale: 1,
    };
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Legend */}
      <div className="flex items-center justify-center gap-5 p-3 bg-white border-b border-gray-100 text-xs font-medium text-gray-500 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">V</div>
          <span>Value</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ArrowRight className="w-4 h-4 text-blue-400" />
          <span>Next Pointer</span>
        </div>
        {isDoubly && (
          <div className="flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4 text-purple-400" />
            <span>Prev Pointer</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-4 h-1.5 rounded-full bg-gray-300"></div>
          <span>Memory Address</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-0.5 rounded bg-red-100 text-red-600 text-[10px] font-bold">NULL</div>
          <span>End of List</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative min-h-[280px] md:min-h-[340px] w-full p-6 pt-12 bg-gradient-to-b from-slate-50 to-slate-100 shadow-inner overflow-x-auto">
        {/* Log overlay */}
        {step?.logMessage && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full border border-blue-100 shadow-md z-30 flex items-center gap-3 max-w-[95%] text-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)] flex-shrink-0"></div>
            <span className="text-sm font-semibold text-slate-700 truncate">{step.logMessage}</span>
          </div>
        )}

        {/* HEAD Label */}
        {headIndex !== null && displayNodes.length > 0 && (
          <div className="absolute top-[52px] left-8 flex flex-col items-center z-10">
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 tracking-wider">HEAD</span>
            <svg width="12" height="18" className="mt-0.5">
              <line x1="6" y1="0" x2="6" y2="14" stroke="#10b981" strokeWidth="2" />
              <polygon points="2,12 6,18 10,12" fill="#10b981" />
            </svg>
          </div>
        )}

        {/* Nodes Row */}
        <div className="flex items-center gap-0 mt-10 px-2 pb-4">
          {/* NULL before first node for doubly linked list */}
          {isDoubly && displayNodes.length > 0 && (
            <div className="flex items-center mx-1 mt-[-18px] flex-shrink-0">
              <span className="text-xs font-black text-red-500 bg-red-50 px-2 py-1 rounded-md border border-red-200 mr-1">NULL</span>
              <div className="w-4 h-0.5 bg-purple-300"></div>
              <ArrowRight className="w-3 h-3 text-purple-400 -ml-0.5" />
            </div>
          )}

          <AnimatePresence mode="popLayout">
            {displayNodes.map((node, idx) => {
              const style = getNodeStyle(node, idx);
              return (
                <motion.div
                  key={node.id}
                  className="flex items-center flex-shrink-0"
                  initial={{ opacity: 0, y: -30, scale: 0.5 }}
                  animate={{ opacity: node.isDeleting ? 0.4 : 1, y: 0, scale: style.scale }}
                  exit={{ opacity: 0, scale: 0, y: 30 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Node Card */}
                  <div className="flex flex-col items-center">
                    <div className={`relative flex items-center rounded-xl overflow-hidden ${style.ring} ${style.shadow} transition-all duration-300`}>
                      {/* Prev Pointer Section (Doubly only) */}
                      {isDoubly && (
                        <div className="w-7 h-14 md:w-8 md:h-16 bg-purple-900 flex items-center justify-center border-r-2 border-purple-700">
                          <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.8)]"></div>
                        </div>
                      )}
                      {/* Value Section */}
                      <div className={`w-14 h-14 md:w-16 md:h-16 ${style.bg} flex items-center justify-center transition-colors duration-300`}>
                        <span className="text-white font-black text-lg md:text-xl drop-shadow-md">{node.value}</span>
                      </div>
                      {/* Next Pointer Section */}
                      <div className="w-7 h-14 md:w-8 md:h-16 bg-slate-700 flex items-center justify-center border-l-2 border-slate-500">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]"></div>
                      </div>
                      {/* Glass overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                    </div>

                    {/* Labels under each section for doubly */}
                    {isDoubly && (
                      <div className="flex text-[8px] font-bold text-gray-400 mt-0.5 w-full">
                        <span className="flex-1 text-center text-purple-400">prev</span>
                        <span className="flex-1 text-center text-gray-500">data</span>
                        <span className="flex-1 text-center text-amber-500">next</span>
                      </div>
                    )}
                    {/* Memory Address */}
                    <span className="text-[10px] font-mono text-gray-400 mt-1 font-semibold">{node.address}</span>
                  </div>

                  {/* Arrows between nodes */}
                  {idx < displayNodes.length - 1 && (
                    <div className="flex flex-col items-center mx-1 mt-[-18px] gap-0.5">
                      {/* Forward arrow (next) */}
                      <div className="flex items-center">
                        <div className="w-4 md:w-6 h-0.5 bg-blue-300"></div>
                        <ArrowRight className="w-3 h-3 text-blue-400 -ml-0.5" />
                      </div>
                      {/* Backward arrow (prev) — only for doubly */}
                      {isDoubly && (
                        <div className="flex items-center">
                          <ArrowLeft className="w-3 h-3 text-purple-400 -mr-0.5" />
                          <div className="w-4 md:w-6 h-0.5 bg-purple-300"></div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* NULL at end (singly and doubly) */}
                  {idx === displayNodes.length - 1 && !isCircular && (
                    <div className="flex items-center mx-1 mt-[-18px]">
                      <div className="w-4 h-0.5 bg-gray-300"></div>
                      <span className="text-xs font-black text-red-500 bg-red-50 px-2 py-1 rounded-md border border-red-200 ml-1">NULL</span>
                    </div>
                  )}

                  {/* Circular arrow back to head */}
                  {idx === displayNodes.length - 1 && isCircular && (
                    <div className="flex items-center mx-1 mt-[-18px]">
                      <div className="w-4 h-0.5 bg-purple-300"></div>
                      <span className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-1 rounded-md border border-purple-200 ml-1">↩ HEAD</span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Empty state */}
          {displayNodes.length === 0 && (
            <div className="w-full text-center py-12">
              <p className="text-gray-400 text-lg font-medium">Empty List — HEAD → NULL</p>
              <p className="text-gray-300 text-sm mt-1">Use the operations below to add nodes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
