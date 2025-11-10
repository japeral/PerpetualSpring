import React from 'react';

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 sm:mb-12">
      <div className="flex items-center justify-center gap-4 mb-2">
        <SunIcon />
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500">
          Perpetual Spring
        </h1>
      </div>
      <p className="text-slate-400 max-w-2xl mx-auto">
        Discover your next slow-travel destination with perfect weather, tailored to your passport and location.
      </p>
    </header>
  );
};

export default Header;
