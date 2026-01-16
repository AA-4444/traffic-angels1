import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import MagneticButton from './MagneticButton';
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

function useOutsideClick(ref: React.RefObject<HTMLElement>, isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!isOpen) return;
      const el = ref.current;
      if (el && !el.contains(e.target as Node)) onClose();
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [isOpen, onClose, ref]);
}

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // ======= existing state =======
  const [isLeadOpen, setIsLeadOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('volt_lang') as Lang) || 'EN');

  // dropdown (portal) state
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langBtnRef = useRef<HTMLButtonElement | null>(null);
  const langPortalRef = useRef<HTMLDivElement | null>(null);
  const [langPos, setLangPos] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 140,
  });

  // ======= CardNav-like menu state =======
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const telegramLink = 'https://t.me/traffic_angelss';

  const t = useMemo(() => {
    const dict: Record<
      Lang,
      {
        nav: Record<NavId, string>;
        telegram: string;
        getStarted: string;
        menu: {
          label1: string;
          label2: string;
          label3: string;
          links1: { id: NavId; label: string }[];
          links2: { id: NavId; label: string }[];
          links3: { id: NavId; label: string }[];
        };
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
        menu: {
          label1: 'Explore',
          label2: 'Work',
          label3: 'Contact',
          links1: [
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'services', label: 'Services' },
          ],
          links2: [
            { id: 'work', label: 'Cases' },
            { id: 'steps', label: 'Process' },
          ],
          links3: [
            { id: 'contact', label: 'Contacts' },
            { id: 'contact', label: 'Book a call' },
          ],
        },
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
        menu: {
          label1: 'Навигация',
          label2: 'Кейсы',
          label3: 'Связь',
          links1: [
            { id: 'home', label: 'Главная' },
            { id: 'about', label: 'О нас' },
            { id: 'services', label: 'Услуги' },
          ],
          links2: [
            { id: 'work', label: 'Кейсы' },
            { id: 'steps', label: 'Процесс' },
          ],
          links3: [
            { id: 'contact', label: 'Контакты' },
            { id: 'contact', label: 'Созвон' },
          ],
        },
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
        menu: {
          label1: 'Навігація',
          label2: 'Кейси',
          label3: "Звʼязок",
          links1: [
            { id: 'home', label: 'Головна' },
            { id: 'about', label: 'Про нас' },
            { id: 'services', label: 'Послуги' },
          ],
          links2: [
            { id: 'work', label: 'Кейси' },
            { id: 'steps', label: 'Процес' },
          ],
          links3: [
            { id: 'contact', label: 'Контакти' },
            { id: 'contact', label: 'Дзвінок' },
          ],
        },
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

  // ====== your button styles (kept) ======
  const rightBtnBase =
    'rounded-full h-12 inline-flex items-center justify-center font-semibold transition-colors duration-200 text-base ' +
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

  const setLanguage = (v: Lang) => {
    setLang(v);
    setIsLangOpen(false);
    localStorage.setItem('volt_lang', v);
    window.dispatchEvent(new CustomEvent('volt:lang', { detail: { lang: v } }));
  };

  const openLead = () => {
    closeMenu();
    setIsLangOpen(false);
    setIsLeadOpen(true);
  };
  const closeLead = () => setIsLeadOpen(false);

  const goToSection = (hash: string) => {
    closeMenu();
    setIsLangOpen(false);

    const scroll = () => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scroll, 140);
      setTimeout(scroll, 420);
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

  // ====== height setup (higher now) ======
  const TOP_BAR_H = 72; // было 60 — теперь выше (логотип/кнопки не режутся)
  const DESKTOP_OPEN_H = 300; // было 260 — чуть выше в раскрытом виде

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return TOP_BAR_H + 220;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('[data-cardnav-content="1"]') as HTMLElement | null;
      if (contentEl) {
        const wasVis = contentEl.style.visibility;
        const wasPE = contentEl.style.pointerEvents;
        const wasPos = contentEl.style.position;
        const wasH = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';
        contentEl.offsetHeight;

        const padding = 12;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVis;
        contentEl.style.pointerEvents = wasPE;
        contentEl.style.position = wasPos;
        contentEl.style.height = wasH;

        return TOP_BAR_H + contentHeight + padding;
      }
    }

    return DESKTOP_OPEN_H;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: TOP_BAR_H, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.42, ease: 'power3.out' });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.38, ease: 'power3.out', stagger: 0.08 }, '-=0.12');
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isMenuExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }

      // if lang dropdown open — reposition portal
      if (isLangOpen) {
        requestAnimationFrame(() => {
          const btn = langBtnRef.current;
          if (!btn) return;
          const r = btn.getBoundingClientRect();
          setLangPos({ top: r.bottom + 8, left: r.right - 140, width: 140 });
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuExpanded, isLangOpen]);

  const openMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    setIsLangOpen(false);
    setIsHamburgerOpen(true);
    setIsMenuExpanded(true);
    tl.play(0);
  };

  const closeMenu = () => {
    const tl = tlRef.current;
    if (!tl) {
      setIsHamburgerOpen(false);
      setIsMenuExpanded(false);
      return;
    }
    setIsHamburgerOpen(false);
    tl.eventCallback('onReverseComplete', () => setIsMenuExpanded(false));
    tl.reverse();
  };

  const toggleMenu = () => {
    if (!isMenuExpanded) openMenu();
    else closeMenu();
  };

  // open lead from event
  useEffect(() => {
    const handler = () => openLead();
    window.addEventListener('volt:open-lead', handler as EventListener);
    return () => window.removeEventListener('volt:open-lead', handler as EventListener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esc close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLangOpen(false);
        if (isMenuExpanded) closeMenu();
        if (isLeadOpen) closeLead();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuExpanded, isLeadOpen]);

  // ====== Lang dropdown portal (fix overflow hidden) ======
  const openLang = () => {
    const btn = langBtnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    setLangPos({ top: r.bottom + 8, left: r.right - 140, width: 140 });
    setIsLangOpen(true);
  };

  // outside click for portal dropdown
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!isLangOpen) return;
      const portal = langPortalRef.current;
      const btn = langBtnRef.current;
      const tEl = e.target as Node;
      if (portal && portal.contains(tEl)) return;
      if (btn && btn.contains(tEl)) return;
      setIsLangOpen(false);
    };
    window.addEventListener('mousedown', onDown);
    return () => window.removeEventListener('mousedown', onDown);
  }, [isLangOpen]);

  // ====== card items (NOW GREEN) ======
  const cardItems = useMemo(
    () => [
      {
        label: t.menu.label1,
        bg: 'hsl(var(--primary))',
        title: 'text-black',
        link: 'text-black/80 hover:text-black',
        links: t.menu.links1,
      },
      {
        label: t.menu.label2,
        bg: 'hsl(var(--primary))',
        title: 'text-black',
        link: 'text-black/80 hover:text-black',
        links: t.menu.links2,
      },
      {
        label: t.menu.label3,
        bg: 'hsl(var(--primary))',
        title: 'text-black',
        link: 'text-black/80 hover:text-black',
        links: t.menu.links3,
      },
    ],
    [t]
  );

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el;
  };

  return (
    <>
      <motion.header
        className="fixed top-4 left-0 right-0 z-50 px-3 sm:px-6"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* wider on PC */}
        <div className="mx-auto w-full max-w-[1280px]">
          <nav
            ref={(el) => (navRef.current = el)}
            className="relative block rounded-2xl shadow-lg will-change-[height] overflow-hidden border border-black/10"
            style={{ backgroundColor: 'hsl(var(--light))', height: TOP_BAR_H }}
          >
            {/* TOP BAR */}
            <div
              className="absolute inset-x-0 top-0 z-20 flex items-center justify-between"
              style={{ height: TOP_BAR_H, padding: '0.7rem 0.9rem 0.7rem 1.2rem' }}
            >
              {/* LEFT: burger */}
              <div
                className="h-full flex flex-col items-center justify-center cursor-pointer gap-[7px] select-none"
                onClick={toggleMenu}
                role="button"
                aria-label={isMenuExpanded ? 'Close menu' : 'Open menu'}
                tabIndex={0}
                style={{ color: '#000' }}
              >
                <div
                  className="w-[30px] h-[2px] bg-current transition-transform duration-200"
                  style={{
                    transform: isHamburgerOpen ? 'translateY(4px) rotate(45deg)' : 'none',
                    transformOrigin: '50% 50%',
                    opacity: 0.95,
                  }}
                />
                <div
                  className="w-[30px] h-[2px] bg-current transition-transform duration-200"
                  style={{
                    transform: isHamburgerOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
                    transformOrigin: '50% 50%',
                    opacity: 0.95,
                  }}
                />
              </div>

              {/* CENTER: logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <MagneticButton as="div">
                  <Link to="/" className="px-4 py-2 rounded-xl flex items-center justify-center bg-primary">
                    <img
                      src={logo}
                      alt="Volt logo"
                      className="h-10 md:h-11 w-auto select-none"
                      draggable={false}
                    />
                  </Link>
                </MagneticButton>
              </div>

              {/* RIGHT: controls (desktop in bar) */}
              <div className="flex items-center gap-3">
                {/* On small screens we hide them here and show inside menu */}
                <div className="hidden md:flex items-center gap-3">
                  <button
                    ref={langBtnRef}
                    type="button"
                    className={langBtn}
                    onClick={() => (isLangOpen ? setIsLangOpen(false) : openLang())}
                  >
                    <span className="font-mono text-sm">{lang}</span>
                  </button>

                  <MagneticButton as="div">
                    <a className={`${tgBtn} gap-2`} href={telegramLink} target="_blank" rel="noreferrer">
                      <span>{t.telegram}</span>
                      <TelegramIcon />
                    </a>
                  </MagneticButton>

                  <MagneticButton as="div" onClick={openLead}>
                    <span className={getStartedBtn}>{t.getStarted}</span>
                  </MagneticButton>
                </div>
              </div>
            </div>

            {/* CONTENT (cards) */}
            <div
              data-cardnav-content="1"
              aria-hidden={!isMenuExpanded}
              className="absolute left-0 right-0 z-10"
              style={{
                top: TOP_BAR_H,
                bottom: 0,
                padding: '10px',
                visibility: isMenuExpanded ? 'visible' : 'hidden',
                pointerEvents: isMenuExpanded ? 'auto' : 'none',
              }}
            >
              {/* MOBILE: show your controls inside menu */}
              <div className="md:hidden mb-3 flex flex-col gap-3">
                <div className="flex gap-3">
                  {(['EN', 'RU', 'UA'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => setLanguage(v)}
                      className={`h-12 px-5 rounded-full border border-black/15 text-black font-mono text-sm transition-colors ${
                        lang === v ? 'bg-black/5' : 'hover:bg-black hover:text-primary'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <a
                  className="h-12 rounded-full px-6 font-semibold border border-black/15 text-black hover:bg-black hover:text-primary transition-colors inline-flex items-center justify-between"
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
              </div>

              {/* Cards */}
              <div className="h-full flex items-end gap-3">
                {cardItems.slice(0, 3).map((item, idx) => (
                  <div
                    key={item.label}
                    ref={setCardRef(idx)}
                    className="flex-1 min-w-0 rounded-2xl p-4 flex flex-col gap-2 select-none border border-black/10"
                    style={{ background: item.bg }}
                  >
                    <div className={`font-normal text-[22px] tracking-[-0.5px] ${item.title}`}>{item.label}</div>

                    <div className="mt-auto flex flex-col gap-1">
                      {item.links.map((lnk, i) => (
                        <button
                          key={`${lnk.id}-${i}`}
                          type="button"
                          onClick={() => goToSection(hrefMap[lnk.id])}
                          className={`text-left text-[16px] inline-flex items-center gap-2 transition-colors ${item.link}`}
                        >
                          <span className="inline-block translate-y-[1px]">↗</span>
                          {lnk.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* mobile column */}
              <style>
                {`
                  @media (max-width: 768px) {
                    [data-cardnav-content="1"] > .h-full {
                      flex-direction: column;
                      align-items: stretch;
                      justify-content: flex-start;
                    }
                    [data-cardnav-content="1"] > .h-full > div {
                      flex: 0 0 auto;
                      min-height: 72px;
                    }
                  }
                `}
              </style>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* LANG DROPDOWN (PORTAL) */}
      {isLangOpen &&
        createPortal(
          <div
            ref={(el) => (langPortalRef.current = el)}
            className="rounded-2xl border border-black bg-[hsl(var(--light))] shadow-xl overflow-hidden z-[99999]"
            style={{
              position: 'fixed',
              top: langPos.top,
              left: langPos.left,
              width: langPos.width,
            }}
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
          </div>,
          document.body
        )}

      {/* LEAD MODAL (как было) */}
      {isLeadOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-3 sm:px-4">
          <button aria-label="Close lead form" onClick={closeLead} className="absolute inset-0 bg-black/70" />

          <div className="relative w-full max-w-[42rem] rounded-3xl border border-border bg-background shadow-2xl max-h-[92vh] overflow-auto">
            <div className="p-5 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-black text-sm font-mono uppercase tracking-widest">{t.lead.kicker}</div>
                  <div className="font-display font-bold text-2xl sm:text-4xl text-foreground mt-2">
                    {t.lead.title}
                  </div>
                  <div className="text-muted-foreground mt-2">{t.lead.subtitle}</div>
                </div>

                <button
                  onClick={closeLead}
                  className="rounded-full p-2 text-foreground/60 hover:text-foreground transition-colors"
                  aria-label="Close"
                >
                  ✕
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
          </div>
        </div>
      )}
    </>
  );
}