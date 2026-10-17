import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ profile }) => {
  const legalLinks = [
    { to: '/legal/privacy', label: 'Privacy Policy' },
    { to: '/legal/terms', label: 'Terms of Service' },
    { to: '/legal/refund', label: 'Refund Policy' },
    { to: '/legal/cookies', label: 'Cookie Policy' },
    { to: '/legal/licenses', label: 'Licenses' },
  ];

  return (
    <footer style={{
      borderTop: '1px solid var(--glass-border)',
      padding: '3rem 0',
      marginTop: '6rem',
      background: 'rgba(10,10,10,0.8)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'JetBrains Mono' }}>
          © {new Date().getFullYear()} {profile?.name?.toUpperCase() || 'DEVELOPER'}.
        </div>

        <nav aria-label="Legal" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
          {legalLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'JetBrains Mono' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
