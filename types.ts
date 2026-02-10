
export type PaperType = 'plain' | 'dots' | 'grid' | 'hearts';
export type InkType = 'script' | 'handwriting' | 'formal' | 'typewriter';

export interface StickerInstance {
  id: string;
  type: string;
  x: number;
  y: number;
  rotation: number;
}

export interface LetterData {
  senderName: string;
  content: string;
  paper: PaperType;
  ink: InkType;
  stickers: StickerInstance[];
}

export type AppView = 'landing' | 'editor' | 'receiver';
