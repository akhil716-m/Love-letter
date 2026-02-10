
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { LetterData, StickerInstance, PaperType, InkType } from '../types';
import { CupidIcon, PAPER_OPTIONS, INK_OPTIONS, STICKERS } from '../constants';
import Paper from './Paper';

interface EditorProps {
  data: LetterData;
  setData: React.Dispatch<React.SetStateAction<LetterData>>;
  onDone: () => void;
}

const Editor: React.FC<EditorProps> = ({ data, setData, onDone }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  const generateWithAi = async (mood: string) => {
    if (!process.env.API_KEY) {
      alert("API Key is missing. Please ensure it is configured.");
      return;
    }

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a short, heartfelt ${mood} letter. 
                   The sender's name is ${data.senderName || 'someone who loves you'}. 
                   Keep it poetic and concise, suitable for an A4 letter sheet. 
                   Do not include placeholders like [Name]. 
                   Context provided by user: ${aiPrompt}`,
        config: {
          temperature: 0.8,
        }
      });

      const text = response.text || "";
      setData(prev => ({ ...prev, content: text }));
      setShowAiModal(false);
      setAiPrompt('');
    } catch (error) {
      console.error("AI Generation failed", error);
      alert("Something went wrong with the AI writer. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addSticker = (emoji: string) => {
    const newSticker: StickerInstance = {
      id: Math.random().toString(36).substr(2, 9),
      type: emoji,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      rotation: Math.random() * 40 - 20,
    };
    setData(prev => ({
      ...prev,
      stickers: [...prev.stickers, newSticker]
    }));
  };

  const removeLastSticker = () => {
    setData(prev => ({
      ...prev,
      stickers: prev.stickers.slice(0, -1)
    }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      {/* Header */}
      <header className="px-8 py-4 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="scale-50 origin-left">
            <CupidIcon />
          </div>
          <h2 className="hidden md:block font-formal text-xl italic">Drafting your feelings...</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAiModal(true)}
            className="text-red-600 border border-red-100 px-4 py-2 rounded-lg text-sm font-typewriter hover:bg-red-50 transition-all flex items-center gap-2"
          >
            <span className="animate-pulse">✨</span> help me write
          </button>
          <button
            onClick={onDone}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm font-typewriter hover:bg-gray-800 transition-all"
          >
            ready to send
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-6 md:p-12 gap-12 items-start justify-center">
        {/* Left Toolbar */}
        <aside className="w-full lg:w-64 space-y-10 order-2 lg:order-1">
          <section>
            <h3 className="text-gray-400 font-formal text-xs uppercase tracking-widest mb-3">sender's name</h3>
            <input
              type="text"
              value={data.senderName}
              onChange={(e) => setData(prev => ({ ...prev, senderName: e.target.value }))}
              placeholder="Your name..."
              className="w-full border-b border-gray-200 py-2 bg-transparent font-typewriter focus:outline-none focus:border-black transition-colors"
            />
          </section>

          <section>
            <h3 className="text-gray-400 font-formal text-xs uppercase tracking-widest mb-3">paper texture</h3>
            <div className="flex gap-3 flex-wrap">
              {PAPER_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setData(prev => ({ ...prev, paper: opt.id as PaperType }))}
                  className={`w-10 h-10 rounded-full transition-all transform hover:scale-110 shadow-sm border border-gray-100 ${opt.class} ${
                    data.paper === opt.id ? 'ring-2 ring-black ring-offset-2' : ''
                  }`}
                />
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-gray-400 font-formal text-xs uppercase tracking-widest mb-3">ink style</h3>
            <div className="flex gap-3 flex-wrap">
              {INK_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setData(prev => ({ ...prev, ink: opt.id as InkType }))}
                  className={`min-w-[3rem] px-3 h-10 border border-gray-100 rounded-lg flex items-center justify-center transition-all shadow-sm ${
                    data.ink === opt.id ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-50'
                  }`}
                >
                  <span className={`${opt.fontClass} text-lg`}>Aa</span>
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Main Sheet */}
        <div className="flex-1 max-w-[700px] w-full order-1 lg:order-2">
          <div className="bg-[#f0f0f0] p-4 md:p-8 rounded-2xl shadow-inner">
            <Paper
              paper={data.paper}
              ink={data.ink}
              content={data.content}
              stickers={data.stickers}
              onContentChange={(text) => setData(prev => ({ ...prev, content: text }))}
            />
          </div>
        </div>

        {/* Right Toolbar */}
        <aside className="w-full lg:w-64 order-3">
          <h3 className="text-gray-400 font-formal text-xs uppercase tracking-widest mb-4">add memories</h3>
          <div className="grid grid-cols-4 lg:grid-cols-3 gap-3">
            {STICKERS.map((sticker) => (
              <button
                key={sticker.id}
                onClick={() => addSticker(sticker.emoji)}
                className="aspect-square bg-white border border-gray-100 rounded-xl flex items-center justify-center text-3xl hover:bg-gray-50 hover:rotate-6 transition-all shadow-sm"
              >
                {sticker.emoji}
              </button>
            ))}
            {data.stickers.length > 0 && (
              <button
                onClick={removeLastSticker}
                className="aspect-square bg-white border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all text-xs font-typewriter"
              >
                undo
              </button>
            )}
          </div>
        </aside>
      </main>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-formal mb-1">Writer's Block?</h3>
                <p className="text-gray-500 text-sm">Let our AI help you find the right words.</p>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-black">&times;</button>
            </div>
            
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Who are you writing to? Any special memory or feeling you want to include?"
              className="w-full h-32 p-4 border border-gray-100 rounded-xl bg-gray-50 focus:outline-none focus:ring-1 focus:ring-red-100 text-sm font-typewriter resize-none mb-6"
            />

            <div className="grid grid-cols-2 gap-3 mb-6">
              {['Romantic ❤️', 'Friendly ☕', 'Poetic 🌙', 'Apology 🙏'].map((mood) => (
                <button
                  key={mood}
                  disabled={isGenerating}
                  onClick={() => generateWithAi(mood)}
                  className="py-3 px-4 rounded-xl border border-gray-100 text-sm font-typewriter hover:bg-gray-50 hover:border-black transition-all disabled:opacity-50"
                >
                  {mood}
                </button>
              ))}
            </div>

            {isGenerating && (
              <div className="text-center py-2">
                <div className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                <span className="text-xs font-typewriter text-red-500">finding the words...</span>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleUp { animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default Editor;
