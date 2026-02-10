
import React from 'react';
import { CupidIcon } from '../constants';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
      <div className="max-w-xl">
        <CupidIcon />
        <h1 className="text-7xl font-formal mb-4 tracking-tight">withlove.</h1>
        <p className="text-gray-500 font-typewriter text-sm md:text-base leading-relaxed mb-12">
          some things are better written and<br />
          sent to someone that matters.
        </p>
        
        <button
          onClick={onStart}
          className="bg-[#D12D44] text-white px-10 py-3 rounded-md hover:bg-[#b02538] transition-all duration-300 transform hover:scale-105 font-typewriter tracking-wider"
        >
          send a letter
        </button>
      </div>

      <div className="fixed bottom-10 left-10 text-xs font-typewriter text-gray-400">
        a small letter. a real feeling.
      </div>
      <div className="fixed bottom-10 right-10 text-xs font-typewriter text-gray-400">
        made with care
      </div>
    </div>
  );
};

export default Landing;
