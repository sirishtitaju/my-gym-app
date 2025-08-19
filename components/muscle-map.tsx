"use client"

import React from 'react';
import FrontMuscles from '@/public/front-muscles-labeled.svg';
import BackMuscles from '@/public/back-muscles-labeled.svg';

interface MuscleMapProps {
  view: 'front' | 'back';
  primaryMuscles: string[];
  secondaryMuscles: string[];
  primaryColor: string;
  secondaryColor: string;
}

const MuscleMap: React.FC<MuscleMapProps> = ({ view, primaryMuscles, secondaryMuscles, primaryColor, secondaryColor }) => {
  const MuscleComponent = view === 'front' ? FrontMuscles : BackMuscles;

  const style = `
    .muscle-group path, .muscle-group ellipse {
      transition: fill 0.3s ease-in-out, fill-opacity 0.3s ease-in-out;
      fill: #a1a1aa;
      fill-opacity: 0.3;
    }
    ${primaryMuscles.map(id => `#${id} path, #${id} ellipse`).join(', ')} {
      fill: ${primaryColor};
      fill-opacity: 0.9;
    }
    ${secondaryMuscles.map(id => `#${id} path, #${id} ellipse`).join(', ')} {
      fill: ${secondaryColor};
      fill-opacity: 0.7;
    }
  `;

  return (
    <div className="relative w-full aspect-[1/2]">
      <style>{style}</style>
      <MuscleComponent className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export { MuscleMap };
