"use client";

import { motion } from 'framer-motion';
import { SearchAnimationStep, SearchAlgorithmType } from '@/types/searching.types';

interface SearchArrayViewProps {
  step: SearchAnimationStep;
  algorithm: SearchAlgorithmType;
}

export default function SearchArrayView({ step, algorithm }: SearchArrayViewProps) {
  const { array, comparing, found, low, high, mid } = step;

  const getBlockStyle = (index: number) => {
    // If target is found
    if (found !== null && found === index) {
      return {
        background: 'linear-gradient(135deg, #10b981, #059669)', // Emerald
        boxShadow: '0 0 25px rgba(16, 185, 129, 0.8)',
        border: '2px solid #34d399',
        color: 'white',
        transform: 'scale(1.15)',
        zIndex: 20
      };
    }

    // Binary Search specific styles
    if (algorithm === 'binary-search') {
      // Discarded elements (outside low-high range)
      if (low !== undefined && high !== undefined && (index < low || index > high)) {
        return {
          background: '#f1f5f9', // Slate 100
          border: '1px solid #e2e8f0',
          color: '#cbd5e1', // Faded text
          opacity: 0.4,
          transform: 'scale(0.95)'
        };
      }
      // Mid element (currently checking)
      if (mid === index) {
        return {
          background: 'linear-gradient(135deg, #f59e0b, #d97706)', // Amber
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
          border: '2px solid #fcd34d',
          color: 'white',
          transform: 'scale(1.1)',
          zIndex: 10
        };
      }
      // Elements within valid search space
      if (low !== undefined && high !== undefined && index >= low && index <= high) {
        return {
          background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', // Blue
          border: '1px solid #93c5fd',
          color: 'white',
          boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)'
        };
      }
    }

    // Linear Search specific styles (comparing)
    if (comparing.includes(index)) {
      return {
        background: 'linear-gradient(135deg, #f59e0b, #d97706)', // Amber
        boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
        border: '2px solid #fcd34d',
        color: 'white',
        transform: 'scale(1.1)',
        zIndex: 10
      };
    }

    // Default Unsearched/Waiting state
    return {
      background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', // Deep blue
      border: '1px solid #93c5fd',
      color: 'white',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.2)'
    };
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 p-3 bg-white border-b border-gray-100 text-xs font-medium text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md bg-blue-500 shadow-sm border border-blue-400"></div>
          <span>Search Space</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md bg-amber-500 shadow-sm border border-amber-400 shadow-amber-500/50"></div>
          <span>Checking</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-md bg-emerald-500 shadow-sm border border-emerald-400"></div>
          <span>Target Found</span>
        </div>
        {algorithm === 'binary-search' && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-md bg-slate-200 border border-slate-300"></div>
            <span>Discarded</span>
          </div>
        )}
      </div>

      {/* Array Container */}
      <div className="flex flex-col items-center justify-center min-h-64 md:h-80 w-full p-8 bg-gradient-to-b from-slate-50 to-slate-100 shadow-inner relative overflow-hidden">
        {/* Execution Log Overlay */}
        {step.logMessage && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-6 py-2.5 rounded-full border border-blue-100 shadow-md z-30 flex items-center gap-3 transition-all max-w-[90%] text-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
            <span className="text-sm font-semibold text-slate-700">{step.logMessage}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-12">
          {array.map((value, idx) => {
            const isTarget = value === step.target;
            const isFound = found === idx;
            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <motion.div
                  className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-lg md:text-2xl font-black shadow-sm transition-all duration-300"
                  style={getBlockStyle(idx)}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  {/* Glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-xl"></div>
                  <span className="drop-shadow-md relative z-10">{value}</span>
                </motion.div>
                <span className="text-xs font-mono text-gray-400 font-bold">[{idx}]</span>
                
                {/* Visual Indicators for Binary Search */}
                {algorithm === 'binary-search' && (
                  <div className="flex gap-1 h-4">
                    {low === idx && <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1 rounded">L</span>}
                    {mid === idx && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1 rounded">M</span>}
                    {high === idx && <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1 rounded">H</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
