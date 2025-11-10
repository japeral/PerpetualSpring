import React, { Suspense } from 'react';
import type { Destination, WorldPathStep } from '../types';
import DestinationCard from './DestinationCard';
import WorldPathMap from './WorldPathMap';

interface ResultsDisplayProps {
  destinations: Destination[] | null;
  worldPath: WorldPathStep[] | null;
}

const MapLoadingFallback = () => (
    <div className="w-full h-auto aspect-video bg-slate-800/50 border border-slate-700 rounded-xl p-2 md:p-4 flex items-center justify-center">
        <div className="flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-t-transparent border-sky-400 rounded-full animate-spin"></div>
            <p className="text-slate-400">Loading map geometry...</p>
        </div>
    </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ destinations, worldPath }) => {
  if (destinations) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-slate-200 mb-4">Your Next Adventures</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <DestinationCard key={index} destination={dest} />
          ))}
        </div>
      </div>
    );
  }

  if (worldPath) {
    return (
      <div className="mt-8 space-y-8">
        <div>
           <h2 className="text-2xl font-bold text-slate-200 mb-4">Your Perpetual Spring Path</h2>
           <Suspense fallback={<MapLoadingFallback />}>
            <WorldPathMap path={worldPath} />
           </Suspense>
        </div>
        <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold text-slate-200 mb-6">The Itinerary Details</h2>
          <div className="relative border-l-2 border-slate-600 pl-8">
              {worldPath.map((step, index) => (
                  <div key={index} className="mb-8 last:mb-0">
                      <div className="absolute w-4 h-4 bg-sky-500 rounded-full -left-2 mt-1 border-2 border-slate-800"></div>
                      <p className="text-sky-400 font-semibold">{step.month}</p>
                      <h3 className="text-xl font-bold text-slate-100">{step.location}</h3>
                      <p className="text-slate-400 mt-1">{step.reasoning}</p>
                  </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ResultsDisplay;