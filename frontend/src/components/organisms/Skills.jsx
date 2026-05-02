import React from 'react';
import { motion } from 'framer-motion';

const Skills = ({ skills }) => {
  // Group skills by category
  const groupedSkills = skills?.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="section-padding container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.35em', marginBottom: '0.5rem' }}>
          Skills · Workflow · Identity
        </p>
        <h2 style={{ fontFamily: 'Comfortaa, cursive', fontWeight: '700', color: '#fff', fontSize: 'clamp(2rem, 5vw, 3rem)', margin: 0 }}>
          Tech Stack
        </h2>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2.5rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {groupedSkills && Object.entries(groupedSkills).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass hover-lift"
            style={{ padding: '2.5rem', borderRadius: '24px' }}
          >
            <h3 style={{ 
              textTransform: 'uppercase', 
              color: 'var(--accent-primary)', 
              marginBottom: '2rem',
              letterSpacing: '0.15em',
              fontSize: '1rem',
              fontFamily: 'JetBrains Mono',
              borderBottom: '1px solid var(--glass-border)',
              paddingBottom: '0.8rem'
            }}>
              {category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {items.map(skill => (
                <div 
                  key={skill.id}
                  style={{
                    padding: '8px 18px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'JetBrains Mono',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.color = 'var(--accent-primary)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
