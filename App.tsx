import React, { useState, useCallback } from 'react';
import type { Destination, WorldPathStep } from './types';
import { suggestDestinations, generateWorldPath } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [passport, setPassport] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [destinations, setDestinations] = useState<Destination[] | null>(null);
  const [worldPath, setWorldPath] = useState<WorldPathStep[] | null>(null);

  const clearResults = () => {
    setDestinations(null);
    setWorldPath(null);
    setError(null);
  };

  const handleSuggestDestinations = useCallback(async () => {
    if (!passport || !location) {
      setError('Please enter your passport country and current location.');
      return;
    }
    clearResults();
    setIsLoading(true);

    try {
      const results = await suggestDestinations(passport, location);
      setDestinations(results);
    } catch (e) {
      console.error(e);
      setError('Failed to fetch destination suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [passport, location]);

  const handleGeneratePath = useCallback(async () => {
    clearResults();
    setIsLoading(true);

    try {
      const path = await generateWorldPath();
      setWorldPath(path);
    } catch (e) {
      console.error(e);
      setError('Failed to generate the Perpetual Spring path. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-sky-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-5xl">
        <Header />
        <main>
          <InputForm
            passport={passport}
            setPassport={setPassport}
            location={location}
            setLocation={setLocation}
            onSuggestDestinations={handleSuggestDestinations}
            onGeneratePath={handleGeneratePath}
            isLoading={isLoading}
          />
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}
          {isLoading && <LoadingSpinner />}
          {!isLoading && (destinations || worldPath) && (
             <ResultsDisplay destinations={destinations} worldPath={worldPath} />
          )}
        </main>
         <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Perpetual Spring | Your guide to endless pleasant weather.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;