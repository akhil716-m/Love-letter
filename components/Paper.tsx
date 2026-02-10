
import React from 'react';
import { PaperType, InkType, StickerInstance } from '../types';
import { INK_OPTIONS } from '../constants';

interface PaperProps {
  paper: PaperType;
  ink: InkType;
  content: string;
  stickers: StickerInstance[];
  onContentChange?: (text: string) => void;
  readOnly?: boolean;
}

const Paper: React.FC<PaperProps> = ({ 
  paper, 
  ink, 
  content, 
  stickers, 
  onContentChange,
  readOnly = false 
}) => {
  const paperClass = paper === 'plain' ? 'bg-white' : 
                     paper === 'dots' ? 'bg-dots' : 
                     paper === 'grid' ? 'bg-grid' : 
                     paper === 'hearts' ? 'bg-hearts' : 'bg-white';

  const fontClass = INK_OPTIONS.find(opt => opt.id === ink)?.fontClass || 'font-script';

  return (
    <div className={`relative w-full h-full aspect-[1/1.414] shadow-2xl transition-all duration-300 rounded-sm p-12 md:p-20 overflow-hidden ${paperClass}`}>
      {/* Paper Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")' }}></div>
      
      {/* Letter Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {readOnly ? (
          <div className={`w-full h-full whitespace-pre-wrap break-words text-2xl md:text-3xl leading-relaxed text-gray-800 ${fontClass}`}>
            {content}
          </div>
        ) : (
          <textarea
            className={`w-full h-full bg-transparent border-none outline-none resize-none text-2xl md:text-3xl leading-relaxed text-gray-800 focus:ring-0 ${fontClass}`}
            placeholder="Let your heart speak..."
            value={content}
            onChange={(e) => onContentChange?.(e.target.value)}
          />
        )}
      </div>

      {/* Stickers Overlay */}
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className="absolute z-20 pointer-events-none select-none transition-transform duration-300 drop-shadow-md"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg)`,
            fontSize: 'min(5vw, 5rem)'
          }}
        >
          {sticker.type}
        </div>
      ))}

      {/* Subtle folds/shadows */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.02)]"></div>
    </div>
  );
};

export default Paper;
