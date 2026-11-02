import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowRight,
  Award,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  Maximize2,
  MessageCircle,
  Minus,
  Pause,
  Play,
  Plus,
  Stethoscope,
  Video,
  X,
} from 'lucide-react';

const whatsappNumber = '523315722352';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const guadalajaraAddress = 'Torre Médica Providencia, Avenida Pablo Neruda 3265, primer piso, consultorio 17. Providencia 4a. Secc., C.P. 44639, Guadalajara, Jalisco.';
const guadalajaraMapsUrl = 'https://maps.app.goo.gl/JKEyRf1FN9g9Q9oMA';
const instagramEmbeds = {
  manga: 'https://www.instagram.com/reel/DXp8zSJDxci/',
  controlPeso: 'https://www.instagram.com/reel/Da6SYUTPa_c/',
  balon: 'https://www.instagram.com/reel/DRf2liRCdfY/',
  eloisa: 'https://www.instagram.com/reel/DcfKq1kPTqj/',
  experienciaBalon: 'https://www.instagram.com/reel/DRf2liRCdfY/',
  experienciaPacientes: 'https://www.instagram.com/reel/DRQCb1Zkt-n/',
} as const;
const changeStories = [
  { src: '/images/image.png', alt: 'Comparación fotográfica de una historia individual de cambio' },
  { src: '/images/image copy.png', alt: 'Comparación fotográfica de una historia individual de cambio' },
  { src: '/images/image copy 2.png', alt: 'Comparación fotográfica de una historia individual de cambio' },
  { src: '/images/image copy 3.png', alt: 'Comparación fotográfica de una historia individual de cambio' },
];
const paymentMessage = 'Hola, me gustaría conocer las opciones de pago, meses sin intereses, financiamiento con Mend y atención mediante aseguradora.';
const officialLogo = '/images/image copy 8.png';
const visualAssets = {
  doctorStory: '/images/image copy 4.png',
  consultation: '/images/image copy 5.png',
  operatingRoom: '/images/image copy 6.png',
  movement: '/images/image copy 7.png',
};
const socialLinks = {
  facebook: 'https://www.facebook.com/share/1EN5nEscEW/?mibextid=wwXIfr',
  instagram: 'https://www.instagram.com/gastrototalgdl/',
};
const journeyItems = [
  ['2016', 'Inmersión Clínica de Cirugía Bariátrica', 'Endometabolic – Star Médica.'],
  ['2017', 'Certificación en Cirugía General', 'Asociación Mexicana de Cirugía General.'],
  ['2018', 'Alta especialidad en Endoscopía Digestiva', 'Universidad Nacional Autónoma de México, UNAM.'],
  ['2019', 'Perfeccionamiento en Cirugía Bariátrica', 'Hospital Montefiore, Nueva York.'],
  ['2020', 'Certificación en Endoscopia', 'Colegio Mexicano de Gastroenterología.'],
  ['2021', 'Certificación en Cirugía Bariátrica', 'Colegio Mexicano de Cirugía para la Obesidad y Enfermedades Metabólicas.'],
] as const;

const treatments = [
  { id: 'manga', category: 'peso', name: 'Manga gástrica', price: '$85,000 MXN', summary: 'Una opción quirúrgica para transformar tu relación con el apetito y las porciones.', description: 'Cirugía que reduce el tamaño del estómago y lo transforma en una estructura tubular. Ayuda a disminuir la cantidad de alimento que puedes consumir y modifica señales relacionadas con el apetito. Requiere valoración y seguimiento médico.' },
  { id: 'bypass', category: 'peso', name: 'Bypass gástrico', price: 'De acuerdo con la valoración médica', summary: 'Una alternativa quirúrgica que combina cambios en la ingesta y señales metabólicas.', description: 'Cirugía que crea un pequeño reservorio en el estómago y modifica el recorrido de los alimentos por una parte del intestino delgado. Produce cambios en la ingesta y en las señales metabólicas que ayudan al control del peso.' },
  { id: 'allurion', category: 'peso', name: 'Balón intragástrico Allurion', price: '$51,000 MXN', summary: 'Balón temporal que ayuda a sentir saciedad sin cirugía.', description: 'Balón temporal que ocupa espacio dentro del estómago y ayuda a sentir saciedad. Se introduce mediante una cápsula que se ingiere bajo supervisión médica. Generalmente no requiere endoscopia ni anestesia para su colocación; la valoración determina si es una opción adecuada.' },
  { id: 'spatz', category: 'peso', name: 'Balón intragástrico SPATZ3', price: '$45,000 MXN', summary: 'Una opción temporal ajustable, colocada mediante endoscopia.', description: 'Balón temporal que se coloca dentro del estómago mediante endoscopia y ayuda a aumentar la sensación de saciedad. Su volumen puede ajustarse durante el tratamiento según la evolución y la valoración médica. Su retiro también requiere endoscopia.' },
  { id: 'endoscopia', category: 'endoscopia', name: 'Endoscopia digestiva alta', price: 'Consultar costo', summary: 'Estudio para observar el esófago, el estómago y el inicio del intestino delgado.', description: 'Estudio que utiliza un tubo delgado y flexible con cámara para observar el esófago, el estómago y el inicio del intestino delgado. Permite investigar síntomas, tomar biopsias y, cuando corresponde, realizar tratamientos.' },
  { id: 'funduplicatura', category: 'digestiva', name: 'Funduplicatura', price: 'Consultar costo', summary: 'Cirugía utilizada en pacientes seleccionados con reflujo gastroesofágico.', description: 'Cirugía utilizada en pacientes seleccionados con reflujo gastroesofágico. Se emplea la parte superior del estómago para reforzar la barrera entre el esófago y el estómago y reducir el regreso de su contenido.' },
  { id: 'colecistectomia', category: 'digestiva', name: 'Colecistectomía', price: 'Consultar costo', summary: 'Cirugía para retirar la vesícula biliar cuando los cálculos provocan síntomas o complicaciones.', description: 'Cirugía para retirar la vesícula biliar, indicada con frecuencia cuando los cálculos provocan síntomas o complicaciones. Puede realizarse mediante pequeñas incisiones por laparoscopia, según la valoración del caso.' },
  { id: 'hernia-inguinal', category: 'digestiva', name: 'Cirugía de hernia inguinal', price: 'Consultar costo', summary: 'Corrección de una debilidad en la pared abdominal de la ingle.', description: 'Cirugía que corrige una abertura o debilidad en la pared abdominal de la ingle, por donde puede sobresalir tejido. Según el caso, puede utilizarse una malla para reforzar la zona.' },
  { id: 'hernia-umbilical', category: 'digestiva', name: 'Cirugía de hernia umbilical', price: 'Consultar costo', summary: 'Reparación de una abertura o debilidad en la pared abdominal a la altura del ombligo.', description: 'Cirugía que repara una abertura o debilidad en la pared abdominal a la altura del ombligo. La técnica y la necesidad de una malla dependen del tamaño de la hernia y de la valoración médica.' },
];

const faqs = [
  ['¿Cómo solicito una valoración?', 'Completa el formulario de contacto y continúa en WhatsApp. Abrir WhatsApp inicia una solicitud; no confirma una cita.'],
  ['¿Cuánto cuesta la consulta?', 'La consulta presencial tiene un costo de $1,000 MXN y la consulta en línea de $800 MXN.'],
  ['¿En qué ciudades atiende el doctor?', 'Hay atención en Guadalajara y presencia en Chiapas: Tuxtla Gutiérrez, San Cristóbal de Las Casas, Tapachula y Ocosingo. Consulta disponibilidad por ciudad.'],
  ['¿Dónde está el consultorio de Guadalajara?', guadalajaraAddress],
  ['¿Cómo conozco la ubicación en Chiapas?', 'Solicita por WhatsApp la ubicación y disponibilidad de atención en la ciudad que te interese.'],
  ['¿Cómo sé qué tratamiento puede ser adecuado para mí?', 'La elección requiere valoración médica. Puedes solicitar orientación por WhatsApp para conocer el siguiente paso.'],
  ['¿Qué incluye cada procedimiento?', 'Consulta las inclusiones y condiciones específicas por WhatsApp antes de tomar una decisión.'],
  ['¿Cuáles son las opciones de pago?', 'Contamos con pago a meses sin intereses con tarjetas participantes y planes de financiamiento a través de Mend. También trabajamos con aseguradoras, sujeto a la cobertura y las condiciones de tu póliza.\n\nEscríbenos para conocer las tarjetas participantes, los plazos disponibles, los requisitos del financiamiento y las opciones aplicables a tu procedimiento.'],
  ['¿Cómo es el seguimiento?', 'Consulta por WhatsApp las condiciones de seguimiento correspondientes a tu atención.'],
];

type InstagramWindow = Window & { instgrm?: { Embeds?: { process: () => void } } };

function InstagramEmbed({ permalink, title }: { permalink: string; title: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    }, { rootMargin: '500px 0px' });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const processEmbeds = () => (window as InstagramWindow).instgrm?.Embeds?.process();
    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]');
    if (existingScript) {
      if ((window as InstagramWindow).instgrm?.Embeds) processEmbeds();
      else existingScript.addEventListener('load', processEmbeds, { once: true });
      return () => existingScript.removeEventListener('load', processEmbeds);
    }
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.addEventListener('load', processEmbeds, { once: true });
    document.body.appendChild(script);
    return () => script.removeEventListener('load', processEmbeds);
  }, [shouldLoad]);

  return <div className="instagram-embed" ref={containerRef} aria-label={title}>{shouldLoad ? <blockquote className="instagram-media" data-instgrm-permalink={permalink} data-instgrm-version="14"><a href={permalink} target="_blank" rel="noopener noreferrer">Ver publicación de Instagram</a></blockquote> : <div className="instagram-loading"><Instagram size={24} /><span>Cargando publicación</span></div>}<a className="instagram-fallback" href={permalink} target="_blank" rel="noopener noreferrer">Ver en Instagram <ExternalLink size={14} /></a></div>;
}

function InstagramCard({ permalink, title }: { permalink: string; title: string }) {
  return <article className="instagram-card"><InstagramEmbed permalink={permalink} title={title} /><h3>{title}</h3></article>;
}

function OfficialLogo({ className = '' }: { className?: string }) {
  return <img className={`official-logo ${className}`} src={officialLogo} alt="Gastro Total" />;
}

function shouldShowWelcome() {
  if (window.location.hash.length > 1) return false;
  try {
    if (window.sessionStorage.getItem('gastro-total-welcome-seen') === 'true') return false;
  } catch {
    return true;
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = timelineRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const move = (direction: number) => setActiveIndex((current) => Math.min(Math.max(current + direction, 0), journeyItems.length - 1));
  const active = journeyItems[activeIndex];

  return <div className={`journey-wrap ${isVisible ? 'is-visible' : ''}`} ref={timelineRef}><div className="journey-controls"><button onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Hito anterior"><ChevronLeft size={18} /></button><span>{activeIndex + 1} / {journeyItems.length}</span><button onClick={() => move(1)} disabled={activeIndex === journeyItems.length - 1} aria-label="Hito siguiente"><ChevronRight size={18} /></button></div><div className="journey-track" role="list" aria-label="Trayectoria profesional">{journeyItems.map(([year, title], index) => <button className={`journey-milestone ${index === activeIndex ? 'selected' : ''}`} key={year} onClick={() => setActiveIndex(index)} role="listitem" aria-current={index === activeIndex}><span>{year}</span><i /></button>)}</div><div className="journey-detail" aria-live="polite"><span className="journey-year">{active[0]}</span><div><h4>{active[1]}</h4><p>{active[2]}</p></div></div></div>;
}

function ChangeStoriesCarousel() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(2);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [modalStory, setModalStory] = useState<typeof changeStories[number] | null>(null);
  const [transitioning, setTransitioning] = useState(true);
  const modalTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(mediaQuery.matches);
    updateMotion();
    mediaQuery.addEventListener('change', updateMotion);
    return () => mediaQuery.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(window.innerWidth < 760 ? 1 : 2);
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    setIndex(0);
    setTransitioning(false);
    const frame = window.requestAnimationFrame(() => setTransitioning(true));
    return () => window.cancelAnimationFrame(frame);
  }, [visibleCount]);

  useEffect(() => {
    if (paused || reducedMotion || modalStory) return;
    const timer = window.setInterval(() => setIndex((current) => current + 1), 6000);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, modalStory]);

  useEffect(() => {
    if (!modalStory) return;
    const trigger = modalTrigger.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setModalStory(null);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      window.setTimeout(() => trigger?.focus(), 0);
    };
  }, [modalStory]);

  const moveManually = (direction: number) => {
    setPaused(true);
    setIndex((current) => direction > 0 ? current + 1 : current === 0 ? changeStories.length - 1 : current - 1);
  };
  const slides = [...changeStories, ...changeStories.slice(0, visibleCount)];
  const offset = `-${(index * 100) / visibleCount}%`;

  return <div className="change-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => undefined} onFocusCapture={() => setPaused(true)}><div className="change-viewport"><div className="change-track" style={{ transform: `translateX(${offset})`, transition: transitioning ? 'transform 600ms ease' : 'none' }} onTransitionEnd={() => { if (index >= changeStories.length) { setTransitioning(false); setIndex(0); } }}>{slides.map((story, storyIndex) => <article className="change-slide" style={{ flex: `0 0 ${100 / visibleCount}%` }} key={`${story.src}-${storyIndex}`}><button className="change-image-button" ref={storyIndex === index ? modalTrigger : undefined} onClick={() => { setPaused(true); setModalStory(story); }} aria-label="Ampliar fotografía de historia individual"><img src={story.src} alt={story.alt} loading={storyIndex < visibleCount ? 'eager' : 'lazy'} /><span><Maximize2 size={16} /> Ampliar</span></button></article>)}</div></div><div className="carousel-controls"><button onClick={() => moveManually(-1)} aria-label="Historia anterior"><ChevronLeft size={19} /></button><div className="carousel-dots" aria-label="Posición del carrusel">{changeStories.map((story, dotIndex) => <button className={index % changeStories.length === dotIndex ? 'active' : ''} key={story.src} onClick={() => { setPaused(true); setIndex(dotIndex); }} aria-label={`Ir a historia ${dotIndex + 1}`} aria-current={index % changeStories.length === dotIndex} />)}</div><button onClick={() => moveManually(1)} aria-label="Historia siguiente"><ChevronRight size={19} /></button><button className="pause-button" onClick={() => setPaused((current) => !current)} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}{paused ? 'Reanudar' : 'Pausar'}</button></div><p className="carousel-note">Las fotografías muestran experiencias individuales. Los resultados varían según cada paciente, el tratamiento y el seguimiento.</p>{modalStory && <div className="photo-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModalStory(null); }}><section className="photo-modal" role="dialog" aria-modal="true" aria-label="Fotografía ampliada"><button className="modal-close" onClick={() => setModalStory(null)} aria-label="Cerrar fotografía"><X size={19} /></button><img src={modalStory.src} alt={modalStory.alt} /></section></div>}</div>;
}

function App() {
  const [welcomeVisible, setWelcomeVisible] = useState(() => shouldShowWelcome());
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('todos');
  const [selectedTreatment, setSelectedTreatment] = useState<typeof treatments[number] | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', modality: 'presencial', city: '', interest: 'Necesito orientación' });
  const dialogTrigger = useRef<HTMLButtonElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const welcomeSkipRef = useRef<HTMLButtonElement | null>(null);

  const finishWelcome = () => {
    try {
      window.sessionStorage.setItem('gastro-total-welcome-seen', 'true');
    } catch {
      // The intro remains skippable even when browser storage is unavailable.
    }
    const shouldRestoreFocus = document.activeElement === welcomeSkipRef.current;
    setWelcomeVisible(false);
    if (shouldRestoreFocus) window.setTimeout(() => mainRef.current?.focus({ preventScroll: true }), 0);
  };

  useEffect(() => {
    if (!welcomeVisible) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finishWelcome();
    };
    document.addEventListener('keydown', handleKeyDown);
    const timer = window.setTimeout(finishWelcome, 1450);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [welcomeVisible]);

  useEffect(() => {
    document.title = 'Gastro Total | Dr. Humberto Cordero';
  }, []);

  useEffect(() => {
    if (!selectedTreatment) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedTreatment(null);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedTreatment]);

  const closeTreatment = () => {
    setSelectedTreatment(null);
    window.setTimeout(() => dialogTrigger.current?.focus(), 0);
  };

  const filteredTreatments = filter === 'todos' ? treatments : treatments.filter((treatment) => treatment.category === filter);
  const consultationPrice = form.modality === 'presencial' ? '$1,000 MXN' : '$800 MXN';
  const interestOptions = ['Necesito orientación', ...treatments.map((treatment) => treatment.name), 'Control de peso', 'Salud digestiva'];

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cityText = form.modality === 'presencial' && form.city ? ` en ${form.city}` : '';
    const message = `Hola, soy ${form.name}. Me interesa una consulta ${form.modality} por ${form.interest}${cityText}. Vi que la consulta cuesta ${consultationPrice}. ¿Podrían compartirme disponibilidad?`;
    window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const openInterest = (interest: string) => {
    setForm((current) => ({ ...current, interest }));
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = (message: string) => {
    window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const openGuadalajaraAvailability = () => openWhatsApp('Hola, me interesa una consulta presencial con el Dr. Humberto Cordero en Guadalajara. ¿Podrían compartirme disponibilidad?');
  const openCityAvailability = (city: string) => openWhatsApp(`Hola, me interesa una consulta presencial con el Dr. Humberto Cordero en ${city}. ¿Podrían compartirme la ubicación y las próximas fechas disponibles?`);
  const openPaymentOptions = () => {
    const treatmentText = form.interest !== 'Necesito orientación' ? ` Me interesa el tratamiento ${form.interest}.` : '';
    openWhatsApp(`${paymentMessage}${treatmentText}`);
  };

  return (
    <div className={`site-shell ${welcomeVisible ? 'welcome-visible' : ''}`}>
      {welcomeVisible && <div className="welcome-screen" role="dialog" aria-modal="true" aria-label="Bienvenida a Gastro Total"><div className="welcome-logo-stage"><div className="welcome-logo-reveal"><OfficialLogo /></div></div><button className="welcome-skip" ref={welcomeSkipRef} onClick={finishWelcome}>Omitir</button></div>}
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header" aria-hidden={welcomeVisible}>
        <div className="nav-wrap">
          <a className="brand" href="#inicio" onClick={() => setMenuOpen(false)} aria-label="Gastro Total, inicio"><OfficialLogo className="logo-header" /></a>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav id="main-navigation" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
            {['Inicio', 'Tratamientos', 'Dr. Cordero', 'Testimonios', 'Sedes', 'Preguntas frecuentes'].map((item) => {
              const ids: Record<string, string> = { Inicio: 'inicio', Tratamientos: 'tratamientos', 'Dr. Cordero': 'doctor', Testimonios: 'testimonios', Sedes: 'sedes', 'Preguntas frecuentes': 'faq' };
              return <a key={item} href={`#${ids[item]}`} onClick={() => setMenuOpen(false)}>{item}</a>;
            })}
            <a className="nav-cta" href="#contacto" onClick={() => setMenuOpen(false)}>Agendar valoración <ArrowRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main id="contenido" ref={mainRef} tabIndex={-1} aria-hidden={welcomeVisible}>
        <section id="inicio" className="hero section-dark">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> Gastro Total · Dr. Humberto Cordero</p>
              <h1>Tu salud merece un <em>plan personalizado.</em></h1>
              <p className="hero-text">Cirugía bariátrica, control de peso y atención digestiva con el Dr. Humberto Cordero.</p>
              <p className="location-line"><span className="pulse-dot" /> Atención en Guadalajara y Chiapas.</p>
              <div className="hero-actions"><a className="button button-primary" href="#contacto">Agendar valoración <ArrowRight size={18} /></a><a className="button button-ghost" href="#tratamientos">Explorar tratamientos <ChevronRight size={18} /></a></div>
              <div className="hero-proof"><Award size={19} /><span>Más de 10 años de experiencia</span></div>
            </div>
            <div className="hero-visual" aria-label="Fotografía del Dr. Humberto Cordero">
              <div className="image-orbit orbit-one" /><div className="image-orbit orbit-two" />
              <div className="doctor-image-wrap"><img src="/images/Doctor_sentado,_recorte_fotográfico.png" alt="Dr. Humberto Cordero con traje oscuro" /></div>
              <div className="floating-note"><CircleCheck size={18} /><span><b>Acompañamiento</b><small>en cada etapa</small></span></div>
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Experiencia en cifras"><div className="container stats-grid">{[['Más de 10 años', 'de experiencia'], ['Más de 1,300', 'cirugías generales'], ['Más de 3,500', 'endoscopias digestivas'], ['Más de 2,000', 'cirugías bariátricas']].map(([value, label]) => <div className="stat" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

        <section className="section section-light needs-section"><div className="container"><div className="needs-intro"><div className="section-heading"><p className="eyebrow eyebrow-dark">Tu punto de partida</p><h2>¿Cómo podemos <em>ayudarte?</em></h2><p>Elige una ruta para comenzar tu valoración.</p></div><div className="needs-image"><img src={visualAssets.movement} alt="Mujer haciendo ejercicio como imagen ilustrativa de control de peso" loading="lazy" /></div></div><div className="needs-grid">{[['Quiero bajar de peso', 'Acompañamiento médico para explorar opciones de control de peso.', 'Control de peso'], ['Quiero conocer la cirugía bariátrica', 'Conoce tus alternativas y resuelve tus dudas en valoración.', 'Cirugía bariátrica'], ['Busco atención para mi salud digestiva', 'Estudios y procedimientos para comprender mejor tu salud digestiva.', 'Salud digestiva']].map(([title, text, interest], index) => <button className="need-card" key={title} onClick={() => openInterest(interest)}><span className="need-number">0{index + 1}</span><span><b>{title}</b><small>{text}</small></span><ArrowRight size={20} /></button>)}<button className="orientation-card" onClick={() => openInterest('Necesito orientación')}><MessageCircle size={23} /><span><b>No sé qué atención necesito</b><small>Te orientamos por WhatsApp.</small></span><ArrowRight size={20} /></button></div></div></section>

        <section id="tratamientos" className="section section-dark treatments-section"><div className="container"><div className="treatment-heading"><div className="section-heading heading-light"><p className="eyebrow">Atención médica personalizada</p><h2>Conoce tus <em>opciones de atención.</em></h2><p>La elección del tratamiento requiere valoración médica.</p></div><div className="treatment-context"><img src={visualAssets.operatingRoom} alt="Equipo médico trabajando en quirófano" loading="lazy" /></div></div><div className="filter-bar" role="group" aria-label="Filtrar tratamientos">{[['todos', 'Todos'], ['peso', 'Cirugía bariátrica y control de peso'], ['endoscopia', 'Endoscopia digestiva'], ['digestiva', 'Cirugía digestiva y hernias']].map(([value, label]) => <button key={value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)} aria-pressed={filter === value}>{label}</button>)}</div><div className="treatments-grid">{filteredTreatments.map((treatment) => <article className="treatment-card" key={treatment.id}><div className="card-top"><span className="category-label">{treatment.category === 'peso' ? 'Peso y metabolismo' : treatment.category === 'endoscopia' ? 'Endoscopia' : 'Cirugía digestiva'}</span><span className="treatment-icon"><Stethoscope size={18} /></span></div><h3>{treatment.name}</h3><p>{treatment.summary}</p><strong className="price">{treatment.price}</strong><div className="card-actions"><button className="text-button" ref={selectedTreatment?.id === treatment.id ? dialogTrigger : undefined} onClick={(event) => { dialogTrigger.current = event.currentTarget; setSelectedTreatment(treatment); }}>Conocer el procedimiento <ChevronRight size={16} /></button><button className="button button-primary button-small" onClick={() => openInterest(treatment.name)}>Solicitar valoración</button></div></article>)}</div><p className="disclaimer"><span>i</span> La elección del tratamiento requiere valoración médica. Consulta disponibilidad por sede, inclusiones y condiciones del precio.</p></div></section>

        <section id="doctor" className="section profile-section"><div className="container profile-grid"><div className="profile-photo profile-context-photo"><img src={visualAssets.doctorStory} alt="Dr. Humberto Cordero en quirófano con el mensaje La confianza se construye con cada logro" loading="lazy" /><div className="profile-badge"><b>10+</b><span>años de experiencia</span></div></div><div className="profile-copy"><p className="eyebrow">Trayectoria profesional</p><h2>Conoce al Dr. <em>Humberto Cordero.</em></h2><p className="lead">Más de 10 años de experiencia en la atención quirúrgica y digestiva.</p><p>Formación en cirugía general, endoscopia digestiva y cirugía bariátrica.</p><div className="credentials"><span>Cédula profesional <b>6824393</b></span><span>Cédula de especialidad <b>10901245</b></span></div><div className="profile-socials"><a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visitar Instagram de Gastro Total"><Instagram size={18} /> Instagram</a><a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visitar Facebook de Gastro Total"><Facebook size={18} /> Facebook</a></div><JourneyTimeline /></div></div></section>

        <section className="section section-dark video-section"><div className="container"><div className="section-heading heading-light"><p className="eyebrow">Información clara para decidir</p><h2>El doctor te <em>explica.</em></h2><p>Contenido educativo para acompañarte antes de tu valoración.</p></div><div className="instagram-grid"><InstagramCard permalink={instagramEmbeds.manga} title="Conoce la manga gástrica" /><InstagramCard permalink={instagramEmbeds.controlPeso} title="Opciones para el control de peso sin cirugía" /><InstagramCard permalink={instagramEmbeds.balon} title="Colocación de balón intragástrico" /></div><a className="button button-primary section-cta" href="#contacto">Solicitar mi valoración <ArrowRight size={17} /></a></div></section>

        <section id="testimonios" className="section testimonials-section"><div className="container"><div className="section-heading"><p className="eyebrow eyebrow-dark">Historias por compartir</p><h2>Experiencias de nuestros <em>pacientes.</em></h2><p>Testimonios compartidos mediante publicaciones oficiales de Instagram.</p></div><div className="instagram-grid testimonial-instagram-grid"><InstagramCard permalink={instagramEmbeds.eloisa} title="Una experiencia contada por nuestra paciente Eloisa" /><InstagramCard permalink={instagramEmbeds.experienciaBalon} title="Experiencia con balón intragástrico" /><InstagramCard permalink={instagramEmbeds.experienciaPacientes} title="Otra experiencia de nuestros pacientes" /></div><div className="testimonial-actions"><a className="button button-primary" href="#contacto">Solicitar mi valoración <ArrowRight size={17} /></a></div><div className="container individual-note">Testimonios individuales. Los resultados pueden variar</div><h3 className="change-stories-title">Historias de cambio de nuestros pacientes</h3><ChangeStoriesCarousel /></div></section>

        <section className="section consult-section"><div className="container"><div className="section-heading heading-light"><p className="eyebrow">Elige cómo comenzar</p><h2>Agenda tu <em>valoración.</em></h2><p>Solicita disponibilidad en tu ciudad o recibe indicaciones para tu cita.</p></div><div className="consult-layout"><div className="consult-visual"><img src={visualAssets.consultation} alt="El Dr. Humberto Cordero atendiendo a una paciente" loading="lazy" /></div><div className="consult-grid">{[['Consulta presencial', '$1,000 MXN', 'Solicita disponibilidad en tu ciudad.', 'presencial'], ['Consulta en línea', '$800 MXN', 'Consulta disponibilidad y recibe las indicaciones para tu cita.', 'en línea']].map(([title, price, text, modality]) => <article className="consult-card" key={title}><span className="consult-icon">{modality === 'presencial' ? <Stethoscope size={21} /> : <Video size={21} />}</span><h3>{title}</h3><strong>{price}</strong><p>{text}</p><button className="button button-primary" onClick={() => { setForm((current) => ({ ...current, modality })); document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' }); }}>Agendar {modality === 'presencial' ? 'consulta presencial' : 'consulta en línea'} <ArrowRight size={17} /></button></article>)}</div></div></div></section>

        <section id="sedes" className="section section-light locations-section"><div className="container"><div className="split-heading"><div><p className="eyebrow eyebrow-dark">Presencia y disponibilidad</p><h2>Encuéntranos <em>cerca de ti.</em></h2></div><p>Solicita por WhatsApp la ubicación y disponibilidad de atención en tu ciudad.</p></div><div className="locations-grid"><article className="location-card location-main"><span className="location-tag">Sede con dirección confirmada</span><h3>Guadalajara</h3><p>{guadalajaraAddress}</p><div><button className="button button-primary button-small" onClick={openGuadalajaraAvailability}>Consultar disponibilidad <ArrowRight size={16} /></button><a className="map-link" href={guadalajaraMapsUrl} target="_blank" rel="noopener noreferrer">Ver en Google Maps <ExternalLink size={15} /></a></div></article><article className="chiapas-card"><span className="location-tag">También estamos presentes en</span><h3>Chiapas</h3><div className="city-list">{['Tuxtla Gutiérrez', 'San Cristóbal de Las Casas', 'Tapachula', 'Ocosingo'].map((city) => <button key={city} onClick={() => openCityAvailability(city)}><span>{city}</span><small>Consultar sede y disponibilidad</small><ArrowRight size={17} /></button>)}</div><p>Solicita por WhatsApp la ubicación y disponibilidad de atención en tu ciudad.</p></article></div></div></section>

        <section id="faq" className="section faq-section"><div className="container faq-grid"><div className="faq-intro"><p className="eyebrow">Resolvemos tus dudas</p><h2>Preguntas <em>frecuentes.</em></h2><p>Si no encuentras lo que buscas, podemos orientarte por WhatsApp.</p><a className="button button-primary" href="#contacto">Hablar por WhatsApp <ArrowRight size={17} /></a></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}><span>{question}</span>{openFaq === index ? <Minus size={18} /> : <Plus size={18} />}</button>{openFaq === index && <div className="faq-answer"><p>{answer}</p>{question === '¿Cuáles son las opciones de pago?' && <button className="text-button" onClick={openPaymentOptions}>Consultar opciones de pago <ArrowRight size={16} /></button>}</div>}</div>)}</div></div></section>

        <section id="contacto" className="section contact-section"><div className="container contact-grid"><div className="contact-intro"><p className="eyebrow">WhatsApp · +52 33 1572 2352</p><h2>Da el primer paso hacia una <em>atención personalizada.</em></h2><p>Cuéntanos cómo podemos orientarte. No solicitamos datos clínicos sensibles y no guardamos tu información en esta versión.</p><div className="contact-details"><a href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={19} /> +52 33 1572 2352</a><span><Stethoscope size={19} /> Guadalajara · Chiapas</span></div></div><form className="contact-form" onSubmit={submitForm}><div className="form-row"><label>Nombre<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="¿Cómo te llamas?" /></label><label>Modalidad<select value={form.modality} onChange={(event) => setForm({ ...form, modality: event.target.value })}><option value="presencial">Presencial</option><option value="en línea">En línea</option></select></label></div><div className="form-row"><label>Ciudad {form.modality === 'presencial' && <span className="required-note">(obligatoria)</span>}<select required={form.modality === 'presencial'} value={form.city} onChange={(event) => setForm({ ...form, city: event.target.value })}><option value="">Selecciona una ciudad</option><option>Guadalajara</option><option>Tuxtla Gutiérrez</option><option>San Cristóbal de Las Casas</option><option>Tapachula</option><option>Ocosingo</option></select></label><label>Tratamiento o área de interés<select value={form.interest} onChange={(event) => setForm({ ...form, interest: event.target.value })}>{interestOptions.map((option) => <option key={option}>{option}</option>)}</select></label></div><div className="form-price"><span>Costo de consulta</span><strong>{consultationPrice}</strong></div><p className="form-note">Al continuar, se abrirá WhatsApp con los datos que ingresaste. Podrás editar el mensaje antes de enviarlo.</p><button className="button button-primary button-wide" type="submit">Continuar en WhatsApp <ArrowRight size={18} /></button></form></div></section>
      </main>

      <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#inicio" aria-label="Gastro Total, inicio"><OfficialLogo className="logo-footer" /></a><p>Cirugía bariátrica, control de peso y salud digestiva.</p><div className="socials"><a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visitar Instagram de Gastro Total"><Instagram size={18} /></a><a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visitar Facebook de Gastro Total"><Facebook size={18} /></a></div></div><div><h4>Navegación</h4><a href="#tratamientos">Tratamientos</a><a href="#doctor">Dr. Cordero</a><a href="#sedes">Sedes</a><a href="#faq">Preguntas frecuentes</a></div><div><h4>Contacto</h4><a href={whatsappUrl}>WhatsApp · +52 33 1572 2352</a><span>{guadalajaraAddress}</span><span>Chiapas: Tuxtla Gutiérrez · San Cristóbal · Tapachula · Ocosingo</span></div><div><h4>Información</h4><span>Cédula profesional: 6824393</span><span>Cédula de especialidad: 10901245</span><strong className="cofepris">Aviso COFEPRIS: 2614102002A01082</strong><span>Aviso de privacidad pendiente</span></div></div><div className="container footer-bottom"><span>© Gastro Total — Dr. Humberto Cordero</span><span>Atención médica sujeta a valoración.</span></div></footer>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Abrir WhatsApp de Gastro Total"><MessageCircle size={24} /></a>

      {selectedTreatment && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeTreatment(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={closeTreatment} aria-label="Cerrar procedimiento"><X size={19} /></button><span className="category-label">Información del procedimiento</span><h2 id="modal-title">{selectedTreatment.name}</h2><p>{selectedTreatment.description}</p><div className="modal-price"><span>Precio o referencia</span><strong>{selectedTreatment.price}</strong></div><button className="button button-primary button-wide" onClick={() => { closeTreatment(); openInterest(selectedTreatment.name); }}>Solicitar valoración <ArrowRight size={17} /></button></section></div>}
    </div>
  );
}

export default App;
