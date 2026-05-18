export type SearchAlgorithmType = "linear-search" | "binary-search";

export interface SearchAnimationStep {
  array: number[];
  target: number;
  comparing: number[]; // Indices currently being compared
  found: number | null; // Index where target is found
  low?: number; // For binary search
  high?: number; // For binary search
  mid?: number; // For binary search
  logMessage?: string;
}

export interface SearchAlgorithmInfo {
  id: SearchAlgorithmType;
  name: string;
  description: string;
  intuition: string;
  analogies: string[];
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  useCases: string[];
  pseudocode: string;
  implementations: {
    python: string;
    java: string;
    cpp: string;
    javascript: string;
  };
}
