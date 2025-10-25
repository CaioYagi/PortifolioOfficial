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

        {/* Special Demo Card */}
        <div className={styles.demoSection}>
          <div className={styles.demoCard}>
            <div className={styles.demoIcon}>✨</div>
            <h3 className={styles.demoTitle}>Special Project Demo</h3>
            <p className={styles.demoDescription}>
              A romantic surprise page with floating photos and Spotify integration. 
              Built with React and CSS animations.
            </p>
            <div className={styles.demoTechnologies}>
              <span className={styles.techTag}>React</span>
              <span className={styles.techTag}>CSS Animations</span>
              <span className={styles.techTag}>Spotify API</span>
            </div>
            <div className={styles.demoLinks}>
              <a 
                href="/surprise" 
                target="_blank"
                className={styles.demoButton}
              >
                💕 Live Demo
              </a>
              <a 
                href="https://github.com/CaioYagi" 
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubButton}
              >
                👨‍💻 GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className={styles.comingSoonContainer}>
          <div className={styles.comingSoonIcon}>
            🚀
          </div>
          <h3 className={styles.comingSoonTitle}>More Projects Coming Soon</h3>
          <p className={styles.comingSoonText}>
            I'm currently working on more amazing projects that will be showcased here soon. 
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