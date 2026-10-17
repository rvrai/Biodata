import React from 'react';
import { motion } from 'framer-motion';

/**
 * Atom / reusable animation wrapper.
 * Encapsulates the repeated "fade + slide in on scroll" pattern so every
 * section gets consistent scroll-responsive animation with less code.
 *
 * @param {{ children: React.ReactNode, delay?: number, y?: number, once?: boolean, [k: string]: any }} props
 */
const Reveal = ({ children, delay = 0, y = 20, once = true, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once }}
    transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Reveal;
