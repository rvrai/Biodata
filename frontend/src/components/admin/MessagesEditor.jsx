import React from 'react';

const MessagesEditor = () => {
  return (
    <>
      <h2 style={{ marginBottom: '0.5rem' }}>Messages</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Contact form submissions will appear here. This feature requires a Supabase messages table to be configured.
      </p>

      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'rgba(255,255,255,0.02)',
        borderRadius: '15px',
        border: '1px dashed rgba(255,255,255,0.1)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>📬</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>No messages yet</p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          When visitors submit the contact form, their messages will appear here.
        </p>
      </div>
    </>
  );
};

export default MessagesEditor;
