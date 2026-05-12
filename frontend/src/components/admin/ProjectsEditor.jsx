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
    setForm({ 
      project_name: '', 
      project_description: '', 
      project_url: '', 
      project_tags: '',
      project_icon: '📱',
      team_size: 1,
      role: 'Lead Developer'
    });
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({
      project_name: item.project_name || '',
      project_description: item.project_description || '',
      project_url: item.project_url || '',
      project_tags: (item.project_tags || []).join(', '),
      project_icon: item.project_icon || '📱',
      team_size: item.team_size || 1,
      role: item.role || 'Developer'
    });
  };

  const handleSave = async () => {
    setMsg('');
    const tags = form.project_tags.split(',').map(t => t.trim()).filter(Boolean);
    try {
      const payload = {
        section: 'project',
        project_name: form.project_name,
        project_description: form.project_description,
        project_url: form.project_url || null,
        project_tags: tags,
        project_icon: form.project_icon,
        team_size: parseInt(form.team_size) || 1,
        role: form.role,
        updated_at: new Date().toISOString(),
      };

      if (editing === 'new') {
        const { error } = await supabase.from('content_entries').insert(payload);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('content_entries').update(payload).eq('id', editing);
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
    
    setItems(newItems);
    
    // Fix: Upsert requires all non-nullable columns, so we include 'section'
    const updates = newItems.map((item, idx) => ({
      id: item.id,
      section: 'project', 
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
      section: 'project',
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
            <div>
              <label style={labelStyle}>Icon (Emoji or Upload)</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '8px', 
                  background: 'rgba(255,255,255,0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0,
                  overflow: 'hidden'
                }}>
                  {form.project_icon && (form.project_icon.startsWith('http') || form.project_icon.startsWith('/') || form.project_icon.startsWith('data:')) ? (
                    <img src={form.project_icon} alt="" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                  ) : (
                    <span style={{ fontSize: '1.2rem' }}>{form.project_icon || '📱'}</span>
                  )}
                </div>
                <input 
                  style={{ ...inputStyle, flex: 1 }} 
                  value={form.project_icon?.startsWith('data:') ? 'Custom Image Uploaded' : form.project_icon} 
                  onChange={e => {
                    if (!form.project_icon?.startsWith('data:')) {
                      setForm({ ...form, project_icon: e.target.value });
                    }
                  }} 
                  placeholder="📱 Emoji or URL" 
                  readOnly={form.project_icon?.startsWith('data:')}
                  onClick={() => {
                    if (form.project_icon?.startsWith('data:')) {
                      if (confirm('Clear uploaded image?')) setForm({ ...form, project_icon: '' });
                    }
                  }}
                />
                <input
                  type="file"
                  id="icon-upload"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    
                    setMsg('Processing image...');
                    
                    try {
                      // Resize and convert to Base64
                      const reader = new FileReader();
                      reader.onload = async (event) => {
                        const img = new Image();
                        img.onload = () => {
                          const canvas = document.createElement('canvas');
                          const MAX_WIDTH = 128;
                          const MAX_HEIGHT = 128;
                          let width = img.width;
                          let height = img.height;

                          if (width > height) {
                            if (width > MAX_WIDTH) {
                              height *= MAX_WIDTH / width;
                              width = MAX_WIDTH;
                            }
                          } else {
                            if (height > MAX_HEIGHT) {
                              width *= MAX_HEIGHT / height;
                              height = MAX_HEIGHT;
                            }
                          }

                          canvas.width = width;
                          canvas.height = height;
                          const ctx = canvas.getContext('2d');
                          ctx.drawImage(img, 0, 0, width, height);
                          
                          const base64 = canvas.toDataURL('image/png', 0.8);
                          setForm({ ...form, project_icon: base64 });
                          setMsg('Image processed!');
                          setTimeout(() => setMsg(''), 3000);
                        };
                        img.src = event.target.result;
                      };
                      reader.readAsDataURL(file);
                    } catch (err) {
                      setMsg('Error: ' + err.message);
                    }
                  }}
                />
                <button 
                  type="button"
                  onClick={() => document.getElementById('icon-upload').click()}
                  style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff', whiteSpace: 'nowrap' }}
                >
                  Upload
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Team Size</label>
                <input type="number" style={inputStyle} value={form.team_size} onChange={e => setForm({ ...form, team_size: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>My Role</label>
                <input style={inputStyle} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Lead Android" />
              </div>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     {item.project_icon && (item.project_icon.startsWith('http') || item.project_icon.startsWith('/') || item.project_icon.startsWith('data:')) ? (
                       <>
                         <img 
                           src={item.project_icon} 
                           alt="" 
                           style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                           onError={(e) => { 
                             e.target.style.display = 'none'; 
                             if (e.target.nextSibling) e.target.nextSibling.style.display = 'block'; 
                           }}
                         />
                         <span style={{ display: 'none', fontSize: '1.2rem' }}>📱</span>
                       </>
                     ) : (
                       <span style={{ fontSize: '1.2rem' }}>{item.project_icon || '📱'}</span>
                     )}
                   </div>
                   <h4 style={{ fontSize: '1rem', margin: 0 }}>{item.project_name}</h4>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Role: <span style={{color: 'var(--accent-primary)'}}>{item.role || 'N/A'}</span></span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>·</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Team: <span style={{color: '#fff'}}>{item.team_size || 1}</span></span>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {(item.project_tags || []).map((tag, i) => (
                    <span key={i} style={{ fontSize: '0.65rem', padding: '2px 8px', borderRadius: '20px', background: 'rgba(0,255,255,0.08)', color: 'var(--accent-primary)', border: '1px solid rgba(0,217,255,0.1)' }}>{tag}</span>
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
