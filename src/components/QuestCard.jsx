import PixelEmoji from './PixelEmoji';

const QuestCard = ({ quest, onStart, isCompleted }) => {
  const isBoss = quest.category === "GYM LEADER" || quest.id.includes("boss") || quest.id === "j20";

  return (
    <div className={`stone-card p-8 flex flex-col gap-6 transition-all hover:border-castle-gold group relative overflow-hidden ${
      isCompleted ? 'opacity-55 grayscale-[40%] hover:transform-none border-stone-850' : ''
    }`}>
      {/* Decorative Corner / Defeated Stamp */}
      {isCompleted ? (
        <div className="absolute -top-1 -right-1 bg-red-950 border-2 border-double border-red-500 font-retro text-[8px] text-red-500 px-3 py-2 rotate-12 z-20 shadow-md flex items-center gap-1">
          {isBoss ? (
            <>
              <PixelEmoji emoji="⚔️" />
              <span>DERROTADO</span>
            </>
          ) : (
            <>
              <PixelEmoji emoji="🏆" />
              <span>SUPERADO</span>
            </>
          )}
        </div>
      ) : (
        <div className="absolute top-0 right-0 w-8 h-8 bg-castle-gold border-b-2 border-l-2 border-black flex items-center justify-center font-retro text-[8px] text-black">
          {isBoss ? <PixelEmoji emoji="☠️" /> : <PixelEmoji emoji="⚔️" />}
        </div>
      )}
      
      <div className="flex justify-between items-start relative z-10">
        <span className="text-[9px] font-retro text-castle-gold uppercase tracking-wider font-bold">{quest.category}</span>
        <div className="flex flex-col items-end">
          <span className="text-xl font-retro text-castle-gold drop-shadow-md">{quest.xp}</span>
          <span className="text-[8px] font-retro text-stone-500 uppercase tracking-widest mt-1">XP</span>
        </div>
      </div>

      <div className="relative z-10">
        <h3 className={`text-base font-retro transition-colors tracking-tight mb-4 leading-normal ${
          isCompleted ? 'line-through text-stone-600' : 'text-white group-hover:text-castle-gold'
        }`}>
          {quest.title}
        </h3>
        <p className="text-stone-400 text-lg leading-relaxed font-pixel opacity-90">
          "{quest.description}"
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-800 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 shadow-[0_0_10px_rgba(0,0,0,1)] ${
            quest.difficulty === 'Junior' ? 'bg-green-700' : 'bg-castle-crimson'
          }`}></div>
          <span className="text-[10px] font-retro text-stone-500 uppercase tracking-wider">
            {quest.difficulty}
          </span>
        </div>
      </div>

      {isCompleted ? (
        <button 
          disabled
          className="mt-4 w-full py-3 bg-stone-900 border-2 border-stone-800 text-stone-600 font-retro text-[10px] uppercase tracking-wider cursor-not-allowed relative z-10 font-bold flex items-center justify-center gap-2"
        >
          <span>{isBoss ? "Derrotado" : "Superado"}</span>
          {isBoss ? <PixelEmoji emoji="⚔️" /> : <PixelEmoji emoji="🏆" />}
        </button>
      ) : (
        <button 
          onClick={() => onStart(quest)}
          className="mt-4 w-full py-3 bg-black border-2 border-pixel border-double border-castle-gold text-castle-gold hover:bg-castle-gold hover:text-black transition-all font-retro text-[10px] uppercase tracking-wider shadow-md active:translate-y-1 relative z-10 cursor-pointer"
        >
          Aceptar Reto
        </button>
      )}
    </div>
  );
};

export default QuestCard;
