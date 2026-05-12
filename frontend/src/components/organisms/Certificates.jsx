import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Certificates = ({ certificates }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <section id="certificates" className="section-padding container">
      <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', display: 'block' }}>Professional Recognition</span>
        Certificates
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="glass hover-lift"
            style={{
              padding: '1.5rem',
              borderRadius: '20px',
              cursor: cert.image_url ? 'pointer' : 'default',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
            onClick={() => cert.image_url && setSelectedImg(cert)}
          >
            <div style={{
              width: '100%',
              aspectRatio: '16/10',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {cert.image_url ? (
                <img 
                  src={cert.image_url} 
                  alt={cert.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              ) : (
                <span style={{ fontSize: '3rem' }}>📜</span>
              )}
              {cert.image_url && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s'
                }} className="overlay-show">
                   <span style={{ color: '#fff', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.6)', padding: '5px 12px', borderRadius: '20px' }}>View Full 🔍</span>
                </div>
              )}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.3rem' }}>{cert.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', margin: 0 }}>{cert.issuer}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '8px' }}>{cert.issue_date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => setSelectedImg(null)}
          >
             <motion.div
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}
               onClick={e => e.stopPropagation()}
             >
                <button 
                  onClick={() => setSelectedImg(null)}
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '0',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '2rem',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
                <img 
                  src={selectedImg.image_url} 
                  alt={selectedImg.title} 
                  style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }} 
                />
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                   <h3 style={{ color: '#fff', margin: 0 }}>{selectedImg.title}</h3>
                   <p style={{ color: 'var(--accent-primary)' }}>{selectedImg.issuer}</p>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .glass.hover-lift:hover .overlay-show {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default Certificates;
