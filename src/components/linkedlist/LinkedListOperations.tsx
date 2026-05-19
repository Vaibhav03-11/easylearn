"use client";

import { useState } from 'react';
import { useLinkedListStore } from '@/store/linkedListStore';
import {
  Plus,
  Trash2,
  Search,
  IterationCw,
  ArrowLeftRight,
  Play,
  Pause,
  RotateCcw,
  StepForward,
  StepBack,
} from 'lucide-react';

export default function LinkedListOperations() {
  const {
    insertAtBeginning,
    insertAtEnd,
    insertAtPosition,
    deleteAtBeginning,
    deleteAtEnd,
    deleteAtPosition,
    searchNode,
    traverseList,
    reverseList,
    resetList,
    animationSteps,
    currentStep,
    isAnimating,
    isPaused,
    speed,
    setCurrentStep,
    setIsAnimating,
    setIsPaused,
    setSpeed,
  } = useLinkedListStore();

  const [inputValue, setInputValue] = useState('');
  const [positionValue, setPositionValue] = useState('');
  const [selectedOp, setSelectedOp] = useState<string | null>(null);

  const operations = [
    { id: 'insert-beginning', label: 'Insert at Beginning', icon: <Plus className="w-4 h-4" />, color: 'bg-emerald-500 hover:bg-emerald-600', needsValue: true, needsPosition: false },
    { id: 'insert-end', label: 'Insert at End', icon: <Plus className="w-4 h-4" />, color: 'bg-emerald-500 hover:bg-emerald-600', needsValue: true, needsPosition: false },
    { id: 'insert-position', label: 'Insert at Position', icon: <Plus className="w-4 h-4" />, color: 'bg-blue-500 hover:bg-blue-600', needsValue: true, needsPosition: true },
    { id: 'delete-beginning', label: 'Delete First', icon: <Trash2 className="w-4 h-4" />, color: 'bg-red-500 hover:bg-red-600', needsValue: false, needsPosition: false },
    { id: 'delete-end', label: 'Delete Last', icon: <Trash2 className="w-4 h-4" />, color: 'bg-red-500 hover:bg-red-600', needsValue: false, needsPosition: false },
    { id: 'delete-position', label: 'Delete at Position', icon: <Trash2 className="w-4 h-4" />, color: 'bg-red-500 hover:bg-red-600', needsValue: false, needsPosition: true },
    { id: 'search', label: 'Search Node', icon: <Search className="w-4 h-4" />, color: 'bg-amber-500 hover:bg-amber-600', needsValue: true, needsPosition: false },
    { id: 'traverse', label: 'Traverse', icon: <IterationCw className="w-4 h-4" />, color: 'bg-purple-500 hover:bg-purple-600', needsValue: false, needsPosition: false },
    { id: 'reverse', label: 'Reverse List', icon: <ArrowLeftRight className="w-4 h-4" />, color: 'bg-indigo-500 hover:bg-indigo-600', needsValue: false, needsPosition: false },
  ];

  const executeOperation = (opId: string) => {
    const val = parseInt(inputValue);
    const pos = parseInt(positionValue);
    
    switch (opId) {
      case 'insert-beginning':
        if (!isNaN(val)) insertAtBeginning(val);
        break;
      case 'insert-end':
        if (!isNaN(val)) insertAtEnd(val);
        break;
      case 'insert-position':
        if (!isNaN(val) && !isNaN(pos)) insertAtPosition(val, pos);
        break;
      case 'delete-beginning':
        deleteAtBeginning();
        break;
      case 'delete-end':
        deleteAtEnd();
        break;
      case 'delete-position':
        if (!isNaN(pos)) deleteAtPosition(pos);
        break;
      case 'search':
        if (!isNaN(val)) searchNode(val);
        break;
      case 'traverse':
        traverseList();
        break;
      case 'reverse':
        reverseList();
        break;
    }
    setSelectedOp(opId);
  };

  // Playback controls
  const handlePlay = () => {
    if (animationSteps.length === 0) return;
    if (currentStep >= animationSteps.length - 1) {
      setCurrentStep(0);
    }
    setIsAnimating(true);
    setIsPaused(false);
  };
  const handlePause = () => setIsPaused(true);
  const handleReset = () => {
    setIsAnimating(false);
    setIsPaused(false);
    setCurrentStep(0);
  };
  const handleStepForward = () => {
    if (currentStep < animationSteps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handleStepBackward = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  // Auto-play effect
  // (handled in the parent visualizer via useEffect)

  return (
    <div className="w-full space-y-4 mt-4">
      {/* Playback Controls — at the top for instant access */}
      {animationSteps.length > 0 && (
        <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2">
            <button onClick={handleStepBackward} className="p-2 rounded-full hover:bg-gray-100 text-gray-700 disabled:opacity-50" disabled={isAnimating && !isPaused}>
              <StepBack size={20} />
            </button>
            {!isAnimating || isPaused ? (
              <button onClick={handlePlay} className="p-3 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white shadow-md transition-transform hover:scale-105" title="Play">
                <Play size={24} fill="currentColor" />
              </button>
            ) : (
              <button onClick={handlePause} className="p-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-transform hover:scale-105" title="Pause">
                <Pause size={24} fill="currentColor" />
              </button>
            )}
            <button onClick={handleStepForward} className="p-2 rounded-full hover:bg-gray-100 text-gray-700 disabled:opacity-50" disabled={isAnimating && !isPaused}>
              <StepForward size={20} />
            </button>
            <button onClick={handleReset} className="p-2 rounded-full hover:bg-gray-100 text-gray-700 ml-2" title="Reset">
              <RotateCcw size={20} />
            </button>
            <button onClick={resetList} className="ml-2 px-3 py-1.5 text-xs font-medium bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600">Reset List</button>
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

          {/* Step indicator */}
          <span className="text-xs text-gray-400 font-mono">Step {currentStep + 1} / {animationSteps.length}</span>
        </div>
      )}

      {/* Operations Panel */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Try Operations</h3>
        <p className="text-xs text-gray-400 mb-4">See how linked list operations work in real-time.</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {operations.map((op) => (
            <button
              key={op.id}
              onClick={() => {
                setSelectedOp(op.id);
                if (!op.needsValue && !op.needsPosition) {
                  executeOperation(op.id);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-2 text-white rounded-lg text-xs font-semibold transition-all ${
                selectedOp === op.id ? op.color + ' ring-2 ring-offset-2 ring-blue-300 scale-105' : op.color
              }`}
            >
              {op.icon}
              {op.label}
            </button>
          ))}
        </div>

        {/* Input Fields */}
        {selectedOp && operations.find(o => o.id === selectedOp)?.needsValue && (
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Enter value</label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 25"
              />
            </div>
            {operations.find(o => o.id === selectedOp)?.needsPosition && (
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Position (index)</label>
                <input
                  type="number"
                  value={positionValue}
                  onChange={(e) => setPositionValue(e.target.value)}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 2"
                />
              </div>
            )}
            <button
              onClick={() => selectedOp && executeOperation(selectedOp)}
              className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold text-sm shadow-sm"
            >
              Execute Operation
            </button>
          </div>
        )}
        {selectedOp && !operations.find(o => o.id === selectedOp)?.needsValue && operations.find(o => o.id === selectedOp)?.needsPosition && (
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Position (index)</label>
              <input
                type="number"
                value={positionValue}
                onChange={(e) => setPositionValue(e.target.value)}
                className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 2"
              />
            </div>
            <button
              onClick={() => selectedOp && executeOperation(selectedOp)}
              className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold text-sm shadow-sm"
            >
              Execute Operation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
