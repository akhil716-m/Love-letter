
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

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [letterData, setLetterData] = useState<LetterData>(INITIAL_LETTER_DATA);

  // Check for shared letter data in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('l');
    if (sharedData) {
      try {
        const decoded = JSON.parse(atob(sharedData));
        setLetterData(decoded);
        setView('receiver');
      } catch (e) {
        console.error("Failed to decode shared letter", e);
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
    const encoded = btoa(JSON.stringify(letterData));
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
