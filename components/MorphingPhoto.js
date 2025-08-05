import React, { useState } from 'react';
import styles from '../styles/AnimatedTriangle.module.css';

const MorphingPhoto = ({ 
  imageSrc = '/images/icons/profilepicture.jpg',
  alt = 'Foto de perfil' 
}) => {
  const [currentShape, setCurrentShape] = useState(0);
  
  const shapes = [
    'circle(50% at 50% 50%)', // Círculo
    'polygon(50% 0%, 0% 100%, 100% 100%)', // Triângulo
    'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // Octágono
    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Quadrado
  ];

  const handleClick = () => {
    setCurrentShape((prev) => (prev + 1) % shapes.length);
  };

  return (
    <div className={styles.morphingContainer} onClick={handleClick}>
      <div 
        className={styles.morphingImage}
        style={{
          clipPath: shapes[currentShape],
          backgroundImage: `url(${imageSrc})`
        }}
      >
        <div className={styles.clickHint}>
          Clique para mudar forma
        </div>
      </div>
    </div>
  );
};

export default MorphingPhoto;