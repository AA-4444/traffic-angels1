import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import AnimatedText from './AnimatedText';

type Lang = 'EN' | 'RU' | 'UA';

const stepsByLang: Record<
  Lang,
  {
    label: string;
    h2: string;
    steps: readonly { number: string; title: string; description: string }[];
  }
> = {
  EN: {
    label: 'HOW WE WORK',
    h2: 'Our Process',
    steps: [
      { number: '01', title: 'Analytics', description: 'We analyze the niche, offer, traffic sources, and moderation risks.' },
      { number: '02', title: 'Strategy', description: 'We build a traffic strategy with KPIs, funnels, and a scaling logic.' },
      { number: '03', title: 'Creation', description: 'We create creatives, funnels, and the tracking system.' },
      { number: '04', title: 'Launch', description: 'We launch campaigns with precise targeting and constant control.' },
      { number: '05', title: 'Optimization', description: 'We improve performance, cut what doesn’t work, and scale what’s profitable.' },
    ] as const,
  },
  RU: {
    label: 'КАК МЫ РАБОТАЕМ',
    h2: 'Наш процесс',
    steps: [
      { number: '01', title: 'Аналитика', description: 'Изучаем нишу, оффер, источники трафика и риски модерации.' },
      { number: '02', title: 'Стратегия', description: 'Формируем трафик-стратегию с KPI, воронками и логикой масштабирования.' },
      { number: '03', title: 'Создание', description: 'Разрабатываем креативы, воронки и систему трекинга.' },
      { number: '04', title: 'Запуск', description: 'Запускаем кампании с точным таргетингом и постоянным контролем.' },
      { number: '05', title: 'Оптимизация', description: 'Улучшаем показатели, отключаем неэффективное, масштабируем прибыльное.' },
    ] as const,
  },
  UA: {
    label: 'ЯК МИ ПРАЦЮЄМО',
    h2: 'Наш процес',
    steps: [
      { number: '01', title: 'Аналітика', description: 'Вивчаємо нішу, оффер, джерела трафіку та ризики модерації.' },
      { number: '02', title: 'Стратегія', description: 'Формуємо трафік-стратегію з KPI, воронками та логікою масштабування.' },
      { number: '03', title: 'Створення', description: 'Розробляємо креативи, воронки та систему трекінгу.' },
      { number: '04', title: 'Запуск', description: 'Запускаємо кампанії з точним таргетингом і постійним контролем.' },
      { number: '05', title: 'Оптимізація', description: 'Покращуємо показники, вимикаємо неефективне, масштабуємо прибуткове.' },
    ] as const,
  },
};

const themes = [
  { bg: 'bg-volt', text: 'text-black', border: 'border-black/15' },
  { bg: 'bg-white', text: 'text-black', border: 'border-black/10' },
  { bg: 'bg-[#111111]', text: 'text-white', border: 'border-white/10' },
  { bg: 'bg-[#00D1FF]', text: 'text-black', border: 'border-black/15' },
  { bg: 'bg-[#FF4D6D]', text: 'text-black', border: 'border-black/15' },
] as const;

type Step = (typeof stepsByLang)['EN']['steps'][number];
type Theme = (typeof themes)[number];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function CardInner({ i, step, theme, total }: { i: number; step: Step; theme: Theme; total: number }) {
  return (
    <div
      className={[
        'w-full h-full rounded-[34px] md:rounded-[46px] border',
        'shadow-[0_30px_90px_rgba(0,0,0,0.55)]',
        'p-10 md:p-14',
        theme.bg,
        theme.border,
        theme.text,
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div
            className={[
              'w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center',
              theme.text === 'text-white' ? 'bg-white/12' : 'bg-black/10',
            ].join(' ')}
          >
            <span className="font-mono font-bold text-base md:text-lg">{step.number}</span>
          </div>

          <div>
            <div className="font-mono text-xs md:text-sm uppercase tracking-widest opacity-70">Step</div>
            <div className="font-display font-bold text-2xl md:text-4xl leading-tight">{step.title}</div>
          </div>
        </div>

        <div
          className={[
            'hidden md:block w-12 h-12 rounded-2xl',
            theme.text === 'text-white' ? 'bg-white/10' : 'bg-black/10',
          ].join(' ')}
        />
      </div>

      <div className="mt-10 md:mt-12">
        <p
          className={[
            'text-base md:text-lg leading-relaxed',
            theme.text === 'text-white' ? 'text-white/75' : 'text-black/70',
          ].join(' ')}
        >
          {step.description}
        </p>
      </div>

      <div className="mt-10 md:mt-12 flex items-center justify-between">
        <div
          className={[
            'font-mono text-xs uppercase tracking-widest',
            theme.text === 'text-white' ? 'text-white/55' : 'text-black/55',
          ].join(' ')}
        >
          TRAFFIC ANGELS / PROCESS
        </div>
        <div
          className={[
            'font-mono text-xs uppercase tracking-widest',
            theme.text === 'text-white' ? 'text-white/55' : 'text-black/55',
          ].join(' ')}
        >
          {i + 1}/{total}
        </div>
      </div>
    </div>
  );
}


// DESKTOP 
function ProcessCardDesktop({
  i,
  step,
  theme,
  total,
  progressCards,
  stackOffset,
  baseHiddenY,
  enterFrac,
  springCfg,
  cardSize,
}: {
  i: number;
  step: Step;
  theme: Theme;
  total: number;
  progressCards: any;
  stackOffset: number;
  baseHiddenY: number;
  enterFrac: number;
  springCfg: { damping: number; stiffness: number; mass: number };
  cardSize: { width: string; height: string };
}) {
  const slot = 1 / total;
  const start = clamp(i * slot);
  const end = clamp((i + 1) * slot);
  const settle = clamp(start + slot * enterFrac);

  const targetY = i * stackOffset;
  const hiddenY = baseHiddenY + (total - i) * 260;

  const yRaw = useTransform(progressCards, [0, start, settle, end], [hiddenY, hiddenY, targetY, targetY]);
  const y = useSpring(yRaw, springCfg);

  return (
    <motion.div
      className="absolute"
      style={{
        zIndex: 10 + i,
        width: cardSize.width,
        height: cardSize.height,
        y,
        opacity: 1,
        rotate: 0,
        willChange: 'transform',
      }}
    >
      <CardInner i={i} step={step} theme={theme} total={total} />
    </motion.div>
  );
}

function DesktopProcessSection({ lang }: { lang: Lang }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const steps = stepsByLang[lang].steps;
  const total = steps.length;
  const { label, h2 } = stepsByLang[lang];

  const [range, setRange] = useState({ start: 0, endCards: 1 });
  const [sectionPx, setSectionPx] = useState<number>(total * 1000);

  // card size based on current viewport (desktop only)
  const [isMd, setIsMd] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    const onResize = () => setIsMd(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const measure = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;

      const holdBuffer = window.innerHeight * 1.3;
      const scrollLen = total * window.innerHeight * 0.55;
      const tailBuffer = window.innerHeight * 0.8;

      const height = window.innerHeight + scrollLen + holdBuffer + tailBuffer;
      const endCards = top + (height - window.innerHeight);

      setRange({ start: top, endCards });
      setSectionPx(height);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [total]);

  const progressRaw = useTransform(scrollY, [range.start, range.endCards], [0, 1]);
  const progressCards = useTransform(progressRaw, (p) => clamp(p));

  const stackOffset = 24;
  const baseHiddenY = 1800;
  const headerSafeTop = 220;

  const enterFrac = 0.68;
  const springCfg = { damping: 34, stiffness: 95, mass: 1.05 };

  const spacerPx = useMemo(() => Math.max(1, sectionPx - (typeof window !== 'undefined' ? window.innerHeight : 1)), [sectionPx]);
  const stageLift = isMd ? 80 : 180;

  const cardSize = useMemo(
    () => ({
      width: isMd ? 'min(72vmin, 740px)' : '92vmin',
      height: isMd ? 'min(72vmin, 740px)' : '92vmin',
    }),
    [isMd]
  );

  return (
    <section ref={sectionRef} className="relative bg-black" style={{ height: sectionPx }} key={lang}>
      <div className="sticky top-0 z-30 h-[125vh] pointer-events-none relative bg-black overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
          <div className="container mx-auto px-6 pt-20 md:pt-24 text-center">
            <span className="text-volt text-sm font-mono uppercase tracking-widest">{label}</span>
            <AnimatedText
              text={h2}
              className="text-4xl md:text-6xl font-display font-bold mt-4 text-white"
              delay={0.2}
            />
          </div>
        </div>

        {/* Cards */}
        <div
          className="relative h-full flex items-center justify-center pointer-events-none"
          style={{
            paddingTop: headerSafeTop,
            transform: `translateY(-${stageLift}px)`,
          }}
        >
          {steps.map((step, i) => (
            <ProcessCardDesktop
              key={step.number}
              i={i}
              step={step}
              theme={themes[i % themes.length]}
              total={total}
              progressCards={progressCards}
              stackOffset={stackOffset}
              baseHiddenY={baseHiddenY}
              enterFrac={enterFrac}
              springCfg={springCfg}
              cardSize={cardSize}
            />
          ))}
        </div>
      </div>

      <div style={{ height: spacerPx }} />
    </section>
  );
}


// MOBILE 
function MobileProcessSection({ lang }: { lang: Lang }) {
  const steps = stepsByLang[lang].steps;
  const total = steps.length;
  const { label, h2 } = stepsByLang[lang];

  return (
    <section className="relative bg-black py-20" key={lang}>
      {/* Header (обычный, не sticky) */}
      <div className="container mx-auto px-6 text-center">
        <span className="text-volt text-sm font-mono uppercase tracking-widest">{label}</span>
        <AnimatedText
          text={h2}
          className="text-4xl font-display font-bold mt-4 text-white"
          delay={0.2}
        />
      </div>

      {/* Cards column */}
      <div className="container mx-auto px-6 mt-12 space-y-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 60, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ amount: 0.35, once: false }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            className="w-full"
          >
            
            <div className="w-full">
              <div className="w-full h-auto">
                <div className="w-full">
                 
                  <div className="w-full">
                    <div className="w-full min-h-[320px]">
                      <CardInner i={i} step={step} theme={themes[i % themes.length]} total={total} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


const ProcessSection = () => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('volt_lang') as Lang) ?? 'EN');
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 767px)').matches;
  });

  useEffect(() => {
    const onLang = (e: Event) => {
      const ce = e as CustomEvent<{ lang: Lang }>;
      if (ce.detail?.lang) setLang(ce.detail.lang);
    };
    window.addEventListener('volt:lang', onLang as EventListener);
    return () => window.removeEventListener('volt:lang', onLang as EventListener);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    // init
    setIsMobile(mq.matches);

    // subscribe
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  
  if (!isMobile) return <DesktopProcessSection lang={lang} />;

 
  return <MobileProcessSection lang={lang} />;
};

export default ProcessSection;