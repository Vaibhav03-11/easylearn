import { create } from 'zustand';
import { SearchAnimationStep } from '@/types/searching.types';

interface SearchingState {
  array: number[];
  target: number;
  speed: number; // ms delay
  isSearching: boolean;
  isPaused: boolean;
  currentStep: number;
  animationSteps: SearchAnimationStep[];
  
  setArray: (array: number[]) => void;
  setTarget: (target: number) => void;
  setSpeed: (speed: number) => void;
  setIsSearching: (isSearching: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  setAnimationSteps: (steps: SearchAnimationStep[]) => void;
  reset: () => void;
  generateRandomArray: (size: number, sorted?: boolean) => void;
}

export const useSearchingStore = create<SearchingState>((set) => ({
  array: Array.from({ length: 15 }, () => Math.floor(Math.random() * 90) + 10).sort((a, b) => a - b),
  target: 50, // Default target
  speed: 500,
  isSearching: false,
  isPaused: false,
  currentStep: 0,
  animationSteps: [],

  setArray: (array) => set({ array, currentStep: 0, isSearching: false, isPaused: false, animationSteps: [] }),
  setTarget: (target) => set({ target, currentStep: 0, isSearching: false, isPaused: false, animationSteps: [] }),
  setSpeed: (speed) => set({ speed }),
  setIsSearching: (isSearching) => set({ isSearching }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setCurrentStep: (step) => set((state) => ({ 
    currentStep: typeof step === 'function' ? step(state.currentStep) : step 
  })),
  setAnimationSteps: (animationSteps) => set({ animationSteps }),
  reset: () => set({ currentStep: 0, isSearching: false, isPaused: false }),
  generateRandomArray: (size, sorted = false) => {
    let arr = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
    if (sorted) arr.sort((a, b) => a - b);
    // Pick a random target from the array to ensure it's sometimes found
    const target = arr[Math.floor(Math.random() * arr.length)];
    set({ array: arr, target, currentStep: 0, isSearching: false, isPaused: false, animationSteps: [] });
  }
}));
