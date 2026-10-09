import { useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import usePageMotion from '../components/usePageMotion';
import styles from '../styles/MechanicalProject.module.css';

const steps = [
  {
    number: '01', label: 'OBSERVAR', title: 'Começar pelo objeto real.',
    copy: 'Antes da tela, a pergunta: que forma cada componente precisa ter para fazer sentido no conjunto? A fotografia do pistão funciona aqui como referência visual, não como peça do meu modelo.',
    image: '/media/piston-reference.jpg', alt: 'Fotografia de referência de um pistão metálico', source: 'FOTO DE REFERÊNCIA',
  },
  {
    number: '02', label: 'MODELAR', title: 'Transformar volume em CAD.',
    copy: 'No Fusion 360, desenvolvi a geometria dos pistões, bielas e virabrequim. O exercício foi encontrar proporção e clareza para que cada peça pudesse ser lida por si.',
    image: '/media/piston-cad.png', alt: 'Modelo CAD de pistões, bielas e virabrequim criado por Caio', source: 'MODELO AUTORAL',
  },
  {
    number: '03', label: 'MONTAR', title: 'Fazer as partes conversarem.',
    copy: 'Reuni quatro pistões, suas bielas e o virabrequim em uma montagem. O desafio visual passou a ser a relação entre as peças e a leitura do sistema completo.',
    image: '/media/crankshaft-reference.jpg', alt: 'Fotografia de referência de um virabrequim metálico', source: 'FOTO DE REFERÊNCIA',
  },
  {
    number: '04', label: 'MOSTRAR', title: 'Dar uma volta no conjunto.',
    copy: 'A apresentação em vídeo percorre a montagem de vários ângulos. Essa rotação de câmera ajuda a explicar a forma do objeto; não representa a cinemática de um motor em funcionamento.',
    image: '/media/piston-poster.jpg', alt: 'Prévia do vídeo da montagem CAD', source: 'VÍDEO AUTORAL',
  },
];

export default function MechanicalProject() {
  const pageRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  usePageMotion(pageRef);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return <>
    <Head>
      <title>Conjunto mecânico — Pistões e virabrequim | Caio Yagi</title>
      <meta name="description" content="Um estudo pessoal de pistões, bielas e virabrequim em Fusion 360. Veja referências, etapas de criação, montagem CAD e apresentação em vídeo." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0f2024" />
      <meta property="og:title" content="Peça por peça. Um sistema. — Caio Yagi" />
      <meta property="og:description" content="Referência, modelagem e montagem de um conjunto mecânico em Fusion 360." />
      <meta property="og:image" content="/media/crankshaft-reference.jpg" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>

    <div ref={pageRef} className={styles.page}>
      <a className={styles.skip} href="#conteudo">Pular para o conteúdo</a>
      <div className={styles.progress} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.wrap}>
          <Link href="/" className={styles.brand}>caio<span>yagi</span><i>.</i></Link>
          <span className={styles.headerCenter}>CADERNO DE MECÂNICA / 01</span>
          <Link href="/#trabalhos" className={styles.back}>← VOLTAR AOS PROJETOS</Link>
        </div>
      </header>

      <main id="conteudo">
        <section className={styles.hero} aria-labelledby="project-title">
          <Image className={styles.heroPhoto} src="/media/crankshaft-reference.jpg" alt="" fill priority sizes="100vw" />
          <div className={styles.heroShade} aria-hidden="true" />
          <div className={styles.heroLines} aria-hidden="true" />
          <div className={styles.wrap}>
            <div className={styles.heroMeta}><span>ESTUDO PESSOAL / FUSION 360</span><span>04 PISTÕES · 01 VIRABREQUIM</span></div>
            <div className={styles.heroBody}>
              <div className={styles.heroCopy}>
                <span className={styles.signal}><span aria-hidden="true" /> DA CURIOSIDADE AO CONJUNTO</span>
                <h1 id="project-title">PEÇA POR<br /><em>PEÇA.</em><br />UM SISTEMA<span>.</span></h1>
                <p>Um estudo de modelagem e montagem para entender como pistões, bielas e virabrequim se relacionam. Aqui você encontra as referências, o meu CAD e o caminho entre os dois.</p>
                <a href="#trajeto" className={styles.heroLink}>EXPLORAR O PROCESSO <span aria-hidden="true">↘</span></a>
              </div>
              <figure className={styles.heroInset}>
                <div><Image src="/media/piston-reference.jpg" alt="Fotografia de referência de um pistão metálico" fill sizes="(max-width: 700px) 45vw, 24vw" /></div>
                <figcaption><span>01 / PISTÃO</span><span>REFERÊNCIA REAL</span></figcaption>
              </figure>
            </div>
            <div className={styles.heroBottom}><span>MATÉRIA</span><span>GEOMETRIA</span><span>RELAÇÃO</span><span>DESLIZE ↓</span></div>
          </div>
        </section>

        <div className={styles.marquee} aria-hidden="true"><div><span>PISTÃO <b>✳</b> BIELA <b>✳</b> VIRABREQUIM <b>✳</b> FORMA <b>✳</b> SISTEMA <b>✳</b> </span><span>PISTÃO <b>✳</b> BIELA <b>✳</b> VIRABREQUIM <b>✳</b> FORMA <b>✳</b> SISTEMA <b>✳</b> </span></div></div>

        <section className={styles.statement} aria-labelledby="statement-title">
          <div className={styles.wrap}>
            <div className={styles.sectionTop} data-reveal><span>01 / PONTO DE PARTIDA</span><span>O OBJETO ANTES DA TELA</span></div>
            <div className={styles.statementGrid}>
              <div data-reveal><h2 id="statement-title">O detalhe só ganha força quando encontra <em>o conjunto.</em></h2><p>Minha curiosidade começou nas relações: uma peça isolada revela sua forma, mas é na montagem que sua função visual fica mais clara. A referência física ajuda a observar superfícies, proporções e o caráter de cada componente.</p><p className={styles.disclaimer}>As fotografias desta página são referências externas de peças reais. O modelo CAD e o vídeo são do meu estudo pessoal.</p></div>
              <figure className={styles.statementPhoto} data-reveal><Image src="/media/piston-reference.jpg" alt="Detalhe de um pistão metálico usado como referência visual" fill sizes="(max-width: 800px) 90vw, 39vw" /><figcaption>01 / REFERÊNCIA VISUAL: PISTÃO</figcaption></figure>
            </div>
          </div>
        </section>

        <section id="trajeto" className={styles.journey} aria-labelledby="journey-title">
          <div className={styles.wrap}>
            <div className={styles.sectionTop} data-reveal><span>02 / TRAJETO DE CRIAÇÃO</span><span>REFERÊNCIA → MODELO → MONTAGEM → VISUALIZAÇÃO</span></div>
            <div className={styles.journeyHeading} data-reveal><h2 id="journey-title">DO REAL<br />AO <em>DIGITAL.</em></h2><p>Quatro lentes para acompanhar o desenvolvimento deste estudo. Cada etapa muda a pergunta e aproxima as peças de uma leitura completa.</p></div>
            <div className={styles.stepGrid}>
              {steps.map((step) => <article className={styles.stepCard} key={step.number} data-reveal>
                <div className={styles.stepTop}><span>{step.number} / 04</span><span>{step.label}</span></div>
                <div className={styles.stepImage}><Image src={step.image} alt={step.alt} fill sizes="(max-width: 700px) 85vw, 25vw" /><span>{step.source}</span></div>
                <div className={styles.stepBody}><h3>{step.title}</h3><p>{step.copy}</p></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className={styles.model} aria-labelledby="model-title">
          <div className={styles.modelMedia}><Image src="/media/piston-cad.png" alt="Montagem CAD autoral com quatro pistões, bielas e virabrequim" fill sizes="(max-width: 800px) 100vw, 57vw" /><span>VISUALIZAÇÃO CAD / CAIO YAGI</span></div>
          <div className={styles.modelCopy} data-reveal><span className={styles.eyebrow}>03 / O RESULTADO NO FUSION 360</span><h2 id="model-title">QUATRO<br />PISTÕES.<br /><em>UMA LEITURA.</em></h2><p>O resultado é uma montagem que permite observar o conjunto por vários ângulos. A intenção foi construir peças legíveis e mostrar como elas se organizam ao redor do virabrequim.</p><div className={styles.modelFacts}><span>MODELAGEM CAD</span><span>MONTAGEM</span><span>COMUNICAÇÃO VISUAL</span></div></div>
        </section>

        <section className={styles.film} aria-labelledby="film-title">
          <div className={styles.wrap}>
            <div className={styles.sectionTop} data-reveal><span>04 / O CONJUNTO EM TELA</span><span>REPRODUÇÃO MANUAL · SEM ÁUDIO</span></div>
            <div className={styles.filmHeading} data-reveal><h2 id="film-title">A FORMA MUDA<br /><em>COM O ÂNGULO.</em></h2><p>A câmera gira ao redor do modelo para revelar relações que uma imagem estática esconde. Assista e percorra a montagem.</p></div>
            <div className={styles.videoFrame} data-reveal>
              <div className={styles.videoTop}><span>● REC / VISUALIZAÇÃO 001</span><span>FUSION 360 · ESTUDO PESSOAL</span></div>
              <div className={styles.videoStage}>
                <video ref={videoRef} className={styles.video} controls src="/media/piston-motion.mp4" poster="/media/piston-poster.jpg" preload="metadata" playsInline muted loop aria-label="Vídeo da câmera girando ao redor da montagem CAD de pistões e virabrequim" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
                {!playing && <button type="button" className={styles.playButton} onClick={toggleVideo} aria-label="Reproduzir vídeo do estudo CAD"><span aria-hidden="true">▶</span> ASSISTIR À ROTAÇÃO</button>}
              </div>
              <div className={styles.videoBottom}><span>VISUALIZAÇÃO EM ROTAÇÃO / NÃO É SIMULAÇÃO CINEMÁTICA</span><span>01: ESTUDO DE FORMA</span></div>
            </div>
          </div>
        </section>

        <section className={styles.context} aria-labelledby="context-title">
          <div className={styles.wrap}>
            <div className={styles.sectionTop} data-reveal><span>05 / ALÉM DO MODELO</span><span>O OLHAR DE PRODUTO</span></div>
            <div className={styles.contextGrid} data-reveal><h2 id="context-title">TÉCNICA QUE<br />SE TORNA<br /><em>DECISÃO.</em></h2><div><p>Hoje trabalho na <strong>Toyota em Product and Pricing Planning</strong>. Esse contexto amplia minha atenção ao produto, à clareza das escolhas e à maneira como uma ideia é apresentada.</p><p>O conjunto de pistões é um estudo pessoal. Nele, a curiosidade por engenharia e design automotivo vira algo concreto: peças, relações e uma história visual que outra pessoa pode acompanhar.</p><div className={styles.contextBadge}>CAIO HIROKI YAGI <span>↗</span> PRODUCT AND PRICING PLANNING / TOYOTA</div></div></div>
          </div>
        </section>

        <section className={styles.next} aria-labelledby="next-title"><div className={styles.wrap} data-reveal><span>FIM DO ESTUDO / INÍCIO DA CONVERSA</span><h2 id="next-title">O QUE<br />VEM <em>DEPOIS?</em></h2><div><a href="mailto:caioyagi@gmail.com?subject=Conjunto%20mec%C3%A2nico">VAMOS CONVERSAR ↗</a><Link href="/#trabalhos">OUTROS PROJETOS ↗</Link></div></div></section>
      </main>

      <footer className={styles.footer}><div className={styles.wrap}><div className={styles.footerMain}><Link href="/">CAIO YAGI<span>.</span></Link><a href="#conteudo">VOLTAR AO TOPO ↑</a></div><div className={styles.credits}><p>CRÉDITOS DAS FOTOGRAFIAS DE REFERÊNCIA</p><a href="https://commons.wikimedia.org/wiki/File:Crankshaft.jpg" target="_blank" rel="noopener noreferrer">Virabrequim — Alex Kovach ↗</a><a href="https://commons.wikimedia.org/wiki/File:Piston_2.jpg" target="_blank" rel="noopener noreferrer">Pistão — S. Diddy ↗</a><a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">Licença CC BY 2.0 ↗</a><span>Imagens recortadas e ajustadas em cor na composição. CAD e vídeo: Caio Yagi.</span></div></div></footer>
    </div>
  </>;
}
