import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import MagneticButton from './MagneticButton';

type Lang = 'EN' | 'RU' | 'UA';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
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

const Footer = () => {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('volt_lang') as Lang) ?? 'EN');

  useEffect(() => {
    const onLang = (e: Event) => {
      const ce = e as CustomEvent<{ lang: Lang }>;
      if (ce.detail?.lang) setLang(ce.detail.lang);
    };
    window.addEventListener('volt:lang', onLang as EventListener);
    return () => window.removeEventListener('volt:lang', onLang as EventListener);
  }, []);

  // ✅ один источник правды
  const telegramLink = 'https://t.me/traffic_angelss';

  const copy = useMemo(() => {
    const dict: Record<
      Lang,
      {
        ctaKicker: string;
        ctaH2Top: string;
        ctaH2Bottom: string;
        ctaBtn: string;

        navTitle: string;
        connectTitle: string;
        contactTitle: string;

        nav: { label: string; href: string }[];
        connect: { label: string; href: string }[];

        rights: string;
        tagline: string;
      }
    > = {
      EN: {
        ctaKicker: 'Ready to grow?',
        ctaH2Top: "Let’s build traffic",
        ctaH2Bottom: 'that actually makes profit.',
        ctaBtn: 'Get in Touch',

        navTitle: 'Navigation',
        connectTitle: 'Connect',
        contactTitle: 'Contact',

        nav: [
          { label: 'Home', href: '#top' },
          { label: 'Services', href: '#services' },
          { label: 'Work', href: '#work' },
          { label: 'Steps', href: '#process' },
          { label: 'News', href: '#news' },
          { label: 'Contact', href: '#contact' },
        ],
        connect: [{ label: 'Telegram', href: telegramLink }],

        rights: `© ${new Date().getFullYear()} TRAFFIC ANGELS • All rights reserved`,
        tagline: 'PERFORMANCE MARKETING',
      },

      RU: {
        ctaKicker: 'ГОТОВЫ К РОСТУ?',
        ctaH2Top: 'Давайте построим трафик,',
        ctaH2Bottom: 'который реально зарабатывает.',
        ctaBtn: 'Связаться',

        navTitle: 'Навигация',
        connectTitle: 'Связь',
        contactTitle: 'Контакты',

        nav: [
          { label: 'Главная', href: '#top' },
          { label: 'Услуги', href: '#services' },
          { label: 'Кейсы', href: '#work' },
          { label: 'Этапы', href: '#process' },
          { label: 'Новости', href: '#news' },
          { label: 'Контакт', href: '#contact' },
        ],
        connect: [{ label: 'Telegram', href: telegramLink }],

        rights: `© ${new Date().getFullYear()} TRAFFIC ANGELS • Все права защищены`,
        tagline: 'PERFORMANCE МАРКЕТИНГ',
      },

      UA: {
        ctaKicker: 'ГОТОВІ ДО ЗРОСТАННЯ?',
        ctaH2Top: 'Давай побудуємо трафік,',
        ctaH2Bottom: 'який реально заробляє.',
        ctaBtn: "Зв’язатися",

        navTitle: 'Навігація',
        connectTitle: 'Зв’язок',
        contactTitle: 'Контакти',

        nav: [
          { label: 'Головна', href: '#top' },
          { label: 'Послуги', href: '#services' },
          { label: 'Кейси', href: '#work' },
          { label: 'Кроки', href: '#process' },
          { label: 'Новини', href: '#news' },
          { label: 'Контакт', href: '#contact' },
        ],
        connect: [{ label: 'Telegram', href: telegramLink }],

        rights: `© ${new Date().getFullYear()} TRAFFIC ANGELS • Усі права захищено`,
        tagline: 'PERFORMANCE МАРКЕТИНГ',
      },
    };

    return dict[lang];
  }, [lang]);

  // ✅ открыть лид-форму (как в hero/header)
  const openLead = () => {
    window.dispatchEvent(new CustomEvent('volt:open-lead'));
  };

  return (
    <footer className="relative bg-black text-white">
      <div className="container mx-auto px-6 pt-16 pb-10">
        {/* CTA */}
        <motion.div
          className="mb-10 md:mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8">
              <div className="text-volt text-xs font-mono uppercase tracking-[0.25em]">
                {copy.ctaKicker}
              </div>

              <h2 className="mt-3 font-display font-bold leading-[0.95] tracking-tight text-4xl sm:text-5xl lg:text-6xl">
                {copy.ctaH2Top}
                <br />
                <span className="text-white/80">{copy.ctaH2Bottom}</span>
              </h2>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <MagneticButton
                className="rounded-full h-12 px-7 font-semibold bg-primary text-primary-foreground hover:bg-black hover:text-primary transition-colors border border-black/20"
                onClick={openLead}
              >
                {copy.ctaBtn} <span className="ml-2">→</span>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Panels */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
        >
          {/* Navigation */}
          <motion.div
            variants={item}
            className="lg:col-span-7 rounded-3xl border border-white/15 bg-black/60 backdrop-blur-sm p-6 md:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-white/55">
                  {copy.navTitle}
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
                  {copy.nav.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className="text-white/70 hover:text-primary transition-colors font-semibold"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <span className="w-2.5 h-2.5 border border-white/35 rounded-sm" />
                <span className="w-2.5 h-2.5 border border-white/35 rounded-sm" />
                <span className="w-2.5 h-2.5 border border-white/35 rounded-sm" />
              </div>
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            variants={item}
            className="lg:col-span-5 rounded-3xl border border-white/15 bg-black/60 backdrop-blur-sm p-6 md:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-white/55">
                  {copy.connectTitle}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-y-3 gap-x-6">
                  {copy.connect.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white/70 hover:text-primary transition-colors font-semibold inline-flex items-center gap-2"
                    >
                      <TelegramIcon className="w-4 h-4" />
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <span className="w-2.5 h-2.5 border border-white/35 rounded-sm" />
                <span className="w-2.5 h-2.5 border border-white/35 rounded-sm" />
                <span className="w-2.5 h-2.5 border border-white/35 rounded-sm" />
              </div>
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            variants={item}
            className="lg:col-span-12 rounded-3xl border border-white/15 bg-black/60 backdrop-blur-sm p-6 md:p-7"
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <div className="text-xs font-mono uppercase tracking-[0.25em] text-white/55">
                  {copy.contactTitle}
                </div>
                <div className="mt-4 space-y-2 text-white/70">
                  <div className="font-semibold text-white">info@trafficangeles.com</div>
                  <div>Milan, Italy</div>
                </div>
              </div>

              <div className="flex flex-col md:items-end gap-2 text-white/55 text-xs font-mono uppercase tracking-[0.2em]">
                <div>{copy.rights}</div>
                <div>{copy.tagline}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom stripe */}
      <div className="bg-volt">
        <div className="w-full px-2 sm:px-4">
          <div
            className={[
              'font-display font-black leading-none text-black',
              'text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw]',
              'tracking-[-0.04em]',
              'select-none',
              'text-center',
              'py-6 sm:py-8 md:py-10',
            ].join(' ')}
          >
            TRAFFIC ANGELS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;