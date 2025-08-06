import React from 'react';
import styles from '../styles/FormationSkills.module.css';

const FormationSkills = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Seção de Formação */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>My formation</h2>
          <div className={styles.formationCard}>
            <a href="https://etecitu.cps.sp.gov.br/" target="_blank" rel="noopener noreferrer">
              <h3 className={styles.courseTitle}>Technical high school in Brazil</h3>
              <p className={styles.institution}>Etec Martinho Di Ciero</p>
            </a>
          </div>
          <div className={styles.formationCard}>
            <a href="https://slt.ifsp.edu.br/" target="_blank" rel="noopener noreferrer">
              <h3 className={styles.courseTitle}>Bachelor's Degree of Control and Automation Engineering</h3>
              <p className={styles.institution}>IFSP (Instituto Federal de São Paulo)</p>
            </a>
          </div>
        </div>

        {/* Seção de Idiomas */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Languages</h2>
          <ul className={styles.languageList}>
            <li className={styles.languageItem}>Portuguese (Native Language)</li>
            <li className={styles.languageItem}>Japanese (Speaking Fluency)</li>
            <li className={styles.languageItem}>English (Intermediate level)</li>
          </ul>
        </div>

        {/* Seção de Habilidades */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillColumn}>
              <div className={styles.skillItem}>HTML5</div>
              <div className={styles.skillItem}>CSS</div>
              <div className={styles.skillItem}>Bootstrap</div>
              <div className={styles.skillItem}>Java</div>
              <div className={styles.skillItem}>Figma</div>
              <div className={styles.skillItem}>C#</div>
              <div className={styles.skillItem}>React JS</div>
            </div>
            <div className={styles.skillColumn}>
              <div className={styles.skillItem}>Trello (model Kanban)</div>
              <div className={styles.skillItem}>MongoDB</div>
              <div className={styles.skillItem}>PHP</div>
              <div className={styles.skillItem}>MySQL</div>
              <div className={styles.skillItem}>Javascript</div>
              <div className={styles.skillItem}>Premiere Pro</div>
              <div className={styles.skillItem}>After Effects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationSkills;