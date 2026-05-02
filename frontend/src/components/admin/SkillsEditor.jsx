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

const SkillsEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order', { ascending: true });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  const startNew = () => {
    setEditing('new');
    setForm({ name: '', category: '' });
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ name: item.name, category: item.category });
  };

  const handleSave = async () => {
    setMsg('');
    try {
      if (editing === 'new') {
        const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.order || 0)) : 0;
        const { error } = await supabase.from('skills').insert({
          name: form.name,
          category: form.category,
          order: maxOrder + 1,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('skills').update({
          name: form.name,
          category: form.category,
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
    if (!confirm('Delete this skill?')) return;
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (!error) fetchItems();
  };

  const handleToggle = async (id) => {
    const item = items.find(i => i.id === id);
    const { error } = await supabase.from('skills').update({ is_visible: !item.is_visible }).eq('id', id);
    if (!error) fetchItems();
  };

  // Group by category for display
  const categories = [...new Set(items.map(i => i.category))];

  if (loading) return <div style={{ color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.3rem' }}>Skills</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} skills across {categories.length} categories</p>
        </div>
        <button onClick={startNew} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>
          + Add Skill
        </button>
      </div>

      {msg && <div style={{ color: msg.startsWith('Error') ? '#ef4444' : '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>{msg}</div>}

      {editing && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--accent-primary)' }}>{editing === 'new' ? 'New Skill' : 'Edit Skill'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Skill Name</label>
              <input style={inputStyle} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <input style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Core, Android, Architecture" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={handleSave} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>Save</button>
            <button onClick={() => setEditing(null)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Cancel</button>
          </div>
        </div>
      )}

      {categories.map(cat => (
        <div key={cat} style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{cat}</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {items.filter(i => i.category === cat).map(item => (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 14px', borderRadius: '20px',
                background: item.is_visible ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.1)',
                opacity: item.is_visible ? 1 : 0.4,
              }}>
                <span style={{ fontSize: '0.9rem' }}>{item.name}</span>
                <button onClick={() => handleToggle(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.is_visible ? '#10b981' : '#ef4444', fontSize: '0.7rem' }}>
                  {item.is_visible ? '●' : '○'}
                </button>
                <button onClick={() => startEdit(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>✎</button>
                <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '0.7rem' }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default SkillsEditor;
