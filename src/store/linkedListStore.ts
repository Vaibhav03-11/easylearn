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
    const code = [
      'void insertAtBeginning(int data) {',
      '    Node newNode = new Node(data);',
      '    newNode.next = head;',
      '    head = newNode;',
      '}',
    ];

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false, isNew: false })),
      headIndex: nodes.length > 0 ? 0 : null, tailIndex: null, currentPointer: null,
      logMessage: `Current list has ${nodes.length} nodes. We want to insert ${value} at the beginning.`,
      operation: op,
      codeContext: { code, highlightLine: 0, variables: { data: String(value), head: nodes.length > 0 ? String(nodes[0].value) : 'NULL' } },
    });

    const newNode = createNode(value, { isNew: true, isHighlighted: true });
    steps.push({
      nodes: [newNode, ...nodes.map(n => ({ ...n, isHighlighted: false, isNew: false }))],
      headIndex: 0, tailIndex: null, currentPointer: 0,
      logMessage: `Created new node with value ${value}. Setting newNode.next = head.`,
      operation: op,
      codeContext: { code, highlightLine: 2, variables: { data: String(value), newNode: String(value), 'newNode.next': nodes.length > 0 ? String(nodes[0].value) : 'NULL', head: nodes.length > 0 ? String(nodes[0].value) : 'NULL' } },
    });

    steps.push({
      nodes: [{ ...newNode, isNew: false, isHighlighted: true }, ...nodes.map(n => ({ ...n, isHighlighted: false, isNew: false }))],
      headIndex: 0, tailIndex: null, currentPointer: 0,
      logMessage: `HEAD now points to ${value}. Insert at beginning complete! O(1).`,
      operation: op,
      codeContext: { code, highlightLine: 3, variables: { data: String(value), newNode: String(value), head: String(value) } },
    });

    const finalNodes = [{ ...newNode, isNew: false, isHighlighted: false }, ...nodes];
    set({ animationSteps: steps, currentStep: 0, nodes: finalNodes });
  },

  insertAtEnd: (value: number) => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'insert-end';
    const code = [
      'void insertAtEnd(int data) {',
      '    Node newNode = new Node(data);',
      '    if (head == null) {',
      '        head = newNode;',
      '        return;',
      '    }',
      '    Node temp = head;',
      '    while (temp.next != null)',
      '        temp = temp.next;',
      '    temp.next = newNode;',
      '}',
    ];

    // Step 1: Function called
    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false, isNew: false })),
      headIndex: nodes.length > 0 ? 0 : null, tailIndex: null, currentPointer: null,
      logMessage: `insertAtEnd(${value}) called. Creating new node.`,
      operation: op,
      codeContext: { code, highlightLine: 1, variables: { data: String(value), newNode: String(value) } },
    });

    // Step 2: Check if head is null
    if (nodes.length === 0) {
      const newNode = createNode(value, { isNew: true, isHighlighted: true });
      steps.push({
        nodes: [newNode], headIndex: 0, tailIndex: null, currentPointer: 0,
        logMessage: `head == null is TRUE. Setting head = newNode(${value}). Done!`,
        operation: op,
        codeContext: { code, highlightLine: 3, variables: { data: String(value), newNode: String(value), head: String(value) } },
      });
      set({ animationSteps: steps, currentStep: 0, nodes: [{ ...newNode, isNew: false, isHighlighted: false }] });
      return;
    }

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0, tailIndex: null, currentPointer: null,
      logMessage: `head == null is FALSE (head = ${nodes[0].value}). Skip to traversal.`,
      operation: op,
      codeContext: { code, highlightLine: 2, variables: { data: String(value), newNode: String(value), head: String(nodes[0].value) } },
    });

    // Step 3: temp = head
    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === 0 })),
      headIndex: 0, tailIndex: null, currentPointer: 0,
      logMessage: `Setting temp = head. temp now points to node ${nodes[0].value}.`,
      operation: op,
      codeContext: { code, highlightLine: 6, variables: { data: String(value), newNode: String(value), temp: String(nodes[0].value), 'temp.next': nodes.length > 1 ? String(nodes[1].value) : 'NULL' } },
    });

    // Step 4: while loop traversal
    for (let i = 0; i < nodes.length; i++) {
      const hasNext = i < nodes.length - 1;
      if (hasNext) {
        // Check condition: temp.next != null → TRUE
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
          headIndex: 0, tailIndex: null, currentPointer: i,
          logMessage: `temp.next != null → TRUE (temp.next = ${nodes[i + 1].value}). Continue loop.`,
          operation: op,
          codeContext: { code, highlightLine: 7, variables: { data: String(value), temp: String(nodes[i].value), 'temp.next': String(nodes[i + 1].value) } },
        });
        // Move temp = temp.next
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i + 1 })),
          headIndex: 0, tailIndex: null, currentPointer: i + 1,
          logMessage: `temp = temp.next → temp now points to ${nodes[i + 1].value}.`,
          operation: op,
          codeContext: { code, highlightLine: 8, variables: { data: String(value), temp: String(nodes[i + 1].value), 'temp.next': i + 1 < nodes.length - 1 ? String(nodes[i + 2].value) : 'NULL' } },
        });
      } else {
        // Check condition: temp.next != null → FALSE
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
          headIndex: 0, tailIndex: null, currentPointer: i,
          logMessage: `temp.next != null → FALSE (temp.next = NULL). Exit loop.`,
          operation: op,
          codeContext: { code, highlightLine: 7, variables: { data: String(value), temp: String(nodes[i].value), 'temp.next': 'NULL' } },
        });
      }
    }

    // Step 5: temp.next = newNode
    const newNode = createNode(value, { isNew: true, isHighlighted: true });
    const withNew = [...nodes.map(n => ({ ...n, isHighlighted: false, isNew: false })), newNode];
    steps.push({
      nodes: withNew, headIndex: 0, tailIndex: null, currentPointer: withNew.length - 1,
      logMessage: `temp.next = newNode(${value}). Node ${value} added at the end! Time: O(n).`,
      operation: op,
      codeContext: { code, highlightLine: 9, variables: { data: String(value), temp: String(nodes[nodes.length - 1].value), 'temp.next': String(value), newNode: String(value) } },
    });

    const finalNodes = [...nodes, { ...newNode, isNew: false, isHighlighted: false }];
    set({ animationSteps: steps, currentStep: 0, nodes: finalNodes });
  },

  insertAtPosition: (value: number, position: number) => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'insert-position';
    const pos = Math.max(0, Math.min(position, nodes.length));
    const code = [
      'void insertAtPosition(int data, int pos) {',
      '    Node newNode = new Node(data);',
      '    if (pos == 0) { insertAtBeginning(data); return; }',
      '    Node temp = head;',
      '    for (int i = 0; i < pos - 1; i++)',
      '        temp = temp.next;',
      '    newNode.next = temp.next;',
      '    temp.next = newNode;',
      '}',
    ];

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0, tailIndex: null, currentPointer: null,
      logMessage: `insertAtPosition(${value}, ${pos}) called.`,
      operation: op,
      codeContext: { code, highlightLine: 1, variables: { data: String(value), pos: String(pos), newNode: String(value) } },
    });

    if (pos > 0) {
      steps.push({
        nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === 0 })),
        headIndex: 0, tailIndex: null, currentPointer: 0,
        logMessage: `pos != 0. Setting temp = head (${nodes[0].value}).`,
        operation: op,
        codeContext: { code, highlightLine: 3, variables: { data: String(value), pos: String(pos), temp: String(nodes[0].value) } },
      });
    }

    for (let i = 0; i < pos && i < nodes.length; i++) {
      if (i < pos - 1) {
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i + 1 })),
          headIndex: 0, tailIndex: null, currentPointer: i + 1,
          logMessage: `i=${i} < pos-1=${pos - 1}. temp = temp.next → ${nodes[i + 1]?.value}.`,
          operation: op,
          codeContext: { code, highlightLine: 5, variables: { data: String(value), i: String(i), temp: String(nodes[i + 1]?.value ?? 'NULL') } },
        });
      }
    }

    const newNode = createNode(value, { isNew: true, isHighlighted: true });
    const newNodes = [...nodes];
    newNodes.splice(pos, 0, newNode);
    steps.push({
      nodes: newNodes.map((n, idx) => ({ ...n, isHighlighted: idx === pos, isNew: idx === pos })),
      headIndex: 0, tailIndex: null, currentPointer: pos,
      logMessage: `newNode.next = temp.next; temp.next = newNode. Inserted ${value} at position ${pos}. O(n).`,
      operation: op,
      codeContext: { code, highlightLine: 7, variables: { data: String(value), temp: pos > 0 ? String(nodes[pos - 1]?.value) : 'head', 'temp.next': String(value), newNode: String(value) } },
    });

    set({
      animationSteps: steps, currentStep: 0,
      nodes: newNodes.map(n => ({ ...n, isHighlighted: false, isNew: false })),
    });
  },

  deleteAtBeginning: () => {
    const { nodes } = get();
    if (nodes.length === 0) return;
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'delete-beginning';
    const code = [
      'void deleteAtBeginning() {',
      '    if (head == null) return;',
      '    Node temp = head;',
      '    head = head.next;',
      '    temp = null; // freed',
      '}',
    ];

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === 0 })),
      headIndex: 0, tailIndex: null, currentPointer: 0,
      logMessage: `head != null. temp = head (${nodes[0].value}).`,
      operation: op,
      codeContext: { code, highlightLine: 2, variables: { head: String(nodes[0].value), temp: String(nodes[0].value) } },
    });

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === 1 })),
      headIndex: nodes.length > 1 ? 1 : null, tailIndex: null, currentPointer: 0,
      logMessage: `head = head.next → ${nodes.length > 1 ? nodes[1].value : 'NULL'}.`,
      operation: op,
      codeContext: { code, highlightLine: 3, variables: { head: nodes.length > 1 ? String(nodes[1].value) : 'NULL', temp: String(nodes[0].value) } },
    });

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isDeleting: idx === 0, isHighlighted: idx === 1 })),
      headIndex: nodes.length > 1 ? 1 : null, tailIndex: null, currentPointer: 0,
      logMessage: `temp (${nodes[0].value}) freed. Delete complete! O(1).`,
      operation: op,
      codeContext: { code, highlightLine: 4, variables: { head: nodes.length > 1 ? String(nodes[1].value) : 'NULL', temp: 'null (freed)' } },
    });

    set({ animationSteps: steps, currentStep: 0, nodes: nodes.slice(1) });
  },

  deleteAtEnd: () => {
    const { nodes } = get();
    if (nodes.length === 0) return;
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'delete-end';
    const code = [
      'void deleteAtEnd() {',
      '    if (head == null) return;',
      '    if (head.next == null) { head = null; return; }',
      '    Node temp = head;',
      '    while (temp.next.next != null)',
      '        temp = temp.next;',
      '    temp.next = null;',
      '}',
    ];

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0, tailIndex: null, currentPointer: null,
      logMessage: `deleteAtEnd() called. head != null.`,
      operation: op,
      codeContext: { code, highlightLine: 1, variables: { head: String(nodes[0].value) } },
    });

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === 0 })),
      headIndex: 0, tailIndex: null, currentPointer: 0,
      logMessage: `temp = head (${nodes[0].value}).`,
      operation: op,
      codeContext: { code, highlightLine: 3, variables: { temp: String(nodes[0].value), 'temp.next': nodes.length > 1 ? String(nodes[1].value) : 'NULL' } },
    });

    for (let i = 0; i < nodes.length - 1; i++) {
      const hasNextNext = i < nodes.length - 2;
      if (hasNextNext) {
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
          headIndex: 0, tailIndex: null, currentPointer: i,
          logMessage: `temp.next.next != null → TRUE. Continue.`,
          operation: op,
          codeContext: { code, highlightLine: 4, variables: { temp: String(nodes[i].value), 'temp.next': String(nodes[i + 1].value) } },
        });
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i + 1 })),
          headIndex: 0, tailIndex: null, currentPointer: i + 1,
          logMessage: `temp = temp.next → ${nodes[i + 1].value}.`,
          operation: op,
          codeContext: { code, highlightLine: 5, variables: { temp: String(nodes[i + 1].value), 'temp.next': String(nodes[i + 2]?.value ?? 'NULL') } },
        });
      } else {
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
          headIndex: 0, tailIndex: null, currentPointer: i,
          logMessage: `temp.next.next == null → FALSE. Exit loop. temp = ${nodes[i].value}.`,
          operation: op,
          codeContext: { code, highlightLine: 4, variables: { temp: String(nodes[i].value), 'temp.next': String(nodes[i + 1].value) } },
        });
      }
    }

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: false, isDeleting: idx === nodes.length - 1 })),
      headIndex: 0, tailIndex: null, currentPointer: nodes.length - 2,
      logMessage: `temp.next = null. Node ${nodes[nodes.length - 1].value} removed. O(n).`,
      operation: op,
      codeContext: { code, highlightLine: 6, variables: { temp: String(nodes[nodes.length - 2]?.value ?? nodes[0].value), 'temp.next': 'null' } },
    });

    set({ animationSteps: steps, currentStep: 0, nodes: nodes.slice(0, -1) });
  },

  deleteAtPosition: (position: number) => {
    const { nodes } = get();
    if (nodes.length === 0 || position < 0 || position >= nodes.length) return;
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'delete-position';
    const code = [
      'void deleteAtPosition(int pos) {',
      '    if (head == null) return;',
      '    if (pos == 0) { deleteAtBeginning(); return; }',
      '    Node temp = head;',
      '    for (int i = 0; i < pos - 1; i++)',
      '        temp = temp.next;',
      '    Node delNode = temp.next;',
      '    temp.next = delNode.next;',
      '    delNode = null; // freed',
      '}',
    ];

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0, tailIndex: null, currentPointer: null,
      logMessage: `deleteAtPosition(${position}) called.`,
      operation: op,
      codeContext: { code, highlightLine: 0, variables: { pos: String(position) } },
    });

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === 0 })),
      headIndex: 0, tailIndex: null, currentPointer: 0,
      logMessage: `temp = head (${nodes[0].value}).`,
      operation: op,
      codeContext: { code, highlightLine: 3, variables: { pos: String(position), temp: String(nodes[0].value) } },
    });

    for (let i = 0; i < position - 1 && i < nodes.length - 1; i++) {
      steps.push({
        nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i + 1 })),
        headIndex: 0, tailIndex: null, currentPointer: i + 1,
        logMessage: `i=${i} < pos-1=${position - 1}. temp = temp.next → ${nodes[i + 1].value}.`,
        operation: op,
        codeContext: { code, highlightLine: 5, variables: { pos: String(position), i: String(i), temp: String(nodes[i + 1].value) } },
      });
    }

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === position })),
      headIndex: 0, tailIndex: null, currentPointer: position,
      logMessage: `delNode = temp.next = ${nodes[position].value}.`,
      operation: op,
      codeContext: { code, highlightLine: 6, variables: { temp: String(nodes[Math.max(0, position - 1)].value), delNode: String(nodes[position].value) } },
    });

    steps.push({
      nodes: nodes.map((n, idx) => ({ ...n, isDeleting: idx === position })),
      headIndex: 0, tailIndex: null, currentPointer: position,
      logMessage: `temp.next = delNode.next. Node ${nodes[position].value} removed. O(n).`,
      operation: op,
      codeContext: { code, highlightLine: 8, variables: { temp: String(nodes[Math.max(0, position - 1)].value), 'temp.next': position < nodes.length - 1 ? String(nodes[position + 1].value) : 'NULL', delNode: 'null (freed)' } },
    });

    const finalNodes = [...nodes];
    finalNodes.splice(position, 1);
    set({ animationSteps: steps, currentStep: 0, nodes: finalNodes });
  },

  searchNode: (value: number) => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'search';
    const code = [
      'int search(int key) {',
      '    Node temp = head;',
      '    int pos = 0;',
      '    while (temp != null) {',
      '        if (temp.data == key)',
      '            return pos;',
      '        temp = temp.next;',
      '        pos++;',
      '    }',
      '    return -1; // not found',
      '}',
    ];

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false, isFound: false })),
      headIndex: 0, tailIndex: null, currentPointer: 0,
      logMessage: `search(${value}) called. temp = head (${nodes[0]?.value}).`,
      operation: op,
      codeContext: { code, highlightLine: 1, variables: { key: String(value), temp: String(nodes[0]?.value ?? 'NULL'), pos: '0' } },
    });

    let found = false;
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].value === value) {
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i, isFound: idx === i })),
          headIndex: 0, tailIndex: null, currentPointer: i,
          logMessage: `temp.data (${nodes[i].value}) == key (${value}) → TRUE! Found at pos ${i}. Return ${i}.`,
          operation: op,
          codeContext: { code, highlightLine: 5, variables: { key: String(value), temp: String(nodes[i].value), 'temp.data': String(nodes[i].value), pos: String(i), result: String(i) } },
        });
        found = true;
        break;
      } else {
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
          headIndex: 0, tailIndex: null, currentPointer: i,
          logMessage: `temp.data (${nodes[i].value}) != key (${value}). Move to next.`,
          operation: op,
          codeContext: { code, highlightLine: 4, variables: { key: String(value), temp: String(nodes[i].value), 'temp.data': String(nodes[i].value), pos: String(i) } },
        });
        if (i < nodes.length - 1) {
          steps.push({
            nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i + 1 })),
            headIndex: 0, tailIndex: null, currentPointer: i + 1,
            logMessage: `temp = temp.next → ${nodes[i + 1].value}. pos++.`,
            operation: op,
            codeContext: { code, highlightLine: 6, variables: { key: String(value), temp: String(nodes[i + 1].value), pos: String(i + 1) } },
          });
        }
      }
    }

    if (!found) {
      steps.push({
        nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
        headIndex: 0, tailIndex: null, currentPointer: null,
        logMessage: `temp == null. Value ${value} not found. Return -1.`,
        operation: op,
        codeContext: { code, highlightLine: 9, variables: { key: String(value), temp: 'NULL', result: '-1' } },
      });
    }

    set({ animationSteps: steps, currentStep: 0 });
  },

  traverseList: () => {
    const { nodes } = get();
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'traverse';
    const code = [
      'void traverse() {',
      '    Node temp = head;',
      '    while (temp != null) {',
      '        print(temp.data);',
      '        temp = temp.next;',
      '    }',
      '}',
    ];

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0, tailIndex: null, currentPointer: 0,
      logMessage: `traverse() called. temp = head (${nodes[0]?.value}).`,
      operation: op,
      codeContext: { code, highlightLine: 1, variables: { temp: String(nodes[0]?.value ?? 'NULL') } },
    });

    for (let i = 0; i < nodes.length; i++) {
      steps.push({
        nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
        headIndex: 0, tailIndex: null, currentPointer: i,
        logMessage: `temp != null → TRUE. print(${nodes[i].value}).`,
        operation: op,
        codeContext: { code, highlightLine: 3, variables: { temp: String(nodes[i].value), 'temp.data': String(nodes[i].value), output: nodes.slice(0, i + 1).map(n => n.value).join(' → ') } },
      });
      if (i < nodes.length - 1) {
        steps.push({
          nodes: nodes.map((n, idx) => ({ ...n, isHighlighted: idx === i + 1 })),
          headIndex: 0, tailIndex: null, currentPointer: i + 1,
          logMessage: `temp = temp.next → ${nodes[i + 1].value}.`,
          operation: op,
          codeContext: { code, highlightLine: 4, variables: { temp: String(nodes[i + 1].value) } },
        });
      }
    }

    steps.push({
      nodes: nodes.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0, tailIndex: null, currentPointer: null,
      logMessage: `temp == null. Traversal complete! Visited ${nodes.length} nodes. O(n).`,
      operation: op,
      codeContext: { code, highlightLine: 2, variables: { temp: 'NULL', output: nodes.map(n => n.value).join(' → ') + ' → NULL' } },
    });

    set({ animationSteps: steps, currentStep: 0 });
  },

  reverseList: () => {
    const { nodes } = get();
    if (nodes.length <= 1) return;
    const steps: LLAnimationStep[] = [];
    const op: LinkedListOperation = 'reverse';
    const arr = [...nodes.map(n => ({ ...n, isHighlighted: false }))];
    const code = [
      'void reverse() {',
      '    Node prev = null;',
      '    Node current = head;',
      '    Node next = null;',
      '    while (current != null) {',
      '        next = current.next;',
      '        current.next = prev;',
      '        prev = current;',
      '        current = next;',
      '    }',
      '    head = prev;',
      '}',
    ];

    steps.push({
      nodes: [...arr],
      headIndex: 0, tailIndex: null, currentPointer: null,
      logMessage: `reverse() called. prev = null, current = head (${arr[0].value}).`,
      operation: op,
      codeContext: { code, highlightLine: 2, variables: { prev: 'NULL', current: String(arr[0].value), next: 'NULL' } },
    });

    // Walk through the reversal
    for (let i = 0; i < arr.length; i++) {
      const nextVal = i < arr.length - 1 ? String(arr[i + 1].value) : 'NULL';
      const prevVal = i > 0 ? String(arr[i - 1].value) : 'NULL';

      steps.push({
        nodes: arr.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
        headIndex: 0, tailIndex: null, currentPointer: i,
        logMessage: `next = current.next (${nextVal}). current.next = prev (${prevVal}).`,
        operation: op,
        codeContext: { code, highlightLine: 6, variables: { prev: prevVal, current: String(arr[i].value), next: nextVal, 'current.next': prevVal } },
      });

      steps.push({
        nodes: arr.map((n, idx) => ({ ...n, isHighlighted: idx === i })),
        headIndex: 0, tailIndex: null, currentPointer: i,
        logMessage: `prev = current (${arr[i].value}). current = next (${nextVal}).`,
        operation: op,
        codeContext: { code, highlightLine: 8, variables: { prev: String(arr[i].value), current: nextVal, next: nextVal } },
      });
    }

    const reversed = [...arr].reverse();
    steps.push({
      nodes: reversed.map(n => ({ ...n, isHighlighted: false })),
      headIndex: 0, tailIndex: null, currentPointer: null,
      logMessage: `current == null. head = prev (${reversed[0].value}). Reversed! O(n).`,
      operation: op,
      codeContext: { code, highlightLine: 10, variables: { prev: String(reversed[0].value), current: 'NULL', head: String(reversed[0].value) } },
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
