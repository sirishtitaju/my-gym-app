"use client"

import React from 'react';
import { MuscleMap } from './muscle-map';
import { frontMuscles, backMuscles } from '@/lib/muscle-groups';

interface MuscleActivationMapProps {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  colors: {
    icon: string;
  };
}

const MuscleActivationMap: React.FC<MuscleActivationMapProps> = ({ primaryMuscles, secondaryMuscles, colors }) => {
  const activeMuscles = [...primaryMuscles, ...secondaryMuscles];

  const showFront = activeMuscles.some(muscle => frontMuscles.includes(muscle));
  const showBack = activeMuscles.some(muscle => backMuscles.includes(muscle));

  let viewMode: 'front' | 'back' | 'both' = 'front';
  if (showFront && showBack) {
    viewMode = 'both';
  } else if (showBack) {
    viewMode = 'back';
  }

  const getColorHex = (baseColor: string, isPrimary: boolean) => {
    const colorMap: { [key:string]: string } = {
      'blue': isPrimary ? '#3b82f6' : '#93c5fd',
      'indigo': isPrimary ? '#6366f1' : '#a5b4fc',
      'green': isPrimary ? '#22c55e' : '#86efac',
      'emerald': isPrimary ? '#10b981' : '#6ee7b7',
      'orange': isPrimary ? '#f97316' : '#fdba74',
      'purple': isPrimary ? '#8b5cf6' : '#c4b5fd',
      'red': isPrimary ? '#ef4444' : '#fca5a5',
      'yellow': isPrimary ? '#f59e0b' : '#fcd34d'
    };
    return colorMap[baseColor] || (isPrimary ? '#f59e0b' : '#fcd34d');
  };

  const baseColor = colors.icon.replace('text-', '').replace('-500', '');
  const primaryColor = getColorHex(baseColor, true);
  const secondaryColor = getColorHex(baseColor, false);

  return (
    <div className="relative">
      <div className={`grid ${viewMode === 'both' ? 'grid-cols-2 gap-4' : ''}`}>
        {(viewMode === 'front' || viewMode === 'both') && (
          <MuscleMap
            view="front"
            primaryMuscles={primaryMuscles}
            secondaryMuscles={secondaryMuscles}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        )}
        {(viewMode === 'back' || viewMode === 'both') && (
          <MuscleMap
            view="back"
            primaryMuscles={primaryMuscles}
            secondaryMuscles={secondaryMuscles}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        )}
      </div>
    </div>
  );
};

export { MuscleActivationMap };
