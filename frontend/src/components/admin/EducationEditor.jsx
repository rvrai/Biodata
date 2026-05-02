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

const EducationEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('content_entries')
      .select('*')
      .eq('section', 'education')
      .is('deleted_at', null)
      .order('year', { ascending: false });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  const startNew = () => {
    setEditing('new');
    setForm({ degree: '', institution: '', year: '', grade: '' });
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      degree: item.degree || '',
      institution: item.institution || '',
      year: item.year || '',
      grade: item.grade || '',
    });
  };

  const handleSave = async () => {
    setMsg('');
    try {
      const payload = {
        degree: form.degree,
        institution: form.institution,
        year: form.year ? parseInt(form.year) : null,
        grade: form.grade,
      };
      if (editing === 'new') {
        const { error } = await supabase.from('content_entries').insert({ section: 'education', ...payload });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('content_entries').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', editing);
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
    if (!confirm('Delete this education entry?')) return;
    const { error } = await supabase.from('content_entries')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) fetchItems();
  };

  if (loading) return <div style={{ color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.3rem' }}>Education</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} entries</p>
        </div>
        <button onClick={startNew} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>
          + Add Education
        </button>
      </div>

      {msg && <div style={{ color: msg.startsWith('Error') ? '#ef4444' : '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>{msg}</div>}

      {editing && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--accent-primary)' }}>{editing === 'new' ? 'New Entry' : 'Edit Entry'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Degree</label>
              <input style={inputStyle} value={form.degree} onChange={e => setForm({ ...form, degree: e.target.value })} placeholder="e.g. B.Tech/B.E." />
            </div>
            <div>
              <label style={labelStyle}>Institution</label>
              <input style={inputStyle} value={form.institution} onChange={e => setForm({ ...form, institution: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Year</label>
              <input style={inputStyle} type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Grade</label>
              <input style={inputStyle} value={form.grade} onChange={e => setForm({ ...form, grade: e.target.value })} placeholder="e.g. 7.4/10" />
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
          }}>
            <div>
              <h4 style={{ fontSize: '1rem' }}>{item.degree}</h4>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)' }}>{item.institution}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '12px' }}>{item.year} • {item.grade}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => startEdit(item)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ ...btnStyle, background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default EducationEditor;
