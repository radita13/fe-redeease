import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  direction = 'up',
  duration = 0.6,
  delay = 0,
  threshold = 0.15,
  className = '',
}) {
  const getVariants = () => {
    const hidden = { opacity: 0 };
    const visible = { opacity: 1 };

    switch (direction) {
      case 'up':
        hidden.y = 50;
        visible.y = 0;
        break;
      case 'down':
        hidden.y = -50;
        visible.y = 0;
        break;
      case 'left':
        hidden.x = 50;
        visible.x = 0;
        break;
      case 'right':
        hidden.x = -50;
        visible.x = 0;
        break;
      case 'fade':
      default:
        break;
    }

    return {
      hidden,
      visible,
    };
  };

  const variants = getVariants();

  return (
    <motion.div
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
