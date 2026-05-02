import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioService } from '../../services/api';
import LiquidButton from '../atoms/LiquidButton';

const Contact = ({ socialLinks }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:rvrai1998@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
    setStatus({ type: 'success', msg: 'Opening your email client...' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const workflowSteps = ['IDEA', 'PLAN', 'AI HELP', 'CODE', 'REVIEW', 'TEST', 'LEARN'];

  return (
    <section id="contact" className="section-padding container">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Skills · Workflow · Identity</p>
        <h2 style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          Reach Out <span style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontFamily: 'JetBrains Mono' }}>/ WORKFLOW</span>
        </h2>
      </div>

      {/* Workflow Pipeline Visualization */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1000px',
        margin: '0 auto 5rem auto',
        position: 'relative',
        overflowX: 'auto',
        padding: '1rem 0'
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '20px', right: '20px', height: '1px', background: 'var(--glass-border)', zIndex: -1 }} />
        {workflowSteps.map((step, i) => {
          const isCode = step === 'CODE';
          return (
            <motion.div 
              key={step} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', minWidth: '80px' }}
            >
              <div 
                className="glass" 
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  background: isCode ? 'rgba(0, 217, 255, 0.15)' : 'var(--glass-bg)', 
                  border: isCode ? '1px solid var(--accent-primary)' : '1px solid var(--glass-border)',
                  boxShadow: isCode ? '0 0 20px rgba(0, 217, 255, 0.2)' : 'none',
                  fontFamily: 'JetBrains Mono',
                  fontSize: '0.9rem',
                  color: isCode ? 'var(--accent-primary)' : 'var(--text-secondary)'
                }}
              >
                {isCode ? '</>' : `0${i + 1}`}
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                fontFamily: 'JetBrains Mono', 
                color: isCode ? 'var(--accent-primary)' : 'var(--text-secondary)',
                letterSpacing: '0.05em'
              }}>
                {step}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <form onSubmit={handleSubmit} className="glass" style={{ padding: '3rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontFamily: 'JetBrains Mono', color: 'var(--accent-primary)' }}>Send a Message</h3>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required style={inputStyle} />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required style={inputStyle} />
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" style={inputStyle} />
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" required rows="5" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
            
            <button type="submit" style={{ 
              padding: '1rem', 
              borderRadius: '12px', 
              background: 'var(--text-primary)', 
              color: 'var(--bg-primary)', 
              fontWeight: 'bold', 
              border: 'none', 
              cursor: 'none',
              fontFamily: 'JetBrains Mono',
              marginTop: '1rem',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {status.type === 'loading' ? 'Sending...' : 'Transmit Message'}
            </button>
            {status.msg && <div style={{ color: status.type === 'success' ? '#10b981' : '#ef4444', textAlign: 'center', marginTop: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}>{status.msg}</div>}
          </form>
        </motion.div>

        {/* Hit Me Up Links */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Hit Me Up</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {socialLinks?.map(link => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noreferrer"
                className="glass hover-lift"
                style={{
                  padding: '1.5rem',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'background 0.3s'
                }}
              >
                <span style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}>
                  {link.platform === 'linkedin' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                  ) : link.platform === 'github' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  ) : link.platform === 'email' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  )}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{link.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  padding: '1rem 1.5rem',
  borderRadius: '12px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--glass-border)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'inherit',
  fontSize: '1rem',
  transition: 'border-color 0.3s'
};

export default Contact;
