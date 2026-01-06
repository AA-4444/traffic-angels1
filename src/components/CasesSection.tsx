import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { useEffect, useMemo, useState } from 'react';

import case1 from '@/assets/1.jpg';
import case2 from '@/assets/2.jpg';
import case3 from '@/assets/3.jpg';

type Lang = 'EN' | 'RU' | 'UA';

const CasesSection = () => {
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
    const dict: Record<
      Lang,
      {
        headerKicker: string;
        headerTitle: string;
        headerText: string;
        goalLabel: string;
        whatWeDidLabel: string;
        cases: {
          id: number;
          title: string;
          subtitle: string;
          image: string;
          goal: string;
          metrics: { label: string; value: string }[];
          results: string[];
        }[];
      }
    > = {
      RU: {
        headerKicker: 'Кейсы',
        headerTitle: 'Результаты',
        headerText: 'Реальные кампании. Реальные цифры. Смотри, как мы делаем рост в сложных нишах.',
        goalLabel: 'Цель',
        whatWeDidLabel: 'Что сделали',
        cases: [
          {
            id: 1,
            title: 'Лидогенерация для Forex и Investment',
            subtitle: 'Финансовый серый трафик',
            image: case1,
            goal:
              'Запуск и масштабирование лидогенерации для инвестиционного проекта с сохранением положительного ROI при строгой модерации.',
            metrics: [
              { label: 'Потраченный бюджет', value: '$65000' },
              { label: 'GEO', value: 'Tier 1' },
              { label: 'CPL', value: '$12' },
              { label: 'CR', value: '7,48%' },
            ],
            results: [
              'Построили модерационно-устойчивую структуру',
              'Разработали прокладки и воронки',
              'Запустили и оптимизировали рекламные кампании',
              'Масштабировали прибыльные связки',
            ],
          },
          {
            id: 2,
            title: 'Recovery и Chargeback-кампания',
            subtitle: 'Юридические и финансовые услуги',
            image: case2,
            goal: 'Привлечение качественных лидов для recovery-сервисов с жёсткой фильтрацией аудитории.',
            metrics: [
              { label: 'Потраченный бюджет', value: '$48000' },
              { label: 'GEO', value: 'CA' },
              { label: 'CPL', value: '$65' },
              { label: 'CR', value: '11%' },
            ],
            results: [
              'Построили intent-воронки',
              'Разработали доверительные креативы',
              'Внедрили систему квалификации лидов',
              'Оптимизировали под качество, а не объём',
            ],
          },
          {
            id: 3,
            title: 'Привлечение пользователей в iGaming',
            subtitle: 'Масштабируемый performance-трафик',
            image: case3,
            goal: 'Масштабирование пользовательского трафика с контролем CPA и retention.',
            metrics: [
              { label: 'Потраченный бюджет', value: '$39000' },
              { label: 'GEO', value: 'Tier 1' },
              { label: 'CPI / CPA', value: '20$' },
              { label: 'Cost 1 follower', value: '$0.9' },
            ],
            results: [
              'Создали высококонверсионные видеокреативы',
              'Оптимизировали события и post-install воронки',
              'Масштабировали рабочие GEO и плейсменты',
              'Снизили стоимость привлечения',
            ],
          },
        ],
      },

      EN: {
        headerKicker: 'Case Studies',
        headerTitle: 'Our Results',
        headerText: "Real campaigns. Real results. Here's how we scale performance in complex niches.",
        goalLabel: 'Goal',
        whatWeDidLabel: 'What We Did',
        cases: [
          {
            id: 1,
            title: 'Forex / Investment Lead Generation',
            subtitle: 'Financial grey traffic',
            image: case1,
            goal:
              'Launch and scale lead generation for an investment project while maintaining positive ROI under strict moderation.',
            metrics: [
              { label: 'Budget Spent', value: '$65000' },
              { label: 'GEO', value: 'Tier 1' },
              { label: 'CPL', value: '$12' },
              { label: 'CR', value: '7.48%' },
            ],
            results: [
              'Built a moderation-resistant structure',
              'Developed pre-landers and funnels',
              'Launched and optimized ad campaigns',
              'Scaled profitable setups',
            ],
          },
          {
            id: 2,
            title: 'Recovery / Chargeback Campaign',
            subtitle: 'Legal and financial services',
            image: case2,
            goal: 'Acquire high-quality leads for recovery services with strict audience filtering.',
            metrics: [
              { label: 'Budget Spent', value: '$48000' },
              { label: 'GEO', value: 'CA' },
              { label: 'CPL', value: '$65' },
              { label: 'CR', value: '11%' },
            ],
            results: [
              'Built intent-based funnels',
              'Created trust-driven creatives',
              'Implemented lead qualification system',
              'Optimized for quality, not volume',
            ],
          },
          {
            id: 3,
            title: 'iGaming User Acquisition',
            subtitle: 'Scalable performance traffic',
            image: case3,
            goal: 'Scale user acquisition while controlling CPA and retention.',
            metrics: [
              { label: 'Budget Spent', value: '$39000' },
              { label: 'GEO', value: 'Tier 1' },
              { label: 'CPI / CPA', value: '$20' },
              { label: 'Cost 1 follower', value: '$0.9' },
            ],
            results: [
              'Produced high-converting video creatives',
              'Optimized events and post-install funnels',
              'Scaled winning GEOs and placements',
              'Reduced acquisition costs',
            ],
          },
        ],
      },

      UA: {
        headerKicker: 'Кейси',
        headerTitle: 'Результати',
        headerText: 'Реальні кампанії. Реальні цифри. Показуємо, як ми масштабуємо складні ніші.',
        goalLabel: 'Ціль',
        whatWeDidLabel: 'Що зробили',
        cases: [
          {
            id: 1,
            title: 'Лідогенерація для Forex та Investment',
            subtitle: 'Фінансовий сірий трафік',
            image: case1,
            goal:
              'Запуск і масштабування лідогенерації для інвестиційного проєкту зі збереженням позитивного ROI при жорсткій модерації.',
            metrics: [
              { label: 'Витрачений бюджет', value: '$65000' },
              { label: 'GEO', value: 'Tier 1' },
              { label: 'CPL', value: '$12' },
              { label: 'CR', value: '7,48%' },
            ],
            results: [
              'Побудували стійку до модерації структуру',
              'Розробили прокладки та воронки',
              'Запустили й оптимізували рекламні кампанії',
              'Масштабували прибуткові зв’язки',
            ],
          },
          {
            id: 2,
            title: 'Recovery та Chargeback-кампанія',
            subtitle: 'Юридичні та фінансові послуги',
            image: case2,
            goal: 'Залучення якісних лідів для recovery-сервісів із жорсткою фільтрацією аудиторії.',
            metrics: [
              { label: 'Витрачений бюджет', value: '$48000' },
              { label: 'GEO', value: 'CA' },
              { label: 'CPL', value: '$65' },
              { label: 'CR', value: '11%' },
            ],
            results: [
              'Побудували intent-воронки',
              'Розробили креативи, що викликають довіру',
              'Впровадили систему кваліфікації лідів',
              'Оптимізували під якість, а не обсяг',
            ],
          },
          {
            id: 3,
            title: 'Залучення користувачів в iGaming',
            subtitle: 'Масштабований performance-трафік',
            image: case3,
            goal: 'Масштабування користувацького трафіку з контролем CPA та retention.',
            metrics: [
              { label: 'Витрачений бюджет', value: '$39000' },
              { label: 'GEO', value: 'Tier 1' },
              { label: 'CPI / CPA', value: '20$' },
              { label: 'Cost 1 follower', value: '$0.9' },
            ],
            results: [
              'Створили висококонверсійні відеокреативи',
              'Оптимізували події та post-install воронки',
              'Масштабували робочі GEO та плейсменти',
              'Знизили вартість залучення',
            ],
          },
        ],
      },
    };

    return dict[lang];
  }, [lang]);

  return (
    <section className="py-32 relative bg-white" key={lang}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            className="text-black text-sm font-mono uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {copy.headerKicker}
          </motion.span>

          <AnimatedText
            text={copy.headerTitle}
            className="text-4xl md:text-6xl font-display font-bold mt-4 text-black"
            delay={0.2}
          />

          <motion.p
            className="max-w-2xl mx-auto text-black/70 mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {copy.headerText}
          </motion.p>
        </div>

        {/* Cases */}
        <div className="space-y-24">
          {copy.cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-16 items-center`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Image */}
              <motion.div
                className="w-full lg:w-1/2 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] lg:aspect-[3/4]">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-volt text-black font-mono text-sm font-semibold rounded-full">
                      CASE #{caseItem.id}
                    </span>
                  </div>
                </div>

                <div className="absolute -inset-1 bg-gradient-to-r from-volt/30 to-volt/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-black mb-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-black/60 font-mono text-sm uppercase tracking-wider">
                    {caseItem.subtitle}
                  </p>
                </div>

                <div className="bg-white border border-black/10 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-volt" />
                    {copy.goalLabel}
                  </h4>
                  <p className="text-black/70 leading-relaxed">{caseItem.goal}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {caseItem.metrics.map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      className="bg-white border border-black/10 rounded-lg p-4 hover:border-black transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <span className="text-black/60 font-mono text-xs uppercase tracking-wider block mb-1">
                        {metric.label}
                      </span>
                      <span className="text-black font-display font-bold text-xl">
                        {metric.value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-black mb-4">
                    {copy.whatWeDidLabel}
                  </h4>
                  <ul className="space-y-3">
                    {caseItem.results.map((result, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <span className="w-7 h-7 rounded-full bg-volt text-black font-mono text-xs font-bold flex items-center justify-center mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-black/80">{result}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CasesSection;
