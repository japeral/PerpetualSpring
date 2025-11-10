import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center my-12">
      <div className="w-12 h-12 border-4 border-t-transparent border-sky-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-400">Chasing the sun for you...</p>
    </div>
  );
};

export default LoadingSpinner;
