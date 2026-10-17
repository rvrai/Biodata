import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Thank-you modal shown after the contact form is submitted.
 * @param {{ open: boolean, onClose: () => void }} props
 */
const ThankYouModal = ({ open, onClose }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="dialog"
        aria-modal="true"
        aria-label="Thank you"
        style={{ position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(6px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '440px', width: '100%', borderRadius: '24px', padding: '2.5rem', textAlign: 'center', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)' }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙏</div>
          <h3 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Thank You!</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Your email client has been opened with your message. I'll get back to you as soon as possible.
          </p>
          <button
            type="button"
            onClick={onClose}
            style={{ padding: '0.75rem 2rem', borderRadius: '999px', border: 'none', background: 'var(--accent-primary)', color: '#000', fontWeight: 700, cursor: 'pointer', fontFamily: 'JetBrains Mono' }}
          >
            Close
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ThankYouModal;
