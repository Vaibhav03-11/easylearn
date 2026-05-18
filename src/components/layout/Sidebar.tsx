"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, Activity, Search, Link as LinkIcon, Network, Share2 } from "lucide-react";

const modules = [
  {
    id: "sorting",
    title: "Sorting",
    icon: <Activity className="w-4 h-4" />,
    items: [
      { name: "Bubble Sort", path: "/sorting/bubble-sort" },
      { name: "Selection Sort", path: "/sorting/selection-sort" },
      { name: "Insertion Sort", path: "/sorting/insertion-sort" },
      { name: "Merge Sort", path: "/sorting/merge-sort" },
      { name: "Quick Sort", path: "/sorting/quick-sort" },
      { name: "Heap Sort", path: "/sorting/heap-sort" },
      { name: "Radix Sort", path: "/sorting/radix-sort" },
      { name: "Comparison Mode", path: "/sorting/compare" },
    ]
  },
  {
    id: "searching",
    title: "Searching",
    icon: <Search className="w-4 h-4" />,
    items: [
      { name: "Linear Search", path: "/searching/linear-search" },
      { name: "Binary Search", path: "/searching/binary-search" },
    ]
  },
  {
    id: "linked-list",
    title: "Linked List",
    icon: <LinkIcon className="w-4 h-4" />,
    items: [
      { name: "Singly Linked List", path: "/linked-list/singly" },
      { name: "Doubly Linked List", path: "/linked-list/doubly" },
      { name: "Circular Linked List", path: "/linked-list/circular" },
    ]
  },
  {
    id: "trees",
    title: "Trees",
    icon: <Network className="w-4 h-4" />,
    items: [
      { name: "Binary Search Tree", path: "/trees/bst" },
      { name: "AVL Tree", path: "/trees/avl" },
    ]
  },
  {
    id: "graphs",
    title: "Graphs",
    icon: <Share2 className="w-4 h-4" />,
    items: [
      { name: "Breadth First Search", path: "/graphs/bfs" },
      { name: "Depth First Search", path: "/graphs/dfs" },
      { name: "Dijkstra's Algorithm", path: "/graphs/dijkstra" },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  // Default open the module that matches the current pathname, or just sorting
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    sorting: true // Always open sorting by default
  });

  const toggleModule = (id: string) => {
    setOpenModules(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <aside className="w-64 bg-[#F8FAFC] border-r border-gray-200 hidden md:flex flex-col min-h-[calc(100vh-73px)]">
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 px-2">Course Modules</h3>
        
        <div className="space-y-1">
          {modules.map((mod) => {
            const isOpen = openModules[mod.id];
            
            return (
              <div key={mod.id} className="flex flex-col">
                <button
                  onClick={() => toggleModule(mod.id)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg transition-colors ${
                    isOpen ? 'bg-blue-50 text-[#2563EB]' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isOpen ? 'text-[#2563EB]' : 'text-gray-400'}>
                      {mod.icon}
                    </span>
                    <span className="font-semibold text-sm">{mod.title}</span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  ) : (
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  )}
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <ul className="mt-1 mb-2 ml-4 pl-4 border-l-2 border-gray-100 space-y-1">
                    {mod.items.map((item) => {
                      const isActive = pathname === item.path;
                      return (
                        <li key={item.path}>
                          <Link
                            href={item.path}
                            className={`block px-3 py-1.5 rounded-md text-sm transition-all ${
                              isActive 
                                ? 'bg-[#2563EB] text-white font-medium shadow-sm' 
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
