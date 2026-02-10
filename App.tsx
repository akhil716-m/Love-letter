
import React, { useState, useEffect } from 'react';
import Landing from './components/Landing';
import Editor from './components/Editor';
import Receiver from './components/Receiver';
import { LetterData, AppView } from './types';

const INITIAL_LETTER_DATA: LetterData = {
  senderName: '',
  content: '',
  paper: 'plain',
  ink: 'script',
  stickers: [],
};

/**
 * UTF-8 safe Base64 encoding
 */
const encodeData = (data: LetterData): string => {
  const json = JSON.stringify(data);
  const bytes = new TextEncoder().encode(json);
  const binString = Array.from(bytes, (byte) => String.fromCodePoint(byte)).join("");
  return btoa(binString);
};

/**
 * UTF-8 safe Base64 decoding
 */
const decodeData = (base64: string): LetterData | null => {
  try {
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to decode shared letter", e);
    return null;
  }
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [letterData, setLetterData] = useState<LetterData>(INITIAL_LETTER_DATA);

  // Check for shared letter data in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('l');
    if (sharedData) {
      const decoded = decodeData(sharedData);
      if (decoded) {
        setLetterData(decoded);
        setView('receiver');
      }
    }
  }, []);

  const reset = () => {
    // Clear URL params without reloading
    window.history.replaceState({}, document.title, window.location.pathname);
    setLetterData(INITIAL_LETTER_DATA);
    setView('landing');
  };

  const handleDone = () => {
    // Generate the share link and navigate to receiver view
    const encoded = encodeData(letterData);
    window.history.replaceState({}, document.title, `?l=${encoded}`);
    setView('receiver');
  };

  return (
    <div className="selection:bg-red-100 selection:text-red-900 font-sans">
      {view === 'landing' && (
        <Landing onStart={() => setView('editor')} />
      )}

      {view === 'editor' && (
        <Editor 
          data={letterData} 
          setData={setLetterData} 
          onDone={handleDone} 
        />
      )}

      {view === 'receiver' && (
        <Receiver 
          data={letterData} 
          onRestart={reset} 
        />
      )}
    </div>
  );
};

export default App;
