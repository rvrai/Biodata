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

const ProjectsEditor = () => {
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
      .eq('section', 'project')
      .is('deleted_at', null)
      .order('order', { ascending: true })
      .order('created_at', { ascending: true });
    if (!error) setItems(data || []);
    setLoading(false);
  };

  const startNew = () => {
    setEditing('new');
    setForm({ project_name: '', project_description: '', project_url: '', project_tags: '' });
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      project_name: item.project_name || '',
      project_description: item.project_description || '',
      project_url: item.project_url || '',
      project_tags: (item.project_tags || []).join(', '),
    });
  };

  const handleSave = async () => {
    setMsg('');
    const tags = form.project_tags.split(',').map(t => t.trim()).filter(Boolean);
    try {
      if (editing === 'new') {
        const { error } = await supabase.from('content_entries').insert({
          section: 'project',
          project_name: form.project_name,
          project_description: form.project_description,
          project_url: form.project_url || null,
          project_tags: tags,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('content_entries').update({
          project_name: form.project_name,
          project_description: form.project_description,
          project_url: form.project_url || null,
          project_tags: tags,
          updated_at: new Date().toISOString(),
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
    if (!confirm('Delete this project?')) return;
    const { error } = await supabase.from('content_entries')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) fetchItems();
  };

  if (loading) return <div style={{ color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</div>;

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    
    // Update local state immediately for snappy UI
    setItems(newItems);
    
    // Send updates to DB
    const updates = newItems.map((item, idx) => ({
      id: item.id,
      order: idx + 1,
    }));
    await supabase.from('content_entries').upsert(updates);
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
      order: idx + 1,
    }));
    await supabase.from('content_entries').upsert(updates);
    fetchItems();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.3rem' }}>Projects</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{items.length} projects</p>
        </div>
        <button onClick={startNew} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>
          + Add Project
        </button>
      </div>

      {msg && <div style={{ color: msg.startsWith('Error') ? '#ef4444' : '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>{msg}</div>}

      {editing && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px', color: 'var(--accent-primary)' }}>{editing === 'new' ? 'New Project' : 'Edit Project'}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Project Name</label>
              <input style={inputStyle} value={form.project_name} onChange={e => setForm({ ...form, project_name: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>URL (Play Store / GitHub)</label>
              <input style={inputStyle} value={form.project_url} onChange={e => setForm({ ...form, project_url: e.target.value })} placeholder="https://..." />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} value={form.project_description} onChange={e => setForm({ ...form, project_description: e.target.value })} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Tech Stack (comma-separated)</label>
              <input style={inputStyle} value={form.project_tags} onChange={e => setForm({ ...form, project_tags: e.target.value })} placeholder="Kotlin, Jetpack, Firebase" />
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
              <div>
                <h4 style={{ fontSize: '1rem' }}>{item.project_name}</h4>
                <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
                  {(item.project_tags || []).map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '20px', background: 'rgba(0,255,255,0.1)', color: 'var(--accent-primary)' }}>{tag}</span>
                  ))}
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

export default ProjectsEditor;
