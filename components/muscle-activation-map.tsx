"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MuscleMap } from './muscle-map';

interface MuscleActivationMapProps {
  primaryMuscles: string[];
  secondaryMuscles: string[];
  colors: {
    icon: string;
  };
}

const MuscleActivationMap: React.FC<MuscleActivationMapProps> = ({ primaryMuscles, secondaryMuscles, colors }) => {
  const [view, setView] = useState<'front' | 'back'>('front');

  const getColorHex = (baseColor: string, isPrimary: boolean) => {
    const colorMap: { [key: string]: string } = {
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
      <div className="absolute top-2 right-2 z-10">
        <Button onClick={() => setView(view === 'front' ? 'back' : 'front')} size="sm" variant="outline" className="bg-white/80 backdrop-blur-sm">
          {view === 'front' ? 'Show Back' : 'Show Front'}
        </Button>
      </div>
      <MuscleMap
        view={view}
        primaryMuscles={primaryMuscles}
        secondaryMuscles={secondaryMuscles}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </div>
  );
};

export { MuscleActivationMap };
