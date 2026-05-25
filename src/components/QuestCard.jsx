import React from 'react';

const QuestCard = ({ quest, onStart, isCompleted }) => {
  const isBoss = quest.category === "GYM LEADER" || quest.id.includes("boss") || quest.id === "j20";

  return (
    <div className={`stone-card p-10 flex flex-col gap-8 transition-all hover:border-castle-gold group relative overflow-hidden ${
      isCompleted ? 'opacity-55 grayscale-[40%] hover:transform-none border-stone-850' : ''
    }`}>
      {/* Decorative Corner / Defeated Stamp */}
      {isCompleted ? (
        <div className="absolute -top-1 -right-1 bg-red-950 border-2 border-double border-red-500 font-retro text-[8px] text-red-500 px-3 py-2 rotate-12 z-20 shadow-md">
          {isBoss ? "⚔️ DERROTADO" : "🏆 SUPERADO"}
        </div>
      ) : (
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-castle-wood rotate-45 border-4 border-castle-gold opacity-50"></div>
      )}
      
      <div className="flex justify-between items-start relative z-10">
        <span className="text-[10px] font-mono text-castle-gold uppercase tracking-[0.3em] font-bold">{quest.category}</span>
        <div className="flex flex-col items-end">
          <span className="text-lg font-medieval text-castle-gold drop-shadow-md">{quest.xp}</span>
          <span className="text-[8px] font-mono text-stone-500 uppercase tracking-widest">Honor</span>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className={`text-3xl font-medieval transition-colors tracking-tighter mb-4 leading-none ${
          isCompleted ? 'line-through text-stone-600' : 'text-white group-hover:text-castle-gold'
        }`}>
          {quest.title}
        </h3>
        <p className="text-stone-500 text-lg italic leading-relaxed font-serif opacity-80">
          "{quest.description}"
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-stone-800/50 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rotate-45 shadow-[0_0_10px_rgba(0,0,0,1)] ${
            quest.difficulty === 'Junior' ? 'bg-green-700' : 'bg-castle-crimson'
          }`}></div>
          <span className="text-[10px] font-mono text-stone-600 uppercase tracking-[0.2em]">
            Dificultad: {quest.difficulty}
          </span>
        </div>
      </div>

      {isCompleted ? (
        <button 
          disabled
          className="mt-6 w-full py-4 bg-stone-950 border-2 border-stone-900 text-stone-600 font-medieval text-sm uppercase tracking-[0.3em] shadow-inner cursor-not-allowed relative z-10 font-bold"
        >
          {isBoss ? "Boss Derrotado ⚔️" : "Reto Superado 🏆"}
        </button>
      ) : (
        <button 
          onClick={() => onStart(quest)}
          className="mt-6 w-full py-4 bg-[#1a1311] border-2 border-castle-wood text-stone-500 group-hover:bg-castle-wood group-hover:text-castle-gold transition-all font-medieval text-sm uppercase tracking-[0.4em] shadow-lg active:translate-y-1 relative z-10 cursor-pointer"
        >
          Aceptar Reto
        </button>
      )}
    </div>
  );
};

export default QuestCard;
