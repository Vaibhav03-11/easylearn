import { motion } from 'framer-motion';
import { AnimationStep } from '@/types/sorting.types';

interface BarChartProps {
  step: AnimationStep;
  maxValue: number;
}

export default function BarChart({ step, maxValue }: BarChartProps) {
  const { array, comparing, swapping, sorted } = step;

  const getBarColor = (index: number) => {
    if (swapping.includes(index)) return '#F59E0B'; // Amber
    if (comparing.includes(index)) return '#EF4444'; // Red (temporary for compare)
    if (sorted.includes(index)) return '#10B981'; // Emerald
    return '#2563EB'; // Primary Deep Blue
  };

  return (
    <div className="flex items-end justify-center h-64 md:h-96 w-full gap-1 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      {array.map((value, idx) => (
        <motion.div
          key={idx}
          className="w-full rounded-t-sm flex items-end justify-center pb-2 overflow-hidden"
          style={{ 
            height: `${(value / maxValue) * 100}%`,
            backgroundColor: getBarColor(idx),
          }}
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
        >
          {array.length <= 50 && (
            <span 
              className={`text-white font-bold transition-all ${
                array.length <= 20 ? 'text-sm md:text-base' : 
                array.length <= 35 ? 'text-xs md:text-sm' : 
                'text-[8px] md:text-xs'
              }`}
              style={{
                writingMode: array.length > 20 ? 'vertical-rl' : 'horizontal-tb',
                transform: array.length > 20 ? 'rotate(180deg)' : 'none'
              }}
            >
              {value}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}
