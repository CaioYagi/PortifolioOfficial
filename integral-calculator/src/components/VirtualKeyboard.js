import React from 'react';
import styles from '../styles/VirtualKeyboard.module.css';

const keys = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  'sin', 'cos', 'tan', 'exp', 'ln', 'sqrt'
];

const VirtualKeyboard = ({ onKeyPress }) => {
  const handleKeyClick = (key) => {
    onKeyPress(key);
  };

  return (
    <div className={styles.keyboard}>
      {keys.map((key) => (
        <button
          key={key}
          className={styles.key}
          onClick={() => handleKeyClick(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
};

export default VirtualKeyboard;