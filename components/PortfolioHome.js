import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import usePageMotion from './usePageMotion';
import styles from '../styles/PortfolioHome.module.css';

const navItems = [
  ['Início', '#inicio'], ['Projeto', '#projetos'], ['Processo', '#processo'],
  ['Sobre', '#sobre'], ['Contato', '#contato'],
];

const projects = [
  {
    number: '02', type: 'Automação · Projeto de cultivo', title: 'Plantio Automático',
    description: 'Um mecanismo compacto para perfurar o solo, dosar sementes e cobri-las em uma passagem. Projeto de automação em desenvolvimento.',
    tags: ['Automação', 'Engenharia', 'Cultivo'], href: '/plantio-automatico', visual: 'plantingVisual', featured: true,
    linkLabel: 'Conhecer projeto',
  },
  {
    number: '03', type: 'Aplicação web · Matemática', title: 'Calculadora de Integrais',
    description: 'Uma ferramenta interativa para explorar integrais definidas e indefinidas, com teclado de funções, exemplos e histórico de cálculos.',
    tags: ['React', 'JavaScript', 'CSS'], href: '/calculator', symbol: '∫', visual: 'calculatorVisual', linkLabel: 'Abrir calculadora',
  },
  {
    number: '04', type: 'Experiência interativa · Front-end', title: 'Página Surpresa',
    description: 'Uma experiência pessoal com animações, fotografias, contadores em tempo real e player de música integrado.',
    tags: ['React', 'Animação CSS', 'Áudio'], href: '/surprise', symbol: '✳', visual: 'surpriseVisual', linkLabel: 'Ver experiência',
  },
];

const skillGroups = [
  ['Modelagem & projeto', 'Fusion 360', 'Montagem CAD', 'Modelagem 3D'],
  ['Desenvolvimento', 'HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'Java', 'C#'],
  ['Ferramentas criativas', 'Figma', 'Premiere Pro', 'After Effects', 'Trello'],
];

export default function PortfolioHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const siteRef = useRef(null);
  const cadRef = useRef(null);
  const videoRef = useRef(null);
  const userPausedVideo = useRef(false);

  usePageMotion(siteRef);

  const moveCad = (event) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const frame = cadRef.current;
    if (!frame) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    frame.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`);
    frame.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`);
  };

  const resetCad = () => {
    const frame = cadRef.current;
    if (!frame) return;
    frame.style.setProperty('--tilt-x', '0deg');
    frame.style.setProperty('--tilt-y', '0deg');
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPausedVideo.current) {
        video.play().catch(() => setVideoPlaying(false));
      } else {
        video.pause();
      }
    }, { threshold: 0.5 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedVideo.current = false;
      video.play().catch(() => setVideoPlaying(false));
    } else {
      userPausedVideo.current = true;
      video.pause();
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('caioyagi@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = 'mailto:caioyagi@gmail.com';
    }
  };

  const handleContact = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Contato pelo portfólio — ${name}`);
    const body = encodeURIComponent(`${message}\n\nEnviado por: ${name}\nE-mail para resposta: ${email}`);
    window.location.href = `mailto:caioyagi@gmail.com?subject=${subject}&body=${body}`;
  };

  return <>
    <Head>
      <title>Caio Hiroki Yagi | Design Automotivo & Modelagem 3D</title>
      <meta name="description" content="Portfólio de Caio Hiroki Yagi com foco em design automotivo, modelagem 3D e projetos de engenharia. Conheça o estudo de pistões e virabrequim em Fusion 360." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#171d1f" />
      <meta property="og:title" content="Caio Hiroki Yagi | Design Automotivo" />
      <meta property="og:description" content="Modelagem 3D, movimento e projetos de engenharia." />
      <meta property="og:image" content="/media/piston-cad.png" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>

    <div ref={siteRef} className={styles.site}>
      <a className={styles.skipLink} href="#conteudo">Pular para o conteúdo</a>
      <div className={styles.scrollProgress} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#inicio" aria-label="Caio Yagi, voltar ao início" onClick={() => setMenuOpen(false)}>
            <span className={styles.brandMark}>CY<span>.</span></span><span className={styles.brandName}>Caio Yagi</span>
          </a>
          <button className={styles.menuToggle} type="button" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="menu-principal" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}><span /><span /></button>
          <nav id="menu-principal" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ''}`} aria-label="Navegação principal">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <a className={styles.headerContact} href="mailto:caioyagi@gmail.com">Entre em contato <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.shell}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}><span className={styles.statusDot} /> Portfólio · design automotivo</p>
                <h1 id="hero-title">Forma, função <em>e movimento.</em></h1>
                <p className={styles.heroDescription}>Sou <strong>Caio Hiroki Yagi</strong>. Exploro o encontro entre design automotivo, modelagem 3D e engenharia para dar forma a ideias que se movem.</p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#projetos">Explorar projeto <span aria-hidden="true">↗</span></a>
                  <a className={styles.textButton} href="#processo">Ver o processo <span aria-hidden="true">↓</span></a>
                </div>
                <div className={styles.heroMeta}><span>Salto, São Paulo · Brasil</span><span className={styles.metaDivider} aria-hidden="true" /><span>Fusion 360 / Engenharia / Design</span></div>
              </div>
              <div className={styles.heroVisual} onPointerMove={moveCad} onPointerLeave={resetCad}>
                <svg className={styles.heroContour} viewBox="0 0 640 610" fill="none" aria-hidden="true"><path d="M58 345C-14 191 116 84 299 88c181 4 309 125 269 276-40 152-224 232-371 166C77 476 13 432 58 345Z" /><path d="M112 326C63 202 161 137 307 139c140 1 235 92 205 208-30 119-174 182-283 135-94-40-145-83-117-156Z" /></svg>
                <div ref={cadRef} className={styles.cadFrame}>
                  <div className={styles.cadFrameTop}><span>CY / 001</span><span>ESTUDO MECÂNICO</span></div>
                  <img src="/media/piston-cad.png" alt="Modelo CAD de quatro pistões, bielas e virabrequim" width="1024" height="1024" fetchPriority="high" className={styles.cadImage} />
                  <div className={styles.cadFrameBottom}><span>PISTÕES + VIRABREQUIM</span><span>FUSION 360</span></div>
                </div>
                <div className={styles.visualBadge}><span>01 /</span> Modelagem 3D<br />em movimento.</div>
                <span className={styles.visualAsterisk} aria-hidden="true">✳</span>
                <span className={styles.handNote} aria-hidden="true">forma nasce do gesto</span>
              </div>
            </div>
            <a className={styles.scrollCue} href="#projetos">Role para explorar <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <div className={styles.motionRibbon} aria-hidden="true"><div className={styles.ribbonTrack}><span>MATÉRIA <b>✳</b> IDEIA <b>✳</b> MOVIMENTO <b>✳</b> OFÍCIO <b>✳</b></span><span>MATÉRIA <b>✳</b> IDEIA <b>✳</b> MOVIMENTO <b>✳</b> OFÍCIO <b>✳</b></span></div></div>

        <section id="projetos" className={`${styles.section} ${styles.aboutSection}`} aria-labelledby="project-title">
          <div className={styles.shell}>
            <div className={styles.sectionLabel}><span>01 / PROJETO EM FOCO</span><span>Modelagem de conjunto mecânico</span></div>
            <div className={styles.aboutGrid} data-reveal>
              <h2 id="project-title" className={styles.displayTitle}>Uma ideia ganha vida quando <em>se move.</em></h2>
              <div className={styles.aboutBody}>
                <p>Este estudo reúne quatro pistões, bielas e virabrequim em uma montagem feita no Fusion 360. O projeto é um exercício de forma, proporção e relação entre componentes mecânicos.</p>
                <p>A visualização em movimento permite observar o conjunto por diferentes ângulos e entender melhor como as peças se conectam. É esse diálogo entre estética e funcionamento que quero explorar no design automotivo.</p>
                <a className={styles.inlineLink} href="mailto:caioyagi@gmail.com?subject=Interesse%20no%20projeto%20CAD">Conversar sobre o projeto <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <div className={styles.projectFacts} data-reveal><span><b>01 / FERRAMENTA</b> Fusion 360</span><span><b>02 / ENTREGA</b> Montagem CAD</span><span><b>03 / LEITURA</b> Forma em movimento</span></div>
            <div className={styles.motionFeature} data-reveal>
              <div className={styles.motionHeading}><span>ESTUDO 001 / FUSION 360</span><span>PISTÕES + VIRABREQUIM</span></div>
              <div className={styles.videoStage}>
                <video ref={videoRef} className={styles.projectVideo} src="/media/piston-motion.mp4" poster="/media/piston-poster.jpg" preload="metadata" muted loop playsInline aria-label="Rotação do modelo CAD com quatro pistões, bielas e virabrequim" onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} />
                <span className={styles.videoCorner} aria-hidden="true">CY / MOTION STUDY</span>
                <button className={styles.videoToggle} type="button" onClick={toggleVideo} aria-label={videoPlaying ? 'Pausar animação do modelo' : 'Reproduzir animação do modelo'} aria-pressed={videoPlaying}>
                  <span aria-hidden="true">{videoPlaying ? 'Ⅱ' : '▶'}</span> {videoPlaying ? 'Pausar' : 'Reproduzir'}
                </button>
              </div>
              <p className={styles.videoCaption}>Visualização do conjunto CAD em rotação. Use o botão para controlar o movimento.</p>
            </div>
            <div className={styles.valueStrip} data-reveal>
              <div><span>01 / GEOMETRIA</span><strong>Quatro pistões</strong><p>Estudo da forma e da proporção dos componentes.</p></div>
              <div><span>02 / CONJUNTO</span><strong>Bielas e virabrequim</strong><p>Peças reunidas em uma montagem mecânica.</p></div>
              <div><span>03 / VISUALIZAÇÃO</span><strong>Projeto em movimento</strong><p>Uma leitura dinâmica do modelo em Fusion 360.</p></div>
            </div>
          </div>
        </section>

        <section id="processo" className={`${styles.section} ${styles.projectsSection}`} aria-labelledby="process-title">
          <div className={styles.shell}>
            <div className={styles.sectionLabel}><span>02 / PROCESSO</span><span>Olhar técnico, pensamento criativo</span></div>
            <div className={styles.sectionHeading} data-reveal><h2 id="process-title" className={styles.displayTitle}>Da forma ao <em>movimento.</em></h2><p>Busco o cuidado do monozukuri no encaixe das peças e a honestidade do wabi-sabi no registro de cada tentativa.</p></div>
            <div className={styles.processGrid}>
              <div data-reveal><span>01 — MODELAR</span><h3>Construir a geometria</h3><p>Investigar volumes, proporções e a identidade de cada componente.</p></div>
              <div data-reveal><span>02 — RELACIONAR</span><h3>Pensar o conjunto</h3><p>Observar como pistões, bielas e virabrequim se organizam em uma montagem.</p></div>
              <div data-reveal><span>03 — COMUNICAR</span><h3>Mostrar o movimento</h3><p>Transformar o modelo em uma apresentação visual fácil de explorar.</p></div>
            </div>
            <div className={styles.digitalHeader} data-reveal><h3>Projetos selecionados</h3><p>Automação, ferramentas digitais e experiências que ampliam minha prática de design.</p></div>
            <div className={styles.projectGrid}>
              {projects.map((project) => <article className={`${styles.projectCard} ${project.featured ? styles.featuredProject : ''}`} key={project.number} data-reveal>
                <a href={project.href} className={`${styles.projectVisual} ${styles[project.visual]}`} aria-label={`Explorar ${project.title}`}>
                  <span className={styles.projectVisualTop}>CY / WORKS <span>{project.number}</span></span>
                  {project.featured ? <span className={styles.plantingMark} aria-hidden="true"><span /><span /><span /></span> : <span className={styles.projectSymbol} aria-hidden="true">{project.symbol}</span>}
                  <span className={styles.projectVisualBottom}>{project.featured ? 'AUTOMAÇÃO & CULTIVO' : 'EXPERIÊNCIA DIGITAL'} <span aria-hidden="true">↗</span></span>
                </a>
                <div className={styles.projectInfo}>
                  <div className={styles.projectNumber}>{project.number} / {project.type}</div>
                  <h3>{project.title}</h3><p>{project.description}</p>
                  <div className={styles.projectTags}>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <a className={styles.inlineLink} href={project.href}>{project.linkLabel} <span aria-hidden="true">↗</span></a>
                </div>
              </article>)}
            </div>
            <a className={styles.allProjects} href="https://github.com/CaioYagi" target="_blank" rel="noopener noreferrer">Ver projetos de código no GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section id="sobre" className={`${styles.section} ${styles.expertiseSection}`} aria-labelledby="expertise-title">
          <div className={styles.shell}>
            <div className={styles.sectionLabel}><span>03 / SOBRE & REPERTÓRIO</span><span>A pessoa por trás do projeto</span></div>
            <div className={styles.expertiseGrid} data-reveal>
              <div><h2 id="expertise-title" className={styles.displayTitle}>Engenharia como base. <em>Design como direção.</em></h2>
                <p className={styles.expertiseIntro}>Sou Caio Hiroki Yagi, de Salto, São Paulo. Minha trajetória reúne formação técnica, Engenharia de Controle e Automação e interesse crescente pelo design automotivo. Gosto de traduzir ideias em modelos que podem ser observados, testados e comunicados com clareza.</p>
                <div className={styles.education}><h3>Formação</h3>
                  <a href="https://slt.ifsp.edu.br/" target="_blank" rel="noopener noreferrer"><span>Engenharia de Controle e Automação</span><small>IFSP · Instituto Federal de São Paulo</small><b aria-hidden="true">↗</b></a>
                  <a href="https://etecitu.cps.sp.gov.br/" target="_blank" rel="noopener noreferrer"><span>Ensino médio técnico</span><small>Etec Martinho Di Ciero</small><b aria-hidden="true">↗</b></a>
                </div>
              </div>
              <div className={styles.skillsPanel}><h3>Ferramentas & repertório</h3>
                {skillGroups.map(([title, ...items]) => <div className={styles.skillGroup} key={title}><h4>{title}</h4><div className={styles.skillTags}>{items.map((item) => <span key={item}>{item}</span>)}</div></div>)}
                <div className={styles.languages}><h4>Idiomas</h4><p>Português <span>Nativo</span></p><p>Japonês <span>Fluente na conversação</span></p><p>Inglês <span>Intermediário</span></p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className={`${styles.section} ${styles.contactSection}`} aria-labelledby="contact-title">
          <div className={styles.shell}>
            <div className={styles.sectionLabel}><span>04 / CONTATO</span><span>O próximo projeto começa aqui</span></div>
            <div className={styles.contactGrid} data-reveal>
              <div className={styles.contactCopy}>
                <h2 id="contact-title" className={styles.displayTitle}>Vamos dar forma à <em>próxima ideia.</em></h2>
                <p>Estou aberto a oportunidades e conversas sobre design automotivo, modelagem 3D, engenharia e experiências digitais. Conte o que você está construindo.</p>
                <a className={styles.contactEmail} href="mailto:caioyagi@gmail.com">caioyagi@gmail.com <span aria-hidden="true">↗</span></a>
                <button className={styles.copyButton} type="button" onClick={copyEmail} aria-live="polite">{copied ? 'E-mail copiado ✓' : 'Copiar endereço de e-mail'}</button>
                <p className={styles.location}>Salto, São Paulo · Brasil</p>
              </div>
              <form className={styles.contactForm} onSubmit={handleContact}>
                <p className={styles.formTitle}>Envie uma mensagem</p>
                <p className={styles.formNote}>Ao enviar, seu aplicativo de e-mail abrirá com a mensagem pronta para você revisar.</p>
                <label htmlFor="contact-name">Seu nome</label><input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Ex.: Ana Silva…" required />
                <label htmlFor="contact-email">Seu e-mail</label><input id="contact-email" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="Ex.: voce@empresa.com…" required />
                <label htmlFor="contact-message">Sua mensagem</label><textarea id="contact-message" name="message" rows="5" placeholder="Fale sobre sua ideia ou oportunidade…" required />
                <button className={styles.primaryButton} type="submit">Preparar e-mail <span aria-hidden="true">↗</span></button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}><div className={styles.shell}>
        <div className={styles.footerTop}><a className={styles.footerBrand} href="#inicio">Caio Yagi<span>.</span></a><p>Forma, função e movimento.<br />Design automotivo & engenharia.</p><a href="#inicio" className={styles.backToTop}>Voltar ao topo ↑</a></div>
        <div className={styles.footerBottom}><span>© {new Date().getFullYear()} Caio Hiroki Yagi</span><div><a href="https://github.com/CaioYagi" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/caio-hiroki-yagi/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="mailto:caioyagi@gmail.com">E-mail ↗</a></div></div>
      </div></footer>
    </div>
  </>;
}
