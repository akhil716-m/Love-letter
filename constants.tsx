
import React from 'react';

export const CupidIcon = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-8">
    <path d="M50 85C50 85 15 65 15 40C15 25 25 15 40 15C45 15 50 20 50 20C50 20 55 15 60 15C75 15 85 25 85 40C85 65 50 85 50 85Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 35L60 55M60 35L40 55" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 50C25 45 35 45 40 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M80 50C75 45 65 45 60 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const STICKERS = [
  { id: 'heart', emoji: '❤️', label: 'Heart' },
  { id: 'flower', emoji: '🌸', label: 'Flower' },
  { id: 'star', emoji: '⭐', label: 'Star' },
  { id: 'bear', emoji: '🧸', label: 'Bear' },
  { id: 'sun', emoji: '☀️', label: 'Sun' },
  { id: 'sparkles', emoji: '✨', label: 'Sparkles' },
  { id: 'love_letter', emoji: '💌', label: 'Letter' },
  { id: 'rainbow', emoji: '🌈', label: 'Rainbow' },
];

export const PAPER_OPTIONS = [
  { id: 'plain', class: 'bg-white border' },
  { id: 'dots', class: 'bg-dots border' },
  { id: 'grid', class: 'bg-grid border' },
  { id: 'hearts', class: 'bg-hearts border' },
] as const;

export const INK_OPTIONS = [
  { id: 'script', name: 'Script', fontClass: 'font-script' },
  { id: 'handwriting', name: 'Hand', fontClass: 'font-handwriting' },
  { id: 'formal', name: 'Serif', fontClass: 'font-formal' },
  { id: 'typewriter', name: 'Mono', fontClass: 'font-typewriter' },
] as const;
