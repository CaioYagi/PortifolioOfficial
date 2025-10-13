import React from 'react';
import styles from '../styles/FormationSkills.module.css';

const FormationSkills = () => {
  return (
    <div className={styles.container} id='formation'>
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
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                HTML5
              </a>
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                CSS
              </a>
              <a href="https://getbootstrap.com/" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                Bootstrap
              </a>
              <a href="https://www.oracle.com/java/" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                Java
              </a>
              <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                Figma
              </a>
              <a href="https://dotnet.microsoft.com/en-us/languages/csharp" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                C#
              </a>
              <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                React JS
              </a>
              <a href="https://www.autodesk.com/products/fusion-360/overview" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                Fusion 360
              </a>
            </div>
            <div className={styles.skillColumn}>
              <a href="https://trello.com/" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                Trello (model Kanban)
              </a>
              <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                MongoDB
              </a>
              <a href="https://www.php.net/" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                PHP
              </a>
              <a href="https://www.w3schools.com/mysql/default.asp" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                MySQL
              </a>
              <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                Javascript
              </a>
              <a href="https://www.adobe.com/products/premiere.html" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                Premiere Pro
              </a>
              <a href="https://www.adobe.com/products/aftereffects.html" target="_blank" rel="noopener noreferrer" className={styles.skillItem}>
                After Effects
              </a>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationSkills;