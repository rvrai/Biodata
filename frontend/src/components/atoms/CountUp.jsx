import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/**
 * Atom: animates a number counting up when it scrolls into view.
 * @param {{ value: string, suffix?: string }} props
 */
const CountUp = ({ value, suffix = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20px' });
  const numeric = parseInt(String(value).replace(/[^0-9]/g, ''), 10) || 0;
  const trailing = String(value).replace(/^[0-9]+/, '');
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || numeric === 0) return;
    let start = null;
    const dur = 1200;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      setDisplay(Math.round(numeric * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, numeric]);

  return <span ref={ref}>{display}{trailing}{suffix}</span>;
};

export default CountUp;
