import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  speed?: number;
}

const Marquee = ({ items, reverse = false, speed = 30 }: MarqueeProps) => {
  return (
    <div className="relative overflow-hidden py-6 border-y border-border/20">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: reverse ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-8 text-4xl md:text-6xl font-display font-bold text-foreground/10 hover:text-volt transition-colors duration-300"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
