import Head from 'next/head';
import Link from 'next/link';
import { useRef } from 'react';
import usePageMotion from '../components/usePageMotion';
import styles from '../styles/PlantingProject.module.css';

const phases = [
  { number: '01', title: 'Braço funcional', copy: 'Desenvolver e testar o mecanismo de plantio como primeiro módulo do projeto.' },
  { number: '02', title: 'Base adaptável', copy: 'Estudar um carrinho adequado ao terreno ou um suporte fixo para posicionar o braço.' },
  { number: '03', title: 'Melhoria contínua', copy: 'Revisar a construção a partir dos testes e aproximar o protótipo da proposta inicial.' },
];

const benefits = [
  ['01', 'Produtividade', 'Automatizar tarefas repetitivas pode agilizar a operação.'],
  ['02', 'Uniformidade', 'A dosagem e o ponto de deposição buscam tornar o plantio mais repetível.'],
  ['03', 'Ergonomia', 'Menos intervenção manual pode reduzir o esforço nas etapas repetidas.'],
  ['04', 'Acesso', 'Uma solução compacta busca aproximar a automação de pequenas áreas.'],
];

function MechanismDiagram() {
  return <svg className={styles.diagram} viewBox="0 0 960 520" role="img" aria-labelledby="diagram-title diagram-desc">
    <title id="diagram-title">Diagrama conceitual do mecanismo de plantio</title>
    <desc id="diagram-desc">Um módulo percorre o solo. Na sequência, uma ponta abre o sulco, o dosador libera a semente e uma peça traseira cobre a terra.</desc>
    <defs>
      <pattern id="soil-pattern" width="18" height="12" patternUnits="userSpaceOnUse"><path d="M1 8l3-2M12 3l2 2" stroke="#938777" strokeWidth="1" opacity=".55" /></pattern>
      <linearGradient id="metal" x1="0" x2="1"><stop stopColor="#d6d0c3"/><stop offset=".5" stopColor="#fbf9f2"/><stop offset="1" stopColor="#aaa69c"/></linearGradient>
    </defs>
    <path d="M0 394 Q160 383 270 397 T550 394 T960 397 V520 H0Z" fill="#bbb3a4" />
    <path d="M0 394 Q160 383 270 397 T550 394 T960 397 V520 H0Z" fill="url(#soil-pattern)" />
    <path d="M0 394 Q160 383 270 397 T550 394 T960 397" fill="none" stroke="#827a6e" strokeWidth="3" />
    <g stroke="#e04b52" strokeWidth="2" fill="none" opacity=".75"><path d="M118 82h724"/><path d="M118 76v12m724-12v12"/><path d="M122 103v29m717-29v29" strokeDasharray="3 7"/></g>
    <rect x="180" y="132" width="594" height="48" rx="7" fill="url(#metal)" stroke="#666b68" strokeWidth="3" />
    <rect x="221" y="173" width="77" height="132" rx="5" fill="#393e3c" stroke="#69716d" strokeWidth="3" />
    <path d="M240 304h39l-4 79-16 21-15-21z" fill="url(#metal)" stroke="#555d59" strokeWidth="3" />
    <path d="M256 401l-16 45m20-44 17 44" stroke="#e04b52" strokeWidth="2" strokeDasharray="4 6" />
    <rect x="413" y="180" width="122" height="106" rx="6" fill="#414644" stroke="#6d746f" strokeWidth="3" />
    <path d="M429 191h90l-17 73h-56z" fill="#d4cec0" stroke="#77776f" strokeWidth="2" />
    <circle cx="474" cy="294" r="34" fill="url(#metal)" stroke="#5b625e" strokeWidth="4" />
    <circle cx="474" cy="294" r="15" fill="#e04b52" />
    <path d="M469 328v49" stroke="#747a74" strokeWidth="12" strokeLinecap="round" />
    <circle className={styles.seedOne} cx="474" cy="392" r="5" fill="#edb564" />
    <circle className={styles.seedTwo} cx="474" cy="413" r="5" fill="#edb564" />
    <path d="M645 179v158l48 75 41-13-40-72V179" fill="url(#metal)" stroke="#666b68" strokeWidth="3" />
    <path d="M650 335l68 79" stroke="#e04b52" strokeWidth="3" />
    <path d="M125 267h78m-61-11-18 11 18 11" stroke="#e04b52" strokeWidth="2" fill="none" />
    <g fontFamily="Arial, sans-serif" fill="#252b2a" fontWeight="700" letterSpacing="2" fontSize="15"><text x="208" y="65">DESLOCAMENTO</text><text x="110" y="485">01 / ABRIR</text><text x="398" y="485">02 / DOSAR</text><text x="681" y="485">03 / COBRIR</text></g>
    <g stroke="#e04b52" strokeWidth="2" fill="none"><path d="M253 414v36h-68"/><path d="M476 431v19h-14"/><path d="M700 415v35h24"/></g>
  </svg>;
}

export default function PlantingProject() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);

  return <>
    <Head>
      <title>Plantio Automático | Caio Hiroki Yagi</title>
      <meta name="description" content="Conheça o projeto em desenvolvimento de um mecanismo compacto para perfurar o solo, dosar sementes e cobri-las em um único deslocamento." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#171b1a" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    </Head>
    <div ref={pageRef} className={styles.page}>
      <a className={styles.skip} href="#conteudo">Pular para o conteúdo</a>
      <div className={styles.scrollProgress} aria-hidden="true" />
      <header className={styles.header}>
        <div className={styles.wrap}><Link href="/" className={styles.brand}><span className={styles.wordmark}>Caio Yagi<span>.</span></span><small>Projetos</small></Link><Link href="/#processo" className={styles.back}>← Voltar ao portfólio</Link></div>
      </header>
      <main id="conteudo">
        <section className={styles.hero} aria-labelledby="project-title">
          <div className={styles.wrap}>
            <div className={styles.kicker}><span>PROJETO 002</span><span>CONTROLE & AUTOMAÇÃO</span><span>EM DESENVOLVIMENTO</span></div>
            <div className={styles.heroGrid}>
              <div><p className={styles.overline}>Mecatrônica aplicada ao cultivo</p><h1 id="project-title">Plantio <em>automático.</em></h1><p className={styles.lead}>Um mecanismo compacto pensado para abrir o solo, dosar a semente e cobri-la em uma única passagem.</p><a className={styles.heroLink} href="#mecanismo">Explorar o mecanismo <span aria-hidden="true">↓</span></a></div>
              <div className={styles.heroSide}><svg className={styles.growthLine} viewBox="0 0 220 220" fill="none" aria-hidden="true"><path d="M110 204C108 156 106 110 121 38M113 143C80 137 52 116 42 84c36 1 60 19 71 59ZM116 115c18-31 43-47 75-48-12 32-35 49-75 48ZM120 44c-13-18-14-32-4-43 13 10 15 26 4 43Z" /></svg><p>Pequena escala.<br />Grandes perguntas.</p><span className={styles.sideIndex}>ESTUDO / 002 — AUTOMAÇÃO</span></div>
            </div>
          </div>
        </section>

        <section className={styles.intro} aria-labelledby="context-title"><div className={styles.wrap}>
          <div className={styles.sectionTag}>01 / CONTEXTO</div>
          <div className={styles.introGrid} data-reveal><h2 id="context-title">Pensar a máquina a partir <em>do lugar.</em></h2><div><p>A proposta nasceu da observação de terrenos com pouco espaço e diferentes níveis no Japão, onde equipamentos de grande porte nem sempre se ajustam à área disponível.</p><p>Na apresentação do projeto, essa questão é trazida também ao contexto brasileiro: como tornar a automação mais acessível a pequenas áreas e diferentes realidades de cultivo?</p><div className={styles.smallNote}>Direção de projeto: adaptabilidade, menor complexidade e uso eficiente do espaço.</div></div></div>
        </div></section>

        <section id="mecanismo" className={styles.mechanism} aria-labelledby="mechanism-title"><div className={styles.wrap}>
          <div className={styles.sectionTag}>02 / FUNCIONAMENTO</div><div className={styles.sectionTop} data-reveal><h2 id="mechanism-title">Três ações. <em>Um percurso.</em></h2><p>A proposta atual reúne as etapas essenciais do plantio em um mesmo deslocamento.</p></div>
          <div className={styles.diagramFrame} data-reveal><div className={styles.diagramBar}><span>ESQUEMA CONCEITUAL / NÃO ESTÁ EM ESCALA</span><span>VISTA LATERAL</span></div><MechanismDiagram /></div>
          <div className={styles.steps}><article data-reveal><span>01 / PREPARAR</span><h3>Perfurar</h3><p>Uma ponta abre o espaço no solo para receber a semente.</p></article><article data-reveal><span>02 / DISTRIBUIR</span><h3>Dosar</h3><p>Um dispensador automatizado gira sobre seu eixo para controlar a liberação de sementes.</p></article><article data-reveal><span>03 / FINALIZAR</span><h3>Cobrir</h3><p>O mecanismo traseiro movimenta e reposiciona o solo sobre a semente.</p></article></div>
        </div></section>

        <section className={styles.development} aria-labelledby="development-title"><div className={styles.wrap}>
          <div className={styles.sectionTag}>03 / DESENVOLVIMENTO</div><div className={styles.developmentGrid} data-reveal><div><h2 id="development-title">Construir. Testar. <em>Refinar.</em></h2><p>A ideia inicial prevê um braço preso a uma base superior, com movimento nos eixos X, Y e Z para posicionar o plantio conforme a semente selecionada.</p><p>O primeiro desenho simplificou o veículo para concentrar o estudo no mecanismo. As peças foram modeladas e reunidas em uma montagem inicial. O próximo passo é evoluir a base de posicionamento e testar o conjunto.</p><p className={styles.currentState}><span aria-hidden="true" /> Estado atual: proposta e protótipo em desenvolvimento. Os resultados de campo ainda não foram medidos.</p></div><div className={styles.phaseList}>{phases.map((phase)=><article key={phase.number}><span>{phase.number}</span><div><h3>{phase.title}</h3><p>{phase.copy}</p></div></article>)}</div></div>
        </div></section>

        <section className={styles.impact} aria-labelledby="impact-title"><div className={styles.wrap}>
          <div className={styles.sectionTag}>04 / INTENÇÃO</div><div className={styles.sectionTop} data-reveal><h2 id="impact-title">O que buscamos <em>melhorar.</em></h2><p>Objetivos do projeto, sujeitos à validação quando o protótipo for testado.</p></div><div className={styles.benefitGrid}>{benefits.map(([number,title,copy])=><article key={number} data-reveal><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
        </div></section>

        <section className={styles.next}><div className={styles.wrap}><p>UM PROJETO EM CONSTRUÇÃO</p><h2>O próximo detalhe faz <em>diferença.</em></h2><div><Link href="/#processo">Ver outros projetos ↗</Link><Link href="/#contato">Conversar sobre o projeto ↗</Link></div></div></section>
      </main>
      <footer className={styles.footer}><div className={styles.wrap}><span>© {new Date().getFullYear()} Caio Hiroki Yagi</span><Link href="/">Voltar ao início ↑</Link></div></footer>
    </div>
  </>;
}
