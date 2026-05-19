import { create } from 'zustand';
import { LLNode, LLAnimationStep, LinkedListOperation } from '@/types/linkedlist.types';

// Generate a fake hex memory address
const genAddress = () => '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');

const createNode = (value: number, overrides?: Partial<LLNode>): LLNode => ({
  id: Math.random().toString(36).substr(2, 9),
  value,
  address: genAddress(),
  isHighlighted: false,
  isNew: false,
  isDeleting: false,
  isFound: false,
  ...overrides,
});

interface LinkedListState {
  nodes: LLNode[];
  animationSteps: LLAnimationStep[];
  currentStep: number;
  isAnimating: boolean;
  isPaused: boolean;
  speed: number;
  
  // Actions
  setNodes: (nodes: LLNode[]) => void;
  setAnimationSteps: (steps: LLAnimationStep[]) => void;
  setCurrentStep: (step: number | ((prev: number) => number)) => void;
  setIsAnimating: (v: boolean) => void;
  setIsPaused: (v: boolean) => void;
  setSpeed: (speed: number) => void;
  
  // Operations that generate animation steps
  insertAtBeginning: (value: number) => void;
  insertAtEnd: (value: number) => void;
  insertAtPosition: (value: number, position: number) => void;
  deleteAtBeginning: () => void;
  deleteAtEnd: () => void;
  deleteAtPosition: (position: number) => void;
  searchNode: (value: number) => void;
  traverseList: () => void;
  reverseList: () => void;
  resetList: () => void;
}

export const useLinkedListStore = create<LinkedListState>((set, get) => ({
  nodes: [
    createNode(10),
    createNode(20),
    createNode(30),
    createNode(40),
    createNode(50),
  ],
  animationSteps: [],
  currentStep: 0,
  isAnimating: false,
  isPaused: false,
  speed: 500,

  setNodes: (nodes) => set({ nodes }),
  setAnimationSteps: (steps) => set({ animationSteps: steps, currentStep: 0 }),
  setCurrentStep: (step) => set((state) => ({
    currentStep: typeof step === 'function' ? step(state.currentStep) : step,
  })),
  setIsAnimating: (v) => set({ isAnimating: v }),
  setIsPaused: (v) => set({ isPaused: v }),
  setSpeed: (speed) => set({ speed }),

  insertAtBeginning: (value: number) => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'insert-beginning';

    // Step 1: Show current state
    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false, isNew: false })),
      headIndex: nodes.length > 0 ? 0 : null,
      tailIndex: null,
      currentPointer: null,
      logMessage: `Current list has ${nodes.length} nodes. We want to insert ${value} at the beginning.`,
      operation: op,
    });

    // Step 2: Create new node
    const newNode = createNode(value, { isNew: true, isHighlighted: true });
    steps.push({
      nodes: [newNode, ...nodes.map(n => ({ ...n, isHighlighted: false, isNew: false }))],
      headIndex: 0,
      tailIndex: null,
      currentPointer: 0,
      logMessage: `Created new node with value ${value} at address ${newNode.address}. Setting its 'next' pointer to the old head.`,
      operation: op,
    });

    // Step 3: Update head
    steps.push({
      nodes: [{ ...newNode, isNew: false, isHighlighted: true }, ...nodes.map(n => ({ ...n, isHighlighted: false, isNew: false }))],
      headIndex: 0,
      tailIndex: null,
      currentPointer: 0,
      logMessage: `HEAD now points to the new node (${value}). Insert at beginning complete! Time: O(1).`,
      operation: op,
    });

    const finalNodes = [{ ...newNode, isNew: false, isHighlighted: false }, ...nodes];
    set({ animationSteps: steps, currentStep: 0, nodes: finalNodes });
  },

  insertAtEnd: (value: number) => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'insert-end';

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false, isNew: false })),
      headIndex: nodes.length > 0 ? 0 : null,
      tailIndex: null,
      currentPointer: null,
      logMessage: `We want to insert ${value} at the end. We must traverse to the last node first.`,
      operation: op,
    });

    // Traverse to end
    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i, isNew: false })),
        headIndex: 0,
        tailIndex: null,
        currentPointer: i,
        logMessage: i < nodes.length - 1
          ? `Traversing... Current node: ${nodes[i].value} (${nodes[i].address}). Moving to next node.`
          : `Reached the last node: ${nodes[i].value}. Its 'next' is currently NULL.`,
        operation: op,
      });
    }

    // Add new node
    const newNode = createNode(value, { isNew: true, isHighlighted: true });
    const withNew = [...nodes.map(n => ({ ...n, isHighlighted: false, isNew: false })), newNode];
    steps.push({
      nodes: withNew,
      headIndex: 0,
      tailIndex: null,
      currentPointer: withNew.length - 1,
      logMessage: `Created new node ${value} at ${newNode.address}. Last node's 'next' now points to it. Insert at end complete! Time: O(n).`,
      operation: op,
    });

    const finalNodes = [...nodes, { ...newNode, isNew: false, isHighlighted: false }];
    set({ animationSteps: steps, currentStep: 0, nodes: finalNodes });
  },

  insertAtPosition: (value: number, position: number) => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'insert-position';
    const pos = Math.max(0, Math.min(position, nodes.length));

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: null,
      logMessage: `Inserting ${value} at position ${pos}. We need to traverse to position ${pos - 1}.`,
      operation: op,
    });

    for (let i = 0; i < pos && i < nodes.length; i++) {
      steps.push({
        nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
        headIndex: 0,
        tailIndex: null,
        currentPointer: i,
        logMessage: `Traversing... at index ${i}, node value: ${nodes[i].value}.`,
        operation: op,
      });
    }

    const newNode = createNode(value, { isNew: true, isHighlighted: true });
    const newNodes = [...nodes];
    newNodes.splice(pos, 0, newNode);
    steps.push({
      nodes: newNodes.map((n, idx) => ({ ...n, isHighlighted: idx === pos, isNew: idx === pos })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: pos,
      logMessage: `Inserted ${value} at position ${pos}. Adjusted previous node's 'next' pointer. Time: O(n).`,
      operation: op,
    });

    set({
      animationSteps: steps,
      currentStep: 0,
      nodes: newNodes.map(n => ({ ...n, isHighlighted: false, isNew: false })),
    });
  },

  deleteAtBeginning: () => {
    const { nodes } = get();
    if (nodes.length === 0) return;
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'delete-beginning';

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === 0 })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: 0,
      logMessage: `Deleting the head node (${nodes[0].value}). HEAD will move to the next node.`,
      operation: op,
    });

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isDeleting: idx === 0, isHighlighted: idx === 1 })),
      headIndex: 1,
      tailIndex: null,
      currentPointer: 0,
      logMessage: `Node ${nodes[0].value} removed. HEAD now points to ${nodes.length > 1 ? nodes[1].value : 'NULL'}. Time: O(1).`,
      operation: op,
    });

    set({ animationSteps: steps, currentStep: 0, nodes: nodes.slice(1) });
  },

  deleteAtEnd: () => {
    const { nodes } = get();
    if (nodes.length === 0) return;
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'delete-end';

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: null,
      logMessage: `Deleting the last node. We must traverse to the second-to-last node.`,
      operation: op,
    });

    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        nodes: nodes.map((n, idx) => ({
          ...n,
          isHighlighted: idx === i,
          isDeleting: i === nodes.length - 1 && idx === i,
        })),
        headIndex: 0,
        tailIndex: null,
        currentPointer: i,
        logMessage: i < nodes.length - 1
          ? `Traversing... at node ${nodes[i].value}.`
          : `Reached last node ${nodes[i].value}. Removing it and setting previous node's 'next' to NULL. Time: O(n).`,
        operation: op,
      });
    }

    set({ animationSteps: steps, currentStep: 0, nodes: nodes.slice(0, -1) });
  },

  deleteAtPosition: (position: number) => {
    const { nodes } = get();
    if (nodes.length === 0 || position < 0 || position >= nodes.length) return;
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'delete-position';

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: null,
      logMessage: `Deleting node at position ${position}. Traversing to find it.`,
      operation: op,
    });

    for (let i = 0; i <= position; i++) {
      steps.push({
        nodes: nodes.map((n, idx) => ({
          ...n,
          isHighlighted: idx === i,
          isDeleting: i === position && idx === i,
        })),
        headIndex: 0,
        tailIndex: null,
        currentPointer: i,
        logMessage: i < position
          ? `Traversing... at index ${i}, node: ${nodes[i].value}.`
          : `Found node ${nodes[i].value} at position ${position}. Removing it and re-linking. Time: O(n).`,
        operation: op,
      });
    }

    const finalNodes = [...nodes];
    finalNodes.splice(position, 1);
    set({ animationSteps: steps, currentStep: 0, nodes: finalNodes });
  },

  searchNode: (value: number) => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'search';

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false, isFound: false })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: null,
      logMessage: `Searching for value ${value}. Starting from HEAD.`,
      operation: op,
    });

    let found = false;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].value === value) {
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i, isFound: idx === i })),
          headIndex: 0,
          tailIndex: null,
          currentPointer: i,
          logMessage: `Found ${value} at index ${i} (address: ${nodes[i].address})! Search complete. Time: O(n).`,
          operation: op,
        });
        found = true;
        break;
      } else {
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
          headIndex: 0,
          tailIndex: null,
          currentPointer: i,
          logMessage: `Checking node at index ${i}: value is ${nodes[i].value}. Not a match. Moving to next.`,
          operation: op,
        });
      }
    }

    if (!found) {
      steps.push({
        nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
        headIndex: 0,
        tailIndex: null,
        currentPointer: null,
        logMessage: `Value ${value} not found in the linked list. Reached NULL. Time: O(n).`,
        operation: op,
      });
    }

    set({ animationSteps: steps, currentStep: 0 });
  },

  traverseList: () => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'traverse';

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: null,
      logMessage: 'Starting traversal from HEAD. We visit every node exactly once.',
      operation: op,
    });

    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
        headIndex: 0,
        tailIndex: null,
        currentPointer: i,
        logMessage: `Visiting node ${i}: value = ${nodes[i].value}, address = ${nodes[i].address}${i < nodes.length - 1 ? '. Moving to next.' : '. Next is NULL.'}`,
        operation: op,
      });
    }

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: null,
      logMessage: `Traversal complete! Visited all ${nodes.length} nodes. Time: O(n).`,
      operation: op,
    });

    set({ animationSteps: steps, currentStep: 0 });
  },

  reverseList: () => {
    const { nodes } = get();
    if (nodes.length <= 1) return;
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'reverse';
    const arr = [...nodes.map(n => ({ ...n, isHighlighted: false }))];

    steps.push({
      nodes: [...arr],
      headIndex: 0,
      tailIndex: null,
      currentPointer: null,
      logMessage: 'Reversing the linked list. We use three pointers: prev, current, and next.',
      operation: op,
    });

    // Simple visual: show swaps step by step
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      const j = arr.length - 1 - i;
      steps.push({
        nodes: arr.map((n, idx) => ({ ...n, isHighlighted: idx === i || idx === j })),
        headIndex: 0,
        tailIndex: null,
        currentPointer: i,
        logMessage: `Reversing pointer at node ${arr[i].value}. Now it points backwards instead of forwards.`,
        operation: op,
      });
    }

    const reversed = [...arr].reverse();
    steps.push({
      nodes: reversed.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0,
      tailIndex: null,
      currentPointer: null,
      logMessage: `List reversed! HEAD now points to ${reversed[0].value}. Time: O(n).`,
      operation: op,
    });

    set({ animationSteps: steps, currentStep: 0, nodes: reversed });
  },

  resetList: () => {
    set({
      nodes: [
        createNode(10),
        createNode(20),
        createNode(30),
        createNode(40),
        createNode(50),
      ],
      animationSteps: [],
      currentStep: 0,
      isAnimating: false,
      isPaused: false,
    });
  },
}));
