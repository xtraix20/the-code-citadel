import React, { useState, useEffect } from 'react';
import { paths } from './data/quests';
import QuestCard from './components/QuestCard';
import { validateSolution } from './engines/ValidationEngine';
import { getLessonForQuest } from './data/learningContent';
import { bountiesList } from './data/tavernBounties';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('citadel_user');
    const defaultUser = {
      name: "",
      rank: "Escudero",
      honor: 0,
      gold: 100,
      hp: 100,
      maxHp: 100,
      inventory: ["Poción de Vida"],
      activeBounties: [],
      completedBounties: [],
      level: 1,
      badges: [],
      isRegistered: false
    };
    if (!saved) return defaultUser;
    const parsed = JSON.parse(saved);
    return { ...defaultUser, ...parsed };
  });

  const [activePath, setActivePath] = useState(paths[0]);
  const [activeQuest, setActiveQuest] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("concept"); // "concept", "example", "guide"

  // ⚔️ Estados de Duelo contra Boss (Retro 8-Bit)
  const [bossHp, setBossHp] = useState(100);
  const [bossMaxHp, setBossMaxHp] = useState(100);
  const [battleLog, setBattleLog] = useState([]);
  const [activeEffects, setActiveEffects] = useState({ shield: false });
  const [combatAnimClass, setCombatAnimClass] = useState(""); // "animate-pixel-shake"
  const [combatFlashClass, setCombatFlashClass] = useState(""); // "animate-damage-flash"

  // 🍺 Estados de Taberna y Mochila
  const [showTavern, setShowTavern] = useState(false);
  const [showBackpack, setShowBackpack] = useState(false);
  const [bountyNotice, setBountyNotice] = useState(null); // Notificación de contrato

  const lesson = activeQuest ? getLessonForQuest(activeQuest) : null;

  useEffect(() => {
    localStorage.setItem('citadel_user', JSON.stringify(user));
  }, [user]);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (name.trim()) {
      setUser(prev => ({ ...prev, name: name.trim(), isRegistered: true }));
    }
  };

  const startQuest = (quest) => {
    setActiveQuest(quest);
    setUserInput("");
    setFeedback(null);
    setShowHint(false);
    setHintIndex(0);
    setActiveTab("concept");
    setCombatAnimClass("");
    setCombatFlashClass("");

    // Inicializar Duelo de Boss
    const isBoss = quest.id === activePath.bossId || quest.category === 'GYM LEADER';
    if (isBoss) {
      setBossHp(100);
      setBossMaxHp(100);
      setBattleLog([
        "⚔️ ¡DUELO 8-BIT INICIADO! ⚔️",
        `Enemigo: ${quest.title}`,
        "¡Forja tu hechizo con sabiduría!",
        "Tus ataques causan 50 DMG.",
        "Respuestas erróneas te restan 25 HP.",
        "------------------------------------"
      ]);
      setActiveEffects({ shield: false });
      // Sanar al jugador si está debilitado
      if (user.hp <= 0) {
        setUser(prev => ({ ...prev, hp: 100 }));
      }
    }
  };

  const buyItem = (itemName, cost) => {
    if (user.gold >= cost) {
      setUser(prev => ({
        ...prev,
        gold: prev.gold - cost,
        inventory: [...prev.inventory, itemName]
      }));
    } else {
      alert("¡No tienes suficiente oro en tu baúl!");
    }
  };

  const useItem = (itemName) => {
    if (!user.inventory.includes(itemName)) return;

    const itemIndex = user.inventory.indexOf(itemName);
    const newInventory = [...user.inventory];
    newInventory.splice(itemIndex, 1);

    if (itemName === "Poción de Vida") {
      const healAmount = 50;
      const newHp = Math.min(user.maxHp, user.hp + healAmount);
      setUser(prev => ({ ...prev, hp: newHp, inventory: newInventory }));
      if (activeQuest) {
        setBattleLog(prev => [
          ...prev,
          `🧪 Usaste una Poción de Vida. ¡Recuperas ${healAmount} HP!`
        ]);
      }
    } 
    else if (itemName === "Escudo de Compilación") {
      setActiveEffects(prev => ({ ...prev, shield: true }));
      setUser(prev => ({ ...prev, inventory: newInventory }));
      if (activeQuest) {
        setBattleLog(prev => [
          ...prev,
          `🛡️ Activaste Escudo de Compilación. El próximo golpe será bloqueado.`
        ]);
      }
    }
    else if (itemName === "Runa de Sabiduría") {
      setUser(prev => ({ ...prev, inventory: newInventory }));
      setShowHint(true);
      if (activeQuest) {
        setHintIndex(prev => Math.min(activeQuest.hints.length - 1, prev + 1));
        setBattleLog(prev => [
          ...prev,
          `📜 Usaste una Runa de Sabiduría. El Oráculo desvela el camino.`
        ]);
      }
    }
  };

  const claimBounty = (bountyId) => {
    if (!user.activeBounties.includes(bountyId)) {
      setUser(prev => ({
        ...prev,
        activeBounties: [...prev.activeBounties, bountyId]
      }));
    }
  };

  const handleValidate = () => {
    const isBoss = activeQuest.id === activePath.bossId || activeQuest.category === 'GYM LEADER';
    const result = validateSolution(activeQuest, userInput);
    setFeedback(result);
    
    if (isBoss) {
      if (result.success) {
        const newBossHp = Math.max(0, bossHp - 50);
        setBossHp(newBossHp);
        
        setCombatAnimClass("animate-pixel-shake");
        setTimeout(() => setCombatAnimClass(""), 400);

        setBattleLog(prev => [
          ...prev,
          `💥 Lanzas tu hechizo correctamente. ¡Golpeas a ${activeQuest.title} con 50 DMG!`
        ]);

        if (newBossHp <= 0) {
          setBattleLog(prev => [
            ...prev,
            `🏆 ¡VICTORIA! El jefe ha sido destruido en píxeles. ¡Recompensa Real otorgada!`
          ]);

          const goldReward = 150;
          const newHonor = user.honor + activeQuest.xp;
          const newLevel = Math.floor(newHonor / 500) + 1;
          
          let newRank = "Escudero";
          if (newLevel === 2) newRank = "Caballero";
          if (newLevel === 3) newRank = "Paladín";
          if (newLevel > 3) newRank = "Arquimago";

          let newBadges = [...user.badges];
          const currentPath = paths.find(p => p.id === activePath.id);
          if (currentPath && !newBadges.includes(currentPath.badgeName)) {
            newBadges.push(currentPath.badgeName);
          }

          let goldBonus = 0;
          let itemsGained = [];
          const completedBountiesCopy = [...user.completedBounties];
          user.activeBounties.forEach(bId => {
            const bounty = bountiesList.find(b => b.id === bId);
            if (bounty && bounty.targetPath === activePath.id && !completedBountiesCopy.includes(bId)) {
              goldBonus += bounty.goldReward;
              if (bounty.itemReward) itemsGained.push(bounty.itemReward);
              completedBountiesCopy.push(bId);
              setBountyNotice(`¡Contrato Completado: ${bounty.title}! +${bounty.goldReward} Oro`);
              setTimeout(() => setBountyNotice(null), 4000);
            }
          });

          setUser(prev => ({
            ...prev,
            honor: newHonor,
            gold: prev.gold + goldReward + goldBonus,
            inventory: [...prev.inventory, ...itemsGained],
            level: newLevel,
            rank: newRank,
            badges: newBadges,
            completedBounties: completedBountiesCopy
          }));

          setTimeout(() => {
            setActiveQuest(null);
            setFeedback(null);
          }, 3000);
        }
      } else {
        if (activeEffects.shield) {
          setActiveEffects(prev => ({ ...prev, shield: false }));
          setBattleLog(prev => [
            ...prev,
            `🛡️ ¡BLOQUEO! El Escudo de Compilación absorbió el ataque.`
          ]);
        } else {
          const newHp = Math.max(0, user.hp - 25);
          setUser(prev => ({ ...prev, hp: newHp }));
          
          setCombatFlashClass("animate-damage-flash");
          setTimeout(() => setCombatFlashClass(""), 500);

          setBattleLog(prev => [
            ...prev,
            `💔 ¡FALLO DE COMPILACIÓN! Recibes un contragolpe de 25 DMG.`
          ]);

          if (newHp <= 0) {
            setBattleLog(prev => [
              ...prev,
              `💀 ¡TE HAS DEBILITADO! Caes inconsciente. Pierdes 40 de oro de tu baúl.`
            ]);
            
            setUser(prev => ({ ...prev, gold: Math.max(0, prev.gold - 40) }));

            setTimeout(() => {
              setActiveQuest(null);
              setFeedback(null);
            }, 3000);
          }
        }
      }
    } else {
      if (result.success) {
        let goldReward = 20;
        if (activeQuest.difficulty === "Mid") goldReward = 40;
        if (activeQuest.difficulty === "Senior") goldReward = 80;

        const newHonor = user.honor + activeQuest.xp;
        const newLevel = Math.floor(newHonor / 500) + 1;
        
        let newRank = "Escudero";
        if (newLevel === 2) newRank = "Caballero";
        if (newLevel === 3) newRank = "Paladín";
        if (newLevel > 3) newRank = "Arquimago";

        let goldBonus = 0;
        let itemsGained = [];
        const completedBountiesCopy = [...user.completedBounties];
        user.activeBounties.forEach(bId => {
          const bounty = bountiesList.find(b => b.id === bId);
          if (bounty && bounty.targetPath === activePath.id && bounty.targetCategory === activeQuest.category && !completedBountiesCopy.includes(bId)) {
            goldBonus += bounty.goldReward;
            if (bounty.itemReward) itemsGained.push(bounty.itemReward);
            completedBountiesCopy.push(bId);
            setBountyNotice(`¡Contrato Completado: ${bounty.title}! +${bounty.goldReward} Oro`);
            setTimeout(() => setBountyNotice(null), 4000);
          }
        });

        setUser(prev => ({
          ...prev,
          honor: newHonor,
          gold: prev.gold + goldReward + goldBonus,
          inventory: [...prev.inventory, ...itemsGained],
          level: newLevel,
          rank: newRank,
          badges: newBadges,
          completedBounties: completedBountiesCopy
        }));

        setTimeout(() => {
          setActiveQuest(null);
          setFeedback(null);
        }, 3000);
      }
    }
  };

  const mapIcons = {
    p_java: "🏛️",
    p_python: "🐍",
    p_js: "🕸️",
    p_rust: "🛡️",
    p_go: "🏃",
    p_cpp: "⚔️",
    p_sec: "💀"
  };

  if (!user.isRegistered) {
    return (
      <div className="min-h-screen w-full bg-castle-bg flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]">
        <div className="medieval-scroll max-w-lg w-full p-12 text-center shadow-[0_0_100px_rgba(212,175,55,0.1)]">
          <h1 className="text-4xl font-medieval text-castle-wood mb-4 uppercase tracking-tighter">Libro de Reclutamiento</h1>
          <p className="text-castle-wood italic mb-8 opacity-70">"Firma con tu nombre para unirte a la Orden de los Programadores y defender el Reino de la Ciudadela."</p>
          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            <input 
              name="username"
              type="text" 
              placeholder="Escribe tu nombre de caballero..." 
              className="bg-white/40 border-b-4 border-castle-wood p-4 text-2xl font-serif text-castle-wood focus:outline-none placeholder:text-castle-wood/30"
              required
              autoFocus
            />
            <button className="bg-castle-wood text-castle-gold py-4 px-8 text-xl font-medieval uppercase tracking-widest hover:bg-black transition-all shadow-xl border-b-4 border-castle-gold active:scale-95">
              Juramento de Honor
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-castle-bg text-stone-300 font-serif selection:bg-castle-gold selection:text-black">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#1a1311] border-b-4 border-castle-gold px-8 py-4 flex justify-between items-center shadow-[0_5px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-6">
          <div className="h-16 w-16 bg-castle-gold rounded-b-full rounded-t-2xl border-4 border-castle-wood flex items-center justify-center text-castle-wood text-3xl shadow-[inset_0_0_15px_rgba(0,0,0,0.5),_0_8px_20px_rgba(0,0,0,0.4)] animate-float">
            🏰
          </div>
          <div>
            <h1 className="text-2xl font-medieval text-castle-gold gold-glow title-medieval">The Code Citadel</h1>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest italic">{user.name} | Nivel {user.level}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* RPG HUD Indicators */}
          <div className="text-left border-l border-r border-stone-850 px-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-stone-500 uppercase">HP:</span>
              <span className="text-xs font-mono font-bold text-red-500">{user.hp}/{user.maxHp}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-stone-500 uppercase">GOLD:</span>
              <span className="text-xs font-mono font-bold text-yellow-500">🪙 {user.gold}</span>
            </div>
          </div>

          {/* Action RPG Buttons */}
          <div className="flex gap-2 font-retro text-[8px] tracking-wider">
            <button 
              onClick={() => setShowTavern(true)}
              className="bg-red-950 hover:bg-red-900 border-2 border-pixel border-double border-red-500 text-castle-gold px-3 py-2 cursor-pointer shadow-md active:scale-95"
            >
              🍺 Taberna
            </button>
            <button 
              onClick={() => setShowBackpack(prev => !prev)}
              className="bg-stone-900 hover:bg-stone-800 border-2 border-pixel border-double border-stone-600 text-white px-3 py-2 cursor-pointer shadow-md active:scale-95 flex items-center gap-1"
            >
              🎒 Mochila ({user.inventory.length})
            </button>
          </div>

          <div className="text-right border-l border-stone-850 pl-6">
            <p className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Rango Real</p>
            <p className="text-lg font-medieval text-castle-gold uppercase tracking-widest gold-glow leading-none mt-1">{user.rank}</p>
          </div>

          <div className="w-48">
            <div className="flex justify-between text-[9px] font-mono mb-1 text-stone-400">
              <span>XP: {user.honor}</span>
              <span>SIG: 500</span>
            </div>
            <div className="h-3 w-full bg-black/60 rounded-none border border-stone-800 p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-castle-wood to-castle-gold transition-all duration-1000 ease-in-out" 
                style={{ width: `${(user.honor % 500) / 5}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex gap-1 max-w-[120px] overflow-x-auto pb-1 scrollbar-hide">
            {user.badges.map((b, i) => (
              <div key={i} title={b} className="h-7 w-7 badge-gold rounded-full flex-shrink-0 flex items-center justify-center text-[10px] text-castle-wood font-black cursor-help">
                🏆
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="pt-36 pb-20 px-8 max-w-7xl mx-auto">
        {!activeQuest ? (
          <div className="animate-in fade-in duration-1000">
            {/* --- VISUAL WORLD MAP --- */}
            <div className="world-map w-full min-h-[450px] mb-16 relative overflow-hidden flex flex-wrap items-center justify-center gap-16 py-12 px-20">
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
              
              {paths.map((path, index) => (
                <button
                  key={path.id}
                  onClick={() => setActivePath(path)}
                  className={`map-location group flex flex-col items-center gap-4 relative z-10 ${activePath.id === path.id ? 'active' : ''}`}
                >
                  <div className="text-7xl filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500">
                    {mapIcons[path.id] || "🏰"}
                  </div>
                  <div className="bg-[#3e2723]/95 text-castle-gold px-5 py-2 border-2 border-castle-gold text-xs font-medieval uppercase tracking-[0.2em] shadow-2xl">
                    {path.name}
                  </div>
                  {activePath.id === path.id && (
                    <div className="absolute -top-6 text-castle-gold animate-bounce text-xl">▼</div>
                  )}
                </button>
              ))}
              
              <div className="absolute bottom-4 right-6 text-[10px] font-medieval text-castle-wood/60 uppercase tracking-[0.5em] italic">Cartographia Regalis v2.0</div>
            </div>

            <div className="mb-16 border-l-8 border-castle-gold pl-10 relative">
              <h2 className="text-6xl font-medieval text-white mb-4 gold-glow tracking-tighter uppercase">{activePath.name}</h2>
              <p className="text-stone-500 max-w-3xl italic text-xl leading-relaxed">
                "Relatos antiguos cuentan que en estas tierras {activePath.description.toLowerCase()}"
              </p>
            </div>

            {/* Medal Shelf */}
            <div className="mb-12 p-8 stone-card border-dashed border-castle-gold/30">
              <h4 className="text-[10px] font-mono text-castle-gold mb-6 uppercase tracking-[0.4em]">Estantería de Medallas de Gimnasio</h4>
              <div className="flex gap-8 justify-center">
                {paths.map(path => (
                  <div key={path.id} className="flex flex-col items-center gap-2">
                    <div className={`h-16 w-16 rounded-full border-4 flex items-center justify-center text-2xl transition-all ${
                      user.badges.includes(path.badgeName) 
                      ? 'badge-gold border-white shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-110' 
                      : 'bg-black/40 border-stone-800 text-stone-800 grayscale'
                    }`}>
                      {path.badgeName === 'Serpent Badge' ? '🐍' : 
                       path.badgeName === 'Oracle Badge' ? '📜' :
                       path.badgeName === 'Async Badge' ? '⚡' : '🛡️'}
                    </div>
                    <span className={`text-[9px] font-mono uppercase tracking-widest ${
                      user.badges.includes(path.badgeName) ? 'text-castle-gold' : 'text-stone-700'
                    }`}>
                      {path.badgeName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {activePath.quests.map(q => (
                <QuestCard key={q.id} quest={q} onStart={startQuest} />
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-500 grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[calc(100vh-300px)]">
            {/* PANEL IZQUIERDO: El Manuscrito de Sabiduría (Aprender al estilo Codédex) */}
            <div className="flex flex-col gap-8">
              <div className="medieval-scroll p-12 flex-1 flex flex-col justify-between shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
                {/* Cabecera del Pergamino */}
                <div className="border-b-4 border-castle-wood/10 pb-4 mb-6">
                  <h4 className="text-[10px] font-mono text-castle-wood/60 uppercase tracking-[0.3em] mb-2">📜 Manuscrito de Sabiduría</h4>
                  <h2 className="text-4xl font-medieval text-castle-wood uppercase font-black italic tracking-tighter leading-none">{activeQuest.title}</h2>
                  <p className="text-stone-500 text-xs italic mt-2">Crónicas: "{activeQuest.description}"</p>
                </div>

                {/* Explicación continua de la lección */}
                <div className="flex-1 overflow-y-auto mb-6 pr-2 max-h-[460px] scrollbar-thin scrollbar-thumb-castle-wood">
                  <div className="space-y-8">
                    {/* Sección 1: El Concepto */}
                    <div>
                      <h4 className="text-[10px] font-mono text-castle-wood/60 uppercase tracking-[0.3em] mb-3">El Concepto del Reino</h4>
                      <p className="text-castle-wood font-serif text-lg leading-relaxed font-medium">
                        {lesson?.concept}
                      </p>
                    </div>

                    {/* Sección 2: El Ejemplo del Maestro */}
                    <div className="pt-6 border-t border-castle-wood/10">
                      <h4 className="text-[10px] font-mono text-castle-wood/60 uppercase tracking-[0.3em] mb-3">El Ejemplo del Maestro</h4>
                      <div className="bg-stone-900 rounded-sm border-2 border-castle-wood/30 p-6 font-mono text-sm text-castle-gold/90 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] overflow-x-auto mb-4">
                        <pre className="whitespace-pre">{lesson?.example}</pre>
                      </div>
                      {lesson?.exampleExplain && (
                        <p className="text-castle-wood/80 font-serif text-sm leading-relaxed font-medium whitespace-pre-line italic">
                          {lesson?.exampleExplain}
                        </p>
                      )}
                    </div>

                    {/* Sección 3: La Guía del Oráculo */}
                    {lesson?.guide && (
                      <div className="pt-6 border-t border-castle-wood/10">
                        <h4 className="text-[10px] font-mono text-castle-wood/60 uppercase tracking-[0.3em] mb-3">La Guía del Oráculo</h4>
                        <p className="text-castle-wood/90 font-serif text-sm leading-relaxed font-medium whitespace-pre-line bg-[#3e2723]/5 p-5 border-l-4 border-castle-wood rounded-r-sm">
                          {lesson?.guide}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pie de lección */}
                <div className="bg-[#3e2723]/5 p-4 border border-castle-wood/10 rounded-sm italic text-[11px] text-castle-wood/70 text-center font-serif">
                  "Lee el manuscrito en su totalidad para comprender el concepto y forjar la solución en la arena derecha."
                </div>
              </div>
            </div>

            {/* PANEL DERECHO: El Yunque del Destino (La Forja / Práctica con ejercicio diferente) */}
            <div className={`flex flex-col gap-8 ${combatAnimClass} ${combatFlashClass ? 'bg-red-500/10' : ''}`}>
              <div className="stone-card p-12 flex-1 flex flex-col justify-between border-t-4 border-t-castle-gold relative overflow-hidden">
                {feedback?.success && (
                  <div className="absolute inset-0 bg-stone-950/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <div className="h-28 w-28 bg-castle-gold rounded-b-full rounded-t-3xl flex items-center justify-center text-castle-wood text-5xl mb-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.5),_0_15px_30px_rgba(0,0,0,0.6)] border-4 border-castle-wood animate-float">⚔️</div>
                    <h3 className="text-4xl font-medieval text-castle-gold uppercase font-black tracking-widest mb-2 gold-glow">¡Victoria Real!</h3>
                    <p className="text-white font-serif italic text-lg mb-4">Has completado el reto con honor.</p>
                    <p className="text-castle-gold font-medieval text-xl font-bold tracking-widest animate-pulse">+{activeQuest.xp} Honor Ganado</p>
                  </div>
                )}

                <div>
                  {/* Botones superiores de Control */}
                  <div className="flex justify-between items-center mb-6 border-b border-stone-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rotate-45 ${activeQuest.difficulty === 'Junior' ? 'bg-green-700' : 'bg-castle-crimson'}`}></div>
                      <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">Forja Real | Dificultad: {activeQuest.difficulty}</span>
                    </div>
                    <button 
                      onClick={() => setActiveQuest(null)} 
                      className="text-[10px] font-medieval text-castle-gold border border-castle-gold/50 px-4 py-2 hover:bg-castle-gold hover:text-black transition-all uppercase tracking-widest font-black"
                    >
                      [ VOLVER AL MAPA ]
                    </button>
                  </div>

                  {/* === ⚔️ RETRO BOSS BATTLE HUD === */}
                  {(activeQuest.id === activePath.bossId || activeQuest.category === 'GYM LEADER') && (
                    <div className="mb-6 p-4 border-2 border-pixel bg-black/90 font-retro text-[9px] flex flex-col gap-4 text-white">
                      {/* Boss HP Bar */}
                      <div>
                        <div className="flex justify-between text-red-500 mb-1">
                          <span>BOSS: {activeQuest.title}</span>
                          <span>{bossHp}/{bossMaxHp} HP</span>
                        </div>
                        <div className="h-4 w-full bg-stone-950 p-0.5 border border-stone-800">
                          <div 
                            className="h-full bg-red-600 transition-all duration-300"
                            style={{ width: `${(bossHp / bossMaxHp) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Player HP Bar */}
                      <div>
                        <div className="flex justify-between text-green-500 mb-1">
                          <span>HÉROE: {user.name}</span>
                          <span>{user.hp}/{user.maxHp} HP</span>
                        </div>
                        <div className="h-4 w-full bg-stone-950 p-0.5 border border-stone-800">
                          <div 
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{ width: `${(user.hp / user.maxHp) * 100}%` }}
                          ></div>
                        </div>
                        {activeEffects.shield && (
                          <div className="mt-2 text-cyan-400 font-mono text-[8px]">
                            🛡️ Escudo de Compilación Activo
                          </div>
                        )}
                      </div>

                      {/* Battle Log Box */}
                      <div className="mt-2 bg-stone-950 p-3 border border-stone-850 max-h-[100px] overflow-y-auto font-pixel text-xs text-yellow-500 leading-normal scrollbar-thin">
                        {battleLog.map((log, idx) => (
                          <div key={idx}>{log}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* El Mandato del Oráculo */}
                  <div className="mb-6 bg-black/40 p-6 border-l-4 border-castle-gold rounded-r-md">
                    <h4 className="text-[9px] font-mono text-castle-gold/60 uppercase tracking-[0.3em] mb-2">El Reto del Oráculo (Diferente al ejemplo)</h4>
                    <div className="text-stone-300 font-serif italic text-lg leading-normal font-medium">"{lesson?.exerciseExplain}"</div>
                  </div>

                  {/* El Enigma / Editor de Código */}
                  <div className="flex flex-col min-h-[220px]">
                    <h4 className="text-[9px] font-mono text-stone-500 mb-2 uppercase tracking-[0.3em]">El Enigma</h4>
                    <div className="flex-1 bg-black rounded-sm border-2 border-stone-800 p-6 font-mono text-base overflow-auto text-emerald-405/95 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)]">
                      <pre className="whitespace-pre-wrap">{activeQuest.problem}</pre>
                    </div>
                  </div>
                </div>

                {/* Entrada y Verificación */}
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Escribe tu solución aquí..." 
                      className="flex-1 bg-stone-900 border border-stone-700 focus:border-castle-gold text-stone-100 px-6 py-4 text-lg font-mono focus:outline-none transition-all placeholder:text-stone-600 rounded-sm"
                    />
                    <button 
                      onClick={handleValidate}
                      className="px-10 py-4 bg-castle-gold hover:bg-yellow-600 text-black font-medieval uppercase text-base tracking-widest font-black transition-all shadow-xl active:scale-95 border-b-4 border-yellow-700"
                    >
                      Verificar
                    </button>
                  </div>
                  
                  {feedback && !feedback.success && (
                    <div className="text-sm font-serif text-castle-crimson bg-castle-crimson/5 p-4 border border-castle-crimson/30 italic text-center animate-shake rounded-sm">
                       "El Oráculo: {feedback.message}"
                    </div>
                  )}

                  {/* Sección de Pistas de Sabiduría */}
                  <div className="mt-4 border-t border-stone-800 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">¿Atascado en la forja?</span>
                      {!showHint ? (
                        <button 
                          onClick={() => {
                            if (activeQuest.id === activePath.bossId || activeQuest.category === 'GYM LEADER') {
                              // Oracle cost for boss hints
                              if (user.hp > 20) {
                                setUser(prev => ({ ...prev, hp: prev.hp - 15 }));
                                setBattleLog(prev => [...prev, "💥 Revelar pista te cuesta 15 HP de daño del Oráculo."]);
                                setShowHint(true);
                              } else {
                                alert("¡No tienes suficiente HP para resistir el daño del Oráculo!");
                              }
                            } else {
                              setShowHint(true);
                            }
                          }}
                          className="text-[9px] font-medieval text-castle-gold hover:underline uppercase tracking-widest"
                        >
                          [ PEDIR PISTA AL ORÁCULO ]
                        </button>
                      ) : (
                        <span className="text-[9px] font-mono text-castle-gold uppercase tracking-widest">Sabiduría revelada</span>
                      )}
                    </div>
                    {showHint && (
                      <div className="mt-3 space-y-2">
                        {activeQuest.hints.slice(0, hintIndex + 1).map((hint, i) => (
                          <div key={i} className="text-xs text-castle-gold p-3 bg-stone-900/60 border border-castle-gold/20 italic rounded-sm animate-in slide-in-from-right-4">
                            💎 Pista: {hint}
                          </div>
                        ))}
                        {hintIndex < activeQuest.hints.length - 1 && (
                          <button 
                            onClick={() => {
                              if (activeQuest.id === activePath.bossId || activeQuest.category === 'GYM LEADER') {
                                if (user.hp > 20) {
                                  setUser(prev => ({ ...prev, hp: prev.hp - 15 }));
                                  setBattleLog(prev => [...prev, "💥 Revelar pista te cuesta 15 HP de daño del Oráculo."]);
                                  setHintIndex(prev => prev + 1);
                                } else {
                                  alert("¡No tienes suficiente HP!");
                                }
                              } else {
                                setHintIndex(prev => prev + 1);
                              }
                            }} 
                            className="mt-2 text-[9px] font-mono text-stone-400 hover:text-white uppercase tracking-wider underline block"
                          >
                            Pedir siguiente pista
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* === 🍺 MODAL DE LA TABERNA RETRO === */}
      {showTavern && (
        <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="border-pixel max-w-4xl w-full p-8 font-retro bg-black flex flex-col gap-6 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            {/* Header */}
            <div className="flex justify-between items-center border-b-4 border-double border-stone-850 pb-4">
              <h2 className="text-sm text-castle-gold">🍺 LA TABERNA REAL DE GOPHER</h2>
              <button 
                onClick={() => setShowTavern(false)}
                className="text-red-500 hover:text-red-400 cursor-pointer text-[9px]"
              >
                [ X CERRAR ]
              </button>
            </div>

            {/* Grid 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[10px]">
              {/* Column 1: Daily Contracts */}
              <div className="border-r border-stone-850 pr-6 flex flex-col gap-4">
                <h3 className="text-white text-[10px] tracking-wider border-b border-stone-850 pb-2">📜 TABLÓN DE CONTRATOS</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                  {bountiesList.map(bounty => {
                    const isActive = user.activeBounties.includes(bounty.id);
                    const isCompleted = user.completedBounties.includes(bounty.id);
                    return (
                      <div key={bounty.id} className="border border-stone-850 p-4 bg-stone-950 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <span className="text-castle-gold font-bold">{bounty.title}</span>
                          <span className="text-[8px] font-mono text-stone-500">{bounty.targetCategory}</span>
                        </div>
                        <p className="text-stone-400 leading-normal text-[9px]">"{bounty.description}"</p>
                        <div className="text-[8px] text-yellow-500 font-mono">
                          Recompensa: 🪙 {bounty.goldReward} Oro {bounty.itemReward ? `+ 🎒 ${bounty.itemReward}` : ""}
                        </div>
                        <div className="mt-2 text-right">
                          {isCompleted ? (
                            <span className="text-green-500 font-bold">[ COMPLETADO 🏆 ]</span>
                          ) : isActive ? (
                            <span className="text-yellow-500 font-bold">[ EN PROGRESO ⚔️ ]</span>
                          ) : (
                            <button 
                              onClick={() => claimBounty(bounty.id)}
                              className="bg-castle-gold text-black px-3 py-1 font-bold rounded-sm text-[8px] hover:bg-yellow-600 cursor-pointer active:scale-95"
                            >
                              ACEPTAR CONTRATO
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Column 2: Apothecary Shop */}
              <div className="flex flex-col gap-4">
                <h3 className="text-white text-[10px] tracking-wider border-b border-stone-850 pb-2">🧪 LA BOTICA DE LA ALQUIMISTA</h3>
                <div className="flex items-center gap-4 bg-stone-950 p-4 border border-stone-850 rounded-sm mb-4">
                  <span className="text-2xl">🧙‍♀️</span>
                  <p className="text-stone-400 leading-relaxed text-[8px]">
                    "¡Saludos, héroe! Gasta tus monedas de oro aquí para prepararte antes de combatir a los Jefes de Gimnasio."
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Item 1 */}
                  <div className="flex justify-between items-center border border-stone-850 p-3 bg-stone-950">
                    <div>
                      <span className="text-castle-gold font-bold">🧪 Poción de Vida</span>
                      <p className="text-stone-500 text-[7px] mt-1">Cura 50 HP en combate</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-mono text-[8px]">🪙 50</span>
                      <button 
                        onClick={() => buyItem("Poción de Vida", 50)}
                        className="bg-green-700 text-white px-2 py-1 text-[8px] hover:bg-green-600 cursor-pointer active:scale-95 font-bold"
                      >
                        [ COMPRAR ]
                      </button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex justify-between items-center border border-stone-850 p-3 bg-stone-950">
                    <div>
                      <span className="text-castle-gold font-bold">🛡️ Escudo de Compilación</span>
                      <p className="text-stone-500 text-[7px] mt-1">Bloquea golpe del Boss</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-mono text-[8px]">🪙 75</span>
                      <button 
                        onClick={() => buyItem("Escudo de Compilación", 75)}
                        className="bg-green-700 text-white px-2 py-1 text-[8px] hover:bg-green-600 cursor-pointer active:scale-95 font-bold"
                      >
                        [ COMPRAR ]
                      </button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex justify-between items-center border border-stone-850 p-3 bg-stone-950">
                    <div>
                      <span className="text-castle-gold font-bold">📜 Runa de Sabiduría</span>
                      <p className="text-stone-500 text-[7px] mt-1">Pista gratis en combate</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 font-mono text-[8px]">🪙 60</span>
                      <button 
                        onClick={() => buyItem("Runa de Sabiduría", 60)}
                        className="bg-green-700 text-white px-2 py-1 text-[8px] hover:bg-green-600 cursor-pointer active:scale-95 font-bold"
                      >
                        [ COMPRAR ]
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-stone-850 text-right text-[9px] text-stone-500">
                  Tu Baúl: <span className="text-yellow-500">🪙 {user.gold} Oro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === 🎒 MOCHILA RETRO OVERLAY === */}
      {showBackpack && (
        <div className="fixed top-24 right-8 z-[90] w-80 border-pixel p-6 bg-black font-retro text-[9px] shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <h4 className="text-castle-gold border-b border-stone-850 pb-2 mb-4">🎒 MOCHILA DE AVENTURERO</h4>
          {user.inventory.length === 0 ? (
            <p className="text-stone-500 italic">"Mochila vacía. Visita la taberna."</p>
          ) : (
            <div className="space-y-3">
              {user.inventory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border border-stone-850 p-2 bg-stone-950">
                  <div>
                    <span className="text-white font-bold">{item === 'Poción de Vida' ? '🧪' : item === 'Escudo de Compilación' ? '🛡️' : '📜'} {item}</span>
                  </div>
                  <button 
                    onClick={() => useItem(item)}
                    className="bg-castle-wood text-castle-gold border border-castle-gold/30 px-2 py-1 hover:bg-castle-gold hover:text-black cursor-pointer active:scale-95 font-bold text-[8px]"
                  >
                    [ USAR ]
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* === 📜 ALERTA DE CONTRATO RETRO === */}
      {bountyNotice && (
        <div className="fixed bottom-8 left-8 z-[110] border-pixel border-pixel-gold bg-black text-yellow-500 font-retro text-[9px] px-6 py-4 animate-bounce">
          {bountyNotice}
        </div>
      )}
    </div>
  );
}

export default App;
