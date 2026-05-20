/**
 * ValidationEngine handles the logic to verify if a user's solution is correct.
 * It supports different validation types: 'regex', 'keyword', and 'exact'.
 */
export const validateSolution = (quest, input) => {
  if (!quest.validation) return { success: true, message: "Quest completed!" };

  const { type, criteria } = quest.validation;

  switch (type) {
    case 'regex':
      const regex = new RegExp(criteria, 'g');
      if (regex.test(input)) {
        return { success: true, message: "¡Increíble! Has descifrado el patrón correctamente." };
      }
      break;

    case 'keyword':
      const keywords = Array.isArray(criteria) ? criteria : [criteria];
      const missing = keywords.filter(kw => !input.toLowerCase().includes(kw.toLowerCase()));
      if (missing.length === 0) {
        return { success: true, message: "¡Perfecto! Has incluido todos los conceptos necesarios." };
      }
      return { 
        success: false, 
        message: `Te falta considerar: ${missing.join(', ')}` 
      };

    case 'exact':
      if (input.trim() === criteria.trim()) {
        return { success: true, message: "¡Exacto! Solución perfecta." };
      }
      break;

    default:
      return { success: false, message: "Tipo de validación no soportado." };
  }

  return { success: false, message: "La solución aún no es correcta. ¡Sigue intentándolo!" };
};
