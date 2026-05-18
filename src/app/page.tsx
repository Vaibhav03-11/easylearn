import Link from "next/link";
import { ArrowRight, BarChart2 } from "lucide-react";

const algorithms = [
  { name: "Bubble Sort", path: "bubble-sort", color: "bg-blue-100 text-blue-700" },
  { name: "Selection Sort", path: "selection-sort", color: "bg-emerald-100 text-emerald-700" },
  { name: "Insertion Sort", path: "insertion-sort", color: "bg-amber-100 text-amber-700" },
  { name: "Merge Sort", path: "merge-sort", color: "bg-purple-100 text-purple-700" },
  { name: "Quick Sort", path: "quick-sort", color: "bg-rose-100 text-rose-700" },
  { name: "Heap Sort", path: "heap-sort", color: "bg-indigo-100 text-indigo-700" },
  { name: "Radix Sort", path: "radix-sort", color: "bg-cyan-100 text-cyan-700" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-extrabold text-[#1E293B] tracking-tight mb-6">
        See Algorithms <span className="text-[#2563EB]">Think.</span>
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl">
        An interactive learning platform for visual learning of Data Structures and Algorithms. Master sorting algorithms with real-time visualizations and step-by-step breakdowns.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-16">
        <Link 
          href="/sorting/bubble-sort" 
          className="flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-transform hover:scale-105"
        >
          Start Learning <ArrowRight size={20} />
        </Link>
        <Link 
          href="/sorting/compare" 
          className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#1E293B] border border-gray-300 px-8 py-3 rounded-full font-medium transition-transform hover:scale-105"
        >
          Compare Algorithms <BarChart2 size={20} />
        </Link>
      </div>

      <div className="w-full text-left">
        <h2 className="text-2xl font-bold mb-6 text-[#1E293B]">Module 1: Sorting Algorithms</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {algorithms.map((algo) => (
            <Link 
              key={algo.path} 
              href={`/sorting/${algo.path}`}
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col items-center justify-center text-center group"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${algo.color}`}>
                <BarChart2 size={24} />
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#2563EB] transition-colors">{algo.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
