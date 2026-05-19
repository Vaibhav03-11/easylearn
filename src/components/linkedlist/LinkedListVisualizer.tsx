"use client";

import { useEffect, useRef } from 'react';
import { useLinkedListStore } from '@/store/linkedListStore';
import LinkedListCanvas from './LinkedListCanvas';
import LinkedListOperations from './LinkedListOperations';
import { LinkedListType } from '@/types/linkedlist.types';

interface Props {
  type: LinkedListType;
}

export default function LinkedListVisualizer({ type }: Props) {
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

  return (
    <div className="w-full flex flex-col items-center">
      <LinkedListCanvas
        step={currentAnimationStep}
        nodes={nodes}
        isCircular={type === 'circular'}
      />
      <LinkedListOperations />
    </div>
  );
}
