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
            Exciting projects showcasing my development skills!
          </p>
        </div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {/* Special Demo Card */}
          <div className={styles.projectCard}>
            <div className={styles.projectIcon}>✨</div>
            <h3 className={styles.projectTitle}>Special Project Demo</h3>
            <p className={styles.projectDescription}>
              A romantic surprise page with floating photos, music player and real-time counters. 
              Built with React and CSS animations.
            </p>
            <div className={styles.projectTechnologies}>
              <span className={styles.techTag}>React</span>
              <span className={styles.techTag}>CSS Animations</span>
              <span className={styles.techTag}>Audio API</span>
              <span className={styles.techTag}>JavaScript</span>
            </div>
            <div className={styles.projectLinks}>
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

          {/* Integral Calculator Card */}
          <div className={styles.projectCard}>
            <div className={styles.projectIcon}>∫</div>
            <h3 className={styles.projectTitle}>Integral Calculator</h3>
            <p className={styles.projectDescription}>
              Advanced integral calculator with virtual keyboard, animated mathematical symbols, 
              and real-time function parsing. Supports complex mathematical expressions.
            </p>
            <div className={styles.projectTechnologies}>
              <span className={styles.techTag}>React</span>
              <span className={styles.techTag}>Math.js</span>
              <span className={styles.techTag}>CSS Animations</span>
              <span className={styles.techTag}>LaTeX</span>
            </div>
            <div className={styles.projectLinks}>
              <a 
                href="/calculator" 
                target="_blank"
                className={styles.demoButton}
              >
                🧮 Live Demo
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