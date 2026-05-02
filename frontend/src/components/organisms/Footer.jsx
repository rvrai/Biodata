import React from 'react';

const Footer = ({ profile }) => {
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
        gap: '2rem'
      }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'JetBrains Mono' }}>
          © {new Date().getFullYear()} {profile?.name?.toUpperCase() || 'DEVELOPER'}.
        </div>
        

      </div>
    </footer>
  );
};

export default Footer;
