import { useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import usePageMotion from './usePageMotion';
import styles from '../styles/PortfolioHome.module.css';

const work = [
  { number: '01', type: 'Automação · Produto', title: 'Plantio automático', description: 'Uma ideia para unir preparo do solo, dosagem de sementes e cobertura em um único mecanismo.', href: '/plantio-automatico', link: 'Ver projeto' },
  { number: '02', type: 'Desenvolvimento · Interface', title: 'Calculadora de integrais', description: 'Uma ferramenta web para explorar cálculos com uma interface que procura tornar a matemática mais acessível.', href: '/calculator', link: 'Usar ferramenta' },
  { number: '03', type: 'Modelagem · Estudo', title: 'Conjunto mecânico', description: 'Um estudo em Fusion 360 sobre forma, montagem e movimento de pistões, bielas e virabrequim.', href: '/conjunto-mecanico', link: 'Ver processo' },
  { number: '04', type: 'Experiência pessoal · Front-end', title: 'Página Surpresa', description: 'Uma experiência interativa e afetiva que reúne fotografias, animação e música. O restante é melhor descobrir ao abrir.', href: '/surprise', link: 'Abrir surpresa' },
];

const photos = [
  { src: '/images/photo1.jpeg', alt: 'Casas tradicionais cercadas por montanhas e vegetação no Japão', label: '01 / PAISAGEM', note: 'Pausa, escala, matéria.' },
  { src: '/images/photo2.jpeg', alt: 'Telhados japoneses sob céu nublado e montanhas ao fundo', label: '02 / COTIDIANO', note: 'O detalhe que passa despercebido.' },
  { src: '/images/photo3.jpeg', alt: 'Tokyo Skytree vista entre prédios sob céu azul', label: '03 / CIDADE', note: 'Estrutura, ritmo, perspectiva.' },
];

export default function PortfolioHome() {
  const siteRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  usePageMotion(siteRef);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('caioyagi@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = 'mailto:caioyagi@gmail.com';
    }
  };

  return <>
    <Head>
      <title>Caio Hiroki Yagi — Engenharia, design e experiências digitais</title>
      <meta name="description" content="Conheça Caio Hiroki Yagi: projetos de automação, desenvolvimento e modelagem, com um olhar pessoal formado entre engenharia, design e cultura japonesa." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#f4f0e8" />
      <meta property="og:title" content="Caio Hiroki Yagi — Portfólio" />
      <meta property="og:description" content="Engenharia, design e experiências digitais com atenção à forma e ao uso." />
      <meta property="og:image" content="/images/photo1.jpeg" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>

    <div ref={siteRef} className={styles.site}>
      <a className={styles.skipLink} href="#conteudo">Pular para o conteúdo</a>
      <div className={styles.progress} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.wrap}>
          <a href="#inicio" className={styles.wordmark} onClick={() => setMenuOpen(false)} aria-label="Caio Yagi, voltar ao início">caio<span>yagi</span><i>.</i></a>
          <button type="button" className={styles.menuButton} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-controls="menu-principal" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Fechar' : 'Menu'}<span aria-hidden="true">{menuOpen ? '×' : '+'}</span></button>
          <nav id="menu-principal" className={styles.nav + (menuOpen ? ' ' + styles.navOpen : '')} aria-label="Navegação principal">
            <a href="#trabalhos" onClick={() => setMenuOpen(false)}>Trabalhos</a>
            <a href="#olhar" onClick={() => setMenuOpen(false)}>Olhar</a>
            <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato <span aria-hidden="true">↗</span></a>
          </nav>
        </div>
      </header>

      <main id="conteudo">
        <section id="inicio" className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.wrap + ' ' + styles.heroGrid}>
            <div className={styles.heroText}>
              <p className={styles.kicker}><span className={styles.statusDot} /> PORTFÓLIO / CAIO HIROKI YAGI</p>
              <h1 id="hero-title">Criar é<br /><em>prestar atenção.</em></h1>
              <p className={styles.heroLead}>Sou estudante de Engenharia de Controle e Automação. Gosto de pensar como objetos, sistemas e interfaces podem funcionar melhor — e de dar forma às ideias.</p>
              <div className={styles.heroActions}>
                <a className={styles.roundLink} href="#trabalhos"><span aria-hidden="true">↘</span><span className={styles.srOnly}>Ver trabalhos</span></a>
                <span>Explore meus trabalhos<br />e conheça meu olhar.</span>
              </div>
              <div className={styles.heroFoot}><span>Salto, São Paulo</span><span>Engenharia · Design · Tecnologia</span></div>
            </div>
            <figure className={styles.heroPhoto}>
              <Image src="/images/photo1.jpeg" alt="Casas tradicionais e montanhas verdes fotografadas por Caio no Japão" fill priority sizes="(max-width: 800px) 100vw, 46vw" />
              <figcaption><span>Um olhar em movimento</span><span>Japão / arquivo pessoal</span></figcaption>
            </figure>
          </div>
          <div className={styles.heroBottom} aria-hidden="true"><span>DESLIZE PARA EXPLORAR</span><span>↓</span></div>
        </section>

        <section id="trabalhos" className={styles.workSection} aria-labelledby="work-title">
          <div className={styles.wrap}>
            <div className={styles.sectionTop} data-reveal><span className={styles.index}>01 / TRABALHOS</span><p>Algumas maneiras de transformar curiosidade em projeto.</p></div>
            <div className={styles.workHeading} data-reveal><h2 id="work-title">Projetos<br /><em>em construção.</em></h2><p>Da ideia ao protótipo, cada trabalho parte de uma pergunta diferente. Aqui estão os que melhor mostram como penso e construo.</p></div>
            <div className={styles.workList}>
              {work.map((item) => <Link href={item.href} className={styles.workRow} key={item.number} data-reveal>
                <span className={styles.workNumber}>{item.number}</span>
                <div className={styles.workMain}><span className={styles.workType}>{item.type}</span><h3>{item.title}</h3><p>{item.description}</p></div>
                <span className={styles.workAction}>{item.link} <b aria-hidden="true">↗</b></span>
              </Link>)}
            </div>
            <Link href="/conjunto-mecanico" className={styles.cadNote} data-reveal>
              <div><span className={styles.index}>UM ESTUDO DE MOVIMENTO</span><p>Da geometria à montagem: veja o processo completo de criação do conjunto de pistões e virabrequim. <strong>Entrar no projeto ↗</strong></p></div>
              <img src="/media/piston-poster.jpg" alt="Prévia do estudo CAD de pistões e virabrequim" width="520" height="292" loading="lazy" />
            </Link>
            <a className={styles.githubLink} href="https://github.com/CaioYagi" target="_blank" rel="noopener noreferrer">Mais experimentos e código no GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </section>

        <section id="olhar" className={styles.photoSection} aria-labelledby="look-title">
          <div className={styles.wrap}>
            <div className={styles.sectionTop} data-reveal><span className={styles.index}>02 / OLHAR</span><p>Fotografias que fiz no Japão.</p></div>
            <div className={styles.lookIntro} data-reveal><h2 id="look-title">Um pouco do que<br /><em>me faz observar.</em></h2><p>Gosto de perceber o encontro entre natureza, cidade e construção. Essas imagens são parte do meu repertório pessoal e do modo como presto atenção ao mundo.</p></div>
          </div>
          <div className={styles.photoRail} aria-label="Três fotografias feitas por Caio no Japão">
            {photos.map((photo) => <figure className={styles.photoCard} key={photo.src} data-reveal><div className={styles.photoImage}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 78vw, 31vw" /></div><figcaption><span>{photo.label}</span><span>{photo.note}</span></figcaption></figure>)}
          </div>
        </section>

        <section id="sobre" className={styles.aboutSection} aria-labelledby="about-title">
          <div className={styles.wrap + ' ' + styles.aboutGrid}>
            <div className={styles.aboutHeading} data-reveal><span className={styles.index}>03 / SOBRE MIM</span><h2 id="about-title">Técnica,<br /><em>curiosidade</em><br />e presença.</h2></div>
            <div className={styles.aboutContent} data-reveal>
              <p className={styles.aboutLead}>Sou Caio Hiroki Yagi. Estudo Engenharia de Controle e Automação no IFSP e trabalho na Toyota em Product and Pricing Planning. Exploro o encontro entre engenharia, design e desenvolvimento digital.</p>
              <p>Tenho interesse em design automotivo e em projetos que pedem tanto raciocínio técnico quanto sensibilidade para o uso. Também carrego a influência da cultura japonesa no meu modo de observar detalhes, materiais e processos.</p>
              <div className={styles.aboutColumns}>
                <div><h3>O que pratico</h3><ul><li>Modelagem e montagem CAD</li><li>Automação e prototipagem</li><li>Interfaces web com React</li><li>Comunicação visual</li></ul></div>
                <div><h3>Ferramentas</h3><ul><li>Fusion 360</li><li>JavaScript, HTML e CSS</li><li>Figma</li><li>Premiere Pro e After Effects</li></ul></div>
              </div>
              <div className={styles.aboutMeta}><div><span>ATUAÇÃO</span><strong>Product and Pricing Planning</strong><small>Toyota</small></div><div><span>FORMAÇÃO</span><strong>Engenharia de Controle e Automação</strong><small>IFSP · Instituto Federal de São Paulo</small></div><div><span>IDIOMAS</span><strong>Português · Japonês · Inglês</strong><small>Nativo · Conversação fluente · Intermediário</small></div></div>
            </div>
          </div>
        </section>

        <section id="contato" className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.wrap} data-reveal>
            <span className={styles.index}>04 / CONTATO</span>
            <h2 id="contact-title">Vamos criar<br /><em>alguma coisa?</em></h2>
            <p>Estou aberto a oportunidades em engenharia, automação, design e desenvolvimento. Se meu trabalho despertou alguma ideia, vamos conversar.</p>
            <a className={styles.emailLink} href="mailto:caioyagi@gmail.com">caioyagi@gmail.com <span aria-hidden="true">↗</span></a>
            <button type="button" className={styles.copyButton} onClick={copyEmail} aria-live="polite">{copied ? 'E-mail copiado ✓' : 'Copiar e-mail'}</button>
          </div>
        </section>
      </main>

      <footer className={styles.footer}><div className={styles.wrap}><div className={styles.footerTop}><a className={styles.footerName} href="#inicio">Caio Yagi<span>.</span></a><p>Feito com atenção aos detalhes.</p><a href="#inicio">Voltar ao topo ↑</a></div><div className={styles.footerBottom}><span>© {new Date().getFullYear()} Caio Hiroki Yagi</span><div><a href="https://www.linkedin.com/in/caio-hiroki-yagi/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="https://github.com/CaioYagi" target="_blank" rel="noopener noreferrer">GitHub ↗</a><Link href="/surprise">Um experimento pessoal ↗</Link></div></div></div></footer>
    </div>
  </>;
}
