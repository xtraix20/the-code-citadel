import { javaQuests } from './javaQuests';
import { pythonQuests } from './pythonQuests';
import { jsQuests } from './jsQuests';
import { rustQuests } from './rustQuests';
import { goQuests } from './goQuests';
import { cppQuests } from './cppQuests';
import { securityQuests } from './securityQuests';

export const paths = [
  {
    id: "p_java",
    name: "Java Oracle Citadel",
    description: "La fortaleza de los tipos estáticos y el poder de la JVM.",
    bossId: "j20",
    badgeName: "Oracle Badge",
    quests: javaQuests
  },
  {
    id: "p_python",
    name: "The Serpent's Grove",
    description: "Praderas infinitas donde la simplicidad de la serpiente oculta un poder inmenso.",
    bossId: "py_boss",
    badgeName: "Serpent Badge",
    quests: pythonQuests
  },
  {
    id: "p_js",
    name: "JavaScript Dungeons",
    description: "Un laberinto de callbacks y promesas donde el tiempo fluye de forma asíncrona.",
    bossId: "js_boss",
    badgeName: "Async Badge",
    quests: jsQuests
  },
  {
    id: "p_rust",
    name: "The Rust Fortress",
    description: "Una fortaleza impenetrable donde la memoria está protegida por leyes inquebrantables.",
    bossId: "rs_boss",
    badgeName: "Safety Badge",
    quests: rustQuests
  },
  {
    id: "p_go",
    name: "The Go Highlands",
    description: "Montañas de simplicidad y concurrencia donde los Gophers construyen el futuro.",
    bossId: "go_boss",
    badgeName: "Gopher Badge",
    quests: goQuests
  },
  {
    id: "p_cpp",
    name: "C++ Cathedral",
    description: "Un templo antiguo y peligroso donde gestionas la memoria con tus propias manos.",
    bossId: "cpp_boss",
    badgeName: "Pointer Badge",
    quests: cppQuests
  },
  {
    id: "p_sec",
    name: "Security Catacombs",
    description: "El arte de la defensa y el ataque ético en las sombras digitales.",
    bossId: "sec_boss",
    badgeName: "Shadow Badge",
    quests: securityQuests
  }
];
