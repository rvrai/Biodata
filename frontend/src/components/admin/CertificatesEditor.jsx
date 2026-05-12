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

const CertificatesEditor = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('order', { ascending: true })
      .order('created_at', { ascending: true });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  const startNew = () => {
    setEditing('new');
    setForm({ title: '', issuer: '', issue_date: '', image_url: '' });
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      title: item.title || '',
      issuer: item.issuer || '',
      issue_date: item.issue_date || '',
      image_url: item.image_url || '',
    });
  };

  const handleSave = async () => {
    setMsg('');
    try {
      const payload = {
        title: form.title,
        issuer: form.issuer,
        issue_date: form.issue_date || null,
        image_url: form.image_url,
      };

      if (editing === 'new') {
        const { error } = await supabase.from('certificates').insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('certificates').update(payload).eq('id', editing);
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
    if (!confirm('Delete this certificate?')) return;
    const { error } = await supabase.from('certificates').delete().eq('id', id);
    if (!error) fetchItems();
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
    
    const updates = newItems.map((item, idx) => ({
      id: item.id,
      title: item.title, // Include title for upsert safety
      order: idx + 1,
    }));
    await supabase.from('certificates').upsert(updates);
    fetchItems();
  };

  const handleMoveDown = async (index) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems);
    
    const updates = newItems.map((item, idx) => ({
      id: item.id,
      title: item.title,
      order: idx + 1,
    }));
    await supabase.from('certificates').upsert(updates);
    fetchItems();
  };

  if (loading) return <div style={{ color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.3rem' }}>Certificates</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} certificates</p>
        </div>
        <button onClick={startNew} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>
          + Add Certificate
        </button>
      </div>

      {msg && <div style={{ color: msg.startsWith('Error') ? '#ef4444' : '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>{msg}</div>}

      {editing && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--accent-primary)' }}>{editing === 'new' ? 'New Certificate' : 'Edit Certificate'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Certificate Title</label>
              <input style={inputStyle} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Issuer</label>
              <input style={inputStyle} value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>Issue Date</label>
              <input type="date" style={inputStyle} value={form.issue_date} onChange={e => setForm({ ...form, issue_date: e.target.value })} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Image URL</label>
              <input style={inputStyle} value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={handleSave} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>Save</button>
            <button onClick={() => setEditing(null)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, idx) => (
          <div key={item.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '15px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button onClick={() => handleMoveUp(idx)} disabled={idx === 0} style={{ background: 'none', border: 'none', cursor: 'pointer', color: idx === 0 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: '1rem' }}>▲</button>
                <button onClick={() => handleMoveDown(idx)} disabled={idx === items.length - 1} style={{ background: 'none', border: 'none', cursor: 'pointer', color: idx === items.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: '1rem' }}>▼</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {item.image_url && <img src={item.image_url} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover', background: 'rgba(255,255,255,0.1)' }} />}
                <div>
                  <h4 style={{ fontSize: '1rem', margin: 0 }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>{item.issuer} • {item.issue_date}</p>
                </div>
              </div>
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

export default CertificatesEditor;
