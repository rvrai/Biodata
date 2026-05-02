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
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  color: 'var(--text-secondary)',
  fontSize: '0.85rem',
  fontWeight: 500,
};

const btnStyle = {
  padding: '8px 18px',
  borderRadius: '8px',
  border: 'none',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '0.85rem',
};

const SocialLinksEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('order', { ascending: true });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  const startNew = () => {
    setEditing('new');
    setForm({ platform: '', label: '', url: '' });
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ platform: item.platform, label: item.label, url: item.url });
  };

  const handleSave = async () => {
    setMsg('');
    try {
      if (editing === 'new') {
        const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.order || 0)) : 0;
        const { error } = await supabase.from('social_links').insert({
          platform: form.platform,
          label: form.label,
          url: form.url,
          order: maxOrder + 1,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('social_links').update({
          platform: form.platform,
          label: form.label,
          url: form.url,
        }).eq('id', editing);
        if (error) throw error;
      }
      setEditing(null);
      setMsg('Saved!');
      fetchItems();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this link?')) return;
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (!error) fetchItems();
  };

  const handleToggle = async (id) => {
    const item = items.find(i => i.id === id);
    const { error } = await supabase.from('social_links').update({ is_visible: !item.is_visible }).eq('id', id);
    if (!error) fetchItems();
  };

  const platformIcons = { linkedin: '💼', github: '🐙', email: '📧', twitter: '🐦', instagram: '📸', youtube: '📺', website: '🌐' };

  if (loading) return <div style={{ color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.3rem' }}>Site Settings</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage social links & site configuration</p>
        </div>
        <button onClick={startNew} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>
          + Add Link
        </button>
      </div>

      {msg && <div style={{ color: msg.startsWith('Error') ? '#ef4444' : '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>{msg}</div>}

      {editing && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--accent-primary)' }}>{editing === 'new' ? 'New Social Link' : 'Edit Link'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Platform</label>
              <select style={inputStyle} value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
                <option value="">Select...</option>
                {['linkedin', 'github', 'email', 'twitter', 'instagram', 'youtube', 'website'].map(p => (
                  <option key={p} value={p} style={{ background: '#1a1a2e' }}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Label</label>
              <input style={inputStyle} value={form.label} onChange={e => setForm({ ...form, label: e.target.value })} placeholder="Display name" />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>URL</label>
              <input style={inputStyle} value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={handleSave} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>Save</button>
            <button onClick={() => setEditing(null)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map(item => (
          <div key={item.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '15px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.08)',
            opacity: item.is_visible ? 1 : 0.4,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '1.4rem' }}>{platformIcons[item.platform] || '🔗'}</span>
              <div>
                <h4 style={{ fontSize: '1rem' }}>{item.label}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.url}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => handleToggle(item.id)} style={{ ...btnStyle, background: item.is_visible ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: item.is_visible ? '#10b981' : '#ef4444' }}>
                {item.is_visible ? 'Visible' : 'Hidden'}
              </button>
              <button onClick={() => startEdit(item)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ ...btnStyle, background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SocialLinksEditor;
