"use client";

import { useEffect, useRef, useState } from 'react';
import { useLinkedListStore } from '@/store/linkedListStore';
import LinkedListCanvas from './LinkedListCanvas';
import LinkedListOperations from './LinkedListOperations';
import CodeExecutionView from './CodeExecutionView';
import { LinkedListType } from '@/types/linkedlist.types';

interface Props {
  type: LinkedListType;
}

export default function LinkedListVisualizer({ type }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const {
    nodes,
    animationSteps,
    currentStep,
    isAnimating,
    isPaused,
    speed,
    setCurrentStep,
    setIsAnimating,
  } = useLinkedListStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play effect
  useEffect(() => {
    if (isAnimating && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev: number) => {
          if (prev < animationSteps.length - 1) {
            return prev + 1;
          }
          setIsAnimating(false);
          return prev;
        });
      }, speed);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAnimating, isPaused, speed, animationSteps.length, setCurrentStep, setIsAnimating]);

  const currentAnimationStep = animationSteps[currentStep] || null;

  if (!isMounted) {
    return <div className="h-[400px] w-full flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm animate-pulse text-gray-400 font-medium">Loading visualizer...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Side-by-side: Graph (left) + Code Execution (right) */}
      <div className={`w-full ${currentAnimationStep?.codeContext ? 'grid grid-cols-1 lg:grid-cols-5 gap-4' : ''}`}>
        <div className={currentAnimationStep?.codeContext ? 'lg:col-span-3' : ''}>
          <LinkedListCanvas
            step={currentAnimationStep}
            nodes={nodes}
            isCircular={type === 'circular'}
            isDoubly={type === 'doubly'}
          />
        </div>
        {currentAnimationStep?.codeContext && (
          <div className="lg:col-span-2">
            <CodeExecutionView step={currentAnimationStep} />
          </div>
        )}
      </div>
      <LinkedListOperations />
    </div>
  );
}
