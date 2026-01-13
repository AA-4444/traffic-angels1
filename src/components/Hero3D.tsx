import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import bgVideo from "@/assets/bg1.mp4";

type Lang = "EN" | "RU" | "UA";

const EASE = [0.16, 1, 0.3, 1] as const;

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const wordVariants = {
  hidden: { y: "110%", opacity: 0, filter: "blur(6px)" },
  visible: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.25, ease: EASE },
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
        color: "hsl(var(--volt))",
        fontSize: "clamp(2.8rem, 9vw, 7rem)",
      }}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-flex overflow-hidden">
          <motion.span variants={wordVariants} className="inline-block whitespace-nowrap">
            {w}
          </motion.span>

          {i !== words.length - 1 ? (
            <span className="inline-block w-[0.24em]" aria-hidden="true">
              {" "}
            </span>
          ) : null}
        </span>
      ))}
    </motion.h1>
  );
}

export default function Hero3D() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lang, setLang] = useState<Lang>(
    () => (localStorage.getItem("volt_lang") as Lang) ?? "EN"
  );

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.7;
  }, []);

  useEffect(() => {
    const onLang = (e: Event) => {
      const ce = e as CustomEvent<{ lang: Lang }>;
      if (ce.detail?.lang) setLang(ce.detail.lang);
    };
    window.addEventListener("volt:lang", onLang as EventListener);
    return () => window.removeEventListener("volt:lang", onLang as EventListener);
  }, []);

  const copy = useMemo(() => {
    const dict: Record<Lang, { lines: string[]; contact: string; start: string }> = {
      EN: {
        lines: ["WE DRIVE", "PROFITABLE TRAFFIC", "TO GREY MARKETS"],
        contact: "Contact",
        start: "Get Started",
      },
      RU: {
        lines: ["МЫ ПРИВОДИМ ПРИБЫЛЬНЫЙ ТРАФИК", "В СЕРЫЕ НИШИ"],
        contact: "Контакты",
        start: "Начать",
      },
      UA: {
        lines: ["МИ ПРИВОДИМО ПРИБУТКОВИЙ", "ТРАФІК У СІРІ НІШІ"],
        contact: "Контакти",
        start: "Почати",
      },
    };
    return dict[lang];
  }, [lang]);

  const openLead = () => window.dispatchEvent(new CustomEvent("volt:open-lead"));

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* VIDEO BG */}
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

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-6xl flex-col px-6 pt-24 md:pt-28">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full text-center translate-y-6 md:translate-y-10">
            <div className="mx-auto max-w-[1100px] space-y-2">
              {copy.lines.map((line, i) => (
                <AnimatedLine key={`${lang}-${i}`} text={line} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA BAR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="relative z-30 -mx-6 mt-auto flex w-[calc(100%+48px)] flex-col md:flex-row"
        >
          {/* LEFT */}
          <a
            href="#contact"
            className="
              flex flex-1 items-center justify-center gap-4
              bg-[hsl(var(--volt))] text-black
              py-9 text-xl font-extrabold uppercase tracking-wider
              transition-colors hover:bg-[hsl(var(--volt))]/90
              rounded-tl-3xl rounded-tr-3xl
              md:rounded-tl-3xl md:rounded-tr-3xl
              md:py-10 md:text-2xl
            "
          >
            {copy.contact}
          </a>

          {/* RIGHT (НЕ прозрачная) */}
          <button
            type="button"
            onClick={openLead}
            className="
              flex flex-1 items-center justify-center gap-4
              bg-neutral-900 text-white
              py-9 text-xl font-extrabold uppercase tracking-wider
              transition-colors hover:bg-neutral-800
              rounded-none
              md:rounded-tl-3xl md:rounded-tr-3xl
              md:py-10 md:text-2xl
            "
          >
            {copy.start}
          </button>
        </motion.div>
      </div>
    </section>
  );
}