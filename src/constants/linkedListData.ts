import { LinkedListAlgorithmInfo } from "@/types/linkedlist.types";

export const linkedListData: Record<string, LinkedListAlgorithmInfo> = {
  singly: {
    id: "singly",
    name: "Singly Linked List",
    description:
      "A singly linked list is a linear data structure where each element (node) contains data and a pointer/reference to the next node in the sequence. The first node is called the HEAD, and the last node points to NULL.",
    intuition:
      "Imagine a treasure hunt where each clue tells you the location of the NEXT clue. You can only move forward—never backward. You must start from the first clue (HEAD) every single time.",
    analogies: [
      "A train with coaches: Each coach is connected to the next one by a coupling. To reach the last coach, you must walk through every coach starting from the engine (HEAD). You cannot jump backwards to a previous coach.",
      "A chain of paperclips: Each paperclip hooks onto the next one. If you want to add a new paperclip at the start, you just hook it to the first one. If you want to remove one from the middle, you unhook it and re-link the neighbors.",
      "A scavenger hunt: Each clue card has the address of the next clue. Losing one card breaks the entire chain—you can never find the remaining clues. This is exactly how 'next' pointers work in memory.",
    ],
    operations: [
      { name: "Access (by index)", timeComplexity: "O(n)", description: "Must traverse from HEAD." },
      { name: "Search", timeComplexity: "O(n)", description: "Must traverse from HEAD." },
      { name: "Insert at Beginning", timeComplexity: "O(1)", description: "Just update HEAD pointer." },
      { name: "Insert at End", timeComplexity: "O(n)", description: "Must traverse to the last node." },
      { name: "Delete at Beginning", timeComplexity: "O(1)", description: "Just move HEAD to next." },
      { name: "Delete at End", timeComplexity: "O(n)", description: "Must traverse to second-to-last." },
    ],
    spaceComplexity: "O(n)",
    advantages: [
      "Dynamic size — no need to declare size in advance",
      "Efficient insertion/deletion at the beginning — O(1)",
      "No memory wasted on unused slots (unlike arrays)",
    ],
    disadvantages: [
      "No random access — must traverse from HEAD every time",
      "Extra memory for storing 'next' pointers",
      "Not cache-friendly — nodes scattered in memory",
      "Cannot traverse backwards",
    ],
    useCases: [
      "Implementing stacks and queues",
      "Undo functionality in applications",
      "Dynamic memory allocation (free lists)",
      "Polynomial representation in mathematics",
    ],
    implementations: {
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def insert_at_end(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = new_node

    def delete_node(self, key):
        temp = self.head
        if temp and temp.data == key:
            self.head = temp.next
            return
        prev = None
        while temp and temp.data != key:
            prev = temp
            temp = temp.next
        if temp:
            prev.next = temp.next

    def search(self, key):
        temp = self.head
        pos = 0
        while temp:
            if temp.data == key:
                return pos
            temp = temp.next
            pos += 1
        return -1

    def display(self):
        temp = self.head
        while temp:
            print(temp.data, end=" -> ")
            temp = temp.next
        print("NULL")`,
      java: `class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

class LinkedList {
    Node head;

    void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
    }

    void insertAtEnd(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null)
            temp = temp.next;
        temp.next = newNode;
    }

    void deleteNode(int key) {
        Node temp = head;
        if (temp != null && temp.data == key) {
            head = temp.next;
            return;
        }
        Node prev = null;
        while (temp != null && temp.data != key) {
            prev = temp;
            temp = temp.next;
        }
        if (temp != null)
            prev.next = temp.next;
    }
}`,
      cpp: `struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

class LinkedList {
    Node* head;
public:
    LinkedList() : head(nullptr) {}

    void insertAtBeginning(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }

    void insertAtEnd(int data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next)
            temp = temp->next;
        temp->next = newNode;
    }

    void deleteNode(int key) {
        Node* temp = head;
        if (temp && temp->data == key) {
            head = temp->next;
            delete temp;
            return;
        }
        Node* prev = nullptr;
        while (temp && temp->data != key) {
            prev = temp;
            temp = temp->next;
        }
        if (temp) {
            prev->next = temp->next;
            delete temp;
        }
    }
};`,
      javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let temp = this.head;
        while (temp.next)
            temp = temp.next;
        temp.next = newNode;
    }

    deleteNode(key) {
        let temp = this.head;
        if (temp && temp.data === key) {
            this.head = temp.next;
            return;
        }
        let prev = null;
        while (temp && temp.data !== key) {
            prev = temp;
            temp = temp.next;
        }
        if (temp)
            prev.next = temp.next;
    }

    search(key) {
        let temp = this.head;
        let pos = 0;
        while (temp) {
            if (temp.data === key) return pos;
            temp = temp.next;
            pos++;
        }
        return -1;
    }
}`,
    },
  },
  doubly: {
    id: "doubly",
    name: "Doubly Linked List",
    description:
      "A doubly linked list is a linked list where each node has TWO pointers — one pointing to the next node and another pointing to the previous node. This allows traversal in both directions.",
    intuition:
      "Think of it as a two-way street. Unlike a singly linked list (one-way street), you can move both forward AND backward from any node.",
    analogies: [
      "A music playlist with Previous and Next buttons: You can skip to the next song or go back to the previous song at any time. Each song knows both its predecessor and successor.",
      "A browser's Back and Forward buttons: Each page in your history remembers the page before it AND the page after it, allowing you to move freely in both directions.",
      "A line of people holding hands: Each person holds hands with the person in front AND behind. Anyone can look left or right. If someone leaves, the two neighbors just join hands.",
    ],
    operations: [
      { name: "Access", timeComplexity: "O(n)", description: "Must traverse from either end." },
      { name: "Search", timeComplexity: "O(n)", description: "Can traverse from HEAD or TAIL." },
      { name: "Insert at Beginning", timeComplexity: "O(1)", description: "Update HEAD and prev pointer." },
      { name: "Insert at End", timeComplexity: "O(1)*", description: "O(1) if TAIL pointer is maintained." },
      { name: "Delete any node", timeComplexity: "O(1)*", description: "O(1) if node reference is given." },
    ],
    spaceComplexity: "O(n)",
    advantages: [
      "Bidirectional traversal — can move forward or backward",
      "Easier deletion of a node when you have a reference to it",
      "Can be traversed from TAIL (useful for reverse operations)",
    ],
    disadvantages: [
      "Extra memory for 'prev' pointer in each node",
      "More complex insertion/deletion logic",
      "Still no random access",
    ],
    useCases: [
      "Browser back/forward navigation",
      "Music player playlist (prev/next song)",
      "LRU Cache implementation",
      "Undo/Redo operations in text editors",
    ],
    implementations: {
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_beginning(self, data):
        new_node = Node(data)
        new_node.next = self.head
        if self.head:
            self.head.prev = new_node
        self.head = new_node

    def insert_at_end(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        temp = self.head
        while temp.next:
            temp = temp.next
        temp.next = new_node
        new_node.prev = temp`,
      java: `class Node {
    int data;
    Node prev, next;
    Node(int d) { data = d; prev = null; next = null; }
}

class DoublyLinkedList {
    Node head;

    void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        if (head != null)
            head.prev = newNode;
        head = newNode;
    }

    void insertAtEnd(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            return;
        }
        Node temp = head;
        while (temp.next != null)
            temp = temp.next;
        temp.next = newNode;
        newNode.prev = temp;
    }
}`,
      cpp: `struct Node {
    int data;
    Node *prev, *next;
    Node(int d) : data(d), prev(nullptr), next(nullptr) {}
};

class DoublyLinkedList {
    Node* head;
public:
    DoublyLinkedList() : head(nullptr) {}

    void insertAtBeginning(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        if (head)
            head->prev = newNode;
        head = newNode;
    }
};`,
      javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
    }

    insertAtBeginning(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        if (this.head)
            this.head.prev = newNode;
        this.head = newNode;
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let temp = this.head;
        while (temp.next)
            temp = temp.next;
        temp.next = newNode;
        newNode.prev = temp;
    }
}`,
    },
  },
  circular: {
    id: "circular",
    name: "Circular Linked List",
    description:
      "A circular linked list is a linked list where the last node points back to the first node instead of NULL, forming a continuous loop. It can be singly or doubly circular.",
    intuition:
      "There is no end. The last node connects back to the first, forming a ring. You can keep going around forever until you decide to stop.",
    analogies: [
      "A circular race track: Runners keep going around the track. After crossing the finish line, they are back at the start — there is no end point, just continuous laps.",
      "A round-robin CPU scheduler: The operating system cycles through processes one by one. After the last process, it goes back to the first, ensuring every process gets fair CPU time.",
      "Musical chairs: Players walk in a circle around chairs. The circle has no beginning or end — it loops forever until someone is eliminated.",
    ],
    operations: [
      { name: "Access", timeComplexity: "O(n)", description: "Must traverse from any node." },
      { name: "Search", timeComplexity: "O(n)", description: "Traverse until you return to start." },
      { name: "Insert at Beginning", timeComplexity: "O(n)", description: "Must find last node to update." },
      { name: "Insert at End", timeComplexity: "O(n)", description: "Traverse, insert, update last->next." },
      { name: "Delete", timeComplexity: "O(n)", description: "Traverse, unlink, and re-link." },
    ],
    spaceComplexity: "O(n)",
    advantages: [
      "No NULL references — useful for circular iteration",
      "Can traverse entire list from any node",
      "Natural fit for round-robin scheduling problems",
    ],
    disadvantages: [
      "Easy to accidentally create infinite loops",
      "Must be careful with termination conditions",
      "More complex logic than singly linked list",
    ],
    useCases: [
      "Round-robin CPU scheduling",
      "Circular buffers in streaming",
      "Multiplayer game turns",
      "Josephus problem",
    ],
    implementations: {
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_end(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            new_node.next = self.head
            return
        temp = self.head
        while temp.next != self.head:
            temp = temp.next
        temp.next = new_node
        new_node.next = self.head

    def display(self):
        if not self.head:
            return
        temp = self.head
        while True:
            print(temp.data, end=" -> ")
            temp = temp.next
            if temp == self.head:
                break
        print(f"(back to {self.head.data})")`,
      java: `class Node {
    int data;
    Node next;
    Node(int d) { data = d; next = null; }
}

class CircularLinkedList {
    Node head;

    void insertAtEnd(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            newNode.next = head;
            return;
        }
        Node temp = head;
        while (temp.next != head)
            temp = temp.next;
        temp.next = newNode;
        newNode.next = head;
    }
}`,
      cpp: `struct Node {
    int data;
    Node* next;
    Node(int d) : data(d), next(nullptr) {}
};

class CircularLinkedList {
    Node* head;
public:
    CircularLinkedList() : head(nullptr) {}

    void insertAtEnd(int data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = newNode;
            newNode->next = head;
            return;
        }
        Node* temp = head;
        while (temp->next != head)
            temp = temp->next;
        temp->next = newNode;
        newNode->next = head;
    }
};`,
      javascript: `class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
    }

    insertAtEnd(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            newNode.next = this.head;
            return;
        }
        let temp = this.head;
        while (temp.next !== this.head)
            temp = temp.next;
        temp.next = newNode;
        newNode.next = this.head;
    }
}`,
    },
  },
};
