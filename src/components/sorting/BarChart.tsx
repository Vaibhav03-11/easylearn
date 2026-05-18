import { motion } from 'framer-motion';
import { AnimationStep } from '@/types/sorting.types';

interface BarChartProps {
  step: AnimationStep;
  maxValue: number;
}

export default function BarChart({ step, maxValue }: BarChartProps) {
  const { array, comparing, swapping, sorted } = step;

  const getBarStyle = (index: number) => {
    // Combine comparing and swapping into a single "Active" state to use fewer colors
    if (swapping.includes(index) || comparing.includes(index)) {
      return {
        background: 'linear-gradient(to top, #d97706, #fbbf24)', // Amber gradient
        boxShadow: '0 0 20px rgba(245, 158, 11, 0.7)',
        borderTop: '2px solid #fde68a',
        borderLeft: '1px solid #fcd34d',
        borderRight: '1px solid #fcd34d',
        zIndex: 10
      };
    }
    if (sorted.includes(index)) {
      return {
        background: 'linear-gradient(to top, #047857, #34d399)', // Emerald gradient
        borderTop: '2px solid #a7f3d0',
        borderLeft: '1px solid #6ee7b7',
        borderRight: '1px solid #6ee7b7',
        boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.2)',
        zIndex: 1
      };
    }
    return {
      background: 'linear-gradient(to top, #1e3a8a, #3b82f6)', // Deep blue gradient
      borderTop: '2px solid #bfdbfe',
      borderLeft: '1px solid #93c5fd',
      borderRight: '1px solid #93c5fd',
      boxShadow: 'inset 0 4px 6px rgba(255,255,255,0.2), 0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 1
    };
  };

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 p-3 bg-white border-b border-gray-100 text-xs font-medium text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 shadow-sm border border-blue-400"></div>
          <span>Unsorted</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-sm border border-amber-400 shadow-amber-500/50"></div>
          <span>Active (Comparing / Swapping)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm border border-emerald-400"></div>
          <span>Sorted</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex items-end justify-center h-64 md:h-96 w-full gap-[2px] p-6 bg-gradient-to-b from-slate-50 to-slate-100 shadow-inner overflow-hidden relative">
        {/* Optional faint grid lines for aesthetics */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 20%' }}></div>
        
        {/* Execution Log Overlay */}
        {step.logMessage && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm px-6 py-2.5 rounded-full border border-blue-100 shadow-md z-30 flex items-center gap-3 transition-all max-w-[90%] text-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
            <span className="text-sm font-semibold text-slate-700">{step.logMessage}</span>
          </div>
        )}
        
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            className="w-full rounded-t-md flex items-end justify-center pb-2 relative"
            style={{ 
              height: `${(value / maxValue) * 100}%`,
              ...getBarStyle(idx)
            }}
            layout
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.8
            }}
          >
            {/* Glassmorphism reflection highlight */}
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-md"></div>

            {array.length <= 50 && (
              <span 
                className={`text-white font-extrabold tracking-wide drop-shadow-md z-20 ${
                  array.length <= 20 ? 'text-sm md:text-base' : 
                  array.length <= 35 ? 'text-xs md:text-sm' : 
                  'text-[9px] md:text-xs'
                }`}
                style={{
                  writingMode: array.length > 20 ? 'vertical-rl' : 'horizontal-tb',
                  transform: array.length > 20 ? 'rotate(180deg)' : 'none',
                  textShadow: '0px 1px 3px rgba(0,0,0,0.8)'
                }}
              >
                {value}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
