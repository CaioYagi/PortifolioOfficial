import React, { useState } from 'react';
import styles from '../styles/AnimatedTriangle.module.css';
import stylesHome from '../styles/Home.module.css';
import ParallaxPhoto from '../components/AnimatedTriangle';
import GitHubButton from '../components/GitHubButton';
import FooterMain from '../components/FooterMain';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <>
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
            
            {/* Botão do GitHub alinhado à direita */}
            <div style={{ 
              marginTop: '30px', 
              display: 'flex', 
              justifyContent: 'flex-end' 
            }}>
              <GitHubButton 
                href="https://github.com/seu-usuario"
                text="GitHub"
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
      </div>
      
      <FooterMain />
    </>
  );
}

export default Home;
