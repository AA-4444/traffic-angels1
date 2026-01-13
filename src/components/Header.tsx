import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useState, useRef } from 'react';
import MagneticButton from './MagneticButton';
import { X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.svg';

type Lang = 'EN' | 'RU' | 'UA';

const navIds = ['home', 'about', 'services', 'work', 'steps', 'contact'] as const;
type NavId = (typeof navIds)[number];

const TelegramIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="currentColor"
      d="M21.8 4.4c.3-1.2-.9-2.1-2-1.7L2.6 9.4c-1.3.5-1.2 2.4.1 2.8l4.7 1.5 1.8 5.7c.4 1.3 2.1 1.7 3 .7l2.7-2.9 4.9 3.6c1.1.8 2.6.2 2.9-1.1L21.8 4.4Zm-3.7 2.9-9.4 8.2c-.3.3-.5.7-.4 1.1l.4 3.3-1.2-3.7c-.1-.4-.4-.7-.8-.8l-3.7-1.2 15.1-6.9Z"
    />
  </svg>
);

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLeadOpen, setIsLeadOpen] = useState(false);

  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('volt_lang') as Lang) || 'EN');
  const [isLangOpen, setIsLangOpen] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const telegramLink = 'https://t.me/traffic_angelss';

  // dropdown close on outside click
  const langWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!isLangOpen) return;
      const el = langWrapRef.current;
      if (el && !el.contains(e.target as Node)) setIsLangOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [isLangOpen]);

  const t = useMemo(() => {
    const dict: Record<
      Lang,
      {
        nav: Record<NavId, string>;
        telegram: string;
        getStarted: string;

        lead: {
          kicker: string;
          title: string;
          subtitle: string;

          nameLabel: string;
          namePh: string;

          telegramLabel: string;
          telegramPh: string;

          industryLabel: string;
          industryPh: string;
          industryOptions: { value: string; label: string }[];

          projectLabel: string;
          projectPh: string;

          cancel: string;
          send: string;
          sending: string;
        };
      }
    > = {
      EN: {
        nav: {
          home: 'Home',
          about: 'About',
          services: 'Services',
          work: 'Work',
          steps: 'Process',
          contact: 'Contact',
        },
        telegram: 'Telegram',
        getStarted: 'Get Started',
        lead: {
          kicker: `Let’s build something`,
          title: 'Get Started',
          subtitle: `Leave your details — we’ll reply with next steps.`,

          nameLabel: 'Name',
          namePh: 'John',

          telegramLabel: 'Telegram',
          telegramPh: '@username or https://t.me/username',

          industryLabel: 'Industry',
          industryPh: 'Select your niche',
          industryOptions: [
            { value: 'Forex/Investment', label: 'Forex/Investment' },
            { value: 'Recovery/Charge Back', label: 'Recovery/Charge Back' },
            { value: 'Igaming', label: 'Igaming' },
            { value: 'Telegram Channels', label: 'Telegram Channels' },
            { value: 'Crypto', label: 'Crypto' },
            { value: 'Other', label: 'Other' },
          ],

          projectLabel: 'Project',
          projectPh: 'Tell us what you need (launch, funnels, ads, etc.)',

          cancel: 'Cancel',
          send: 'Send',
          sending: 'Sending…',
        },
      },

      RU: {
        nav: {
          home: 'Главная',
          about: 'О нас',
          services: 'Услуги',
          work: 'Кейсы',
          steps: 'Процесс',
          contact: 'Контакты',
        },
        telegram: 'Telegram',
        getStarted: 'Начать',
        lead: {
          kicker: 'Давайте строить',
          title: 'Начать',
          subtitle: 'Оставьте контакты — мы ответим с дальнейшими шагами.',

          nameLabel: 'Имя',
          namePh: 'Иван',

          telegramLabel: 'Telegram',
          telegramPh: '@ник или https://t.me/ник',

          industryLabel: 'Ниша',
          industryPh: 'Выберите нишу',
          industryOptions: [
            { value: 'Forex/Investment', label: 'Forex/Investment' },
            { value: 'Recovery/Charge Back', label: 'Recovery/Charge Back' },
            { value: 'Igaming', label: 'Igaming' },
            { value: 'Telegram Channels', label: 'Telegram Channels' },
            { value: 'Crypto', label: 'Crypto' },
            { value: 'Другое', label: 'Другое' },
          ],

          projectLabel: 'Задача',
          projectPh: 'Опишите задачу (запуск, воронки, трафик, масштабирование и т.д.)',

          cancel: 'Отмена',
          send: 'Отправить',
          sending: 'Отправка…',
        },
      },

      UA: {
        nav: {
          home: 'Головна',
          about: 'Про нас',
          services: 'Послуги',
          work: 'Кейси',
          steps: 'Процес',
          contact: 'Контакти',
        },
        telegram: 'Telegram',
        getStarted: 'Почати',
        lead: {
          kicker: 'Будуємо разом',
          title: 'Почати',
          subtitle: 'Залиште контакти — ми відповімо з наступними кроками.',

          nameLabel: `Ім’я`,
          namePh: 'Іван',

          telegramLabel: 'Telegram',
          telegramPh: '@нік або https://t.me/нік',

          industryLabel: 'Ніша',
          industryPh: 'Оберіть нішу',
          industryOptions: [
            { value: 'Forex/Investment', label: 'Forex/Investment' },
            { value: 'Recovery/Charge Back', label: 'Recovery/Charge Back' },
            { value: 'Igaming', label: 'Igaming' },
            { value: 'Telegram Channels', label: 'Telegram Channels' },
            { value: 'Crypto', label: 'Crypto' },
            { value: 'Інше', label: 'Інше' },
          ],

          projectLabel: 'Задача',
          projectPh: 'Опишіть задачу (запуск, воронки, трафік, масштабування тощо)',

          cancel: 'Скасувати',
          send: 'Надіслати',
          sending: 'Надсилання…',
        },
      },
    };

    return dict[lang];
  }, [lang]);

  const hrefMap = useMemo<Record<NavId, string>>(
    () => ({
      services: '#services',
      work: '#work',
      about: '#about',
      steps: '#steps',
      contact: '#contact',
      home: '#home',
    }),
    []
  );

  // pills
  const hoverPill =
    'rounded-full h-12 inline-flex items-center whitespace-nowrap font-semibold transition-colors duration-200 hover:bg-black hover:text-primary ' +
    'px-5 text-base text-foreground/80 ' +
    'xl:px-3 xl:text-sm ' +
    'lg:px-4 lg:text-[15px]';

  const rightBtnBase =
    'rounded-full h-12 inline-flex items-center justify-center font-semibold transition-colors duration-200 ' +
    'text-base ' +
    'xl:text-sm lg:text-[15px]';

  const langBtn =
    `${rightBtnBase} px-3 min-w-[56px] border border-black text-black bg-transparent hover:bg-black hover:text-primary ` +
    `xl:px-2 xl:min-w-[52px]`;

  const tgBtn =
    `${rightBtnBase} px-6 border border-black text-black bg-transparent hover:bg-black hover:text-primary ` +
    `xl:px-4 lg:px-5`;

  const getStartedBtn =
    `${rightBtnBase} px-6 bg-primary text-primary-foreground hover:bg-black hover:text-primary ` +
    `xl:px-4 lg:px-5`;

  const openLead = () => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
    setIsLeadOpen(true);
  };
  const closeLead = () => setIsLeadOpen(false);

  useEffect(() => {
    const handler = () => openLead();
    window.addEventListener('volt:open-lead', handler as EventListener);
    return () => window.removeEventListener('volt:open-lead', handler as EventListener);
  }, []);

  const setLanguage = (v: Lang) => {
    setLang(v);
    setIsLangOpen(false);
    localStorage.setItem('volt_lang', v);
    window.dispatchEvent(new CustomEvent('volt:lang', { detail: { lang: v } }));
  };

  const goToSection = (hash: string) => {
    setIsMenuOpen(false);
    setIsLangOpen(false);

    const scroll = () =>
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 120);
      return;
    }

    scroll();
  };

  const submitLead = async (payload: {
    name: string;
    telegram: string;
    industry: string;
    project: string;
    source: string;
    lang: Lang;
  }) => {
    setIsSending(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Bad response');
      closeLead();
    } catch {
      alert('Failed to send. Check /api/lead backend.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: 'hsl(var(--light))' }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="border-b border-border">
          <div className="mx-auto max-w-[1920px] px-6 md:px-10 h-20 grid grid-cols-3 items-center">
            {/* LEFT (Desktop nav only on XL+) */}
            <div className="flex items-center gap-3">
              <nav className="hidden xl:flex items-center gap-3">
                {navIds.map((id) => (
                  <MagneticButton
                    key={id}
                    as="div"
                    className={hoverPill}
                    onClick={() => goToSection(hrefMap[id])}
                  >
                    <span>{t.nav[id]}</span>
                  </MagneticButton>
                ))}
              </nav>
            </div>

            {/* CENTER LOGO */}
            <div className="flex justify-center">
              <MagneticButton as="div">
                <Link to="/" className="px-4 py-2 rounded-lg flex items-center justify-center bg-primary">
                  <img
                    src={logo}
                    alt="Volt logo"
                    className="h-10 md:h-11 w-auto select-none"
                    draggable={false}
                  />
                </Link>
              </MagneticButton>
            </div>

            {/* RIGHT */}
            <div className="flex justify-end items-center gap-3 xl:gap-2">
              {/* Desktop controls ONLY on XL+ */}
              <div ref={langWrapRef} className="hidden xl:block relative">
                <button
                  type="button"
                  className={langBtn}
                  onClick={() => setIsLangOpen((v) => !v)}
                >
                  <span className="font-mono text-sm">{lang}</span>
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-0 mt-2 w-[140px] rounded-2xl border border-black bg-[hsl(var(--light))] shadow-xl overflow-hidden z-[999]"
                    >
                      {(['EN', 'RU', 'UA'] as const).map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setLanguage(v)}
                          className="w-full h-11 px-4 text-left font-mono text-sm text-black hover:bg-black hover:text-primary transition-colors"
                        >
                          {v}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <MagneticButton as="div" className="hidden xl:block">
                <a className={`${tgBtn} gap-2`} href={telegramLink} target="_blank" rel="noreferrer">
                  <span>{t.telegram}</span>
                  <TelegramIcon />
                </a>
              </MagneticButton>

              <MagneticButton as="div" className="hidden xl:block" onClick={openLead}>
                <span className={getStartedBtn}>{t.getStarted}</span>
              </MagneticButton>

              {/* Mobile burger (now active BELOW XL) */}
              <button
                onClick={() => setIsMenuOpen((v) => !v)}
                className="xl:hidden p-3 text-3xl leading-none"
                aria-label="Open menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE / TABLET MENU (below XL) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            style={{ backgroundColor: 'hsl(var(--dark))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => {
                setIsMenuOpen(false);
                setIsLangOpen(false);
              }}
              className="absolute top-5 right-5 p-3 text-white/80 hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-7 h-7" />
            </button>

            <nav className="h-full pt-24 px-6 flex flex-col gap-3">
              {navIds.map((id, index) => (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => goToSection(hrefMap[id])}
                  className="w-full text-left rounded-2xl px-5 py-4 text-xl font-display font-semibold text-white/80 hover:bg-black hover:text-primary transition-colors"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 14 }}
                  transition={{ duration: 0.22, delay: index * 0.04 }}
                >
                  {t.nav[id]}
                </motion.button>
              ))}

              <motion.div
                className="mt-5 flex flex-col gap-3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.22, delay: 0.22 }}
              >
                <div className="flex gap-3">
                  {(['EN', 'RU', 'UA'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setLanguage(v)}
                      className={`h-12 px-5 rounded-full border border-white/25 text-white/90 font-mono text-sm transition-colors ${
                        lang === v ? 'bg-white/10' : 'hover:bg-black hover:text-primary'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <a
                  className="h-12 rounded-full px-6 font-semibold border border-white/25 text-white/90 hover:bg-black hover:text-primary transition-colors inline-flex items-center justify-between"
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{t.telegram}</span>
                  <TelegramIcon className="w-5 h-5" />
                </a>

                <button
                  onClick={openLead}
                  className="h-12 rounded-full px-6 font-semibold bg-primary text-primary-foreground hover:bg-black hover:text-primary transition-colors"
                >
                  {t.getStarted}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEAD MODAL (unchanged) */}
      <AnimatePresence>
        {isLeadOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center px-3 sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button aria-label="Close lead form" onClick={closeLead} className="absolute inset-0 bg-black/70" />

            <motion.div
              className="relative w-full max-w-[42rem] rounded-3xl border border-border bg-background shadow-2xl max-h-[92vh] overflow-auto"
              initial={{ y: 22, opacity: 0, scale: 0.99 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 22, opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-5 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-black text-sm font-mono uppercase tracking-widest">{t.lead.kicker}</div>
                    <div className="font-display font-bold text-2xl sm:text-4xl text-foreground mt-2">{t.lead.title}</div>
                    <div className="text-muted-foreground mt-2">{t.lead.subtitle}</div>
                  </div>

                  <button
                    onClick={closeLead}
                    className="rounded-full p-2 text-foreground/60 hover:text-foreground transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);

                    submitLead({
                      name: String(fd.get('name') || ''),
                      telegram: String(fd.get('telegram') || ''),
                      industry: String(fd.get('industry') || ''),
                      project: String(fd.get('project') || ''),
                      source: window.location.pathname || 'unknown',
                      lang,
                    });
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">{t.lead.nameLabel}</label>
                      <input
                        name="name"
                        required
                        className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[hsl(var(--volt))]"
                        placeholder={t.lead.namePh}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">{t.lead.telegramLabel}</label>
                      <input
                        name="telegram"
                        required
                        type="text"
                        inputMode="text"
                        autoCapitalize="off"
                        autoCorrect="off"
                        spellCheck={false}
                        className="w-full rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[hsl(var(--volt))]"
                        placeholder={t.lead.telegramPh}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">{t.lead.industryLabel}</label>
                    <select
                      name="industry"
                      required
                      defaultValue=""
                      className="w-full h-[52px] rounded-2xl border border-border bg-white px-4 outline-none focus:ring-2 focus:ring-[hsl(var(--volt))]"
                    >
                      <option value="" disabled>
                        {t.lead.industryPh}
                      </option>
                      {t.lead.industryOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">{t.lead.projectLabel}</label>
                    <textarea
                      name="project"
                      rows={5}
                      className="w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[hsl(var(--volt))]"
                      placeholder={t.lead.projectPh}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                    <button
                      type="button"
                      onClick={closeLead}
                      className="rounded-full h-12 px-6 font-semibold border border-black text-black bg-transparent hover:bg-black hover:text-primary transition-colors"
                      disabled={isSending}
                    >
                      {t.lead.cancel}
                    </button>
                    <button
                      type="submit"
                      className="rounded-full h-12 px-6 font-semibold bg-primary text-primary-foreground hover:bg-black hover:text-primary transition-colors disabled:opacity-60"
                      disabled={isSending}
                    >
                      {isSending ? t.lead.sending : t.lead.send}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}