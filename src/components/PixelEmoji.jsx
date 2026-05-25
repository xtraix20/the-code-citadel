// Helper function to dynamically parse ASCII-art grids and return grouped <rect> elements
const drawPixelArt = (grid, colors) => {
  const rects = [];
  // Split grid into lines
  const lines = grid.split('\n');
  
  // Remove first and last lines if they are empty (typical in multiline template strings)
  if (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }
  if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
    lines.pop();
  }
  
  const height = lines.length;
  
  // Find the maximum length of any line in the grid (this is the true width)
  let width = 0;
  lines.forEach(line => {
    if (line.length > width) {
      width = line.length;
    }
  });
  
  lines.forEach((line, y) => {
    let currentFill = null;
    let startX = 0;
    let runLength = 0;
    
    // Split the line as-is, without trimming leading/trailing spaces, to keep exact columns!
    const chars = line.split('');
    chars.forEach((char, x) => {
      const fill = colors[char] || null;
      if (fill === currentFill) {
        runLength++;
      } else {
        if (currentFill) {
          rects.push(
            <rect key={`${y}-${startX}`} x={startX} y={y} width={runLength} height={1} fill={currentFill} />
          );
        }
        currentFill = fill;
        startX = x;
        runLength = 1;
      }
    });
    if (currentFill) {
      rects.push(
        <rect key={`${y}-${startX}`} x={startX} y={y} width={runLength} height={1} fill={currentFill} />
      );
    }
  });
  
  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`} 
      width="100%" 
      height="100%" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated', display: 'block' }}
    >
      {rects}
    </svg>
  );
};

// 8x8 and 12x12 Pixel-Art Grids for all emojis
const templates = {
  "🏰": {
    grid: `
  R     R  
  .     .  
 .L.   .L. 
.LGL. .LGL.
.L.L. .L.L.
.LGLGLGLGL.
.LGGGGGGGL.
.LGGSSSGGL.
.LGGYYYGGL.
.LG.Y.Y.GL.
.LG.Y.Y.GL.
...........
`,
    colors: {
      '.': '#000000',
      'G': '#787878', // Gray
      'L': '#b0b0b0', // Light Gray
      'S': '#404040', // Dark shadow Gray
      'R': '#ef4444', // Red banner
      'Y': '#fbbf24', // Gold gate
    }
  },
  "🪙": {
    grid: `
   ....   
  .YYYY.  
 .YYWWYY. 
.YWWYYYYY.
.YYYYDDYY.
.YYYYDDYY.
.YYYYYDDY.
 .YYYDDY. 
  .YYYY.  
   ....   
`,
    colors: {
      '.': '#000000',
      'Y': '#ffd700', // Gold
      'W': '#ffffff', // Highlight
      'D': '#b8860b', // Bronze shadow
    }
  },
  "🍺": {
    grid: `
   WWWW     
  WWWWWW    
 .WWWWWW.   
.WWWWWWWW.  
.YYYYYYYD.W 
.YYYYYYYD.W.
.YYYYYYYD..W
.YYYYYYYD.W.
.YYYYYYYD.W 
.YYYYYYYD.  
 .DDDDDD.   
  ......    
`,
    colors: {
      '.': '#000000',
      'W': '#ffffff',
      'Y': '#ffae00',
      'D': '#d97706',
    }
  },
  "🎒": {
    grid: `
    ....    
   .RRRR.   
  .RRRRRR.  
 .R.R..R.R. 
.RRR.SS.RRR.
.RRR.SS.RRR.
.RRYYYYYYDR.
.RRYYYYYYDR.
.RRYYYYYYDR.
 .R......R. 
  .RRRRRR.  
   ......   
`,
    colors: {
      '.': '#000000',
      'R': '#dc2626',
      'Y': '#fbbf24',
      'S': '#4b5563',
      'D': '#991b1b',
    }
  },
  "🧪": {
    grid: `
    ....    
    .BB.    
    .BB.    
    .GG.    
   .GGGG.   
  .GGGGGG.  
 .GPLLPPPG. 
.GPLLPPPPPG.
.GPPPPPPPPG.
.GPPPPPPPPG.
 .GGGGGGGG. 
   ......   
`,
    colors: {
      '.': '#000000',
      'B': '#a16207',
      'G': '#e2e8f0',
      'P': '#db2777',
      'L': '#fbcfe8',
    }
  },
  "🛡️": {
    grid: `
........... 
.SSSSSSSSS. 
.SBBBBBBBS. 
.SBBBYBBBS. 
.SBBYYYBBS. 
.SBBYYYBBS. 
.SBBBYBBBS. 
.SBBBBBBBS. 
 .SBBBBBS.  
  .SBBBS.   
   .SBS.    
    .S.     
`,
    colors: {
      '.': '#000000',
      'S': '#94a3b8',
      'B': '#2563eb',
      'Y': '#fbbf24',
    }
  },
  "🛡": {
    grid: `
........... 
.SSSSSSSSS. 
.SBBBBBBBS. 
.SBBBYBBBS. 
.SBBYYYBBS. 
.SBBYYYBBS. 
.SBBBYBBBS. 
.SBBBBBBBS. 
 .SBBBBBS.  
  .SBBBS.   
   .SBS.    
    .S.     
`,
    colors: {
      '.': '#000000',
      'S': '#94a3b8',
      'B': '#2563eb',
      'Y': '#fbbf24',
    }
  },
  "📜": {
    grid: `
  .......   
 .PPPPPPP.  
.PPPPPPPP.. 
.PLPPPLPP.L.
.PPPPPPPP..L
.PPPPPPPP.L.
.PLPPPLPP.  
.PPPPPPPP.  
.PPPPPPPP.  
 .PPPPPPP.  
  .......   
`,
    colors: {
      '.': '#000000',
      'P': '#fef08a',
      'L': '#78350f',
    }
  },
  "⚔️": {
    grid: `
.         . 
..       .. 
.S.     .S. 
.DS.   .DS. 
 .DS. .DS.  
  .DYYYD.   
   .YYY.    
   .H.H.    
  .H. .H.   
  ..   ..   
`,
    colors: {
      '.': '#000000',
      'S': '#cbd5e1',
      'D': '#94a3b8',
      'Y': '#eab308',
      'H': '#78350f',
    }
  },
  "⚔": {
    grid: `
.         . 
..       .. 
.S.     .S. 
.DS.   .DS. 
 .DS. .DS.  
  .DYYYD.   
   .YYY.    
   .H.H.    
  .H. .H.   
  ..   ..   
`,
    colors: {
      '.': '#000000',
      'S': '#cbd5e1',
      'D': '#94a3b8',
      'Y': '#eab308',
      'H': '#78350f',
    }
  },
  "🏆": {
    grid: `
  ........  
 .YYYYYYYY. 
.S.YYYYYY.S.
.S.YHYYYY.S.
.S.YHYYYY.S.
 .S.YYYY.S. 
  .SYYYYD.  
   .SYYD.   
    .YD.    
   .BBBB.   
  .BBBBBB.  
   ......   
`,
    colors: {
      '.': '#000000',
      'Y': '#fbbf24',
      'H': '#ffffff',
      'S': '#d97706',
      'D': '#b45309',
      'B': '#4b5563',
    }
  },
  "🐍": {
    grid: `
    .....   
   .GGGGL.  
  .GWWGGGL. 
  .GGGGGL.  
   .GGGGL.  
  .GGGGGL.  
 .GGLGGGGGL.
.GGLGGGGGGGL
.GGGGGGGGGG.
 .GGGGGGGG. 
  .R....R.  
   ..  ..   
`,
    colors: {
      '.': '#000000',
      'G': '#16a34a',
      'L': '#4ade80',
      'R': '#dc2626',
      'W': '#ffffff',
    }
  },
  "🕸️": {
    grid: `
.     .     .
 .   .   . . 
  . . . . .  
   . . . .   
. . . . . . .
   . . . .   
  . . . . .  
 .   .   . . 
.     .     .
`,
    colors: {
      '.': '#cbd5e1',
      ' ': 'transparent',
    }
  },
  "⚡": {
    grid: `
    ....    
   .YYYY.   
  .YYYYY.   
 .YYWWYY.   
.YYWWYY.    
.YWWYYYYYY. 
 .YYYYYY.   
  .YYYY.    
   .YY.     
    .Y.     
`,
    colors: {
      '.': '#000000',
      'Y': '#fbbf24',
      'W': '#ffffff',
    }
  },
  "🏃": {
    grid: `
    ....    
   .CCCC.   
   .CCCC.   
    .CC.    
   .CCCC.   
  .CCCCCC.  
 .CLCCCCLC. 
.CLCCCCCCLC.
.CCCC  CCCC.
.CCC    CCC.
 .C      C. 
`,
    colors: {
      '.': '#000000',
      'C': '#06b6d4',
      'L': '#22d3ee',
    }
  },
  "🏛️": {
    grid: `
   ....   
  .GGGG.  
 .GGGGGG. 
.GGGGGGGG.
.G.L..L.G.
.G.L..L.G.
.G.L..L.G.
.G......G.
.GGGGGGGG.
..........
`,
    colors: {
      '.': '#000000',
      'G': '#94a3b8',
      'L': '#cbd5e1',
    }
  },
  "💀": {
    grid: `
   ......   
  .WWWWWW.  
 .WWWWWWWW. 
.W..WW..WW.
.W..WW..WW.
.WWWWWWWWW.
 .WWGWWGWW. 
  .WWWWWW.  
   ......   
`,
    colors: {
      '.': '#000000',
      'W': '#f1f5f9',
      'G': '#94a3b8',
    }
  },
  "☠️": {
    grid: `
   ......   
  .WWWWWW.  
 .WWWWWWWW. 
.W..WW..WW.
.W..WW..WW.
.WWWWWWWWW.
 .WWGWWGWW. 
  .WWWWWW.  
   ......   
`,
    colors: {
      '.': '#000000',
      'W': '#f1f5f9',
      'G': '#94a3b8',
    }
  },
  "🧙‍♀️": {
    grid: `
    ..    
   .PP.   
  .PPPP.  
 .PPPPPP. 
.PPPPPPPP.
.H.F..F.H.
.H.FFFF.H.
.HH.DD.HH.
 .DDDDDD. 
  ......  
`,
    colors: {
      '.': '#000000',
      'P': '#7c3aed',
      'F': '#fed7aa',
      'H': '#fbbf24',
      'D': '#059669',
    }
  },
  "💎": {
    grid: `
   ....   
  .WCCW.  
 .WCCCCD. 
.WCCCCCCD.
.CCCCCCDD.
 .CCCCDD. 
  .CCDD.  
   .CD.   
    ..    
`,
    colors: {
      '.': '#000000',
      'C': '#06b6d4',
      'W': '#ffffff',
      'D': '#0891b2',
    }
  }
};

// Build high-compatibility emoji mapping with and without variation selectors
const emojiMap = {};
Object.entries(templates).forEach(([key, value]) => {
  const normalizedKey = key.replace(/[\uFE00-\uFE0F]/g, '');
  emojiMap[key] = value;
  emojiMap[normalizedKey] = value;
});

const PixelEmoji = ({ emoji, className = '' }) => {
  const rawTrimmed = emoji ? emoji.trim() : '';
  // Strip out variation selectors (U+FE00 - U+FE0F) for robust cross-platform matching
  const normalized = rawTrimmed.replace(/[\uFE00-\uFE0F]/g, '');
  
  const emojiData = emojiMap[normalized] || emojiMap[rawTrimmed];
  
  if (emojiData) {
    // Dynamically call drawPixelArt inside the render method to generate a FRESH element!
    const rendered = drawPixelArt(emojiData.grid, emojiData.colors);
    const isCustomSize = className.includes('w-') || className.includes('h-');
    
    return (
      <span 
        className={`inline-flex items-center justify-center align-middle ${className}`}
        style={isCustomSize ? { display: 'inline-flex', verticalAlign: 'middle', lineHeight: 1 } : {
          display: 'inline-flex',
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
      style={isCustomSize ? { display: 'inline-flex' } : {
        display: 'inline-flex',
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
