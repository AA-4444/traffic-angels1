import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import bgVideo from '@/assets/bg1.mp4';

type Lang = 'EN' | 'RU' | 'UA';

const EASE = [0.16, 1, 0.3, 1] as const;

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } }, // было 0.06
};

const wordVariants = {
  hidden: { y: '110%', opacity: 0, filter: 'blur(6px)' },
  visible: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.25, ease: EASE }, // было 0.85
  },
};

function AnimatedLine({ text }: { text: string }) {
  const words = useMemo(() => text.trim().split(/\s+/), [text]);

  return (
    <motion.h1
      className="
        font-display font-bold
        leading-[0.95] tracking-tight
        text-center
        flex flex-wrap justify-center
        hyphens-none
        [word-break:normal]
        [overflow-wrap:normal]
      "
      style={{
        color: 'hsl(var(--volt))',
        fontSize: 'clamp(2.8rem, 9vw, 7rem)', // ✅ твой размер
      }}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-flex overflow-hidden">
          {/* ✅ слово цельное, внутри не переносится */}
          <motion.span variants={wordVariants} className="inline-block whitespace-nowrap">
            {w}
          </motion.span>

          {/* пробел между словами */}
          {i !== words.length - 1 ? (
            <span className="inline-block w-[0.24em]" aria-hidden="true">
              {' '}
            </span>
          ) : null}
        </span>
      ))}
    </motion.h1>
  );
}

export default function Hero3D() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('volt_lang') as Lang) ?? 'EN');

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.7;
  }, []);

  useEffect(() => {
    const onLang = (e: Event) => {
      const ce = e as CustomEvent<{ lang: Lang }>;
      if (ce.detail?.lang) setLang(ce.detail.lang);
    };
    window.addEventListener('volt:lang', onLang as EventListener);
    return () => window.removeEventListener('volt:lang', onLang as EventListener);
  }, []);

  const copy = useMemo(() => {
    const dict: Record<Lang, { lines: string[]; contact: string; start: string }> = {
      EN: {
        // ✅ "PROFITABLE TRAFFIC" вместе
        lines: ['WE DRIVE', 'PROFITABLE TRAFFIC', 'TO GREY MARKETS'],
        contact: 'Contact',
        start: 'Get Started',
      },
      RU: {
        // ✅ русский не меняем
        lines: ['МЫ ПРИВОДИМ ПРИБЫЛЬНЫЙ ТРАФИК', 'В СЕРЫЕ НИШИ'],
        contact: 'Контакты',
        start: 'Начать',
      },
      UA: {
        // ✅ "ТРАФІК У СІРІ НІШІ" вместе
        lines: ['МИ ПРИВОДИМО ПРИБУТКОВИЙ', 'ТРАФІК У СІРІ НІШІ'],
        contact: 'Контакти',
        start: 'Почати',
      },
    };
    return dict[lang];
  }, [lang]);

  const openLead = () => window.dispatchEvent(new CustomEvent('volt:open-lead'));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-20 text-center px-4 sm:px-6 translate-y-6 md:translate-y-10">
        <div className="mx-auto max-w-[1100px] space-y-2">
          {copy.lines.map((line, i) => (
            <AnimatedLine key={`${lang}-${i}`} text={line} />
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
          <a
            href="#contact"
            className="
              h-[56px] sm:h-[72px]
              w-[220px] sm:w-[260px] md:w-[320px]
              inline-flex items-center justify-center
              rounded-[18px] sm:rounded-[20px]
              border-2 border-white/40
              text-white
              font-display font-bold
              text-lg sm:text-xl md:text-2xl
              transition-colors duration-300
              hover:bg-black hover:text-[hsl(var(--volt))]
            "
          >
            {copy.contact}
          </a>

          <button
            type="button"
            onClick={openLead}
            className="
              h-[56px] sm:h-[72px]
              w-[220px] sm:w-[260px] md:w-[320px]
              inline-flex items-center justify-center
              rounded-[18px] sm:rounded-[20px]
              bg-[hsl(var(--volt))]
              text-black
              font-display font-bold
              text-lg sm:text-xl md:text-2xl
              transition-colors duration-300
              hover:bg-black hover:text-[hsl(var(--volt))]
            "
          >
            {copy.start}
          </button>
        </div>
      </div>
    </section>
  );
}