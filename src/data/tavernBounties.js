/**
 * Tavern daily contracts database for The Code Citadel.
 * Players can claim these contracts to earn extra gold and combat items.
 */

export const bountiesList = [
  {
    id: "b1",
    title: "El Susurrador de Punteros",
    description: "Completa un reto de Punteros (Pointers) en el reino de C++.",
    targetPath: "p_cpp",
    targetCategory: "Pointers",
    goldReward: 60,
    itemReward: "Poción de Vida"
  },
  {
    id: "b2",
    title: "El Pacto Asíncrono",
    description: "Resuelve una misión de Async en JavaScript Dungeons.",
    targetPath: "p_js",
    targetCategory: "Async",
    goldReward: 50,
    itemReward: "Runa de Sabiduría"
  },
  {
    id: "b3",
    title: "La Cacería de la Serpiente",
    description: "Completa cualquier reto básico (Basics) en The Serpent's Grove (Python).",
    targetPath: "p_python",
    targetCategory: "Basics",
    goldReward: 45,
    itemReward: null
  },
  {
    id: "b4",
    title: "El Guardián del Recolector",
    description: "Libera memoria del Heap dinámico en C++ Cathedral.",
    targetPath: "p_cpp",
    targetCategory: "Memory",
    goldReward: 80,
    itemReward: "Escudo de Compilación"
  },
  {
    id: "b5",
    title: "Leyes de la Fortaleza",
    description: "Resuelve una lección básica (Basics) en The Rust Fortress.",
    targetPath: "p_rust",
    targetCategory: "Basics",
    goldReward: 55,
    itemReward: "Poción de Vida"
  }
];
