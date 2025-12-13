import math from 'mathjs';

export const parseFunction = (input) => {
  try {
    // Validar a entrada do usuário
    const sanitizedInput = input.replace(/\s+/g, ''); // Remove espaços em branco
    const parsed = math.parse(sanitizedInput);
    return parsed;
  } catch (error) {
    throw new Error('Função inválida. Por favor, verifique a entrada.');
  }
};

export const validateFunction = (input) => {
  const regex = /^[0-9+\-*/().^x\s]+$/; // Regex para validar a função
  return regex.test(input);
};