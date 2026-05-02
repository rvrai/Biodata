import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      
      localStorage.setItem('adminToken', data.session.access_token);
      onLogin();
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'var(--bg-primary)'
    }}>
      <form 
        onSubmit={handleSubmit}
        className="glass"
        style={{
          padding: '3rem',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'var(--accent-primary)', marginBottom: '1rem' }}>Admin Access</h2>
        
        {error && <div style={{ color: '#ef4444', textAlign: 'center' }}>{error}</div>}
        
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email address" 
          required 
          style={{
            padding: '15px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            outline: 'none'
          }} 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
          style={{
            padding: '15px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            outline: 'none'
          }} 
        />
        <button 
          type="submit" 
          style={{
            padding: '15px',
            borderRadius: '10px',
            background: 'var(--accent-primary)',
            color: '#000',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
