import React from 'react';
import styles from '../styles/AboutMe.module.css';

const AboutMe = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>My Story</h2>
          <div className={styles.titleUnderline}></div>
        </div>
        
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.storyBlock}>
              <h3 className={styles.subtitle}>How it all started</h3>
              <p className={styles.paragraph}>
                My journey in web development began a few years ago, through my technical course,
                when I discovered my passion for creating and designing websites. 
                Since then, I have been dedicated to learning the best practices 
                and technologies to deliver high-quality web solutions.
              </p>
            </div>

            <div className={styles.storyBlock}>
              <h3 className={styles.subtitle}>Discovering my passion</h3>
              <p className={styles.paragraph}>
                What attracts me most about web development is the ability to create unique 
                and functional experiences that can positively impact people's lives. 
                Each line of code is an opportunity to solve problems and create something meaningful,
                and putting creativity into practice is something that motivates me daily.
              </p>
            </div>

            <div className={styles.storyBlock}>
              <h3 className={styles.subtitle}>Goals and vision</h3>
              <p className={styles.paragraph}>
                Currently, I am focused on improving my skills in front-end development 
                and interface design. My goal is to create innovative web solutions that combine 
                functionality, aesthetics and usability in a harmonious way.
                With my experience in Japan, I seek to bring a more minimalist and functional perspective to my projects.
              </p>
            </div>
          </div>

          <div className={styles.highlightsSection}>
            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <img src="/images/photo1.jpeg" alt="Focus on UX/UI" className={styles.cardImage} />
                </div>
                <div className={styles.flipCardBack}>
                  <h4 className={styles.highlightTitle}>Focus on UX/UI</h4>
                  <p className={styles.highlightText}>
                    Always thinking about user experience to create intuitive and accessible interfaces.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <img src="/images/photo2.jpeg" alt="Innovation" className={styles.cardImage} />
                </div>
                <div className={styles.flipCardBack}>
                  <h4 className={styles.highlightTitle}>Innovation</h4>
                  <p className={styles.highlightText}>
                    Constantly seeking new technologies and trends to apply in projects.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.flipCard}>
              <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront}>
                  <img src="/images/photo3.jpeg" alt="Creativity" className={styles.cardImage} />
                </div>
                <div className={styles.flipCardBack}>
                  <h4 className={styles.highlightTitle}>Creativity</h4>
                  <p className={styles.highlightText}>
                    Combining design and functionality to create unique and impactful solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;