import { motion, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

type Lang = 'EN' | 'RU' | 'UA';

const splitWords = (text: string) => text.split(' ');

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
	transition: {
	  staggerChildren: 0.028,
	  delayChildren: 0.14,
	},
  },
};

const word = {
  hidden: {
	opacity: 0,
	y: 20,
	filter: 'blur(6px)',
  },
  show: {
	opacity: 1,
	y: 0,
	filter: 'blur(0px)',
	transition: {
	  duration: 0.95,
	  ease: EASE,
	},
  },
};

const fadeUp = {
  hidden: {
	opacity: 0,
	y: 26,
	filter: 'blur(8px)',
  },
  show: {
	opacity: 1,
	y: 0,
	filter: 'blur(0px)',
	transition: {
	  duration: 0.95,
	  ease: EASE,
	},
  },
};

export default function AboutSection() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('volt_lang') as Lang) ?? 'EN');

  // ✅ слушаем смену языка из Header
  useEffect(() => {
	const onLang = (e: Event) => {
	  const ce = e as CustomEvent<{ lang: Lang }>;
	  if (ce.detail?.lang) setLang(ce.detail.lang);
	};
	window.addEventListener('volt:lang', onLang as EventListener);
	return () => window.removeEventListener('volt:lang', onLang as EventListener);
  }, []);

  // ✅ FIX: once-in-view, но после этого всегда держим "show"
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-120px', once: true });
  const [entered, setEntered] = useState(false);

  useEffect(() => {
	if (inView) setEntered(true);
  }, [inView]);

  const copy = useMemo(() => {
	const dict: Record<
	  Lang,
	  {
		kicker: string;
		headline: string;
		intro: string;

		approachKicker: string;
		approachTitle: string;

		metrics: { k: string; v: string }[];

		systemLine: string;

		whatWeDoKicker: string;
		whatWeDoList: string[];

		philosophyKicker: string;
		philosophyTitleLines: [string, string];
		philosophyText: string;
	  }
	> = {
	  EN: {
		kicker: 'ABOUT',
		headline: 'We build traffic systems that pass moderation and scale.',
		intro:
		  'Traffic Angels is a performance marketing team focused on complex and grey markets.\n' +
		  'We don’t “run ads” — we build full traffic systems designed for launch, stability, and scaling with predictable ROI.\n' +
		  'From strategy and creative to funnels, analytics, and optimization — everything is built around profit.',

		approachKicker: 'OUR APPROACH',
		approachTitle: 'Traffic that converts — not endless testing.',

		metrics: [
		  { k: 'Speed', v: 'Fast launch & short test cycles' },
		  { k: 'Stability', v: 'Moderation-resistant solutions' },
		  { k: 'ROI', v: 'Profit focus, not clicks' },
		],

		systemLine: 'Strategy, creatives, funnels, and traffic — one coherent system.',

		whatWeDoKicker: 'WHAT WE DO',
		whatWeDoList: [
		  'Paid traffic in grey & complex niches',
		  'Funnels & pre-landers development',
		  'Creative strategy & production',
		  'Optimization & scaling',
		  'Analytics, tracking & CRO',
		],

		philosophyKicker: 'PHILOSOPHY',
		philosophyTitleLines: ['Pass moderation.', 'Stay profitable.'],
		philosophyText:
		  'Every element has a function.\nIf it doesn’t impact approval, conversion, or ROI — it doesn’t belong.',
	  },

	  RU: {
		kicker: 'О НАС',
		headline: 'Мы строим трафик-системы, которые проходят модерацию и масштабируются',
		intro:
		  'Traffic Angels — команда performance-маркетинга, специализирующаяся на сложных и серых нишах.\n' +
		  'Мы не «запускаем рекламу» — мы выстраиваем полноценные трафик-системы, рассчитанные на запуск, стабильную работу и масштабирование с прогнозируемым ROI.\n' +
		  'От стратегии и креатива до воронок, аналитики и оптимизации — всё строится вокруг прибыли.',

		approachKicker: 'OUR APPROACH',
		approachTitle: 'Трафик, который конвертит, а не тестируется бесконечно.',

		metrics: [
		  { k: 'Скорость', v: 'Быстрый запуск и короткие циклы тестов' },
		  { k: 'Стабильность', v: 'Модерационно-устойчивые решения' },
		  { k: 'ROI', v: 'Фокус на прибыли, а не кликах' },
		],

		systemLine: 'Стратегия, креативы, воронки и трафик — единая система.',

		whatWeDoKicker: 'ЧТО ДЕЛАЕМ',
		whatWeDoList: [
		  'Платный трафик в серых и сложных нишах',
		  'Разработка воронок и прокладок',
		  'Креативная стратегия и продакшн',
		  'Оптимизация и масштабирование',
		  'Аналитика, трекинг и CRO',
		],

		philosophyKicker: 'PHILOSOPHY',
		philosophyTitleLines: ['Пройти модерацию.', 'Остаться в плюсе.'],
		philosophyText:
		  'Каждый элемент выполняет функцию.\nЕсли он не влияет на апрув, конверсию или ROI — он не нужен.',
	  },

	  UA: {
		kicker: 'ПРО НАС',
		headline: 'Ми будуємо трафік-системи, що проходять модерацію та масштабуються',
		intro:
		  'Traffic Angels — команда performance-маркетингу, що спеціалізується на складних і сірих нішах.\n' +
		  'Ми не «запускаємо рекламу» — ми вибудовуємо повноцінні трафік-системи для запуску, стабільної роботи та масштабування з прогнозованим ROI.\n' +
		  'Від стратегії та креативу до воронок, аналітики й оптимізації — усе будується навколо прибутку.',

		approachKicker: 'OUR APPROACH',
		approachTitle: 'Трафік, що конвертить — а не тестується безкінечно.',

		metrics: [
		  { k: 'Швидкість', v: 'Швидкий запуск і короткі цикли тестів' },
		  { k: 'Стабільність', v: 'Рішення, стійкі до модерації' },
		  { k: 'ROI', v: 'Фокус на прибутку, а не кліках' },
		],

		systemLine: 'Стратегія, креативи, воронки та трафік — єдина система.',

		whatWeDoKicker: 'ЩО РОБИМО',
		whatWeDoList: [
		  'Платний трафік у сірих і складних нішах',
		  'Розробка воронок і прокладок',
		  'Креативна стратегія та продакшн',
		  'Оптимізація та масштабування',
		  'Аналітика, трекінг і CRO',
		],

		philosophyKicker: 'PHILOSOPHY',
		philosophyTitleLines: ['Пройти модерацію.', 'Залишитись у плюсі.'],
		philosophyText:
		  'Кожен елемент виконує функцію.\nЯкщо він не впливає на апрув, конверсію або ROI — він не потрібен.',
	  },
	};

	return dict[lang];
  }, [lang]);

  return (
	<section
	  id="about"
	  className="relative bg-white min-h-[100svh] overflow-hidden flex items-center scroll-mt-[96px]"
	>
	  <div className="container mx-auto px-6 pt-24 sm:pt-24">
		{/* Header */}
		<motion.div
		  ref={ref}
		  className="max-w-5xl"
		  initial="hidden"
		  animate={entered ? 'show' : 'hidden'}
		  variants={container}
		>
		  <motion.span
			className="text-xs font-mono uppercase tracking-widest text-muted-foreground"
			variants={fadeUp}
		  >
			{copy.kicker}
		  </motion.span>

		  <motion.h2
			className="mt-3 font-display font-bold leading-[0.95] tracking-tight text-foreground"
			style={{ fontSize: 'clamp(1.8rem, 4.6vw, 4.2rem)' }}
			variants={container}
		  >
			{splitWords(copy.headline).map((w, i) => (
			  <motion.span key={`${w}-${i}`} className="inline-block mr-[0.22em]" variants={word}>
				{w}
			  </motion.span>
			))}
		  </motion.h2>

		  <motion.p
			className="mt-4 max-w-2xl text-foreground/70 leading-relaxed text-sm md:text-base whitespace-pre-line"
			variants={fadeUp}
			transition={{ duration: 1.0, ease: EASE }}
		  >
			{copy.intro}
		  </motion.p>
		</motion.div>

		{/* Content grid */}
		<motion.div
		  className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-4"
		  initial="hidden"
		  animate={entered ? 'show' : 'hidden'}
		  variants={container}
		>
		  {/* Main block */}
		  <motion.div className="lg:col-span-7 rounded-2xl border border-border p-6 md:p-7" variants={fadeUp}>
			<motion.div variants={fadeUp}>
			  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
				{copy.approachKicker}
			  </div>
			  <div className="mt-2 font-display font-bold text-xl md:text-2xl text-foreground">
				{copy.approachTitle}
			  </div>
			</motion.div>

			<motion.div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3" variants={container}>
			  {copy.metrics.map((it) => (
				<motion.div key={it.k} className="rounded-xl border border-border p-4" variants={fadeUp}>
				  <div className="text-volt font-mono text-[10px] uppercase tracking-widest">{it.k}</div>
				  <div className="mt-1 font-display font-bold text-sm md:text-base text-foreground">{it.v}</div>
				</motion.div>
			  ))}
			</motion.div>

			<motion.div
			  className="mt-4 border-t border-border pt-4 text-foreground/70 leading-relaxed text-sm"
			  variants={fadeUp}
			>
			  {copy.systemLine}
			</motion.div>
		  </motion.div>

		  {/* Side blocks */}
		  <div className="lg:col-span-5 grid grid-cols-1 gap-4">
			<motion.div className="rounded-2xl border border-border p-6 md:p-7" variants={fadeUp}>
			  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
				{copy.whatWeDoKicker}
			  </div>

			  <motion.div className="mt-3 space-y-2" variants={container}>
				{copy.whatWeDoList.map((t) => (
				  <motion.div key={t} className="flex items-start gap-3 text-foreground/80" variants={fadeUp}>
					<span className="mt-[7px] h-2 w-2 rounded-full bg-volt" />
					<span className="font-display font-semibold text-sm md:text-base">{t}</span>
				  </motion.div>
				))}
			  </motion.div>
			</motion.div>

			<motion.div className="rounded-2xl border border-border p-6 md:p-7" variants={fadeUp}>
			  <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
				{copy.philosophyKicker}
			  </div>

			  <motion.div variants={fadeUp}>
				<div className="mt-2 font-display font-bold text-xl md:text-2xl text-foreground leading-tight">
				  {copy.philosophyTitleLines[0]}
				  <br />
				  {copy.philosophyTitleLines[1]}
				</div>

				<div className="mt-3 text-foreground/70 leading-relaxed text-sm whitespace-pre-line">
				  {copy.philosophyText}
				</div>
			  </motion.div>
			</motion.div>
		  </div>
		</motion.div>
	  </div>
	</section>
  );
}