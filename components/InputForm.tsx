import React from 'react';

interface InputFormProps {
  passport: string;
  setPassport: (passport: string) => void;
  location: string;
  setLocation: (location: string) => void;
  onSuggestDestinations: () => void;
  onGeneratePath: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  passport,
  setPassport,
  location,
  setLocation,
  onSuggestDestinations,
  onGeneratePath,
  isLoading,
}) => {
  return (
    <div className="p-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div className="space-y-4">
          <div>
            <label htmlFor="passport" className="block text-sm font-medium text-slate-300 mb-2">
              Passport Country
            </label>
            <input
              id="passport"
              type="text"
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
              placeholder="e.g., Canada"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
              Current Location
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., New York, USA"
              className="w-full bg-slate-700/50 border border-slate-600 rounded-md py-2 px-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onSuggestDestinations}
            disabled={isLoading || !passport || !location}
            className="w-full flex-1 bg-sky-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Suggest Destinations
          </button>
          <button
            onClick={onGeneratePath}
            disabled={isLoading}
            className="w-full flex-1 bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Generate World Path
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;