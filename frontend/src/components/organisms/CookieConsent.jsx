import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'cookie_consent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(false);
    }
  }, []);

  const decide = (choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* ignore storage errors */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100000,
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--glass-border)',
        color: 'var(--text-primary)',
        padding: '1rem 1.25rem',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            margin: 0,
            flex: '1 1 320px',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          We use only essential local storage to remember your choice (and to keep admins signed in). We do{' '}
          <strong style={{ color: 'var(--text-primary)' }}>not</strong> use tracking or advertising cookies.{' '}
          <Link to="/legal/cookies" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
            Cookie Policy
          </Link>{' '}
          ·{' '}
          <Link to="/legal/privacy" style={{ color: 'var(--accent-primary)', textDecoration: 'underline' }}>
            Privacy Policy
          </Link>
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => decide('accepted')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '999px',
              border: 'none',
              background: 'var(--accent-primary)',
              color: '#000',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono',
            }}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => decide('declined')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '999px',
              border: '1px solid var(--glass-border)',
              background: 'transparent',
              color: 'var(--text-primary)',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'JetBrains Mono',
            }}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
