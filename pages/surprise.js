import React, { useState, useEffect, useMemo, useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Surprise.module.css';

const Surprise = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [timeUntilAnniversary, setTimeUntilAnniversary] = useState({});
  const [timeTogether, setTimeTogether] = useState({});
  const [isClient, setIsClient] = useState(false);
  
  // Estados do player de música
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef(null);

  // Array com suas fotos
  const photos = [
    { src: '/images/couple/luiza1.jpeg', placeholder: 1 },
    { src: '/images/couple/luiza2.jpeg', placeholder: 2 },
    { src: '/images/couple/luiza3.jpeg', placeholder: 3 },
    { src: '/images/couple/luiza4.jpeg', placeholder: 4 },
    { src: '/images/couple/luiza5.jpeg', placeholder: 5 },
    { src: '/images/couple/luiza6.jpeg', placeholder: 6 },
  ];

  // Data de início do namoro
  const startDate = new Date('2024-10-26');

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Funções do player de música
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    
    if (audio) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Aplicar fundo global quando o componente montar
  useEffect(() => {
    if (!isClient) return;
    
    const originalBodyStyle = document.body.style.cssText;
    const originalHtmlStyle = document.documentElement.style.cssText;
    
    document.body.style.background = 'linear-gradient(135deg, #87CEEB 0%, #F0F8FF 50%, #E6F3FF 100%)';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    document.documentElement.style.background = 'linear-gradient(135deg, #87CEEB 0%, #F0F8FF 50%, #E6F3FF 100%)';
    document.documentElement.style.backgroundAttachment = 'fixed';

    return () => {
      document.body.style.cssText = originalBodyStyle;
      document.documentElement.style.cssText = originalHtmlStyle;
    };
  }, [isClient]);

  // Gerar fotos e elementos do Snoopy voando - VALORES FIXOS
  const floatingPhotos = useMemo(() => {
    const positions = [
      { left: 15, duration: 8.5 },
      { left: 35, duration: 9.2 },
      { left: 55, duration: 10.1 },
      { left: 25, duration: 9.8 },
      { left: 45, duration: 8.9 },
      { left: 65, duration: 9.5 }
    ];

    return photos.map((photo, index) => ({
      ...photo,
      left: positions[index]?.left || 50,
      animationDelay: index * 0.5,
      animationDuration: positions[index]?.duration || 9
    }));
  }, []);

  // Elementos do Snoopy flutuantes com ícones - VALORES FIXOS
  const floatingSnoopyElements = useMemo(() => {
    const elements = [
      { type: 'icon', src: '/images/couple/snoopy.png', alt: 'Snoopy' },
      { type: 'emoji', emoji: '🏠' },
      { type: 'emoji', emoji: '☁️' },
      { type: 'icon', src: '/images/couple/snoopy.png', alt: 'Snoopy Happy' },
      { type: 'emoji', emoji: '🎈' },
      { type: 'emoji', emoji: '🌟' },
      { type: 'icon', src: '/images/couple/snoopy.png', alt: 'Snoopy Dancing' },
      { type: 'emoji', emoji: '🦴' },
      { type: 'emoji', emoji: '🎵' },
      { type: 'icon', src: '/images/couple/snoopy.png', alt: 'Snoopy' },
      { type: 'icon', src: '/images/couple/snoopy.png', alt: 'Snoopy Sleeping' },
      { type: 'emoji', emoji: '☁️' },
      { type: 'emoji', emoji: '✨' },
      { type: 'icon', src: '/images/couple/snoopy.png', alt: 'Snoopy Flying' },
      { type: 'emoji', emoji: '🌟' },
      { type: 'emoji', emoji: '💙' },
      { type: 'emoji', emoji: '🏠' },
      { type: 'emoji', emoji: '🎵' },
      { type: 'emoji', emoji: '💫' },
      { type: 'icon', src: '/images/couple/snoopy.png', alt: 'Snoopy' }
    ];
    
    const positions = [
      { left: 10, delay: 0, duration: 4.5 },
      { left: 25, delay: 0.5, duration: 5.2 },
      { left: 40, delay: 1, duration: 4.8 },
      { left: 60, delay: 1.5, duration: 5.5 },
      { left: 80, delay: 2, duration: 4.2 },
      { left: 15, delay: 2.5, duration: 5.8 },
      { left: 35, delay: 3, duration: 4.9 },
      { left: 55, delay: 3.5, duration: 5.1 },
      { left: 75, delay: 4, duration: 4.7 },
      { left: 20, delay: 4.5, duration: 5.3 },
      { left: 45, delay: 0.8, duration: 4.6 },
      { left: 65, delay: 1.8, duration: 5.4 },
      { left: 30, delay: 2.8, duration: 4.4 },
      { left: 50, delay: 1.2, duration: 5.7 },
      { left: 70, delay: 2.2, duration: 4.3 },
      { left: 12, delay: 3.2, duration: 5.6 },
      { left: 38, delay: 0.3, duration: 4.1 },
      { left: 58, delay: 1.3, duration: 5.9 },
      { left: 78, delay: 2.3, duration: 4.8 },
      { left: 22, delay: 3.3, duration: 5.0 }
    ];

    return positions.map((pos, i) => ({
      id: i,
      ...elements[i % elements.length],
      left: pos.left,
      animationDelay: pos.delay,
      animationDuration: pos.duration
    }));
  }, []);

  // Função para verificar se a imagem existe
  const handleImageError = (event, placeholderNumber) => {
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, #87CEEB 0%, #F0F8FF 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4682B4;
      font-weight: bold;
      font-size: 14px;
      border: 4px solid white;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    `;
    placeholder.textContent = `❤️ Foto ${placeholderNumber}`;
    event.target.parentNode.replaceChild(placeholder, event.target);
  };

  // Função para lidar com erro dos ícones do Snoopy
  const handleSnoopyIconError = (event) => {
    event.target.style.display = 'none';
    const parent = event.target.parentNode;
    const emoji = document.createElement('span');
    emoji.textContent = '❤️';
    emoji.style.fontSize = '2rem';
    parent.appendChild(emoji);
  };

  // Calcular tempo
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      
      const timeDiff = now - startDate;
      const totalSeconds = Math.floor(timeDiff / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const totalHours = Math.floor(totalMinutes / 60);
      const totalDays = Math.floor(totalHours / 24);
      
      const years = Math.floor(totalDays / 365.25);
      const remainingDaysAfterYears = totalDays - Math.floor(years * 365.25);
      const months = Math.floor(remainingDaysAfterYears / 30.44);
      const days = Math.floor(remainingDaysAfterYears - (months * 30.44));
      
      const hours = totalHours % 24;
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setTimeTogether({ 
        years, months, days, hours, minutes, seconds,
        totalDays, totalHours, totalMinutes, totalSeconds
      });

      const currentYear = now.getFullYear();
      let nextAnniversary = new Date(currentYear, 9, 26);
      
      if (now > nextAnniversary) {
        nextAnniversary = new Date(currentYear + 1, 9, 26);
      }

      const timeToNext = nextAnniversary - now;
      
      if (timeToNext > 0) {
        const daysToNext = Math.floor(timeToNext / (1000 * 60 * 60 * 24));
        const hoursToNext = Math.floor((timeToNext % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesToNext = Math.floor((timeToNext % (1000 * 60 * 60)) / (1000 * 60));
        const secondsToNext = Math.floor((timeToNext % (1000 * 60)) / 1000);
        
        setTimeUntilAnniversary({ 
          days: daysToNext, hours: hoursToNext, 
          minutes: minutesToNext, seconds: secondsToNext
        });
      } else {
        setTimeUntilAnniversary({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const isAnniversary = () => {
    const today = new Date();
    return today.getDate() === 26 && today.getMonth() === 9;
  };

  // Não renderizar animações até estar no cliente
  if (!isClient) {
    return (
      <>
        <Head>
          <title>Para Minha PRINCEUSA ❤️</title>
          <meta name="description" content="Uma surpresa especial para minha princeusa" />
        </Head>
        <div className={styles.container}>
          <div className={styles.portfolioLink}>
            <a href="/" className={styles.portfolioButton}>
              💼 Ver Meu Portfólio
            </a>
          </div>
          
          <div className={styles.counterSection}>
            <div className={styles.counterCard}>
              <h3 className={styles.counterTitle}>❤️ Carregando...</h3>
            </div>
          </div>
          
          <div className={styles.messageContainer}>
            <div className={styles.mainMessage}>
              <h1 className={styles.title}>
                Para Minha PRINCEUSA ❤️
              </h1>
              <p className={styles.subtitle}>Carregando surpresa...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Para Minha PRINCEUSA ❤️</title>
        <meta name="description" content="Uma surpresa especial para minha princeusa" />
      </Head>

      <div className={styles.container}>
        {/* Player de Música - Daniel Caesar feat. H.E.R - Best Part */}
        <audio
          ref={audioRef}
          src="/images/danielcaesar.mp4"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          loop
        />

        {/* Fotos voando */}
        <div className={styles.photosContainer}>
          {floatingPhotos.map((photo, index) => (
            <div
              key={index}
              className={styles.floatingPhoto}
              style={{
                animationDelay: `${photo.animationDelay}s`,
                left: `${photo.left}%`,
                animationDuration: `${photo.animationDuration}s`
              }}
            >
              <img 
                src={photo.src} 
                alt={`Memória ${index + 1}`}
                onError={(e) => handleImageError(e, photo.placeholder)}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid white',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
                }}
              />
            </div>
          ))}
        </div>

        {/* Elementos do Snoopy voando */}
        <div className={styles.snoopyContainer}>
          {floatingSnoopyElements.map((element) => (
            <div
              key={element.id}
              className={styles.snoopyElement}
              style={{
                left: `${element.left}%`,
                animationDelay: `${element.animationDelay}s`,
                animationDuration: `${element.animationDuration}s`
              }}
            >
              {element.type === 'icon' ? (
                <img
                  src={element.src}
                  alt={element.alt}
                  className={styles.snoopyIcon}
                  onError={handleSnoopyIconError}
                />
              ) : (
                <span className={styles.snoopyEmoji}>{element.emoji}</span>
              )}
            </div>
          ))}
        </div>

        {/* Link para o portfólio */}
        <div className={styles.portfolioLink}>
          <a href="/" className={styles.portfolioButton}>
            💼 Ver Meu Portfólio
          </a>
        </div>

        {/* Contador de tempo */}
        <div className={styles.counterSection}>
          <div className={styles.counterCard}>
            <h3 className={styles.counterTitle}>💕 Juntos há:</h3>
            <div className={styles.timeDisplay}>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>{timeTogether.years || 0}</span>
                <span className={styles.timeLabel}>ano{timeTogether.years !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>{timeTogether.months || 0}</span>
                <span className={styles.timeLabel}>mes{timeTogether.months !== 1 ? 'es' : ''}</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>{timeTogether.days || 0}</span>
                <span className={styles.timeLabel}>dia{timeTogether.days !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>{timeTogether.hours || 0}</span>
                <span className={styles.timeLabel}>hora{timeTogether.hours !== 1 ? 's' : ''}</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>{timeTogether.minutes || 0}</span>
                <span className={styles.timeLabel}>min</span>
              </div>
              <div className={styles.timeUnit}>
                <span className={styles.timeNumber}>{timeTogether.seconds || 0}</span>
                <span className={styles.timeLabel}>seg</span>
              </div>
            </div>
            <div className={styles.totalDays}>
              <span className={styles.totalDaysText}>
                💝 Total: {timeTogether.totalDays || 0} dias de aventuras juntos! ✨
              </span>
            </div>
          </div>

          <div className={styles.counterCard}>
            {isAnniversary() ? (
              <div className={styles.anniversarySpecial}>
                <h3 className={styles.counterTitle}>🎊 HOJE É NOSSO ANIVERSÁRIO! 🎊</h3>
                <div className={styles.celebrationMessage}>
                  <p>🎉 Feliz Aniversário de Namoro! 🎉</p>
                  <p>Nossa alegria é infinita, minha princeusa! 💕</p>
                </div>
              </div>
            ) : (
              <>
                <h3 className={styles.counterTitle}>🎈 Próximo aniversário em:</h3>
                <div className={styles.timeDisplay}>
                  <div className={styles.timeUnit}>
                    <span className={styles.timeNumber}>{timeUntilAnniversary.days || 0}</span>
                    <span className={styles.timeLabel}>dia{timeUntilAnniversary.days !== 1 ? 's' : ''}</span>
                  </div>
                  <div className={styles.timeUnit}>
                    <span className={styles.timeNumber}>{timeUntilAnniversary.hours || 0}</span>
                    <span className={styles.timeLabel}>hora{timeUntilAnniversary.hours !== 1 ? 's' : ''}</span>
                  </div>
                  <div className={styles.timeUnit}>
                    <span className={styles.timeNumber}>{timeUntilAnniversary.minutes || 0}</span>
                    <span className={styles.timeLabel}>min</span>
                  </div>
                  <div className={styles.timeUnit}>
                    <span className={styles.timeNumber}>{timeUntilAnniversary.seconds || 0}</span>
                    <span className={styles.timeLabel}>seg</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mensagem principal */}
        <div className={styles.messageContainer}>
          <div className={`${styles.mainMessage} ${showMessage ? styles.show : ''}`}>
            <h1 className={styles.title}>
              Para Minha PRINCEUSA ❤️
            </h1>
            <p className={styles.subtitle}>
              O meu limite é o céu quando estou com você!<br /> Resumindo lim de f(x) = infinito.
            </p>
            <div className={styles.loveMessage}>
              <p>🏠 Você é minha casinha no topo da árvore</p>
              <p>☁️ Juntos voamos nas nuvens dos nossos sonhos</p>
              <p>💝 Te amo mais que qualquer coisa neste mundo! 💕</p>
              <p className={styles.anniversaryNote}>
                {isAnniversary() ? 
                  "🎊 Hoje é nosso dia especial, minha princeusa!" :
                  timeUntilAnniversary.days === 1 ? 
                  "🎈 Amanhã comemoramos nosso amor!" : 
                  timeUntilAnniversary.days === 0 ? 
                  "🎊 Hoje é nosso aniversário!" : 
                  `🌟 Faltam ${timeUntilAnniversary.days} dias para nossa festa especial!`
                }
              </p>
            </div>
          </div>
        </div>

        {/* Seção musical com player integrado */}
        <div className={styles.snoopyMusicSection}>
          <h3 className={styles.snoopyTitle}>🎵 Nossa Música Especial 🎵</h3>
          <div className={styles.snoopyCard}>
            <div className={styles.snoopyInfo}>
              <p>💕 Como nosso amor dançando no ar</p>
              <p>🎶 Nossa trilha sonora especial está tocando</p>
              <p>💙 Cada nota é como um abraço seu</p>
            </div>
            
            <div className={styles.snoopyDancing}>
              <img
                src="/images/couple/snoopy.png"
                alt="Snoopy Dancing"
                className={styles.dancingSnoopyIcon}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'inline';
                }}
              />
              <span className={styles.dancingSnoopy} style={{ display: 'none' }}>❤️</span>
              <span className={styles.musicNotes}>🎵 🎶 🎵</span>
            </div>

            {/* Player de Música Integrado */}
            <div className={styles.integratedMusicPlayer}>
              <div className={`${styles.integratedPlayerContainer} ${isPlaying ? styles.playing : ''}`}>
                <div className={styles.albumInfo}>
                  <div className={styles.albumCover}>
                    <img 
                      src="/images/couple/snoopy.png" 
                      alt="Album Cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className={styles.albumPlaceholder} style={{ display: 'none' }}>
                      ❤️
                    </div>
                  </div>
                  <div className={styles.songInfo}>
                    <h4 className={styles.songTitle}>Best Part</h4>
                    <p className={styles.artistName}>Daniel Caesar feat. H.E.R</p>
                    <p className={styles.dedicationText}>Nossa música especial ❤️</p>
                  </div>
                </div>

                <div className={styles.playerControls}>
                  <button 
                    className={styles.playButton}
                    onClick={togglePlay}
                  >
                    {isPlaying ? '⏸️' : '▶️'}
                  </button>
                  
                  <div className={styles.progressContainer}>
                    <span className={styles.timeDisplay}>{formatTime(currentTime)}</span>
                    <div 
                      className={styles.progressBar}
                      onClick={handleSeek}
                    >
                      <div 
                        className={styles.progressFill}
                        style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                      />
                    </div>
                    <span className={styles.timeDisplay}>{formatTime(duration)}</span>
                  </div>

                  <div className={styles.volumeContainer}>
                    <span className={styles.volumeIcon}>🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className={styles.volumeSlider}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão para voltar */}
        <div className={styles.backButton}>
          <a href="/" className={styles.backLink}>
            🏠 Voltar ao Portfólio
          </a>
        </div>
      </div>
    </>
  );
};

export default Surprise;

