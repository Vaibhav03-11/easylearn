import { Shuffle, Edit2 } from 'lucide-react';
import { useSortingStore } from '@/store/sortingStore';
import { useState } from 'react';

export default function InputPanel() {
  const { size, setSize, generateRandomArray, isSorting, isPaused, setArray, array } = useSortingStore();
  const disabled = isSorting && !isPaused;

  const [customInput, setCustomInput] = useState("");
  const [isCustomMode, setIsCustomMode] = useState(false);

  const handleCustomSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customInput.trim()) return;
    
    const parsed = customInput
      .split(',')
      .map(str => parseInt(str.trim(), 10))
      .filter(n => !isNaN(n));
      
    if (parsed.length > 0) {
      setArray(parsed);
      setIsCustomMode(false);
      setCustomInput("");
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm mt-4 w-full">
      <div className="flex items-center gap-4 w-full">
        <div className="flex-1 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Array Size: {size}</span>
          <input
            type="range"
            min="5"
            max="100"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#10B981] disabled:opacity-50"
          />
        </div>
        
        <button
          onClick={() => setIsCustomMode(!isCustomMode)}
          disabled={disabled}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${isCustomMode ? 'bg-[#2563EB] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
        >
          <Edit2 size={16} />
          <span className="hidden sm:inline">Custom</span>
        </button>

        <button
          onClick={generateRandomArray}
          disabled={disabled}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          <Shuffle size={16} />
          <span className="hidden sm:inline">Shuffle</span>
        </button>
      </div>

      {isCustomMode && (
        <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-top-2">
          <input
            type="text"
            placeholder="Enter numbers separated by commas (e.g. 5, 2, 9, 1)"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            disabled={disabled}
            className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || !customInput.trim()}
            className="px-4 py-2 bg-[#2563EB] hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            Apply
          </button>
        </form>
      )}
    </div>
  );
}
