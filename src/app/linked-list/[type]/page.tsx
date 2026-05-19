import { linkedListData } from "@/constants/linkedListData";
import { notFound } from "next/navigation";
import LinkedListVisualizer from "@/components/linkedlist/LinkedListVisualizer";
import LinkedListInfoCard from "@/components/linkedlist/LinkedListInfoCard";
import { LinkedListType } from "@/types/linkedlist.types";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export function generateStaticParams() {
  return Object.keys(linkedListData).map((t) => ({
    type: t,
  }));
}

export default async function LinkedListPage({ params }: PageProps) {
  const resolvedParams = await params;
  const typeId = resolvedParams.type;
  const data = linkedListData[typeId];

  if (!data) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">{data.name}</h1>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
          {data.description}
        </p>
      </div>

      <LinkedListVisualizer type={typeId as LinkedListType} />

      <LinkedListInfoCard info={data} />
    </div>
  );
}
