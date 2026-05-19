export type LinkedListType = "singly" | "doubly" | "circular";

export type LinkedListOperation =
  | "insert-beginning"
  | "insert-end"
  | "insert-position"
  | "delete-beginning"
  | "delete-end"
  | "delete-position"
  | "search"
  | "traverse"
  | "reverse";

export interface LLNode {
  id: string;
  value: number;
  address: string; // Simulated hex memory address
  isHighlighted: boolean;
  isNew: boolean;
  isDeleting: boolean;
  isFound: boolean;
}

export interface LLAnimationStep {
  nodes: LLNode[];
  headIndex: number | null;
  tailIndex: number | null; // For doubly/circular
  currentPointer: number | null; // Which node the traversal pointer is on
  logMessage: string;
  operation: LinkedListOperation;
  codeHighlightLine?: number; // Which pseudocode line to highlight
}

export interface LinkedListAlgorithmInfo {
  id: LinkedListType;
  name: string;
  description: string;
  intuition: string;
  analogies: string[];
  operations: {
    name: string;
    timeComplexity: string;
    description: string;
  }[];
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  useCases: string[];
  implementations: {
    python: string;
    java: string;
    cpp: string;
    javascript: string;
  };
}
