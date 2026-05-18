"use client";

import { SearchAlgorithmInfo } from '@/types/searching.types';
import { useState } from 'react';

interface Props {
  info: SearchAlgorithmInfo;
}

export default function SearchComplexityCard({ info }: Props) {
  const [activeTab, setActiveTab] = useState<'python' | 'java' | 'cpp' | 'javascript'>('python');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] mb-4">Quick Revision</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Best Case</span>
              <span className="font-mono font-medium text-[#10B981]">{info.timeComplexity.best}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Average Case</span>
              <span className="font-mono font-medium text-[#F59E0B]">{info.timeComplexity.average}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Worst Case</span>
              <span className="font-mono font-medium text-red-500">{info.timeComplexity.worst}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Space</span>
              <span className="font-mono font-medium text-[#2563EB]">{info.spaceComplexity}</span>
            </div>
          </div>
        </div>

        <div className="bg-[#F8FAFC] p-5 rounded-xl border border-blue-100">
          <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">Real World Scenarios</h3>
          <ul className="list-none space-y-3">
            {info.analogies.map((analogy, i) => (
               <li key={i} className="text-gray-700 text-sm italic relative pl-4">
                 <span className="absolute left-0 top-0 text-[#f59e0b] font-bold">•</span>
                 "{analogy}"
               </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] mb-2">Algorithm Explanation</h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{info.description}</p>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed"><span className="font-semibold text-gray-800">Intuition:</span> {info.intuition}</p>
          
          <div className="mt-6">
            <div className="flex border-b mb-4">
              {(['python', 'java', 'cpp', 'javascript'] as const).map((lang) => (
                <button
                  key={lang}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === lang ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab(lang)}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            <pre className="bg-[#1E293B] text-gray-300 p-4 rounded-lg overflow-x-auto text-sm font-mono">
              <code>{info.implementations[activeTab]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
