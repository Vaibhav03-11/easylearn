"use client";

import { LinkedListAlgorithmInfo } from '@/types/linkedlist.types';
import { useState } from 'react';

interface Props {
  info: LinkedListAlgorithmInfo;
}

export default function LinkedListInfoCard({ info }: Props) {
  const [activeTab, setActiveTab] = useState<'python' | 'java' | 'cpp' | 'javascript'>('python');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      {/* Left Column: Quick Revision */}
      <div className="lg:col-span-1 space-y-4">
        {/* Operations Complexity */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] mb-4">Time & Space Complexity</h3>
          <div className="space-y-2 text-sm">
            {info.operations.map((op, i) => (
              <div key={i} className="flex justify-between border-b pb-2 last:border-b-0 last:pb-0">
                <span className="text-gray-500">{op.name}</span>
                <span className="font-mono font-semibold text-blue-600">{op.timeComplexity}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t mt-2">
              <span className="text-gray-500 font-semibold">Space</span>
              <span className="font-mono font-semibold text-[#2563EB]">{info.spaceComplexity}</span>
            </div>
          </div>
        </div>

        {/* Real World Scenarios */}
        <div className="bg-[#F8FAFC] p-5 rounded-xl border border-blue-100">
          <h3 className="text-sm font-bold text-[#2563EB] uppercase tracking-wider mb-3">Real World Scenarios</h3>
          <ul className="list-none space-y-3">
            {info.analogies.map((analogy, i) => (
              <li key={i} className="text-gray-700 text-sm italic relative pl-4">
                <span className="absolute left-0 top-0 text-[#f59e0b] font-bold">•</span>
                &ldquo;{analogy}&rdquo;
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Notes */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-amber-500 uppercase tracking-wider mb-3 flex items-center gap-1">⭐ Quick Notes</h3>
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-bold text-emerald-600 mb-1">Advantages</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {info.advantages.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5">✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-red-500 mb-1">Disadvantages</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {info.disadvantages.map((d, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-red-400 mt-0.5">✕</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Explanation & Code */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-[#1E293B] mb-2">How It Works</h3>
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">{info.description}</p>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            <span className="font-semibold text-gray-800">Intuition:</span> {info.intuition}
          </p>

          {/* Code Tabs */}
          <div className="mt-6">
            <div className="flex border-b mb-4">
              {(['python', 'java', 'cpp', 'javascript'] as const).map((lang) => (
                <button
                  key={lang}
                  className={`px-4 py-2 text-sm font-medium border-b-2 ${
                    activeTab === lang
                      ? 'border-[#2563EB] text-[#2563EB]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(lang)}
                >
                  {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                </button>
              ))}
            </div>
            <pre className="bg-[#1E293B] text-gray-300 p-4 rounded-lg overflow-x-auto text-sm font-mono max-h-[400px]">
              <code>{info.implementations[activeTab]}</code>
            </pre>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">When to Use</h3>
          <div className="flex flex-wrap gap-2">
            {info.useCases.map((uc, i) => (
              <span key={i} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">
                {uc}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
