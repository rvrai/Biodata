import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => (
  <main
    id="main"
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 20px',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
    }}
  >
    <motion.h1
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ fontSize: 'clamp(5rem, 20vw, 10rem)', fontFamily: 'JetBrains Mono', color: 'var(--accent-primary)', margin: 0 }}
    >
      404
    </motion.h1>
    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ fontSize: '1.4rem', margin: '1rem 0 0.5rem' }}>
      Lost in the galaxy.
    </motion.p>
    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
      The page you're looking for doesn't exist.
    </motion.p>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
      <Link to="/" style={{ padding: '0.75rem 2rem', borderRadius: '999px', background: 'var(--accent-primary)', color: '#000', fontWeight: 700, textDecoration: 'none', fontFamily: 'JetBrains Mono' }}>
        ← Back to Home
      </Link>
    </motion.div>
  </main>
);

export default NotFound;
