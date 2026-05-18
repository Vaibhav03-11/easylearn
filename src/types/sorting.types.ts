export type SortingAlgorithmType = 
  | "bubble-sort" 
  | "selection-sort" 
  | "insertion-sort" 
  | "merge-sort" 
  | "quick-sort" 
  | "heap-sort" 
  | "radix-sort";

export interface AnimationStep {
  array: number[];
  comparing: number[]; // Indices currently being compared
  swapping: number[]; // Indices currently being swapped
  sorted: number[]; // Indices that are completely sorted
  pivot?: number; // For Quick Sort
  logMessage?: string; // Human-readable log of the operation
}

export interface AlgorithmInfo {
  id: SortingAlgorithmType;
  name: string;
  description: string;
  intuition: string;
  analogy: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  stability: boolean;
  inPlace: boolean;
  useCases: string[];
  pseudocode: string;
  implementations: {
    python: string;
    java: string;
    cpp: string;
    javascript: string;
  };
}
