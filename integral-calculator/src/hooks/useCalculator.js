import { useState } from 'react';
import { parseFunction } from '../utils/mathParser';
import { calculateIntegral } from '../utils/integralSolver';

const useCalculator = () => {
  const [functionInput, setFunctionInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFunctionChange = (input) => {
    setFunctionInput(input);
    setError('');
  };

  const calculate = () => {
    try {
      const parsedFunction = parseFunction(functionInput);
      const integralResult = calculateIntegral(parsedFunction);
      setResult(integralResult);
    } catch (err) {
      setError('Função inválida. Por favor, verifique a entrada.');
      setResult(null);
    }
  };

  return {
    functionInput,
    result,
    error,
    handleFunctionChange,
    calculate,
  };
};

export default useCalculator;