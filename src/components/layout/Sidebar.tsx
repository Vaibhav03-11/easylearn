import Link from "next/link";

const algorithms = [
  { name: "Bubble Sort", path: "bubble-sort" },
  { name: "Selection Sort", path: "selection-sort" },
  { name: "Insertion Sort", path: "insertion-sort" },
  { name: "Merge Sort", path: "merge-sort" },
  { name: "Quick Sort", path: "quick-sort" },
  { name: "Heap Sort", path: "heap-sort" },
  { name: "Radix Sort", path: "radix-sort" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:block min-h-[calc(100vh-73px)] p-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Sorting Algorithms</h3>
      <ul className="space-y-2">
        {algorithms.map((algo) => (
          <li key={algo.path}>
            <Link
              href={`/sorting/${algo.path}`}
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-[#2563EB] transition-colors"
            >
              {algo.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
