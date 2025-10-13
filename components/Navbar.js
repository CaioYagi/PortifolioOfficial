import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const handleSmoothScroll = (targetId) => {
    if (targetId === 'home') {
      // Para o Home, rola para o topo da página
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            <img 
              src="/images/icons/logoportifolio.png" 
              alt="Portfolio Logo" 
              className={styles.logoIcon}
              onError={(e) => {
                console.log('Erro ao carregar imagem:', e);
                e.target.outerHTML = '<div class="' + styles.logoText + '">C</div>';
              }}
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll('home');
              handleLinkClick('Home');
            }}
            className={`${styles.navLink} ${activeLink === 'Home' ? styles.active : ''}`}
          >
            Home
          </a>
          
          <a 
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll('about');
              handleLinkClick('About');
            }}
            className={`${styles.navLink} ${activeLink === 'About' ? styles.active : ''}`}
          >
            About
          </a>
          
          <a 
            href="#formation"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll('formation');
              handleLinkClick('Formation');
            }}
            className={`${styles.navLink} ${activeLink === 'Formation' ? styles.active : ''}`}
          >
            Formation
          </a>
          
          <a 
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll('projects');
              handleLinkClick('Projects');
            }}
            className={`${styles.navLink} ${activeLink === 'Projects' ? styles.active : ''}`}
          >
            Projects
          </a>
          
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleSmoothScroll('contact');
              handleLinkClick('Contact');
            }}
            className={`${styles.navLink} ${activeLink === 'Contact' ? styles.active : ''}`}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;