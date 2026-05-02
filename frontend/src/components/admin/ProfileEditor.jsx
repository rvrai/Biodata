import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const inputStyle = {
  width: '100%',
  padding: '12px 15px',
  borderRadius: '10px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.15)',
  color: '#fff',
  outline: 'none',
  fontSize: '0.95rem',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  color: 'var(--text-secondary)',
  fontSize: '0.85rem',
  fontWeight: 500,
};

const ProfileEditor = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('content_entries')
        .select('*')
        .eq('section', 'personal_info')
        .single();
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    try {
      const { error } = await supabase
        .from('content_entries')
        .update({
          name: profile.name,
          title: profile.title,
          summary: profile.summary,
          email: profile.email,
          contact_info: profile.contact_info,
          linkedin: profile.linkedin,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);
      if (error) throw error;
      setMsg('Profile saved successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const update = (field, value) => setProfile({ ...profile, [field]: value });

  if (loading) return <div style={{ color: 'var(--text-secondary)', padding: '2rem' }}>Loading profile...</div>;
  if (!profile) return <div style={{ color: '#ef4444', padding: '2rem' }}>No profile entry found in database.</div>;

  return (
    <>
      <h2 style={{ marginBottom: '0.5rem' }}>Profile Info</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Edit your personal details displayed on the portfolio hero and about sections.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input style={inputStyle} value={profile.name || ''} onChange={e => update('name', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Title / Designation</label>
          <input style={inputStyle} value={profile.title || ''} onChange={e => update('title', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input style={inputStyle} value={profile.email || ''} onChange={e => update('email', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Phone</label>
          <input style={inputStyle} value={profile.contact_info || ''} onChange={e => update('contact_info', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>LinkedIn URL</label>
          <input style={inputStyle} value={profile.linkedin || ''} onChange={e => update('linkedin', e.target.value)} />
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label style={labelStyle}>Bio / Summary</label>
        <textarea
          style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
          value={profile.summary || ''}
          onChange={e => update('summary', e.target.value)}
        />
      </div>

      <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: '12px 30px',
            borderRadius: '10px',
            background: 'var(--accent-primary)',
            color: '#000',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {msg && (
          <span style={{ color: msg.startsWith('Error') ? '#ef4444' : '#10b981', fontSize: '0.9rem' }}>
            {msg}
          </span>
        )}
      </div>
    </>
  );
};

export default ProfileEditor;
