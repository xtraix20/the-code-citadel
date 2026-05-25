import React from 'react';

const emojiMap = {
  "🏰": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M1,2 h2 M9,2 h2 M1,3 h10 M1,4 h10 M0,5 h12 M0,6 h12 M0,7 h12 M0,8 h12 M0,9 h12 M0,10 h12 M0,11 h12" fill="#000" />
      <path d="M2,3 h1 M9,3 h1 M2,4 h8 M1,5 h10 M1,6 h10 M1,7 h10 M1,8 h10 M1,9 h10 M1,10 h10" fill="#787878" />
      <path d="M2,3 h1 M9,3 h1 M3,5 h1 M8,5 h1 M2,7 h2 M8,7 h2 M3,9 h2" fill="#b0b0b0" />
      <path d="M2,4 h1 M9,4 h1 M1,5 h1 M10,5 h1 M1,7 h1 M10,7 h1 M1,9 h1 M10,9 h1 M1,10 h10" fill="#404040" />
      <path d="M2,1 h1 M9,1 h1" fill="#ff0000" />
      <path d="M5,8 h2 M4,9 h4 M4,10 h4" fill="#d4af37" />
      <path d="M5,9 h2 M5,10 h2" fill="#000" />
    </svg>
  ),
  "🪙": (
    <svg viewBox="0 0 10 10" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M3,0 h4 M2,1 h1 M7,1 h1 M1,2 h1 M8,2 h1 M0,3 h1 M9,3 h1 M0,4 h1 M9,4 h1 M0,5 h1 M9,5 h1 M0,6 h1 M9,6 h1 M1,7 h1 M8,7 h1 M2,8 h1 M7,8 h1 M3,9 h4" fill="#000" />
      <path d="M3,1 h4 M2,2 h6 M1,3 h8 M1,4 h8 M1,5 h8 M1,6 h8 M2,7 h6 M3,8 h4" fill="#ffd700" />
      <path d="M3,2 h3 M2,3 h1 M2,4 h1 M3,3 h1" fill="#fff" />
      <path d="M4,4 h2 M4,5 h2 M5,3 h1 M5,6 h1 M7,5 h1 M7,6 h1 M6,7 h1" fill="#b8860b" />
    </svg>
  ),
  "🍺": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M3,2 h6 M2,3 h1 M9,3 h1 M1,4 h2 M8,4 h4 M1,5 h1 M8,5 h1 M11,5 h1 M1,6 h1 M8,6 h4 M1,7 h1 M8,7 h1 M11,7 h1 M1,8 h1 M8,8 h4 M2,9 h7 M3,10 h5" fill="#000" />
      <path d="M4,3 h4 M3,4 h5" fill="#fff" />
      <path d="M3,5 h5 M3,6 h5 M3,7 h5 M3,8 h5 M3,9 h5" fill="#ffae00" />
      <path d="M7,5 h1 M7,6 h1 M7,7 h1 M7,8 h1 M6,9 h2" fill="#d97706" />
      <path d="M9,5 h2 M9,6 h1 M10,6 h1 M9,7 h1 M10,7 h1 M9,8 h2" fill="#fff" />
      <path d="M10,6 h1 M10,7 h1" fill="#000" />
    </svg>
  ),
  "🎒": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M4,1 h4 M3,2 h1 M8,2 h1 M2,3 h6 M1,4 h10 M1,5 h10 M1,6 h10 M1,7 h10 M1,8 h10 M2,9 h8 M3,10 h6" fill="#000" />
      <path d="M4,2 h4 M3,3 h6 M2,4 h8 M2,5 h8 M2,6 h8 M2,7 h8 M2,8 h8 M3,9 h6" fill="#dc2626" />
      <path d="M4,6 h4 M3,7 h6 M3,8 h6" fill="#fbbf24" />
      <path d="M5,4 h2 M5,7 h2" fill="#000" />
    </svg>
  ),
  "🧪": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M5,1 h2 M4,2 h1 M7,2 h1 M4,3 h4 M4,4 h1 M7,4 h1 M3,5 h1 M8,5 h1 M2,6 h1 M9,6 h1 M1,7 h1 M10,7 h1 M1,8 h1 M10,8 h1 M1,9 h1 M10,9 h1 M2,10 h8 M4,11 h4" fill="#000" />
      <path d="M5,2 h2 M5,3 h2" fill="#a16207" />
      <path d="M5,4 h2" fill="#e2e8f0" />
      <path d="M4,6 h4 M3,7 h6 M2,8 h8 M2,9 h8 M3,10 h6" fill="#db2777" />
      <path d="M3,7 h2 M2,8 h1 M3,8 h1" fill="#fbcfe8" />
      <path d="M4,5 h4 M3,6 h1" fill="#cbd5e1" />
    </svg>
  ),
  "🛡️": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M1,1 h10 M1,2 h1 M10,2 h1 M1,3 h1 M10,3 h1 M1,4 h1 M10,4 h1 M1,5 h1 M10,5 h1 M2,6 h1 M9,6 h1 M2,7 h1 M9,7 h1 M3,8 h1 M8,8 h1 M4,9 h1 M7,9 h1 M5,10 h2" fill="#000" />
      <path d="M2,2 h8 M2,3 h1 M9,3 h1 M2,4 h1 M9,4 h1 M2,5 h1 M9,5 h1 M3,6 h1 M8,6 h1 M3,7 h1 M8,7 h1 M4,8 h4 M5,9 h2" fill="#94a3b8" />
      <path d="M3,3 h6 M3,4 h6 M3,5 h6 M4,6 h4 M4,7 h4 M5,8 h2" fill="#2563eb" />
      <path d="M5,4 h2 M6,3 h1 M6,5 h1 M5,6 h2 M6,7 h1" fill="#fbbf24" />
    </svg>
  ),
  "🛡": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M1,1 h10 M1,2 h1 M10,2 h1 M1,3 h1 M10,3 h1 M1,4 h1 M10,4 h1 M1,5 h1 M10,5 h1 M2,6 h1 M9,6 h1 M2,7 h1 M9,7 h1 M3,8 h1 M8,8 h1 M4,9 h1 M7,9 h1 M5,10 h2" fill="#000" />
      <path d="M2,2 h8 M2,3 h1 M9,3 h1 M2,4 h1 M9,4 h1 M2,5 h1 M9,5 h1 M3,6 h1 M8,6 h1 M3,7 h1 M8,7 h1 M4,8 h4 M5,9 h2" fill="#94a3b8" />
      <path d="M3,3 h6 M3,4 h6 M3,5 h6 M4,6 h4 M4,7 h4 M5,8 h2" fill="#2563eb" />
      <path d="M5,4 h2 M6,3 h1 M6,5 h1 M5,6 h2 M6,7 h1" fill="#fbbf24" />
    </svg>
  ),
  "📜": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M2,1 h7 M1,2 h1 M9,2 h2 M1,3 h1 M11,3 h1 M0,4 h2 M11,4 h1 M0,5 h1 M10,5 h2 M0,6 h1 M9,6 h2 M0,7 h1 M9,7 h2 M0,8 h1 M9,8 h2 M1,9 h1 M9,9 h2 M1,10 h9" fill="#000" />
      <path d="M3,2 h6 M2,3 h9 M2,4 h9 M1,5 h9 M1,6 h8 M1,7 h8 M1,8 h8 M2,9 h7" fill="#fef08a" />
      <path d="M4,4 h4 M3,6 h5 M3,8 h4" fill="#78350f" />
      <path d="M10,6 h1 M10,7 h1 M10,8 h1" fill="#78350f" />
    </svg>
  ),
  "⚔️": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M1,1 h1 M10,1 h1 M2,2 h1 M9,2 h1 M3,3 h1 M8,3 h1 M4,4 h1 M7,4 h1 M5,5 h2 M4,6 h1 M7,6 h1 M3,7 h1 M8,7 h1 M2,8 h1 M9,8 h1 M1,9 h1 M10,9 h1" fill="#000" />
      <path d="M2,1 h1 M9,1 h1 M3,2 h1 M8,2 h1 M4,3 h1 M7,3 h1 M5,4 h2" fill="#cbd5e1" />
      <path d="M1,2 h1 M10,2 h1 M2,3 h1 M9,3 h1 M3,4 h1 M8,4 h1 M4,5 h1 M7,5 h1" fill="#94a3b8" />
      <path d="M3,7 h1 M8,7 h1 M5,6 h2 M4,7 h1 M7,7 h1" fill="#eab308" />
      <path d="M2,9 h1 M9,9 h1 M1,10 h1 M10,10 h1" fill="#78350f" />
    </svg>
  ),
  "⚔": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M1,1 h1 M10,1 h1 M2,2 h1 M9,2 h1 M3,3 h1 M8,3 h1 M4,4 h1 M7,4 h1 M5,5 h2 M4,6 h1 M7,6 h1 M3,7 h1 M8,7 h1 M2,8 h1 M9,8 h1 M1,9 h1 M10,9 h1" fill="#000" />
      <path d="M2,1 h1 M9,1 h1 M3,2 h1 M8,2 h1 M4,3 h1 M7,3 h1 M5,4 h2" fill="#cbd5e1" />
      <path d="M1,2 h1 M10,2 h1 M2,3 h1 M9,3 h1 M3,4 h1 M8,4 h1 M4,5 h1 M7,5 h1" fill="#94a3b8" />
      <path d="M3,7 h1 M8,7 h1 M5,6 h2 M4,7 h1 M7,7 h1" fill="#eab308" />
      <path d="M2,9 h1 M9,9 h1 M1,10 h1 M10,10 h1" fill="#78350f" />
    </svg>
  ),
  "🏆": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M2,1 h8 M1,2 h1 M10,2 h1 M0,3 h3 M9,3 h3 M0,4 h1 M2,4 h1 M9,4 h1 M11,4 h1 M0,5 h1 M2,5 h1 M9,5 h1 M11,5 h1 M1,6 h2 M9,6 h2 M2,7 h8 M3,8 h6 M4,9 h4 M2,10 h8 M1,11 h10" fill="#000" />
      <path d="M3,2 h6 M3,3 h6 M3,4 h6 M3,5 h6 M3,6 h6 M3,7 h6 M4,8 h4 M5,9 h2" fill="#fbbf24" />
      <path d="M4,2 h1 M4,3 h1 M4,4 h1 M4,5 h1" fill="#fff" />
      <path d="M1,3 h1 M10,3 h1 M1,4 h1 M10,4 h1 M1,5 h1 M10,5 h1" fill="#d97706" />
      <path d="M3,10 h6 M2,11 h8" fill="#4b5563" />
    </svg>
  ),
  "🐍": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M4,1 h5 M3,2 h1 M9,2 h1 M3,3 h2 M9,3 h1 M5,4 h4 M4,5 h1 M9,5 h1 M2,6 h3 M8,6 h2 M1,7 h2 M9,7 h2 M1,8 h1 M10,8 h1 M1,9 h2 M9,9 h2 M2,10 h8 M4,11 h4" fill="#000" />
      <path d="M5,2 h4 M5,3 h4 M6,4 h3 M5,5 h4 M3,6 h5 M2,7 h7 M2,8 h8 M3,9 h6 M5,10 h3" fill="#16a34a" />
      <path d="M6,2 h1 M7,3 h1 M3,7 h2 M3,8 h2" fill="#4ade80" />
      <path d="M4,3 h1" fill="#dc2626" />
      <path d="M8,2 h1" fill="#fff" />
    </svg>
  ),
  "🕸️": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M0,0 h12 M0,11 h12" fill="none" />
      <path d="M0,0 h1 M11,0 h1 M1,1 h1 M10,1 h1 M2,2 h1 M9,2 h1 M3,3 h1 M8,3 h1 M4,4 h4 M5,5 h2 M4,6 h1 M7,6 h1 M3,7 h1 M8,7 h1 M2,8 h1 M9,8 h1 M1,9 h1 M10,9 h1 M0,10 h1 M11,10 h1 M0,11 h1 M11,11 h1" fill="#cbd5e1" />
      <path d="M5,2 h2 M2,5 h1 M9,5 h1 M5,8 h2" fill="#94a3b8" />
      <path d="M3,1 h6 M1,3 h1 M10,3 h1 M1,8 h1 M10,8 h1 M3,10 h6" fill="#64748b" />
    </svg>
  ),
  "⚡": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M5,1 h4 M4,2 h1 M9,2 h1 M3,3 h2 M8,3 h1 M2,4 h2 M7,4 h1 M1,5 h6 M1,6 h8 M3,7 h5 M3,8 h4 M4,9 h3 M4,10 h2 M5,11 h1" fill="#000" />
      <path d="M5,2 h4 M4,3 h4 M3,4 h4 M2,5 h5 M2,6 h6 M4,7 h4 M4,8 h3 M5,9 h2 M5,10 h1" fill="#fbbf24" />
      <path d="M6,2 h1 M5,3 h1 M4,4 h1 M3,5 h1 M3,6 h1" fill="#fff" />
    </svg>
  ),
  "🏃": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M5,1 h3 M4,2 h1 M8,2 h1 M4,3 h1 M8,3 h1 M5,4 h3 M3,5 h5 M2,6 h7 M1,7 h8 M1,8 h7 M2,9 h4 M3,10 h2 M4,11 h2" fill="#000" />
      <path d="M6,2 h1 M5,3 h3 M4,4 h4 M4,5 h3 M3,6 h4 M2,7 h5 M2,8 h4 M3,9 h2" fill="#06b6d4" />
      <path d="M2,6 h1 M1,7 h1 M5,7 h2 M6,8 h1 M5,9 h1 M4,10 h1" fill="#22d3ee" />
    </svg>
  ),
  "🏛️": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M5,1 h2 M4,2 h4 M3,3 h6 M2,4 h8 M1,5 h10 M1,6 h10 M2,7 h8 M2,8 h8 M2,9 h8 M1,10 h10 M0,11 h12" fill="#000" />
      <path d="M5,2 h2 M4,3 h4 M3,4 h6 M2,5 h8 M2,6 h8 M3,10 h6 M1,11 h10" fill="#94a3b8" />
      <path d="M3,7 h1 M5,7 h2 M8,7 h1 M3,8 h1 M5,8 h2 M8,8 h1 M3,9 h1 M5,9 h2 M8,9 h1" fill="#cbd5e1" />
      <path d="M4,7 h1 M7,7 h1 M4,8 h1 M7,8 h1 M4,9 h1 M7,9 h1" fill="#000" />
    </svg>
  ),
  "💀": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M3,1 h6 M2,2 h1 M9,2 h1 M1,3 h1 M10,3 h1 M1,4 h1 M10,4 h1 M1,5 h1 M10,5 h1 M1,6 h1 M10,6 h1 M2,7 h1 M9,7 h1 M3,8 h1 M8,8 h1 M3,9 h6 M4,10 h4" fill="#000" />
      <path d="M3,2 h6 M2,3 h8 M2,4 h8 M2,5 h8 M2,6 h8 M3,7 h6 M4,8 h4 M4,9 h4" fill="#f1f5f9" />
      <path d="M3,4 h2 M7,4 h2 M3,5 h2 M7,5 h2" fill="#000" />
      <path d="M5,6 h2" fill="#000" />
      <path d="M4,8 h1 M6,8 h1 M8,8 h1" fill="#94a3b8" />
    </svg>
  ),
  "☠️": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M3,1 h6 M2,2 h1 M9,2 h1 M1,3 h1 M10,3 h1 M1,4 h1 M10,4 h1 M1,5 h1 M10,5 h1 M1,6 h1 M10,6 h1 M2,7 h1 M9,7 h1 M3,8 h1 M8,8 h1 M3,9 h6 M4,10 h4" fill="#000" />
      <path d="M3,2 h6 M2,3 h8 M2,4 h8 M2,5 h8 M2,6 h8 M3,7 h6 M4,8 h4 M4,9 h4" fill="#f1f5f9" />
      <path d="M3,4 h2 M7,4 h2 M3,5 h2 M7,5 h2" fill="#000" />
      <path d="M5,6 h2" fill="#000" />
      <path d="M4,8 h1 M6,8 h1 M8,8 h1" fill="#94a3b8" />
    </svg>
  ),
  "🧙‍♀️": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M5,1 h2 M4,2 h4 M3,3 h6 M2,4 h8 M1,5 h10 M2,6 h8 M2,7 h8 M1,8 h10 M1,9 h10 M2,10 h8" fill="#000" />
      <path d="M5,2 h2 M4,3 h4 M3,4 h6 M2,5 h8" fill="#7c3aed" />
      <path d="M4,6 h4 M4,7 h4" fill="#fed7aa" />
      <path d="M3,6 h1 M8,6 h1 M3,7 h1 M8,7 h1 M3,8 h2 M7,8 h2" fill="#fbbf24" />
      <path d="M4,8 h4 M2,9 h8 M3,10 h6" fill="#059669" />
      <path d="M4,6 h1 M7,6 h1" fill="#000" />
    </svg>
  ),
  "💎": (
    <svg viewBox="0 0 12 12" width="100%" height="100%" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <path d="M4,1 h4 M2,2 h2 M8,2 h2 M1,3 h1 M10,3 h1 M0,4 h1 M11,4 h1 M0,5 h1 M11,5 h1 M1,6 h1 M10,6 h1 M2,7 h1 M9,7 h1 M3,8 h1 M8,8 h1 M4,9 h1 M7,9 h1 M5,10 h2" fill="#000" />
      <path d="M4,2 h4 M2,3 h8 M1,4 h10 M1,5 h10 M2,6 h8 M3,7 h6 M4,8 h4 M5,9 h2" fill="#06b6d4" />
      <path d="M4,2 h2 M2,3 h3 M1,4 h2 M2,4 h1 M2,5 h1" fill="#fff" />
      <path d="M8,3 h2 M9,4 h2 M8,5 h2 M7,6 h2 M6,7 h2 M5,8 h2" fill="#0891b2" />
    </svg>
  )
};

const PixelEmoji = ({ emoji, className = '' }) => {
  const rawTrimmed = emoji ? emoji.trim() : '';
  // Strip out variation selectors (U+FE00 - U+FE0F) for robust cross-platform matching
  const normalized = rawTrimmed.replace(/[\uFE00-\uFE0F]/g, '');
  
  const rendered = emojiMap[normalized] || emojiMap[rawTrimmed];
  
  if (rendered) {
    const isCustomSize = className.includes('w-') || className.includes('h-');
    
    return (
      <span 
        className={`inline-flex items-center justify-center align-middle ${className}`}
        style={isCustomSize ? { verticalAlign: 'middle', lineHeight: 1 } : {
          display: 'inline-block',
          width: '1.2em',
          height: '1.2em',
          verticalAlign: 'middle',
          lineHeight: 1
        }}
      >
        {rendered}
      </span>
    );
  }
  
  // Fallback to text emoji if we don't have a pixel SVG for it
  const isCustomSize = className.includes('w-') || className.includes('h-');
  return (
    <span 
      className={className}
      style={isCustomSize ? {} : {
        display: 'inline-block',
        width: '1.2em',
        height: '1.2em',
        verticalAlign: 'middle',
        lineHeight: 1
      }}
    >
      {emoji}
    </span>
  );
};

export default PixelEmoji;
