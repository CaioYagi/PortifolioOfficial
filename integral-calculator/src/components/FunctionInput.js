import React, { useState } from 'react';
import styles from '../styles/FunctionInput.module.css';

const FunctionInput = ({ onFunctionChange, errorMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onFunctionChange(e.target.value);
  };

  return (
    <div className={styles.functionInputContainer}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Digite a função a ser integrada"
        className={styles.functionInput}
      />
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default FunctionInput;