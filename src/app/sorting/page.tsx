import Link from "next/link";
import { sortingAlgorithmsData } from "@/constants/sortingData";
import { BarChart2 } from "lucide-react";

export default function SortingPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#1E293B] mb-4">Sorting Algorithms</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose an algorithm to visualize its execution, understand its complexity, and learn the intuition behind it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.values(sortingAlgorithmsData).map((algo) => (
          <Link
            key={algo.id}
            href={`/sorting/${algo.id}`}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                <BarChart2 size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#1E293B]">{algo.name}</h2>
                <div className="text-xs font-mono text-[#10B981] mt-1">{algo.timeComplexity.average}</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{algo.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
