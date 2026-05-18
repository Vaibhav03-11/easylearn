import { Play, Pause, RotateCcw, StepForward, StepBack } from 'lucide-react';
import { useSortingStore } from '@/store/sortingStore';

interface ControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
}

export default function Controls({ onPlay, onPause, onReset, onStepForward, onStepBackward }: ControlsProps) {
  const { isSorting, isPaused, speed, setSpeed } = useSortingStore();

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm mt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onStepBackward}
          disabled={isSorting && !isPaused}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700 disabled:opacity-50"
          title="Previous Step"
        >
          <StepBack size={20} />
        </button>
        
        {!isSorting || isPaused ? (
          <button
            onClick={onPlay}
            className="p-3 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white shadow-md transition-transform hover:scale-105"
            title="Play"
          >
            <Play size={24} fill="currentColor" />
          </button>
        ) : (
          <button
            onClick={onPause}
            className="p-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-transform hover:scale-105"
            title="Pause"
          >
            <Pause size={24} fill="currentColor" />
          </button>
        )}

        <button
          onClick={onStepForward}
          disabled={isSorting && !isPaused}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700 disabled:opacity-50"
          title="Next Step"
        >
          <StepForward size={20} />
        </button>
        
        <button
          onClick={onReset}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700 ml-2"
          title="Reset"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="flex-1 w-full max-w-xs flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Speed</span>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
        />
      </div>
    </div>
  );
}
