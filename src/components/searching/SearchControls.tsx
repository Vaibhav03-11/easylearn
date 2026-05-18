import { Play, Pause, RotateCcw, StepForward, StepBack } from 'lucide-react';
import { useSearchingStore } from '@/store/searchingStore';

interface ControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
}

export default function SearchControls({ onPlay, onPause, onReset, onStepForward, onStepBackward }: ControlsProps) {
  const { isSearching, isPaused, speed, setSpeed } = useSearchingStore();

  // Reverse the speed logic so slider right = faster (lower delay)
  // Let's assume the slider goes from 1 to 100
  // Value 1 = very slow (e.g. 1500ms delay)
  // Value 100 = very fast (e.g. 10ms delay)
  
  // Actually, let's keep the exact same logic as sorting for consistency
  // In sorting, the slider value IS the speed. 
  // Wait, in sortingStore, speed default is 100.
  // In searchingStore, speed default is 500.

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm mt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onStepBackward}
          disabled={isSearching && !isPaused}
          className="p-2 rounded-full hover:bg-gray-100 text-gray-700 disabled:opacity-50"
          title="Previous Step"
        >
          <StepBack size={20} />
        </button>
        
        {!isSearching || isPaused ? (
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
          disabled={isSearching && !isPaused}
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
        <span className="text-sm font-medium text-gray-600 w-12 text-right">Slow</span>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={1010 - speed} 
          onChange={(e) => setSpeed(1010 - Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
        />
        <span className="text-sm font-medium text-gray-600 w-12">Fast</span>
      </div>
    </div>
  );
}
