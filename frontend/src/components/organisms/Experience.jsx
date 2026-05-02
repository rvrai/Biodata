import React from 'react';
import { motion } from 'framer-motion';

const Experience = ({ experiences }) => {
  return (
    <section id="experience" className="section-padding container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.35em', marginBottom: '0.5rem' }}>
          Education & Work
        </p>
        <h2 style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '700', color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', margin: 0 }}>
          Experience
        </h2>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
        {/* Vertical Timeline Line */}
        <div style={{
          position: 'absolute',
          left: '30px',
          top: '20px',
          bottom: '20px',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--glass-border), transparent)'
        }} />

        {experiences?.map((exp, idx) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            style={{
              position: 'relative',
              paddingLeft: '80px',
              marginBottom: '3rem'
            }}
          >
            {/* Glowing Dot */}
            <div style={{
              position: 'absolute',
              left: '21px',
              top: '25px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: exp.is_current ? 'var(--accent-primary)' : 'var(--bg-primary)',
              border: `4px solid ${exp.is_current ? 'var(--bg-primary)' : 'var(--accent-secondary)'}`,
              boxShadow: exp.is_current ? '0 0 15px var(--accent-primary)' : '0 0 10px rgba(34, 211, 238, 0.5)',
              zIndex: 2
            }} />

            <div className="glass hover-lift" style={{ padding: '2.5rem', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.3rem' }}>{exp.role}</h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{exp.company}</div>
                </div>
                <div style={{ 
                  padding: '6px 16px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--glass-border)',
                  borderRadius: '20px',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.85rem',
                  color: 'var(--accent-saffron)'
                }}>
                  {exp.period}
                </div>
              </div>

              {exp.description && (
                <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{exp.description}</p>
              )}

              {exp.highlights && exp.highlights.length > 0 && (
                <ul style={{ marginTop: '1.5rem', paddingLeft: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {exp.highlights.map((item, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
