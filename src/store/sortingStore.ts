import { create } from 'zustand';
import { AnimationStep } from '@/types/sorting.types';

interface SortingState {
  array: number[];
  size: number;
  speed: number;
  isSorting: boolean;
  isPaused: boolean;
  currentStep: number;
  animationSteps: AnimationStep[];
  
  // Actions
  setArray: (array: number[]) => void;
  setSize: (size: number) => void;
  setSpeed: (speed: number) => void;
  setIsSorting: (isSorting: boolean) => void;
  setIsPaused: (isPaused: boolean) => void;
  setCurrentStep: (step: number) => void;
  setAnimationSteps: (steps: AnimationStep[]) => void;
  reset: () => void;
  generateRandomArray: () => void;
}

const generateArray = (size: number) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);
};

const DEFAULT_SIZE = 30;
const DEFAULT_SPEED = 50;

export const useSortingStore = create<SortingState>((set) => ({
  array: generateArray(DEFAULT_SIZE),
  size: DEFAULT_SIZE,
  speed: DEFAULT_SPEED,
  isSorting: false,
  isPaused: false,
  currentStep: 0,
  animationSteps: [],

  setArray: (array) => set({ 
    array, 
    size: array.length,
    isSorting: false,
    isPaused: false,
    currentStep: 0,
    animationSteps: [],
  }),
  setSize: (size) => set((state) => ({ size, array: generateArray(size) })),
  setSpeed: (speed) => set({ speed }),
  setIsSorting: (isSorting) => set({ isSorting }),
  setIsPaused: (isPaused) => set({ isPaused }),
  setCurrentStep: (step) => set({ currentStep: step }),
  setAnimationSteps: (steps) => set({ animationSteps: steps }),
  
  reset: () => set((state) => ({
    isSorting: false,
    isPaused: false,
    currentStep: 0,
    animationSteps: [],
  })),
  
  generateRandomArray: () => set((state) => ({
    array: generateArray(state.size),
    isSorting: false,
    isPaused: false,
    currentStep: 0,
    animationSteps: [],
  })),
}));
