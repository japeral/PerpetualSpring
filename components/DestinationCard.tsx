import React from 'react';
import type { Destination } from '../types';

interface DestinationCardProps {
  destination: Destination;
}

const FlightCostIndicator: React.FC<{ cost: Destination['flightCost'] }> = ({ cost }) => {
    let bgColor = 'bg-slate-500';
    if (cost === 'Low') bgColor = 'bg-green-500';
    if (cost === 'Medium') bgColor = 'bg-yellow-500';
    if (cost === 'High') bgColor = 'bg-red-500';

    return (
        <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${bgColor}`}></span>
            <span className="text-sm font-medium text-slate-300">{cost}</span>
        </div>
    );
}

const VisaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);


const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { city, country, description, weather, flightCost, visaInfo } = destination;
  const imageUrl = `https://picsum.photos/seed/${city.replace(/\s/g, '')},${country.replace(/\s/g, '')}/400/200`;

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 duration-300 flex flex-col">
      <img src={imageUrl} alt={`View of ${city}`} className="w-full h-40 object-cover" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-100">{city}, {country}</h3>
        <p className="text-slate-400 mt-2 text-sm flex-grow overflow-auto">{description}</p>
         <div className="mt-4 text-sm flex items-center">
            <VisaIcon />
            <p className="text-slate-300"><span className="font-semibold">Visa:</span> {visaInfo}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-sm">
            <div>
                <p className="text-slate-300 font-medium">Weather</p>
                <p className="text-slate-400">{weather}</p>
            </div>
            <div>
                <p className="text-slate-300 font-medium text-right">Flight Cost</p>
                <FlightCostIndicator cost={flightCost} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;