import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from 'react-simple-maps';
import type { WorldPathStep } from '../types';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface WorldPathMapProps {
  path: WorldPathStep[];
}

const WorldPathMap: React.FC<WorldPathMapProps> = ({ path }) => {
  // Filter out steps that are missing valid coordinate data to prevent crashes.
  const validPath = path.filter(
    (step) =>
      typeof step.latitude === 'number' && typeof step.longitude === 'number'
  );

  if (!validPath || validPath.length === 0) {
    return (
        <div className="w-full h-auto aspect-video bg-slate-800/50 border border-slate-700 rounded-xl p-2 md:p-4 flex items-center justify-center">
            <p className="text-slate-400">Map data is unavailable for this path.</p>
        </div>
    );
  }

  // Create pairs of coordinates for the lines from the validated path
  const lines = validPath.map((step, index) => {
    // Loop back to the start for the final line
    const nextStep = validPath[(index + 1) % validPath.length];
    return {
      from: [step.longitude, step.latitude],
      to: [nextStep.longitude, nextStep.latitude],
    };
  });

  return (
    <div className="w-full h-auto aspect-video bg-slate-800/50 border border-slate-700 rounded-xl p-2 md:p-4 overflow-hidden">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 120,
          center: [0, 20],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#2d3748" // slate-800
                stroke="#4a5568" // slate-600
                strokeWidth={0.5}
              />
            ))
          }
        </Geographies>

        {lines.map((line, i) => (
          <Line
            key={`line-${i}`}
            coordinates={[line.from, line.to]}
            stroke="rgba(56, 189, 248, 0.7)" // sky-400 with opacity
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}

        {validPath.map((step, i) => (
          <Marker key={`marker-${i}`} coordinates={[step.longitude, step.latitude]}>
            <circle r={4} fill="#0ea5e9" stroke="#fff" strokeWidth={1} />
            <title>{`${i + 1}. ${step.location}`}</title>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default WorldPathMap;
