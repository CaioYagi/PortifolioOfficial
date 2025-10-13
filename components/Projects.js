import React from 'react';
import styles from '../styles/Projects.module.css';

const Projects = () => {
  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Projects</h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Exciting projects are on the way!
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className={styles.comingSoonContainer}>
          <div className={styles.comingSoonIcon}>
            🚀
          </div>
          <h3 className={styles.comingSoonTitle}>Coming Soon</h3>
          <p className={styles.comingSoonText}>
            I'm currently working on some amazing projects that will be showcased here soon. 
            Stay tuned for updates!
          </p>
          <div className={styles.comingSoonFeatures}>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>🌐</span>
              <span>Web Applications</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>📱</span>
              <span>Mobile Apps</span>
            </div>
            <div className={styles.featureItem}>
              <span className={styles.featureIcon}>💼</span>
              <span>Business Solutions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;