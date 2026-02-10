
import React, { useState } from 'react';
import { LetterData } from '../types';
import { CupidIcon } from '../constants';
import Paper from './Paper';

interface ReceiverProps {
  data: LetterData;
  onRestart: () => void;
}

const Receiver: React.FC<ReceiverProps> = ({ data, onRestart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <header className="px-8 py-4 flex justify-between items-center bg-transparent sticky top-0 z-50">
        <div className="scale-50 origin-left">
          <CupidIcon />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleShare}
            className="text-xs font-typewriter px-4 py-2 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2"
          >
            {copied ? 'Link copied! 🎉' : 'Copy Share Link'}
          </button>
          <button
            onClick={onRestart}
            className="text-black text-xs font-typewriter hover:underline transition-all"
          >
            write a new one
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-20 gap-16 overflow-hidden">
        <div className="max-w-md w-full animate-fadeIn">
          <h2 className="text-5xl font-formal mb-4 tracking-tight leading-tight italic">
            to someone special,
          </h2>
          <p className="text-gray-400 font-typewriter text-xs uppercase tracking-widest mb-10 leading-loose">
            this digital letter was crafted with love<br />
            by {data.senderName || 'a secret admirer'}.
          </p>
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#D12D44] text-white px-10 py-4 rounded-full text-sm font-typewriter hover:bg-[#b02538] transition-all transform hover:scale-105 shadow-xl shadow-red-100"
            >
              open the envelope
            </button>
          )}
          {isOpen && (
            <div className="space-y-4">
               <p className="text-gray-400 text-xs font-typewriter animate-fadeIn">
                a keepsake for the heart.
              </p>
              <button 
                onClick={onRestart}
                className="text-xs font-typewriter text-gray-500 hover:text-black border-b border-gray-200"
              >
                write your own back
              </button>
            </div>
          )}
        </div>

        <div className="relative w-full max-w-[550px] aspect-[1/1.414] transition-all duration-1000 transform">
          {/* Envelope Mockup */}
          {!isOpen ? (
            <div 
              className="absolute inset-0 bg-[#fbfbfc] border border-gray-100 rounded-sm shadow-2xl flex items-center justify-center cursor-pointer hover:rotate-1 transition-transform overflow-hidden"
              onClick={() => setIsOpen(true)}
            >
              {/* Back of Envelope */}
              <div className="absolute inset-0 bg-white/40"></div>
              
              <div className="relative z-10 text-center flex flex-col items-center">
                 <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                   <span className="text-2xl">💌</span>
                 </div>
                 <div className="font-handwriting text-3xl text-gray-500 italic">
                  for you.
                </div>
              </div>

              {/* Envelope Flap Top */}
              <div className="absolute top-0 w-full h-1/2 bg-[#f4f5f7] clip-path-envelope shadow-md z-20"></div>
              
              {/* Envelope Bottom Sides */}
              <div className="absolute bottom-0 w-full h-2/3 bg-white border-t border-gray-50 z-10"></div>
            </div>
          ) : (
            <div className="animate-slideUp origin-bottom h-full">
               <div className="scale-[0.9] h-full">
                <Paper
                  paper={data.paper}
                  ink={data.ink}
                  content={data.content}
                  stickers={data.stickers}
                  readOnly={true}
                />
               </div>
            </div>
          )}
        </div>
      </main>

      <footer className="p-8 text-center text-[10px] font-typewriter text-gray-300 uppercase tracking-widest">
        letters mean more than words.
      </footer>

      <style>{`
        .clip-path-envelope {
          clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp { animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fadeIn { animation: fadeIn 1.5s ease-out; }
      `}</style>
    </div>
  );
};

export default Receiver;
