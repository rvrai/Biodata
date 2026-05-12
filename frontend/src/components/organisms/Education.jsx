import React from 'react';
import { motion } from 'framer-motion';

const Education = ({ education }) => {
  return (
    <section id="education" className="section-padding container">
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', display: 'block' }}>Academic Background</span>
        Education
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {education?.map((edu, idx) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass"
            style={{ padding: '2rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
          >
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>{edu.degree} {edu.specialization && `in ${edu.specialization}`}</h3>
              <div style={{ color: 'var(--text-secondary)' }}>{edu.institution}</div>
              {edu.grade && <div style={{ marginTop: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }}>Grade: {edu.grade}</div>}
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#fff' }}>
              {edu.year}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education;
