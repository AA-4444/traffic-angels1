import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

type Lang = 'EN' | 'RU' | 'UA';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function FeaturesSection() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('volt_lang') as Lang) ?? 'EN');

  // слушаем смену языка из Header
  useEffect(() => {
    const onLang = (e: Event) => {
      const ce = e as CustomEvent<{ lang: Lang }>;
      if (ce.detail?.lang) setLang(ce.detail.lang);
    };
    window.addEventListener('volt:lang', onLang as EventListener);
    return () => window.removeEventListener('volt:lang', onLang as EventListener);
  }, []);

  const copy = useMemo(() => {
    const dict: Record<
      Lang,
      {
        label: string;
        h2: string;
        features: { title: string; description: string; buttonText: string }[];
        marquee: string;
      }
    > = {
      RU: {
        label: 'УСЛУГИ',
        h2: 'Performance-маркетинг для серых ниш',
        features: [
          {
            title: 'Трафик-стратегия и медиабаинг',
            description:
              'Мы разрабатываем стратегии привлечения трафика с учётом рисков, платформ и гео. От анализа оффера до логики масштабирования — всё строится под стабильный результат.',
            buttonText: 'Подробнее о стратегии',
            marquee: 'ПОЕХАЛИ',
          },
          {
            title: 'Воронки и прокладки',
            description:
              'Конверсионные воронки, адаптированные под серый трафик.\nФильтрация аудитории, прогрев и рост качества лидов.',
            buttonText: 'Посмотреть воронки',
          },
          {
            title: 'Креативы и продакшн',
            description:
              'Креативы, которые цепляют внимание и проходят модерацию.\nТестируем гипотезы, углы и форматы, масштабируем рабочие связки.',
            buttonText: 'Смотреть креативы',
          },
          {
            title: 'Оптимизация и масштабирование',
            description:
              'Ежедневная оптимизация креативов, воронок и источников трафика.\nСнижаем CPA, улучшаем retention и масштабируем только прибыльное.',
            buttonText: 'Улучшить показатели',
          },
          {
            title: 'Аналитика и трекинг',
            description:
              'Отслеживаем только важное: события, воронки, CPA, ROI и LTV.\nПрозрачная аналитика без «красивых, но бесполезных» метрик.',
            buttonText: 'Смотреть аналитику',
          },
          {
            title: 'Лендинги под серый трафик',
            description:
              'Создаём лендинговые страницы и прокладки под апрув и конверсию.\nСкорость загрузки, структура, доверие и связка с креативами — всё под прибыль.',
            buttonText: 'Посмотреть лендинги',
          },
        ],
        marquee: "LET'S START",
      },

      EN: {
        label: 'OUR SERVICES',
        h2: 'Performance marketing for grey niches',
        features: [
          {
            title: 'Traffic strategy & media buying',
            description:
              'We build acquisition strategies based on risk, platforms, and GEOs. From offer analysis to scaling logic — everything is designed for stable results.',
            buttonText: 'Strategy details',
          },
          {
            title: 'Funnels & pre-landers',
            description:
              'Conversion-focused funnels tailored for grey traffic.\nAudience filtering, warming, and higher lead quality.',
            buttonText: 'View funnels',
          },
          {
            title: 'Creatives & production',
            description:
              'Creatives that grab attention and pass moderation.\nWe test angles, formats, and hypotheses — then scale winning combinations.',
            buttonText: 'See creatives',
          },
          {
            title: 'Optimization & scaling',
            description:
              'Daily optimization of creatives, funnels, and traffic sources.\nWe reduce CPA, improve retention, and scale only what’s profitable.',
            buttonText: 'Improve metrics',
          },
          {
            title: 'Analytics & tracking',
            description:
              'We track what matters: events, funnels, CPA, ROI, and LTV.\nClear analytics without “pretty but useless” metrics.',
            buttonText: 'View analytics',
          },
          {
            title: 'Landing pages for grey traffic',
            description:
              'We build landing pages and pre-landers engineered for approval and conversion.\nSpeed, structure, trust, and creative alignment — built for profit.',
            buttonText: 'View landings',
          },
        ],
        marquee: "LET'S START",
      },

      UA: {
        label: 'ПОСЛУГИ',
        h2: 'Performance-маркетинг для сірих ніш',
        features: [
          {
            title: 'Трафік-стратегія та медіабаїнг',
            description:
              'Ми будуємо стратегії залучення трафіку з урахуванням ризиків, платформ і GEO. Від аналізу оффера до логіки масштабування — усе під стабільний результат.',
            buttonText: 'Детальніше про стратегію',
          },
          {
            title: 'Воронки та прокладки',
            description:
              'Конверсійні воронки, адаптовані під сірий трафік.\nФільтрація аудиторії, прогрів і зростання якості лідів.',
            buttonText: 'Переглянути воронки',
          },
          {
            title: 'Креативи та продакшн',
            description:
              'Креативи, що чіпляють увагу та проходять модерацію.\nТестуємо гіпотези, кути й формати, масштабуємо робочі зв’язки.',
            buttonText: 'Дивитися креативи',
          },
          {
            title: 'Оптимізація та масштабування',
            description:
              'Щоденна оптимізація креативів, воронок і джерел трафіку.\nЗнижуємо CPA, покращуємо retention і масштабуємо лише прибуткове.',
            buttonText: 'Покращити показники',
          },
          {
            title: 'Аналітика та трекінг',
            description:
              'Відстежуємо тільки важливе: події, воронки, CPA, ROI та LTV.\nПрозора аналітика без «гарних, але марних» метрик.',
            buttonText: 'Переглянути аналітику',
          },
          {
            title: 'Лендінги під сірий трафік',
            description:
              'Створюємо лендінги та прокладки під апрув і конверсію.\nШвидкість, структура, довіра й відповідність креативам — усе під прибуток.',
            buttonText: 'Переглянути лендінги',
          },
        ],
        marquee: "LET'S START",
      },
    };

    return dict[lang];
  }, [lang]);

  return (
    <section className="relative" style={{ backgroundColor: 'hsl(var(--light))' }}>
      <div className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          {/* ✅ key={lang} = ремоунт и повторный inView (не пропадает при переводе) */}
          <motion.div
            key={`features-head-${lang}`}
            className="mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {copy.label}
            </motion.span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight max-w-4xl">
              {copy.h2}
            </h2>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            key={`features-grid-${lang}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-50px' }}
          >
            {copy.features.map((feature) => (
              <motion.div
                key={feature.title}
                className="group relative p-8 rounded-2xl border border-white/10 flex flex-col h-full"
                style={{ backgroundColor: '#071A2B' }}
                variants={itemVariants}
              >
                <h3 className="text-xl md:text-2xl font-display font-semibold mb-4" style={{ color: 'hsl(var(--volt))' }}>
                  {feature.title}
                </h3>

                {/* ✅ flex-1 чтобы кнопка всегда была внизу */}
                <p className="text-sm leading-relaxed mb-8 whitespace-pre-line flex-1" style={{ color: 'hsl(var(--light) / 0.78)' }}>
                  {feature.description}
                </p>

                {/* ✅ mt-auto + border всегда снизу */}
                <div className="border-t border-white/10 pt-6 mt-auto">
                  <motion.button
                    className="w-full px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 bg-primary text-primary-foreground"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                  >
                    {feature.buttonText}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Marquee */}
      <div className="w-full bg-[hsl(var(--volt))] overflow-hidden">
        <div className="relative h-[20vh] sm:h-[24vh] md:h-[32vh] flex items-center">
          <motion.div
            className="flex whitespace-nowrap will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
          >
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center">
                <span
                  className="
                    px-12
                    font-display
                    font-bold
                    uppercase
                    tracking-[0.01em]
                    text-[32vw] md:text-[18vw]
                    leading-none
                    text-transparent
                    [-webkit-text-stroke:2px_black]
                  "
                >
                  {copy.marquee}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}