import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  splitBy?: 'words' | 'chars';
}

const AnimatedText = ({ text, className = '', delay = 0, splitBy = 'words' }: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const items = splitBy === 'words' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: splitBy === 'words' ? 0.12 : 0.03,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {items.map((item, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={child}>
            {item}
            {splitBy === 'words' && index !== items.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
