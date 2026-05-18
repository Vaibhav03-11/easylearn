import { searchingAlgorithmsData } from "@/constants/searchingData";
import { notFound } from "next/navigation";
import SearchVisualizer from "@/components/searching/SearchVisualizer";
import SearchComplexityCard from "@/components/searching/SearchComplexityCard";
import { SearchAlgorithmType } from "@/types/searching.types";

interface PageProps {
  params: Promise<{
    algorithm: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(searchingAlgorithmsData).map((algo) => ({
    algorithm: algo,
  }));
}

export default async function SearchingAlgorithmPage({ params }: PageProps) {
  const resolvedParams = await params;
  const algorithmId = resolvedParams.algorithm;
  const algorithmData = searchingAlgorithmsData[algorithmId];

  if (!algorithmData) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">{algorithmData.name}</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          {algorithmData.description}
        </p>
      </div>

      <SearchVisualizer algorithm={algorithmId as SearchAlgorithmType} />
      
      <SearchComplexityCard info={algorithmData} />
    </div>
  );
}
