"use client";

import { useParams } from "next/navigation";
import { sortingAlgorithmsData } from "@/constants/sortingData";
import SortingVisualizer from "@/components/sorting/SortingVisualizer";
import ComplexityCard from "@/components/sorting/ComplexityCard";
import { SortingAlgorithmType } from "@/types/sorting.types";
import { useSortingStore } from "@/store/sortingStore";
import { useEffect } from "react";

export default function AlgorithmPage() {
  const params = useParams();
  const algorithmId = params.algorithm as string;
  const info = sortingAlgorithmsData[algorithmId];
  const reset = useSortingStore((state) => state.reset);

  useEffect(() => {
    // Reset state when switching algorithms
    reset();
  }, [algorithmId, reset]);

  if (!info) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Algorithm Not Found</h1>
        <p className="text-gray-600">The selected algorithm is not available or is under development.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-2">{info.name}</h1>
        <p className="text-gray-600 max-w-3xl">{info.description}</p>
      </div>

      <SortingVisualizer algorithm={algorithmId as SortingAlgorithmType} />
      
      <ComplexityCard info={info} />
    </div>
  );
}
