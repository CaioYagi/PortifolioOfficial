import React from 'react';
import styles from '../styles/MathSymbolAnimation.module.css';

const MathSymbolAnimation = () => {
  const symbols = ['∫', 'dx', '∞', 'π', 'e', '√', 'Σ', 'Δ', 'θ', 'α'];

  return (
    <div className={styles.animationContainer}>
      {symbols.map((symbol, index) => (
        <div key={index} className={styles.symbol} style={{ animationDelay: `${index * 0.2}s` }}>
          {symbol}
        </div>
      ))}
    </div>
  );
};

export default MathSymbolAnimation;