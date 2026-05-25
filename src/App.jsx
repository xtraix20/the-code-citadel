import React, { useState, useEffect } from 'react';
import { paths } from './data/quests';
import QuestCard from './components/QuestCard';
import { validateSolution } from './engines/ValidationEngine';
import { getLessonForQuest } from './data/learningContent';
import { bountiesList } from './data/tavernBounties';
import PixelEmoji from './components/PixelEmoji';

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
      completedQuests: [],
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

          const completedQuestsCopy = [...(user.completedQuests || []), activeQuest.id];

          setUser(prev => ({
            ...prev,
            honor: newHonor,
            gold: prev.gold + goldReward + goldBonus,
            inventory: [...prev.inventory, ...itemsGained],
            level: newLevel,
            rank: newRank,
            badges: newBadges,
            completedBounties: completedBountiesCopy,
            completedQuests: completedQuestsCopy
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

        const completedQuestsCopy = [...(user.completedQuests || []), activeQuest.id];

        setUser(prev => ({
          ...prev,
          honor: newHonor,
          gold: prev.gold + goldReward + goldBonus,
          inventory: [...prev.inventory, ...itemsGained],
          level: newLevel,
          rank: newRank,
          completedBounties: completedBountiesCopy,
          completedQuests: completedQuestsCopy
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
      <div className="min-h-screen w-full bg-black flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
        <div className="border-pixel border-pixel-gold max-w-lg w-full p-10 text-center shadow-[0_0_50px_rgba(212,175,55,0.25)]">
          <h1 className="text-sm font-retro text-castle-gold mb-6 uppercase tracking-tight">LIBRO DE RECLUTAMIENTO</h1>
          <p className="text-stone-400 font-pixel text-lg leading-relaxed mb-8 opacity-90">
            "Firma con tu nombre para unirte a la Orden de los Programadores y defender la Ciudadela."
          </p>
          <form onSubmit={handleRegister} className="flex flex-col gap-6">
            <input 
              name="username"
              type="text" 
              placeholder="Nombre de héroe..." 
              className="bg-stone-900 border-2 border-stone-700 focus:border-castle-gold p-4 text-xl font-pixel text-emerald-400 focus:outline-none placeholder:text-stone-600 rounded-none text-center uppercase tracking-wider"
              required
              autoFocus
            />
            <button className="bg-black border-2 border-pixel border-double border-castle-gold text-castle-gold py-4 px-8 text-[10px] font-retro uppercase tracking-widest hover:bg-castle-gold hover:text-black transition-all shadow-lg active:scale-95 cursor-pointer">
              [ JURAMENTO DE HONOR ]
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-castle-bg text-stone-300 font-pixel selection:bg-castle-gold selection:text-black">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0d0d0e] border-b-4 border-castle-gold px-8 py-4 flex justify-between items-center shadow-[0_4px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-6">
          <div className="h-14 w-14 bg-castle-gold border-4 border-black flex items-center justify-center shadow-sm animate-float">
            <PixelEmoji emoji="🏰" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xs font-retro text-castle-gold gold-glow leading-normal tracking-tight uppercase">THE CODE CITADEL</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 bg-green-500 rounded-none animate-pulse"></span>
              <p className="text-[10px] font-retro text-stone-400 uppercase tracking-tighter">{user.name} | NIVEL {user.level}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* RPG HUD Indicators */}
          <div className="text-left border-l-2 border-r-2 border-stone-800 px-6 flex flex-col gap-1.5 font-retro text-[8px]">
            <div className="flex items-center gap-2">
              <span className="text-red-500 uppercase font-bold">HP:</span>
              <span className="font-bold text-red-400">{user.hp}/{user.maxHp}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 uppercase font-bold">GOLD:</span>
              <span className="font-bold text-yellow-400 flex items-center gap-1"><PixelEmoji emoji="🪙" className="w-3 h-3" /> {user.gold}</span>
            </div>
          </div>

          {/* Action RPG Buttons */}
          <div className="flex gap-2 font-retro text-[8px] tracking-wider">
            <button 
              onClick={() => setShowTavern(true)}
              className="bg-red-950 hover:bg-red-900 border-2 border-pixel border-double border-red-500 text-castle-gold px-3 py-2 cursor-pointer shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <PixelEmoji emoji="🍺" className="w-3.5 h-3.5" /> Taberna
            </button>
            <button 
              onClick={() => setShowBackpack(prev => !prev)}
              className="bg-stone-900 hover:bg-stone-800 border-2 border-pixel border-double border-stone-600 text-white px-3 py-2 cursor-pointer shadow-md active:scale-95 flex items-center gap-1.5"
            >
              <PixelEmoji emoji="🎒" className="w-3.5 h-3.5" /> Mochila ({user.inventory.length})
            </button>
          </div>

          <div className="text-right border-l-2 border-stone-800 pl-6 font-retro">
            <p className="text-[8px] text-stone-500 uppercase tracking-wider">Rango Real</p>
            <p className="text-[10px] text-castle-gold uppercase tracking-widest gold-glow leading-none mt-1">{user.rank}</p>
          </div>

          <div className="w-40 font-retro">
            <div className="flex justify-between text-[8px] mb-1 text-stone-400">
              <span>XP: {user.honor}</span>
              <span>SIG: 500</span>
            </div>
            <div className="h-4 w-full bg-stone-950 border-2 border-black p-0.5 shadow-none">
              <div 
                className="h-full bg-emerald-500 transition-all duration-1000 ease-in-out" 
                style={{ width: `${(user.honor % 500) / 5}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex gap-1.5 max-w-[120px] overflow-x-auto pb-1 scrollbar-hide">
            {user.badges.map((b, i) => (
              <div key={i} title={b} className="h-7 w-7 bg-castle-gold border-2 border-black flex-shrink-0 flex items-center justify-center text-xs text-black font-black cursor-help shadow-sm">
                <PixelEmoji emoji="🏆" className="w-4 h-4" />
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
                  <div className="text-7xl filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500 flex items-center justify-center w-16 h-16">
                    <PixelEmoji emoji={mapIcons[path.id] || "🏰"} className="w-full h-full" />
                  </div>
                  <div className="bg-black text-castle-gold px-3 py-1.5 border-2 border-castle-gold text-[8px] font-retro uppercase tracking-wider">
                    {path.name}
                  </div>
                  {activePath.id === path.id && (
                    <div className="absolute -top-6 text-castle-gold animate-bounce text-xl">▼</div>
                  )}
                </button>
              ))}
              
              <div className="absolute bottom-4 right-6 text-[8px] font-retro text-stone-600 uppercase tracking-wider">CARTOGRAPHIA REGALIS V2.0</div>
            </div>

            <div className="mb-16 border-l-4 border-castle-gold pl-6 relative">
              <h2 className="text-lg font-retro text-white mb-4 gold-glow tracking-tight uppercase">{activePath.name}</h2>
              <p className="text-emerald-400 font-pixel max-w-3xl text-xl leading-normal bg-black/60 p-4 border border-stone-850">
                &gt; "Relatos antiguos cuentan que en estas tierras {activePath.description.toLowerCase()}"
              </p>
            </div>

            {/* Medal Shelf */}
            <div className="mb-12 p-6 stone-card border-2 border-black">
              <h4 className="text-[8px] font-retro text-castle-gold mb-6 uppercase tracking-wider text-center">ESTANTERÍA DE MEDALLAS DE GIMNASIO</h4>
              <div className="flex gap-8 justify-center">
                {paths.map(path => (
                  <div key={path.id} className="flex flex-col items-center gap-3">
                    <div className={`h-14 w-14 border-4 flex items-center justify-center text-2xl transition-all ${
                      user.badges.includes(path.badgeName) 
                      ? 'bg-castle-gold border-black scale-105 shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                      : 'bg-stone-900 border-stone-800 text-stone-700 grayscale'
                    }`}>
                      {path.badgeName === 'Serpent Badge' ? <PixelEmoji emoji="🐍" className="w-8 h-8" /> : 
                       path.badgeName === 'Oracle Badge' ? <PixelEmoji emoji="📜" className="w-8 h-8" /> :
                       path.badgeName === 'Async Badge' ? <PixelEmoji emoji="⚡" className="w-8 h-8" /> : <PixelEmoji emoji="🛡️" className="w-8 h-8" />}
                    </div>
                    <span className={`text-[8px] font-retro tracking-tighter ${
                      user.badges.includes(path.badgeName) ? 'text-castle-gold' : 'text-stone-700'
                    }`}>
                      {path.badgeName.split(' ')[0]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {activePath.quests.map(q => {
                const isCompleted = user.completedQuests?.includes(q.id);
                return (
                  <QuestCard 
                    key={q.id} 
                    quest={q} 
                    onStart={startQuest} 
                    isCompleted={isCompleted} 
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="animate-in zoom-in-95 duration-500 grid grid-cols-1 lg:grid-cols-2 gap-10 min-h-[calc(100vh-300px)]">
            {/* PANEL IZQUIERDO: El Manuscrito de Sabiduría (Aprender al estilo Codédex) */}
            <div className="flex flex-col gap-8">
              <div className="medieval-scroll p-8 flex-1 flex flex-col justify-between shadow-none border-4 border-pixel-gold">
                {/* Cabecera del Pergamino */}
                <div className="border-b-4 border-stone-900 pb-4 mb-6">
                  <h4 className="text-[8px] font-retro text-yellow-500/70 mb-2 uppercase tracking-wider flex items-center gap-1.5">
                    <PixelEmoji emoji="📜" className="w-3.5 h-3.5" />
                    <span>Manuscrito de Sabiduría</span>
                  </h4>
                  <h2 className="text-sm font-retro text-castle-gold uppercase leading-normal tracking-tight">{activeQuest.title}</h2>
                  <p className="text-stone-400 font-pixel text-base italic mt-2">Crónicas: "{activeQuest.description}"</p>
                </div>

                {/* Explicación continua de la lección */}
                <div className="flex-1 overflow-y-auto mb-6 pr-2 max-h-[460px] scrollbar-thin">
                  <div className="space-y-8">
                    {/* Sección 1: El Concepto */}
                    <div>
                      <h4 className="text-[8px] font-retro text-yellow-500/70 mb-3 uppercase tracking-wider">El Concepto del Reino</h4>
                      <p className="text-stone-300 font-pixel text-lg leading-relaxed">
                        {lesson?.concept}
                      </p>
                    </div>

                    {/* Sección 2: El Ejemplo del Maestro */}
                    <div className="pt-6 border-t border-stone-900">
                      <h4 className="text-[8px] font-retro text-yellow-500/70 mb-3 uppercase tracking-wider">El Ejemplo del Maestro</h4>
                      <div className="bg-black border border-stone-850 p-4 font-mono text-xs text-emerald-400 overflow-x-auto mb-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.85)]">
                        <pre className="whitespace-pre">{lesson?.example}</pre>
                      </div>
                      {lesson?.exampleExplain && (
                        <p className="text-stone-400 font-pixel text-base leading-relaxed whitespace-pre-line italic">
                          {lesson?.exampleExplain}
                        </p>
                      )}
                    </div>

                    {/* Sección 3: La Guía del Oráculo */}
                    {lesson?.guide && (
                      <div className="pt-6 border-t border-stone-900">
                        <h4 className="text-[8px] font-retro text-yellow-500/70 mb-3 uppercase tracking-wider">La Guía del Oráculo</h4>
                        <p className="text-stone-300 font-pixel text-base leading-relaxed whitespace-pre-line bg-stone-900/60 p-4 border-l-4 border-castle-gold">
                          {lesson?.guide}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pie de lección */}
                <div className="bg-stone-900/40 p-3 border border-stone-800 font-pixel text-xs text-stone-400 text-center italic">
                  "Lee el manuscrito en su totalidad para comprender el concepto y forjar la solución en la arena derecha."
                </div>
              </div>
            </div>

            {/* PANEL DERECHO: El Yunque del Destino (La Forja / Práctica con ejercicio diferente) */}
            <div className={`flex flex-col gap-8 ${combatAnimClass} ${combatFlashClass ? 'bg-red-500/10' : ''}`}>
              <div className="stone-card p-8 flex-1 flex flex-col justify-between relative overflow-hidden">
                {feedback?.success && (
                  <div className="absolute inset-0 bg-black/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <div className="h-20 w-20 bg-castle-gold border-4 border-black flex items-center justify-center text-black mb-6 animate-float shadow-md">
                      <PixelEmoji emoji="⚔️" className="w-12 h-12" />
                    </div>
                    <h3 className="text-lg font-retro text-castle-gold uppercase mb-2 gold-glow tracking-tight text-center">¡VICTORIA REAL!</h3>
                    <p className="text-stone-300 font-pixel italic text-lg mb-4">Has completado el reto con honor.</p>
                    <p className="text-yellow-400 font-retro text-xs animate-pulse">+{activeQuest.xp} XP GANADOS</p>
                  </div>
                )}

                <div>
                  {/* Botones superiores de Control */}
                  <div className="flex justify-between items-center mb-6 border-b border-stone-850 pb-4">
                    <div className="flex items-center gap-2 font-retro text-[8px]">
                      <div className={`h-3 w-3 shadow-sm ${activeQuest.difficulty === 'Junior' ? 'bg-green-700' : 'bg-castle-crimson'}`}></div>
                      <span className="text-stone-500 uppercase tracking-wider">Forja Real | Dificultad: {activeQuest.difficulty}</span>
                    </div>
                    <button 
                      onClick={() => setActiveQuest(null)} 
                      className="text-[8px] font-retro text-castle-gold border-2 border-pixel border-double border-castle-gold/50 px-3 py-1.5 hover:bg-castle-gold hover:text-black transition-all uppercase tracking-wider cursor-pointer"
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
                          <div className="mt-2 text-cyan-400 font-retro text-[7px] flex items-center gap-1">
                            <PixelEmoji emoji="🛡️" className="w-3 h-3" />
                            <span>ESCUDO DE COMPILACIÓN ACTIVO</span>
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
                  <div className="mb-6 bg-black/40 p-4 border-l-4 border-castle-gold">
                    <h4 className="text-[8px] font-retro text-castle-gold/60 uppercase tracking-wider mb-2">El Reto del Oráculo</h4>
                    <div className="text-stone-300 font-pixel text-lg leading-normal">"{lesson?.exerciseExplain}"</div>
                  </div>

                  {/* El Enigma / Editor de Código */}
                  <div className="flex flex-col min-h-[220px]">
                    <h4 className="text-[8px] font-retro text-stone-500 mb-2 uppercase tracking-wider">El Enigma</h4>
                    <div className="flex-1 bg-black border border-stone-850 p-4 font-mono text-xs overflow-auto text-emerald-400 shadow-[inset_0_0_15px_rgba(0,0,0,0.95)]">
                      <pre className="whitespace-pre-wrap">{activeQuest.problem}</pre>
                    </div>
                  </div>
                </div>

                {/* Entrada y Verificación */}
                <div className="mt-8 flex flex-col gap-4 font-retro">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Solución..." 
                      className="flex-1 bg-stone-900 border-2 border-stone-700 focus:border-castle-gold text-stone-150 px-4 py-3 text-xs font-mono focus:outline-none transition-all placeholder:text-stone-600 rounded-none uppercase tracking-wider"
                    />
                    <button 
                      onClick={handleValidate}
                      className="px-6 py-3 bg-black border-2 border-pixel border-double border-castle-gold hover:bg-castle-gold hover:text-black text-castle-gold uppercase text-[10px] tracking-wider transition-all shadow-md active:translate-y-1 cursor-pointer"
                    >
                      VERIFICAR
                    </button>
                  </div>
                  
                  {feedback && !feedback.success && (
                    <div className="text-xs font-pixel text-red-500 bg-red-950/40 p-3 border border-red-900/50 italic text-center rounded-none animate-shake">
                       "El Oráculo: {feedback.message}"
                    </div>
                  )}

                  {/* Sección de Pistas de Sabiduría */}
                  <div className="mt-4 border-t border-stone-850 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] text-stone-500 uppercase tracking-wider">¿Atascado en la forja?</span>
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
                          className="text-[8px] text-castle-gold hover:underline uppercase tracking-wider cursor-pointer bg-transparent border-none"
                        >
                          [ PEDIR PISTA AL ORÁCULO ]
                        </button>
                      ) : (
                        <span className="text-[8px] text-castle-gold uppercase tracking-wider">Sabiduría revelada</span>
                      )}
                    </div>
                    {showHint && (
                      <div className="mt-3 space-y-2">
                        {activeQuest.hints.slice(0, hintIndex + 1).map((hint, i) => (
                          <div key={i} className="text-xs font-pixel text-castle-gold p-3 bg-stone-900 border border-castle-gold/20 italic rounded-none animate-in slide-in-from-right-4 flex items-center gap-1.5">
                            <PixelEmoji emoji="💎" className="w-3 h-3" />
                            <span>Pista: {hint}</span>
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
                            className="mt-2 text-[8px] text-stone-400 hover:text-white uppercase tracking-wider underline block cursor-pointer bg-transparent border-none"
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
          <div className="border-pixel border-pixel-gold max-w-4xl w-full p-8 font-retro bg-black flex flex-col gap-6 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            {/* Header */}
            <div className="flex justify-between items-center border-b-4 border-double border-stone-850 pb-4">
              <h2 className="text-[10px] text-castle-gold flex items-center gap-1.5">
                <PixelEmoji emoji="🍺" className="w-3.5 h-3.5" />
                <span>LA TABERNA REAL DE GOPHER</span>
              </h2>
              <button 
                onClick={() => setShowTavern(false)}
                className="text-red-500 hover:text-white border border-red-500 bg-transparent hover:bg-red-500 px-3 py-1 cursor-pointer text-[8px] uppercase transition-all"
              >
                [ CERRAR ]
              </button>
            </div>

            {/* Grid 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[9px]">
              {/* Column 1: Daily Contracts */}
              <div className="border-r border-stone-850 pr-6 flex flex-col gap-4">
                <h3 className="text-white text-[8px] tracking-wider border-b border-stone-850 pb-2 flex items-center gap-1.5">
                  <PixelEmoji emoji="📜" className="w-3.5 h-3.5" />
                  <span>TABLÓN DE CONTRATOS</span>
                </h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                  {bountiesList.map(bounty => {
                    const isActive = user.activeBounties.includes(bounty.id);
                    const isCompleted = user.completedBounties.includes(bounty.id);
                    return (
                      <div key={bounty.id} className="border-2 border-stone-800 p-3 bg-stone-950 flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <span className="text-castle-gold font-bold text-[8px]">{bounty.title}</span>
                          <span className="text-[7px] text-stone-500">{bounty.targetCategory}</span>
                        </div>
                        <p className="text-stone-400 leading-normal font-pixel text-base">"{bounty.description}"</p>
                        <div className="text-[8px] text-yellow-500 flex items-center flex-wrap gap-1">
                          <span>Recompensa:</span>
                          <span className="inline-flex items-center gap-0.5"><PixelEmoji emoji="🪙" className="w-2.5 h-2.5" /> {bounty.goldReward} Oro</span>
                          {bounty.itemReward && (
                            <span className="inline-flex items-center gap-0.5 ml-1">+ <PixelEmoji emoji="🎒" className="w-2.5 h-2.5" /> {bounty.itemReward}</span>
                          )}
                        </div>
                        <div className="mt-2 text-right">
                          {isCompleted ? (
                            <span className="text-green-500 font-bold flex items-center justify-end gap-1">
                              <span>[ COMPLETADO</span>
                              <PixelEmoji emoji="🏆" className="w-3 h-3" />
                              <span>]</span>
                            </span>
                          ) : isActive ? (
                            <span className="text-yellow-500 font-bold flex items-center justify-end gap-1">
                              <span>[ EN PROGRESO</span>
                              <PixelEmoji emoji="⚔️" className="w-3 h-3" />
                              <span>]</span>
                            </span>
                          ) : (
                            <button 
                              onClick={() => claimBounty(bounty.id)}
                              className="bg-black border border-castle-gold text-castle-gold hover:bg-castle-gold hover:text-black px-3 py-1.5 font-bold text-[7px] cursor-pointer active:scale-95"
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
                <h3 className="text-white text-[8px] tracking-wider border-b border-stone-850 pb-2 flex items-center gap-1.5">
                  <PixelEmoji emoji="🧪" className="w-3.5 h-3.5" />
                  <span>LA BOTICA DE LA ALQUIMISTA</span>
                </h3>
                <div className="flex items-center gap-4 bg-stone-950 p-3 border-2 border-stone-800 rounded-none mb-4">
                  <PixelEmoji emoji="🧙‍♀️" className="w-8 h-8" />
                  <p className="text-stone-400 leading-relaxed font-pixel text-base">
                    "¡Saludos, héroe! Gasta tus monedas de oro aquí para prepararte antes de combatir a los Jefes de Gimnasio."
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Item 1 */}
                  <div className="flex justify-between items-center border-2 border-stone-800 p-3 bg-stone-950">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-castle-gold font-bold text-[8px] flex items-center gap-1.5">
                        <PixelEmoji emoji="🧪" className="w-3.5 h-3.5" />
                        <span>Poción de Vida</span>
                      </span>
                      <p className="text-stone-550 font-pixel text-xs mt-1">Cura 50 HP en combate</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-[8px] flex items-center gap-0.5">
                        <PixelEmoji emoji="🪙" className="w-3 h-3" />
                        <span>50</span>
                      </span>
                      <button 
                        onClick={() => buyItem("Poción de Vida", 50)}
                        className="bg-black border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-2 py-1 text-[8px] cursor-pointer active:scale-95 font-bold"
                      >
                        [ COMPRAR ]
                      </button>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex justify-between items-center border-2 border-stone-800 p-3 bg-stone-950">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-castle-gold font-bold text-[8px] flex items-center gap-1.5">
                        <PixelEmoji emoji="🛡️" className="w-3.5 h-3.5" />
                        <span>Escudo de Compilación</span>
                      </span>
                      <p className="text-stone-550 font-pixel text-xs mt-1">Bloquea golpe del Boss</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-[8px] flex items-center gap-0.5">
                        <PixelEmoji emoji="🪙" className="w-3 h-3" />
                        <span>75</span>
                      </span>
                      <button 
                        onClick={() => buyItem("Escudo de Compilación", 75)}
                        className="bg-black border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-2 py-1 text-[8px] cursor-pointer active:scale-95 font-bold"
                      >
                        [ COMPRAR ]
                      </button>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex justify-between items-center border-2 border-stone-800 p-3 bg-stone-950">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-castle-gold font-bold text-[8px] flex items-center gap-1.5">
                        <PixelEmoji emoji="📜" className="w-3.5 h-3.5" />
                        <span>Runa de Sabiduría</span>
                      </span>
                      <p className="text-stone-550 font-pixel text-xs mt-1">Pista gratis en combate</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500 text-[8px] flex items-center gap-0.5">
                        <PixelEmoji emoji="🪙" className="w-3 h-3" />
                        <span>60</span>
                      </span>
                      <button 
                        onClick={() => buyItem("Runa de Sabiduría", 60)}
                        className="bg-black border border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-2 py-1 text-[8px] cursor-pointer active:scale-95 font-bold"
                      >
                        [ COMPRAR ]
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-stone-850 text-right text-[8px] text-stone-500 flex items-center justify-end gap-1">
                  <span>Tu Baúl:</span>
                  <span className="text-yellow-500 flex items-center gap-0.5">
                    <PixelEmoji emoji="🪙" className="w-3 h-3" />
                    <span>{user.gold} Oro</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === 🎒 MOCHILA RETRO OVERLAY === */}
      {showBackpack && (
        <div className="fixed top-24 right-8 z-[90] w-80 border-pixel p-6 bg-black font-retro text-[9px] shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <h4 className="text-castle-gold border-b border-stone-850 pb-2 mb-4 flex items-center gap-1.5">
            <PixelEmoji emoji="🎒" className="w-4 h-4" />
            <span>MOCHILA DE AVENTURERO</span>
          </h4>
          {user.inventory.length === 0 ? (
            <p className="text-stone-500 italic">"Mochila vacía. Visita la taberna."</p>
          ) : (
            <div className="space-y-3">
              {user.inventory.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-2 border-stone-800 p-2 bg-stone-950">
                  <div className="flex items-center">
                    <PixelEmoji emoji={item === 'Poción de Vida' ? '🧪' : item === 'Escudo de Compilación' ? '🛡️' : '📜'} className="w-3.5 h-3.5 mr-1.5" />
                    <span className="text-white font-bold text-[8px]">{item}</span>
                  </div>
                  <button 
                    onClick={() => useItem(item)}
                    className="bg-black border border-castle-gold text-castle-gold hover:bg-castle-gold hover:text-black px-2 py-1 cursor-pointer active:scale-95 font-bold text-[7px]"
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
