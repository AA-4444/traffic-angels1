import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type As = 'button' | 'div' | 'a';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;

  as?: As;            
  href?: string;     
  target?: string;    
  rel?: string;       
  type?: 'button' | 'submit' | 'reset'; 
}

const MagneticButton = ({
  children,
  className = '',
  style,
  onClick,
  as = 'button',
  href,
  target,
  rel,
  type = 'button',
}: MagneticButtonProps) => {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLElement>) => {
	if (!ref.current) return;

	const { clientX, clientY } = e;
	const { left, top, width, height } = ref.current.getBoundingClientRect();
	const x = (clientX - (left + width / 2)) * 0.15;
	const y = (clientY - (top + height / 2)) * 0.15;

	setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const commonProps = {
	ref,
	className: `relative overflow-hidden ${className}`,
	style,
	onMouseMove: handleMouse,
	onMouseLeave: reset,
	onClick,
	animate: { x: position.x, y: position.y },
	transition: { type: 'spring', stiffness: 150, damping: 20, mass: 0.5 } as const,
	'data-cursor-hover': true,
  };

  if (as === 'a') {
	return (
	  <motion.a
		{...commonProps}
		href={href}
		target={target}
		rel={rel}
		role="button"
	  >
		{children}
	  </motion.a>
	);
  }

  if (as === 'div') {
	return (
	  <motion.div
		{...commonProps}
		role="button"
		tabIndex={0}
		onKeyDown={(e) => {
		  if (e.key === 'Enter' || e.key === ' ') onClick?.();
		}}
	  >
		{children}
	  </motion.div>
	);
  }

  return (
	<motion.button {...commonProps} type={type}>
	  {children}
	</motion.button>
  );
};

export default MagneticButton;