import React, { useState, useEffect } from 'react';
import styles from '../styles/ScrollIndicator.module.css';

const ScrollIndicator = ({ targetId = "formation" }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId;

    const handleScroll = () => {
      setIsVisible(false);
      
      // Limpa o timeout anterior se existir
      clearTimeout(timeoutId);
      
      // Mostra novamente após 2 segundos parado
      timeoutId = setTimeout(() => {
        if (window.scrollY === 0) {
          setIsVisible(true);
        }
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleScrollDown = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div 
      className={`${styles.scrollIndicator} ${!isVisible ? styles.hidden : ''}`} 
      onClick={handleScrollDown}
    >
      <span className={styles.moreText}>MORE</span>
      <div className={styles.arrowContainer}>
        <div className={styles.arrow}></div>
        <div className={styles.arrow}></div>
        <div className={styles.arrow}></div>
      </div>
    </div>
  );
};

export default ScrollIndicator;