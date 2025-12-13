import math from 'mathjs';

export const calculateIntegral = (functionString, variable = 'x', lowerLimit = 0, upperLimit = 1) => {
  try {
    // Parse the function string into a math expression
    const expr = math.parse(functionString);
    
    // Create a function that can be evaluated
    const compiledFunction = math.compile(expr);
    
    // Define the integral function
    const integralFunction = (x) => compiledFunction.evaluate({ [variable]: x });
    
    // Calculate the definite integral using numerical integration
    const result = math.integrate(integralFunction, variable, lowerLimit, upperLimit);
    
    return result;
  } catch (error) {
    console.error("Error calculating integral:", error);
    return null;
  }
};