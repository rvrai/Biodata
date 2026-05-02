import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ profile, sections }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
    if (!isLightMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ position: 'fixed', top: scrolled ? '15px' : '30px', left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', pointerEvents: 'none', padding: '0 10px' }}>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.6rem 1rem',
          borderRadius: '50px',
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(10,10,10,0.8)' : 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          backdropFilter: 'blur(10px)',
          maxWidth: '100%',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
        className="hide-scrollbar"
      >
        <a href="#hero" style={{ 
          fontWeight: 'bold', 
          color: 'var(--accent-primary)', 
          fontSize: '1.2rem',
          textDecoration: 'none',
          paddingRight: '0.5rem'
        }}>
          rajvaibhavrai.site
        </a>

        <a href="#hero" style={{
          background: 'rgba(0, 217, 255, 0.1)',
          borderRadius: '10px',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-primary)',
          cursor: 'pointer',
          textDecoration: 'none'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </a>

        <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)', margin: '0 0.5rem' }} />
        
        <div className="nav-links" style={{ 
          display: 'flex', 
          gap: '1.2rem', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0,
          alignItems: 'center'
        }}>
          {['PROJECTS', 'EXPERIENCE', 'SKILLS', 'ABOUT'].map((label, idx) => {
            return (
              <li key={idx}>
                <a 
                  href={`#${label.toLowerCase()}`}
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseOver={(e) => e.target.style.color = '#fff'}
                  onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {label}
                </a>
              </li>
            );
          })}
          
          <li style={{ marginLeft: '0.2rem' }}>
            <a href="#contact" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid rgba(0, 217, 255, 0.3)',
              background: 'rgba(0, 217, 255, 0.05)',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
              transition: 'all 0.3s'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              CONTACT
            </a>
          </li>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            cursor: 'pointer', 
            color: 'var(--text-secondary)', 
            background: 'var(--glass-bg)',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--glass-border)'
          }} 
          onClick={toggleTheme}
          onMouseOver={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }} 
          onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
            {isLightMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </div>

          <div className="mobile-menu-btn" style={{ 
            cursor: 'pointer', 
            color: 'var(--text-secondary)', 
            background: 'rgba(255,255,255,0.05)',
            padding: '8px',
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </div>
        </div>
      </motion.nav>

      <style>{`
        .mobile-menu-btn { display: none; }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
