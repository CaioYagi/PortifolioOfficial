import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
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
          <Link href="/" className={`${styles.navLink} ${activeLink === 'Home' ? styles.active : ''}`} onClick={() => handleLinkClick('Home')}>
            Home
          </Link>
          <Link href="/projects" className={`${styles.navLink} ${activeLink === 'Projects' ? styles.active : ''}`} onClick={() => handleLinkClick('Projects')}>
            Projects
          </Link>
          <Link href="/formation" className={`${styles.navLink} ${activeLink === 'Formation' ? styles.active : ''}`} onClick={() => handleLinkClick('Formation')}>
            Formation
          </Link>
          <Link href="/contacts" className={`${styles.navLink} ${activeLink === 'Contacts' ? styles.active : ''}`} onClick={() => handleLinkClick('Contacts')}>
            Contacts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;