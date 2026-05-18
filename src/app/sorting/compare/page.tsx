import ComparisonView from "@/components/sorting/ComparisonView";

export default function ComparePage() {
  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-2">Compare Algorithms</h1>
        <p className="text-gray-600 max-w-3xl">
          Watch Bubble Sort and Quick Sort execute simultaneously to visualize their performance differences.
        </p>
      </div>

      <ComparisonView />
    </div>
  );
}
