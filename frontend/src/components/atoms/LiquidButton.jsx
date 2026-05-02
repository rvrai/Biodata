import React from 'react';

const LiquidButton = ({ children, href, onClick, primary = true }) => {
  return (
    <a 
      href={href}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderRadius: '30px',
        fontWeight: 'bold',
        textDecoration: 'none',
        overflow: 'hidden',
        color: primary ? '#000' : 'var(--text-primary)',
        background: primary ? 'var(--accent-primary)' : 'var(--glass-bg)',
        border: primary ? 'none' : '1px solid var(--glass-border)',
        zIndex: 1,
        transition: 'all 0.3s ease',
        cursor: 'none' // to work with GlassCursor
      }}
      className="liquid-btn"
    >
      <span style={{ zIndex: 2 }}>{children}</span>
      <style>{`
        .liquid-btn::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: ${primary ? 'var(--accent-saffron)' : 'rgba(255,255,255,0.1)'};
          transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1;
        }
        .liquid-btn:hover::before {
          height: 100%;
        }
        .liquid-btn:hover {
          color: ${primary ? '#000' : 'var(--accent-primary)'};
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 217, 255, 0.2);
        }
      `}</style>
    </a>
  );
};

export default LiquidButton;
