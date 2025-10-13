import React, { useState } from 'react';
import Head from 'next/head'
import styles from '../styles/AnimatedTriangle.module.css';
import stylesHome from '../styles/Home.module.css';
import ParallaxPhoto from '../components/AnimatedTriangle';
import GitHubButton from '../components/GitHubButton';
import LinkedInButton from '../components/LinkedInButton';
import FooterMain from '../components/FooterMain';
import Navbar from '../components/Navbar';
import FormationSkills from '../components/FormationSkills';
import AboutMe from '../components/AboutMe';
import ScrollIndicator from '../components/ScrollIndicator';
import Contact from '../components/Contact';
import Projects from '../components/Projects';

function Home() {
  return (
    <>
      <Head>
        <title>Caio Hiroki Yagi - Portfolio</title>
        <meta name="description" content="Portfolio de Caio Hiroki Yagi - Desenvolvedor Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <div className={stylesHome.container} style={{ paddingTop: '80px' }}>
        <div className={stylesHome.layoutWrapper}>
          <div className={stylesHome.textSection}>
            <h1 className={stylesHome.title}>
              Web-Designer
            </h1>
            <p className={stylesHome.description}>
              Hello. I'm Caio Hiroki Yagi. Beginner Web-Designer <br />
              Living in Salto, São Paulo, Brazil <img src="/images/icons/icon-park_local-pin.svg" alt="Localização"/> <img src="/images/icons/brasil.png" style={{width:'20px',height:'20px'}} alt="Mapa"/>
            </p>
            
            <div style={{ 
              marginTop: '30px', 
              display: 'flex', 
              gap: '15px',
              justifyContent: 'flex-end' 
            }}>
              <GitHubButton 
                href="https://github.com/CaioYagi"
                text="GitHub"
                size="medium"
              />
              <LinkedInButton 
                href="https://www.linkedin.com/in/caio-hiroki-yagi/"
                text="LinkedIn"
                size="medium"
              />
            </div>
          </div>
          
          <div className={stylesHome.triangleSection}>
            <ParallaxPhoto 
              imageSrc="/images/icons/profilepicture.jpg"
              alt="Minha foto de perfil"
            />
          </div>
        </div>
        
        {/* Indicador de scroll centralizado */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ScrollIndicator targetId="formation" />
        </div>
      </div>
      
      <FormationSkills />
      <AboutMe />
      <Projects />
      <Contact />
      
      <FooterMain />
    </>
  );
}

export default Home;
