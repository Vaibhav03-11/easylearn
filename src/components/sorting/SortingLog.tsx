"use client";

import { useSortingStore } from '@/store/sortingStore';
import { useEffect, useRef } from 'react';

export default function SortingLog() {
  const { animationSteps, currentStep } = useSortingStore();
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of log when a new step is shown
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [currentStep]);

  // Extract the logs up to the current step
  const logs = animationSteps
    .slice(0, currentStep + 1)
    .map((step, idx) => ({ id: idx, message: step.logMessage }))
    .filter((log) => log.message); // Only include steps that have a log message

  return (
    <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm mt-4 p-4 flex flex-col h-48">
      <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b pb-2">Execution Log</h3>
      <div 
        ref={logContainerRef} 
        className="flex-1 overflow-y-auto space-y-2 pr-2"
      >
        {logs.length === 0 ? (
          <p className="text-gray-400 text-sm italic">Press play or step forward to see the algorithm's decisions...</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="text-sm border-l-2 border-[#2563EB] pl-3 py-1">
              <span className="text-gray-400 font-mono text-xs mr-2">[{log.id}]</span>
              <span className="text-gray-700">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
