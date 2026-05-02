import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const About = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;
  const experience = data?.experience || [];
  const projects = data?.projects || [];

  const expYears = experience.length > 0 ? "5+" : "0";
  const projCount = projects.length > 0 ? `${projects.length}+` : "0";

  const pillars = [
    { title: "Growth", desc: "Constant learning and exploring new paradigms." },
    { title: "Focus", desc: "Deep work on efficiency and precision in every layer built." },
    { title: "Craft", desc: "Discipline and dedication in every single line of code." }
  ];

  return (
    <section id="about" className="section-padding container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.35em', marginBottom: '0.5rem' }}>
          Who I Am
        </p>
        <h2 style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '700', color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', margin: 0 }}>
          About Me
        </h2>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Top Row: Location & Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Location Hover Card (India representation) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass hover-lift"
            style={{
              flex: '1 1 300px',
              padding: '2.5rem',
              borderRadius: '24px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              minHeight: '250px'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🇮🇳</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{profile?.location || "India"}</h3>
            <p style={{ fontFamily: 'JetBrains Mono', color: 'var(--accent-saffron)', fontSize: '0.9rem' }}>
              25.59°N 85.14°E · GMT+5:30
            </p>
          </motion.div>

          {/* Impact Stats Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass hover-lift"
            style={{
              flex: '1 1 300px',
              padding: '2.5rem',
              borderRadius: '24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '250px'
            }}
          >
            <div style={{ display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', background: 'linear-gradient(to right, #00C6FF, #0072FF)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  {expYears}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '5px' }}>Years Exp</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', background: 'linear-gradient(to right, #FF6A00, #EE0979)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  {projCount}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '5px' }}>Apps Shipped</div>
              </div>
            </div>
            <div style={{ marginTop: '25px', fontSize: '0.95rem', color: 'var(--accent-saffron)', fontFamily: 'JetBrains Mono', textAlign: 'center', background: 'rgba(255,106,0,0.1)', padding: '8px 15px', borderRadius: '20px' }}>
              🚀 1M+ Downloads Impact
            </div>
          </motion.div>
        </div>

        {/* Bio Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass"
          style={{
            padding: '2.5rem',
            borderRadius: '24px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            {profile?.bio || "I'm a Senior Android Developer with over 5 years of experience building scalable, high-performance mobile applications. I care deeply about clean architecture, modern Android components, and delivering user-centric products."}
          </p>
        </motion.div>
      </div>

      {/* The Three Pillars */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '2rem auto 0 auto'
      }}>
        {pillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (idx * 0.1) }}
            className="glass hover-lift"
            style={{
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'left'
            }}
          >
            <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.2rem', margin: '0 0 1rem 0', fontFamily: 'JetBrains Mono' }}>
              {pillar.title}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
              {pillar.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
