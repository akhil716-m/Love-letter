import React from 'react';
import { CupidIcon } from '../constants';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#fffdfd]">
      <div className="max-w-xl animate-content-fade-in">
        <div className="mb-6 opacity-80 hover:opacity-100 transition-opacity">
          <CupidIcon />
        </div>
        <h1 className="text-7xl md:text-8xl font-formal mb-6 tracking-tight text-gray-900">
          withlove.
        </h1>
        <p className="text-gray-400 font-typewriter text-sm md:text-base leading-relaxed mb-12 max-w-sm mx-auto uppercase tracking-widest">
          The art of writing is the<br />
          art of being remembered.
        </p>
        
        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center bg-black text-white px-12 py-4 rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
        >
          <span className="relative z-10 font-typewriter tracking-widest text-sm uppercase">write a letter</span>
          <div className="absolute inset-0 bg-[#D12D44] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>

      <div className="fixed bottom-10 left-10 text-[10px] font-typewriter text-gray-300 uppercase tracking-[0.2em] hidden sm:block">
        digital stationery studio
      </div>
      <div className="fixed bottom-10 right-10 text-[10px] font-typewriter text-gray-300 uppercase tracking-[0.2em] hidden sm:block">
        &copy; 2024 withlove
      </div>

      <style>{`
        @keyframes contentFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-content-fade-in {
          animation: contentFadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Landing;