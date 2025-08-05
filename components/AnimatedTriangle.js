import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/AnimatedTriangle.module.css';

const ParallaxPhoto = ({ 
  imageSrc = '/images/icons/profilepicture.jpg', 
  alt = 'Foto de perfil'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={styles.parallaxContainer}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efeitos de fundo - movimento reduzido */}
      <div 
        className={styles.backgroundLayer1}
        style={{
          transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px) rotate(${mousePosition.x * 5}deg)`
        }}
      >
        <div className={styles.glowEffect1}></div>
      </div>

      <div 
        className={styles.backgroundLayer2}
        style={{
          transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px) rotate(${mousePosition.x * -3}deg)`
        }}
      >
        <div className={styles.glowEffect2}></div>
      </div>

      <div 
        className={styles.backgroundLayer3}
        style={{
          transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px) scale(${1 + Math.abs(mousePosition.x) * 0.05})`
        }}
      >
        <div className={styles.glowEffect3}></div>
      </div>
      
      {/* Imagem principal - movimento muito sutil */}
      <div 
        className={`${styles.parallaxLayer} ${isHovered ? styles.hovered : ''}`}
        style={{
          transform: `
            translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px) 
            rotateX(${mousePosition.y * 2}deg) 
            rotateY(${mousePosition.x * 2}deg) 
            scale(${isHovered ? 1.02 : 1})
          `
        }}
      >
        <img src={imageSrc} alt={alt} className={styles.mainImage} />
      </div>
    </div>
  );
};

export default ParallaxPhoto;