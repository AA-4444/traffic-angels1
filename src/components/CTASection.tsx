import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type Lang = 'EN' | 'RU' | 'UA';

const splitWords = (text: string) => text.trim().split(/\s+/);

const wordsContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.2,
    },
  },
};

const word = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  },
};

const TelegramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M21.8 4.4c.3-1.2-.9-2.1-2-1.7L2.6 9.4c-1.3.5-1.2 2.4.1 2.8l4.7 1.5 1.8 5.7c.4 1.3 2.1 1.7 3 .7l2.7-2.9 4.9 3.6c1.1.8 2.6.2 2.9-1.1L21.8 4.4Zm-3.7 2.9-9.4 8.2c-.3.3-.5.7-.4 1.1l.4 3.3-1.2-3.7c-.1-.4-.4-.7-.8-.8l-3.7-1.2 15.1-6.9Z"
    />
  </svg>
);

const CTASection = () => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('volt_lang') as Lang) ?? 'EN');

  useEffect(() => {
    const onLang = (e: Event) => {
      const ce = e as CustomEvent<{ lang: Lang }>;
      if (ce.detail?.lang) setLang(ce.detail.lang);
    };
    window.addEventListener('volt:lang', onLang as EventListener);
    return () => window.removeEventListener('volt:lang', onLang as EventListener);
  }, []);

  const copy = useMemo(() => {
    const dict: Record<Lang, { kicker: string; h2: string; btn: string }> = {
      EN: {
        kicker: 'Ready to Grow?',
        h2: "Let’s build traffic that doesn’t just bring clicks — it brings profit. Partner with Traffic Angels and scale what actually works.",
        btn: "LET’S CONNECT",
      },
      RU: {
        kicker: 'ГОТОВЫ К РОСТУ?',
        h2: 'Давайте построим трафик, который не просто даёт клики — а приносит прибыль. Traffic Angels выстраивает систему: стратегия, креатив, воронки и масштабирование.',
        btn: 'СВЯЗАТЬСЯ',
      },
      UA: {
        kicker: 'ГОТОВІ ДО ЗРОСТАННЯ?',
        h2: 'Давай побудуємо трафік, який не просто приносить кліки — а дає прибуток. Traffic Angels вибудовує систему: стратегія, креатив, воронки та масштабування.',
        btn: 'ЗВ’ЯЗАТИСЯ',
      },
    };
    return dict[lang];
  }, [lang]);

  const telegramLink = 'https://t.me/traffic_angelss';

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: 'hsl(var(--volt))' }}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            key={`kicker-${lang}`} // ✅ чтобы не “глючил” при переводе
            className="inline-block text-sm font-medium tracking-[0.2em] uppercase mb-6"
            style={{ color: 'hsl(var(--dark))' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }} // ✅ не whileInView, чтобы не пропадал при ре-рендере
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {copy.kicker}
          </motion.span>

          <motion.h2
            key={`cta-${lang}`} // ✅ это главный фикс: язык сменился -> новый h2 без “миганий”
            className="text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-10"
            style={{ color: 'hsl(var(--dark))' }}
            variants={wordsContainer}
            initial="hidden"
            animate="visible" // ✅ вместо whileInView -> не исчезает при смене языка
          >
            {splitWords(copy.h2).map((w, i) => (
              <span key={`${lang}-${i}`} className="inline-block overflow-hidden mr-[0.22em]">
                <motion.span className="inline-block" variants={word}>
                  {w}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 font-semibold rounded-full text-lg transition-all duration-300 inline-flex items-center gap-2"
              style={{ backgroundColor: 'hsl(var(--orange))', color: 'white' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{copy.btn}</span>
              <TelegramIcon className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;