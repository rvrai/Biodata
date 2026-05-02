import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidButton from '../atoms/LiquidButton';

const FALLBACK_TITLES = ["ANDROID", "PROGRAMMER", "DEVELOPER", "ENGINEER"];
const FALLBACK_CONFIG = {
  greeting: "Hello! I'm",
  subtitle: 'A passionate <accent>Senior Android</accent> Developer',
  tagline: 'Building scalable, high-performance mobile applications using modern <b>Android architecture</b> and <b>practices.</b>',
  cta_text: 'Download Resume',
  cta_link: '/Raj_Vaibhav_Rai_Android.pdf',
};
const FALLBACK_BUBBLES = [
  { label: 'Kotlin', icon: 'Kt', color: '#7F52FF', pos_x: '-300px', pos_y: '-200px' },
  { label: 'Android', icon: '🤖', color: '#3DDC84', pos_x: '280px', pos_y: '-280px' },
  { label: 'Jetpack', icon: '📦', color: '#4285F4', pos_x: '-380px', pos_y: '60px' },
  { label: 'Firebase', icon: '🔥', color: '#FFCA28', pos_x: '400px', pos_y: '-40px' },
  { label: 'Java', icon: '☕', color: '#f89820', pos_x: '-300px', pos_y: '250px' },
  { label: 'Room DB', icon: '🗄️', color: '#00B0FF', pos_x: '310px', pos_y: '230px' },
  { label: 'Hilt/Dagger', icon: '🗡️', color: '#D81B60', pos_x: '-130px', pos_y: '360px' },
  { label: 'Figma', icon: '🎨', color: '#F24E1E', pos_x: '150px', pos_y: '380px' },
  { label: 'Git', icon: '◆', color: '#f34f29', pos_x: '0px', pos_y: '480px' },
];

const Hero = ({ profile, section }) => {
  const [titles, setTitles] = useState(FALLBACK_TITLES);
  const [titleIdx, setTitleIdx] = useState(0);
  const [config, setConfig] = useState(FALLBACK_CONFIG);
  const [bubbles, setBubbles] = useState(FALLBACK_BUBBLES);

  useEffect(() => {
    const loadHeroData = async () => {
      try {
        const { supabase } = await import('../../lib/supabase.js');
        const [configRes, titlesRes, bubblesRes] = await Promise.all([
          supabase.from('hero_config').select('*').single(),
          supabase.from('hero_slider_titles').select('*').eq('is_visible', true).order('order'),
          supabase.from('hero_bubbles').select('*').eq('is_visible', true).order('order'),
        ]);
        if (configRes.data) setConfig(configRes.data);
        if (titlesRes.data && titlesRes.data.length > 0) setTitles(titlesRes.data.map(t => t.title));
        if (bubblesRes.data && bubblesRes.data.length > 0) setBubbles(bubblesRes.data);
      } catch (err) {
        console.warn('Hero: Using fallback data', err);
      }
    };
    loadHeroData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx(prev => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles]);

  return (
    <section 
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: '0 5%',
        overflow: 'hidden',
        textAlign: 'center'
      }}
    >
      {/* Background Circular Rings */}
      <div className="bg-ring bg-ring-1" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%', zIndex: 0 }} />
      <div className="bg-ring bg-ring-2" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%', zIndex: 0 }} />
      <div className="bg-ring bg-ring-3" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%', zIndex: 0 }} />

      {/* Orbiting Tech Icons - Dynamic from DB */}
      {bubbles.map((bubble, i) => (
        <div key={bubble.id || i} className="orbit-icon" style={{ top: '50%', left: '50%', transform: `translate(calc(-50% + ${bubble.pos_x}), calc(-50% + ${bubble.pos_y}))`, animationDelay: `${i * 0.3}s` }}>
          <div className="glass" style={{ padding: '8px', borderRadius: '12px' }}><span style={{ color: bubble.color, fontSize: '14px', fontWeight: 'bold' }}>{bubble.icon}</span></div>
          <span style={{ fontSize: '10px', color: bubble.color, marginTop: '4px' }}>{bubble.label}</span>
        </div>
      ))}

      {/* Floating Mail Icon Right Bottom */}
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', zIndex: 10 }}>
        <a href="#contact" className="glass hover-lift" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-primary)', textDecoration: 'none' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </a>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ maxWidth: '900px', width: '100%', zIndex: 2, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1rem', 
          letterSpacing: '0.4em', 
          marginBottom: '1.5rem', 
          fontFamily: 'Comfortaa',
          textTransform: 'uppercase'
        }}>
          {config.greeting}
        </p>
        <h1 
          style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', 
            fontWeight: '700', 
            margin: '0 0 0.5rem 0',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            textShadow: '0 0 20px rgba(255,255,255,0.1)',
            whiteSpace: 'nowrap'
          }}
        >
          {profile?.name || 'Ayush Raj'}
        </h1>
        <h2 style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', color: 'var(--text-secondary)', marginBottom: '1rem', fontWeight: '400', whiteSpace: 'nowrap' }} dangerouslySetInnerHTML={{ __html: config.subtitle.replace(/<accent>/g, '<span style="color: var(--accent-primary)">').replace(/<\/accent>/g, '</span>') }} />
        
        {/* In-flow Gradient Text Slider */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', height: 'clamp(4rem, 15vw, 9.5rem)', margin: '0.5rem 0 1rem 0' }}>
          <AnimatePresence mode="wait">
            <motion.span 
              key={titleIdx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                fontSize: 'clamp(2.5rem, 11vw, 8.5rem)',
                fontFamily: 'Comfortaa',
                fontWeight: '700',
                background: 'linear-gradient(to right, var(--accent-saffron), var(--accent-primary))',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                whiteSpace: 'nowrap',
                lineHeight: '1.1',
                letterSpacing: '-0.02em'
              }}
            >
              {titles[titleIdx]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Pagination Dots Slider */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '0.5rem 0 2.5rem 0' }}>
          {titles.map((_, idx) => (
            <div 
              key={idx}
              onClick={() => setTitleIdx(idx)}
              style={{ 
                width: idx === titleIdx ? '24px' : '6px', 
                height: '6px', 
                borderRadius: '3px', 
                background: idx === titleIdx ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} 
            />
          ))}
        </div>

        <p style={{ 
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', 
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto 2.5rem auto',
          lineHeight: '1.8'
        }}>
          Building scalable, high-performance mobile applications using modern <span style={{color: '#fff', fontWeight: 'bold'}}>Android architecture</span> and <span style={{color: '#fff', fontWeight: 'bold'}}>practices.</span>
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyItems: 'center', flexWrap: 'wrap' }}>
          <a href={config.cta_link} download className="glass hover-lift" style={{ 
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '0.8rem 1.5rem', borderRadius: '30px', color: 'var(--accent-primary)', textDecoration: 'none',
            fontSize: '1rem', border: '1px solid rgba(0,217,255,0.3)', background: 'rgba(0,217,255,0.05)'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
            {config.cta_text}
          </a>
        </div>
      </motion.div>

      <style>{`
        @keyframes floatOrbit {
          0%, 100% { margin-top: 0px; }
          50% { margin-top: -15px; }
        }
        .orbit-icon {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.7;
          z-index: 0;
          animation: floatOrbit 4s ease-in-out infinite;
        }
        .bg-ring {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.03);
          border-radius: 50%;
          z-index: 0;
        }
        .bg-ring-1 { width: 300px; height: 300px; }
        .bg-ring-2 { width: 600px; height: 600px; }
        .bg-ring-3 { width: 900px; height: 900px; }
        
        @media (max-width: 1024px) {
          .bg-ring-3 { display: none; }
          .orbit-icon { transform: scale(0.8); }
        }
        @media (max-width: 768px) {
          .orbit-icon { display: none; }
          .bg-ring-2 { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
