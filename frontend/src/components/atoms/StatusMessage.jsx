import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AsyncStatus } from '../../utils/result';

const COLORS = {
  [AsyncStatus.SUCCESS]: '#16a34a',
  [AsyncStatus.ERROR]: '#dc2626',
  [AsyncStatus.LOADING]: 'var(--accent-primary)',
};

/**
 * Atom: renders a success / error / loading message with an animated
 * entrance, mapped from the unified Result/AsyncStatus model.
 *
 * @param {{ status?: string, message?: string }} props
 */
const StatusMessage = ({ status, message }) => {
  if (!message) return null;
  const color = COLORS[status] || 'var(--text-secondary)';
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        role="status"
        aria-live="polite"
        style={{ color, fontFamily: 'JetBrains Mono', fontSize: '0.9rem', margin: '0.5rem 0' }}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusMessage;
