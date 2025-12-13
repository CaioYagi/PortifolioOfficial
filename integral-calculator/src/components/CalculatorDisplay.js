import React from 'react';
import styles from '../styles/Calculator.module.css';

const CalculatorDisplay = ({ result, error }) => {
  return (
    <div className={styles.calculatorDisplay}>
      {error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : (
        <div className={styles.result}>
          <h2>Resultado da Integral:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default CalculatorDisplay;