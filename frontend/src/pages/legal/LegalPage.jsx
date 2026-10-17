import React from 'react';
import { Link } from 'react-router-dom';

const h2Style = {
  fontSize: '1.5rem',
  margin: '2rem 0 0.75rem',
  color: 'var(--accent-primary)',
  borderBottom: '1px solid var(--glass-border)',
  paddingBottom: '0.5rem',
};
const pStyle = { margin: '1rem 0', lineHeight: '1.8' };
const ulStyle = { paddingLeft: '1.5rem', margin: '1rem 0' };
const liStyle = { margin: '0.5rem 0', lineHeight: '1.7' };
const aStyle = { color: 'var(--accent-primary)', textDecoration: 'underline' };

export const H2 = ({ children }) => <h2 style={h2Style}>{children}</h2>;
export const P = ({ children }) => <p style={pStyle}>{children}</p>;
export const UL = ({ children }) => <ul style={ulStyle}>{children}</ul>;
export const LI = ({ children }) => <li style={liStyle}>{children}</li>;
export const A = ({ href, children }) =>
  href.startsWith('/') ? (
    <Link to={href} style={aStyle}>{children}</Link>
  ) : (
    <a href={href} style={aStyle}>{children}</a>
  );

const LegalPage = ({ title, lastUpdated, children }) => (
  <main
    id="main"
    style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      padding: '120px 20px 80px',
    }}
  >
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      <Link
        to="/"
        aria-label="Back to portfolio home"
        style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}
      >
        ← Back to Portfolio
      </Link>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.75rem)', margin: '1.25rem 0 0.5rem', color: 'var(--text-primary)' }}>{title}</h1>
      {lastUpdated && (
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0 0 1.5rem' }}>
          Last updated: {lastUpdated}
        </p>
      )}
      <div>{children}</div>
    </div>
  </main>
);

export default LegalPage;
