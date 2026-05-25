/**
 * Learning content dictionary for The Code Citadel.
 * Each entry provides 3 learning options: 
 * 1. Concept (Lore & Theory)
 * 2. Example (Master Code & detailed breakdown)
 * 3. Guide (Step-by-step recipe to solve the different exercise)
 */

export const lessons = {
  // === JAVASCRIPT DUNGEONS ===
  js1: {
    concept: "En el laberinto de JavaScript, las variables son pergaminos donde los escribas almacenan datos. Antaño se utilizaba la palabra clave `var`, pero era caótica y desbordaba el ámbito de los bloques. Para conjurar variables cuyo valor pueda cambiar y que respeten el ámbito local de sus bloques, los sabios modernos crearon la palabra clave `let`.",
    example: `// Ejemplo del Maestro:
let pociones = 5;
pociones = 8; // El valor cambia sin perturbar el reino`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Usamos 'let' para declarar la variable mutable 'pociones' e inicializarla en 5.
2. En la siguiente línea, reasignamos 'pociones' al valor 8. El cambio se realiza sin problemas.`,
    guide: `Guía de Forja del Oráculo:
1. Usa la palabra clave moderna para variables reasignables: 'let'.
2. Declara la variable con el nombre 'x' y asígnale el valor 10.
3. En la misma línea, escribe la reasignación 'x = 20;' separada por punto y coma.`
  },
  js2: {
    concept: "Existen verdades eternas en la Ciudadela que ningún hechizo debe alterar, como el nombre del monarca o las leyes de la física. Para proteger un pergamino contra reescrituras accidentales, debes sellarlo con `const`. Al hacerlo, cualquier intento de cambiar su valor desatará la furia del compilador.",
    example: `// Ejemplo del Maestro:
const REY = "Arthur";
// REY = "Lancelot"; // ¡ERROR! Ley real inquebrantable`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Declaramos la constante 'REY' con 'const' y el valor "Arthur".
2. Si intentáramos descomentar la segunda línea para reasignarlo, el navegador lanzaría un TypeError de forma inmediata.`,
    guide: `Guía de Forja del Oráculo:
1. Usa la palabra clave de inmutabilidad: 'const'.
2. Escribe el nombre de la constante matemática 'PI'.
3. Asigna el valor numérico 3.14.`
  },
  js3: {
    concept: "Los guerreros ágiles prefieren encantamientos rápidos y de poco peso. Las funciones tradicionales pueden resultar toscas. Las funciones de flecha (`=>`) ofrecen una sintaxis compacta y elegante, ideal para conjuros anónimos de un solo uso.",
    example: `// Ejemplo del Maestro:
const lanzarHechizo = () => console.log("¡Fuego!");`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Definimos una constante para albergar la función llamada 'lanzarHechizo'.
2. Usamos paréntesis vacíos '()' para los argumentos y la flecha '=>' para apuntar al cuerpo de la función.`,
    guide: `Guía de Forja del Oráculo:
1. Examina la declaración 'const greet = () ??? console.log("Hi");'.
2. Reemplaza el '???' con el operador de flecha que vincula los parámetros con el cuerpo.
3. El operador de flecha se escribe combinando un signo igual y un signo de mayor que: '=>'.`
  },
  js4: {
    concept: "Unir textos y variables solía requerir toscas concatenaciones con el operador `+`. Los magos de la Ciudadela utilizan las Plantillas de Cadena (Template Literals) delimitadas por acentos graves (backticks ` `). Para incrustar magia dinámica en el texto, se usa la runa del dólar seguida de llaves: `${variable}`.",
    example: "// Ejemplo del Maestro:\nconst heroe = \"Galahad\";\nconst saludo = `¡Salve, ${heroe}!`;",
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Las plantillas de texto se encierran entre acentos graves (\` \`) en lugar de comillas simples o dobles.
2. El marcador '\${heroe}' lee dinámicamente el valor de la variable e inyecta "Galahad" en el texto final.`,
    guide: `Guía de Forja del Oráculo:
1. Observa el enigma: \`Hola ???{name}\`.
2. Para que JavaScript interprete las llaves como código inyectado, debes antecederlas con la runa especial.
3. La runa faltante es el signo de dólar: '$'.`
  },
  js5: {
    concept: "Cuando un cofre o cofre de tesoro (objeto) contiene múltiples tesoros, no es necesario abrirlos uno a uno. Con la desestructuración de objetos, puedes extraer propiedades específicas directamente declarando llaves con el mismo nombre de la propiedad.",
    example: `// Ejemplo del Maestro:
const heroe = { nombre: "Robin", arma: "Arco", gemas: 50 };
const { arma } = heroe; // Extrae directamente "Arco"`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. El objeto 'heroe' contiene tres propiedades.
2. Al escribir 'const { arma } = heroe;', JavaScript busca la propiedad 'arma' y le asigna su valor a una nueva variable de igual nombre.`,
    guide: `Guía de Forja del Oráculo:
1. Examina el cofre del tesoro representado por la variable 'tesoro'.
2. El mandato te pide extraer la propiedad 'oro'.
3. Escribe exactamente el nombre de la propiedad 'oro' dentro de las llaves destructuradoras.`
  },
  js6: {
    concept: "El ritual de propagación o 'Spread Operator' (`...`) te permite clonar de un golpe los elementos de un pergamino grupal (array) o un cofre (objeto) a un nuevo contenedor, sin alterar el original. Es la forma más noble de duplicación de materia.",
    example: `// Ejemplo del Maestro:
const hechizosBase = ["Fuego", "Hielo"];
const grimorioCompleto = [...hechizosBase, "Tornado"];`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Usamos tres puntos '...' antes de 'hechizosBase' dentro de los corchetes.
2. Esto 'desempaqueta' todos los elementos de 'hechizosBase' e inyecta uno a uno en el nuevo array.`,
    guide: `Guía de Forja del Oráculo:
1. Tienes un array de origen llamado 'items'.
2. Para duplicar todos sus valores dentro del nuevo array 'copy', debes usar la runa de propagación.
3. Escribe la runa de tres puntos consecutivos: '...' justo antes de 'items'.`
  },
  js7: {
    concept: "Para transformar un ejército de elementos de una sola vez, la runa `.map()` es la ideal. Recorre un array, aplica un hechizo a cada miembro y devuelve un ejército completamente nuevo transformado, dejando al original en paz.",
    example: `// Ejemplo del Maestro:
const soldados = [10, 20, 30]; // Niveles de poder
const caballeros = soldados.map(n => n + 5); // [15, 25, 35]`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. El método '.map()' recibe una función que indica cómo transformar cada elemento 'n'.
2. Devuelve un array completamente nuevo con las transformaciones aplicadas, sin modificar el array 'soldados'.`,
    guide: `Guía de Forja del Oráculo:
1. Tienes la lista 'nums'.
2. Necesitas aplicar una multiplicación por 2 a cada elemento.
3. Invoca la función transformadora de arrays escribiendo su nombre en minúsculas: 'map'.`
  },
  js8: {
    concept: "El guardián de las mazmorras utiliza `.filter()` para evaluar a los aventureros. Este método recorre un array y conserva únicamente a aquellos elementos que cumplan una condición de verdad (retornen `true`), descartando al resto sin piedad.",
    example: `// Ejemplo del Maestro:
const tesoros = [5, 12, 1, 20];
const grandesTesoros = tesoros.filter(t => t > 10); // [12, 20]`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. El método '.filter()' evalúa cada elemento 't'.
2. Si la condición 't > 10' es verdadera, el elemento se incluye en el nuevo array 'grandesTesoros'.`,
    guide: `Guía de Forja del Oráculo:
1. Necesitas evaluar si cada número 'n' es par mediante 'n % 2 === 0'.
2. Usa el método selector de arrays que filtra elementos.
3. Escribe en minúsculas el método: 'filter'.`
  },
  js9: {
    concept: "Las Promesas en JavaScript son pactos del futuro. Representan operaciones que tardarán en resolverse. El creador del pacto provee dos caminos: `resolve`, que se invoca cuando el contrato se cumple con gloria, y `reject`, si ocurre una traición o error.",
    example: `// Ejemplo del Maestro:
const pacto = new Promise((resolve, reject) => {
  let exito = true;
  if (exito) resolve("Oro entregado");
  else reject("Emboscada");
});`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. La promesa recibe un callback con dos argumentos: 'resolve' (éxito) y 'reject' (falla).
2. Si todo sale bien, invocamos 'resolve()' con la recompensa.`,
    guide: `Guía de Forja del Oráculo:
1. Completa la promesa: 'new Promise((???, reject) => { ???("Éxito"); })'.
2. El primer parámetro de la promesa representa el cumplimiento exitoso del pacto.
3. Escribe la palabra clave del éxito en minúsculas: 'resolve'.`
  },
  js10: {
    concept: "Para evitar quedar atrapado en el laberinto de las promesas anidadas (el temible Callback Hell), los sabios crearon `async` y `await`. Al declarar un conjuro como `async`, puedes pausar su ejecución con `await` hasta que el espíritu de la promesa responda, haciendo que el código asíncrono se lee de forma lineal y limpia.",
    example: `// Ejemplo del Maestro:
async function abrirCofre() {
  const llaves = await buscarLlaves();
  return llaves;
}`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Marcamos la función como asíncrona con la palabra clave 'async'.
2. Con 'await', le indicamos al motor que espere la resolución de 'buscarLlaves()' antes de continuar con la siguiente línea de código.`,
    guide: `Guía de Forja del Oráculo:
1. Examina el enigma: 'const data = ??? fetchData();'.
2. Necesitas esperar a que se resuelva la función asíncrona 'fetchData()'.
3. Escribe la palabra clave de espera en minúsculas: 'await'.`
  },
  js_boss: {
    concept: "EL DESAFÍO DEL DRAGÓN ASÍNCRONO: Cuando te enfrentas a múltiples guardianes a la vez, no debes esperar a derrotar a uno para empezar a atacar al siguiente. `Promise.all` te permite lanzar todas las promesas al mismo tiempo y esperar a que todas se cumplan en paralelo, maximizando tu velocidad de batalla.",
    example: `// Ejemplo del Maestro:
const ataques = [atacarOjo(), atacarCola(), atacarAlas()];
Promise.all(ataques).then(resultados => console.log("¡Dragón Derrotado!"));`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. 'Promise.all' toma un array de promesas y devuelve una única promesa combinada.
2. Si alguna de las promesas falla, la promesa combinada falla de inmediato (comportamiento atómico).`,
    guide: `Guía de Forja del Oráculo:
1. Tienes tres promesas: '[p1, p2, p3]'.
2. Para agruparlas e iniciarlas en paralelo, usa el método estático de la clase Promise.
3. Escribe la palabra clave que agrupa todo en minúsculas: 'all'.`
  },

  // === THE SERPENT'S GROVE (PYTHON) ===
  py1: {
    concept: "En el Reino de la Serpiente, la sencillez es la magia suprema. Para proyectar un mensaje al mundo exterior y hablar con la naturaleza, los susurradores de serpientes utilizan la función nativa `print()`.",
    example: `# Ejemplo del Maestro:
print("¡El sol brilla en el bosque!")`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Invocamos la función incorporada 'print()'.
2. El mensaje de texto se pasa entre comillas dobles y se muestra en la terminal de salida de inmediato.`,
    guide: `Guía de Forja del Oráculo:
1. Te piden proyectar el mensaje 'Hola Python' en consola.
2. Usa la función nativa de Python para imprimir salidas de texto.
3. Escribe en minúsculas: 'print'.`
  },
  py2: {
    concept: "La Serpiente es extremadamente ordenada y sagrada. En lugar de encerrar los bloques de código entre llaves, Python exige el uso de **dos puntos** `:` al final de sentencias condicionales o funciones, seguido de una sangría (indentación) perfecta de 4 espacios.",
    example: `# Ejemplo del Maestro:
if energia > 50:
    print("¡Listo para luchar!")`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Colocamos dos puntos ':' inmediatamente después de la condición 'energia > 50'.
2. La línea siguiente está indentada con 4 espacios para denotar que pertenece al bloque condicional.`,
    guide: `Guía de Forja del Oráculo:
1. Revisa la línea del condicional: 'if age > 18??'.
2. Falta la runa de dos puntos que le indica a Python que se abrirá un nuevo bloque.
3. Escribe la runa de dos puntos: ':'.`
  },
  py3: {
    concept: "En Python, los tipos de datos son mágicos y se descubren solos en tiempo de ejecución (Tipado Dinámico). No necesitas declarar si es un entero o un texto, solo une el nombre de la variable con su valor mediante el operador de asignación `=`. El espíritu de la Serpiente hará el resto.",
    example: `# Ejemplo del Maestro:
nivel_fuerza = 99  # Se reconoce automáticamente como entero`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Declaramos la variable 'nivel_fuerza' y le asignamos un entero.
2. No tuvimos que escribir palabras clave de tipado como 'int' ni declaradores como 'let' o 'var'.`,
    guide: `Guía de Forja del Oráculo:
1. Tienes la variable 'x' a la izquierda y el valor '10' a la derecha.
2. Necesitas usar el operador básico de asignación de Python.
3. Escribe la runa del signo de igualdad simple: '='.`
  },
  py4: {
    concept: "Las listas son pergaminos extensibles donde agrupamos objetos. Si encuentras un nuevo objeto en tu camino y deseas guardarlo al final de tu lista, debes emplear el hechizo `.append()`.",
    example: `# Ejemplo del Maestro:
inventario = ["Escudo", "Hierba"]
inventario.append("Flecha")  # ["Escudo", "Hierba", "Flecha"]`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Llamamos al método '.append()' directamente sobre la lista 'inventario'.
2. El elemento "Flecha" es colocado en la última posición física de la lista.`,
    guide: `Guía de Forja del Oráculo:
1. Tienes la lista 'items' y deseas agregarle 'Espada'.
2. Usa el método de agregación final clásico de Python.
3. Escribe el método en minúsculas: 'append'.`
  },
  py5: {
    concept: "Los magos supremos de Python realizan alquimia en una sola línea usando 'List Comprehensions'. Te permite recorrer una lista, aplicar una operación matemática o lógica y construir una lista nueva de forma ultrarrápida y compacta usando la estructura `[operacion for elemento in lista]`.",
    example: `# Ejemplo del Maestro:
valores = [1, 2, 3]
dobles = [x * 2 for x in valores]  # [2, 4, 6]`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Dentro de los corchetes, 'x * 2' es la operación de transformación.
2. 'for x in valores' es el bucle interno que itera sobre cada elemento de la lista original.`,
    guide: `Guía de Forja del Oráculo:
1. Examina el enigma: '[x*x ??? x in numbers]'.
2. Falta la palabra clave que inicia el bucle de iteración interna en la comprensión de listas.
3. Escribe en minúsculas la palabra clave del bucle: 'for'.`
  },
  py_boss: {
    concept: "EL DESAFÍO DEL GYM LEADER DE INTELIGENCIA ARTIFICIAL: La Serpiente ha evolucionado para controlar redes neuronales artificiales. En el mundo de la inteligencia artificial y el aprendizaje profundo en Python, la librería y framework líder de código abierto creado por Meta para computación tensorial y redes neuronales es `PyTorch` (importado como `torch`).",
    example: `# Ejemplo del Maestro:
import torch
x = torch.tensor([1.0, 2.0, 3.0])`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Importamos la librería 'torch'.
2. Creamos un tensor, que es la estructura de datos primordial para el cálculo algebraico y el entrenamiento de modelos de IA.`,
    guide: `Guía de Forja del Oráculo:
1. Revisa el enigma: 'import ???; model = ???.nn.Linear(10, 1)'.
2. Falta importar la librería central de tensores PyTorch.
3. Escribe en minúsculas el nombre del paquete: 'torch'.`
  },

  // === C++ CATHEDRAL ===
  cpp1: {
    concept: "En el Templo Ancestral de C++, debes ser sumamente explícito. A diferencia de Python o JS, debes declarar exactamente de qué tipo es cada porción de memoria que creas antes de asignarla. Para almacenar números enteros en la pila (stack), se consagra el tipo `int`.",
    example: `// Ejemplo del Maestro:
int vidaMax = 100;`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Declaramos explícitamente que la variable 'vidaMax' es de tipo entero usando 'int'.
2. Le asignamos un entero literal: 100.`,
    guide: `Guía de Forja del Oráculo:
1. Examina el enigma: '??? x = 10;'.
2. Se está declarando una variable numérica para guardar un entero de valor 10.
3. Escribe el tipo de dato primitivo para números enteros en C++: 'int'.`
  },
  cpp2: {
    concept: "Un puntero es un pergamino que no almacena un valor en sí mismo, sino la **dirección física de memoria** donde habita otro valor. Se consagra utilizando el asterisco `*` junto al tipo de dato al que apunta.",
    example: `// Ejemplo del Maestro:
int vida = 80;
int* ptrVida = &vida; // Guarda la dirección de memoria de vida`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Declaramos 'int* ptrVida' indicando que es un puntero a entero.
2. Le asignamos la dirección de la variable entera 'vida' usando el operador '&'.`,
    guide: `Guía de Forja del Oráculo:
1. Revisa: 'int ???ptr = &x;'.
2. Falta el símbolo que califica a la variable 'ptr' como un puntero en su declaración.
3. Escribe la runa del asterisco: '*'.`
  },
  cpp3: {
    concept: "Para conocer el lugar exacto del mapa de memoria donde habita una variable, debes usar el operador de dirección o referencia `&` (address-of). Esto te da la coordenada exacta para dársela a un puntero.",
    example: `// Ejemplo del Maestro:
int oro = 500;
int* direccionOro = &oro;`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. El operador '&' colocado antes de 'oro' lee su dirección en el heap o stack.
2. Esa dirección hexadecimal es almacenada por el puntero 'direccionOro'.`,
    guide: `Guía de Forja del Oráculo:
1. Revisa: 'ptr = ???x;'.
2. Necesitas obtener la dirección de memoria de la variable 'x'.
3. Escribe la runa del ampersand: '&'.`
  },
  cpp4: {
    concept: "La pila (stack) de memoria es limitada. Para crear estructuras inmensas que persistan más allá de las funciones locales, debes solicitar memoria en el **Heap** dinámico. El hechizo para crear memoria dinámica es `new`.",
    example: `// Ejemplo del Maestro:
Heroe* h = new Heroe(); // Creado en el Heap dinámico`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. 'new Heroe()' busca espacio libre en la memoria del heap.
2. Devuelve un puntero con la dirección de dicho espacio, el cual asignamos a 'h'.`,
    guide: `Guía de Forja del Oráculo:
1. Examina: 'int* p = ??? int(10);'.
2. Se solicita asignar un entero dinámico en el heap con valor inicial 10.
3. Escribe en minúsculas la palabra clave de asignación de memoria: 'new'.`
  },
  cpp5: {
    concept: "En C++ no hay recolectores de basura automáticos. Si invocas memoria en el Heap con `new`, tienes el sagrado deber moral de liberarla manualmente cuando termines usando `delete`. Si lo olvidas, el reino sufrirá una fuga de memoria (Memory Leak) y colapsará catastróficamente.",
    example: `// Ejemplo del Maestro:
delete h; // Memoria liberada con honor`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Llamamos a 'delete h;'.
2. El sistema operativo recupera la memoria del heap ocupada por 'h', evitando fugas de memoria.`,
    guide: `Guía de Forja del Oráculo:
1. Observa el enigma: '??? p;'.
2. Se requiere liberar el recurso asignado al puntero 'p'.
3. Escribe la palabra clave de liberación en minúsculas: 'delete'.`
  },
  cpp_boss: {
    concept: "EL DESAFÍO DEL ESPECTRO DE LOS PUNTEROS: Cuando creas un ejército entero (un array) en el Heap dinámico usando `new[]`, no puedes liberarlo con un simple `delete`. Debes indicar explícitamente que estás borrando una formación usando corchetes `delete[]`. Olvidarlo solo liberará el primer elemento, dejando el resto flotando como almas en pena.",
    example: `// Ejemplo del Maestro:
int* legion = new int[50];
// ... operaciones de guerra ...
delete[] legion; // ¡Toda la legión es liberada!`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Al declarar 'new int[50]', reservamos espacio contiguo para 50 enteros.
2. Liberamos la formación completa escribiendo 'delete[] legion;'. Los corchetes son cruciales.`,
    guide: `Guía de Forja del Oráculo:
1. Examina el enigma del Boss: 'delete ??? arr;'.
2. 'arr' es un array dinámico asignado con corchetes en el heap.
3. Escribe los corchetes vacíos para liberar el array: '[]'.`
  },

  // === THE RUST FORTRESS ===
  rs1: {
    concept: "En la Fortaleza de Rust, el compilador es un guardián de hierro. Por defecto, todas las variables son estrictamente **inmutables** para garantizar la seguridad concurrente. Si deseas declarar un valor que tenga permitido cambiar a lo largo del tiempo, debes indicarlo explícitamente con `let mut`.",
    example: `// Ejemplo del Maestro:
let mut antorchas = 3;
antorchas = 2; // Permitido gracias a 'mut'`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Por defecto 'let antorchas = 3' prohibiría cualquier reasignación.
2. Al añadir 'mut' tras 'let', el guardián de Rust aprueba que el valor de 'antorchas' cambie a 2.`,
    guide: `Guía de Forja del Oráculo:
1. Te piden declarar un entero reasignable en Rust.
2. Usa la palabra clave de declaración 'let' seguida del calificador mutable.
3. Escribe la combinación exacta: 'let mut'.`
  },
  rs2: {
    concept: "Si declaras una variable usando simplemente `let`, el guardián de Rust grabará ese valor en piedra. Cualquier intento posterior de alterar ese valor producirá un error de compilación inmediato, impidiendo fallos de memoria colaterales.",
    example: `// Ejemplo del Maestro:
let nombre_reino = "Rustland";
// nombre_reino = "Ironland"; // ¡Error de compilación!`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Al declarar con 'let', el valor "Rustland" queda grabado como inmutable.
2. Cualquier intento de cambiarlo daría error inmediato en tiempo de compilación.`,
    guide: `Guía de Forja del Oráculo:
1. Quieres declarar una variable que no pueda ser cambiada accidentalmente.
2. Usa la palabra clave estándar de declaración inmutable de Rust.
3. Escribe en minúsculas: 'let'.`
  },
  rs3: {
    concept: "Las funciones en Rust son los engranajes mecánicos de tu fortaleza. Para declararlas y darles forma, se utiliza la abreviación soberana `fn`, seguida de sus parámetros con tipos de datos explícitos.",
    example: `// Ejemplo del Maestro:
fn curar_heroe(vida: i32) -> i32 {
    vida + 10
}`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. Definimos una función con la palabra clave 'fn'.
2. Indicamos que el parámetro 'vida' es un entero de 32 bits 'i32' y devuelve otro 'i32'.`,
    guide: `Guía de Forja del Oráculo:
1. Te piden definir una función.
2. Usa la palabra clave reservada de declaración de funciones en Rust.
3. Escribe en minúsculas: 'fn'.`
  },
  rs_boss: {
    concept: "EL DESAFÍO DE LA FORTALEZA DE HIERRO: Para compartir la propiedad de un dato entre múltiples hilos de forma segura y sin violar las leyes de propiedad (Ownership), Rust provee contenedores atómicos con exclusión mutua. Para envolver un valor de forma que sea seguro compartirlo concurrentemente, se utiliza un puntero de referencia contada atómica `Arc` combinado con un candado de exclusión mutua `Mutex`.",
    example: `// Ejemplo del Maestro:
use std::sync::{Arc, Mutex};
let cofre_seguro = Arc::new(Mutex::new(0));`,
    exampleExplain: `Análisis del Ejemplo del Maestro:
1. 'Mutex::new(0)' protege el entero 0 garantizando que solo un hilo acceda a la vez.
2. 'Arc::new(...)' nos permite clonar de forma segura el puntero de referencia entre múltiples hilos.`,
    guide: `Guía de Forja del Oráculo:
1. Tienes un contador concurrente y quieres envolverlo para evitar colisiones de memoria en Rust.
2. Usa la estructura de exclusión mutua en CamelCase.
3. Escribe la palabra clave del candado: 'Mutex'.`
  }
};

/**
 * Fallback generator function that creates high-quality medieval coding explanations
 * and dynamic example-breaks/forge-recipes based on the quest properties.
 */
export const getLessonForQuest = (quest) => {
  if (lessons[quest.id]) {
    return lessons[quest.id];
  }

  const category = quest.category || "Conceptos Básicos";
  const title = quest.title || "El Enigma";
  const goalText = quest.goal || "Completa la sección marcada con ??? en el código.";
  const hintWord = (quest.hints && quest.hints.length > 0) ? quest.hints[0] : "la sintaxis adecuada";
  
  // Custom lore templates based on categories
  let concept;
  let example;
  let exampleExplain;
  let guide;

  if (category.toLowerCase().includes("pointer") || category.toLowerCase().includes("memory") || category.toLowerCase().includes("puntero")) {
    concept = `Has ingresado a la sección de **Gestión de Memoria y Punteros**. En estas tierras, la precisión física es ley. Un puntero o referencia es una runa que almacena una coordenada exacta en el pergamino físico del hardware del servidor. Modificar el puntero cambia a dónde apuntas, mientras que desreferenciarlo altera el valor que está guardado en esa coordenada real.`;
    example = `// Guía de Referencias y Memoria:
int valor = 42;
int* direccion = &valor; // Obtiene ubicación física
int contenido = *direccion; // Desreferencia para obtener 42`;
    exampleExplain = `Análisis del Ejemplo del Maestro:
1. El operador '&' lee la dirección física de la variable 'valor' en la memoria del stack.
2. Guardamos esa dirección en el puntero 'direccion' denotado por el asterisco '*'.
3. Con '*direccion' leemos de vuelta el valor guardado en dicha dirección física.`;
    guide = `Guía de Forja del Oráculo:
1. Analiza el enigma en la forja e identifica dónde falta el símbolo de referencia o puntero.
2. Recuerda que para declarar un puntero se usa el asterisco '*', mientras que para obtener una dirección se usa el ampersand '&'.
3. Escribe la runa correcta ('*' o '&') según lo solicitado por el mandato.`;
  } 
  else if (category.toLowerCase().includes("async") || category.toLowerCase().includes("thread") || category.toLowerCase().includes("concurrencia")) {
    concept = `Te adentras en el reino del **Tiempo Asíncrono y Concurrencia**. Aquí, los hilos de ejecución son como mensajeros paralelos. Para evitar que el hilo principal del reino se congele esperando respuestas distantes, permitimos que las tareas corran en segundo plano, notificando al reino cuando su pergamino de resultados esté listo.`;
    example = `// Patrón de Concurrencia/Asincronía:
// Lanza la tarea en segundo plano y espera a que el mensajero regrese
const resultado = await invocarMensajeroSilencioso();`;
    exampleExplain = `Análisis del Ejemplo del Maestro:
1. Al invocar una tarea que toma tiempo, la computadora puede seguir ejecutando otras tareas de guerra.
2. Al anteponer 'await', pausamos linealmente la lectura del pergamino hasta recibir el resultado esperado.`;
    guide = `Guía de Forja del Oráculo:
1. Examina si el enigma involucra llamadas asíncronas, callbacks o resoluciones de promesas.
2. Identifica si te piden la palabra para declarar asincronía ('async'), esperar una promesa ('await') o agruparlas ('all').
3. Coloca la palabra clave adecuada en minúsculas en el yunque de código.`;
  }
  else if (category.toLowerCase().includes("oop") || category.toLowerCase().includes("class") || category.toLowerCase().includes("herencia")) {
    concept = `Exploras el templo de la **Programación Orientada a Objetos (OOP)**. Los objetos son como planos mágicos para fabricar criaturas, héroes u objetos en el reino. Usando planos (clases) con constructores y destructores definidos, podemos instanciar infinitos caballeros con sus propios atributos y métodos de combate.`;
    example = `// Estructura de Planos OOP:
class Caballero {
  constructor(nombre) {
    this.nombre = nombre;
  }
  atacar() { console.log("¡Corte de espada!"); }
}`;
    exampleExplain = `Análisis del Ejemplo del Maestro:
1. La palabra reservada define una nueva plantilla 'Caballero' para crear aventureros.
2. El 'constructor' inicializa cada instancia con sus atributos personales (como 'nombre').`;
    guide = `Guía de Forja del Oráculo:
1. Observa qué componente de la clase o estructura está vacío (¿el constructor, la clase misma o la herencia?).
2. Aplica la palabra clave clásica del lenguaje (por ejemplo, 'class', 'constructor' o el nombre del objeto).
3. Asegura escribirlo exactamente con las mayúsculas/minúsculas correctas del lenguaje.`;
  }
  else if (category.toLowerCase().includes("array") || category.toLowerCase().includes("list") || category.toLowerCase().includes("collection") || category.toLowerCase().includes("slice")) {
    concept = `Manejas el cofre de **Colecciones y Estructuras de Datos**. Los arrays y listas son estanterías ordenadas donde guardamos múltiples reliquias una al lado de la otra. Utilizando métodos de recorrido, filtrado o transformación, puedes alterar o interrogar a toda una legión de datos simultáneamente.`;
    example = `// Recorrido de Colecciones:
// Aplicar una operación a cada celda de la estantería ordenada
coleccion.forEach(item => item.limpiar());`;
    exampleExplain = `Análisis del Ejemplo del Maestro:
1. Las colecciones permiten almacenar múltiples ítems bajo un mismo nombre físico.
2. Mediante métodos funcionales del lenguaje, iteramos en la colección de forma secuencial y limpia.`;
    guide = `Guía de Forja del Oráculo:
1. Identifica qué método o función de array te solicita el mandato (¿agregar elemento, recorrer, mapear o filtrar?).
2. Escribe el método correspondiente (como 'map', 'filter', 'append' o 'push') cuidando su ortografía.`;
  }
  else if (category.toLowerCase().includes("sec") || category.toLowerCase().includes("crypt") || category.toLowerCase().includes("hash") || category.toLowerCase().includes("inject")) {
    concept = `Desciendes a las **Catacumbas de Seguridad Digital**. Aquí, la discreción y el cifrado son tus escudos. Los algoritmos hashing transforman tus contraseñas en huellas dactilares imposibles de revertir, mientras que la validación exhaustiva de inputs previene que hechizos maliciosos de inyección penetren tus murallas de datos.`;
    example = `// Escudo de Protección:
// Hashea un texto plano antes de grabarlo en piedra pública
const firmaSegura = hash(clave_secreta);`;
    exampleExplain = `Análisis del Ejemplo del Maestro:
1. El texto plano es procesado por una función criptográfica irreversible.
2. El resultado es un hash inalterable que autentica la identidad del portador.`;
    guide = `Guía de Forja del Oráculo:
1. Para defender el reino, identifica qué algoritmo o buena práctica te solicita el mandato.
2. Sigue las instrucciones del Oráculo para introducir el método criptográfico o parámetro de validación solicitado.`;
  }
  else {
    concept = `Te encuentras en la sección **${category}** ante el desafío llamado **${title}**. Los antiguos pergaminos de la Orden de los Programadores indican que para superar este enigma debes dominar la sintaxis específica del lenguaje. Para resolver el misterio, deberás identificar el operador o palabra clave faltante y colocarlo en el centro del yunque.`;
    example = `// Plantilla de Demostración del Templo:
// Analiza el enigma cuidadosamente. El concepto central requiere usar: ${hintWord}`;
    exampleExplain = `Análisis del Ejemplo del Maestro:
1. Observa cómo el operador o estructura se coloca en la posición adecuada del código.
2. La sintaxis respeta las reglas y convenciones del reino para evitar errores de memoria o ejecución.`;
    guide = `Guía de Forja del Oráculo:
1. Examina el Enigma en el panel derecho e identifica la celda vacía marcada con '???'.
2. Compara el mandato con el Ejemplo del Maestro para deducir qué palabra clave u operador es el indicado.
3. Escribe tu solución en el campo de texto y haz clic en 'Verificar' para forjar la respuesta.`;
  }

  return {
    concept,
    example,
    exampleExplain,
    guide: guide || `Guía de Forja del Oráculo:\n1. Revisa el mandato real: "${goalText}".\n2. Para superar la prueba, debes colocar "${hintWord}" en el yunque del enigma.\n3. Escribe tu respuesta en el campo del yunque y presiona 'Verificar'.`
  };
};
