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

const sectionHeaderStyle = {
  fontSize: '1.1rem',
  color: 'var(--accent-primary)',
  marginBottom: '15px',
  paddingBottom: '8px',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const HeroEditor = () => {
  // Hero config state
  const [config, setConfig] = useState(null);
  const [configSaving, setConfigSaving] = useState(false);
  
  // Slider titles state
  const [titles, setTitles] = useState([]);
  const [editingTitle, setEditingTitle] = useState(null);
  const [titleForm, setTitleForm] = useState({ title: '' });
  
  // Bubbles state
  const [bubbles, setBubbles] = useState([]);
  const [editingBubble, setEditingBubble] = useState(null);
  const [bubbleForm, setBubbleForm] = useState({});
  
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [configRes, titlesRes, bubblesRes] = await Promise.all([
        supabase.from('hero_config').select('*').single(),
        supabase.from('hero_slider_titles').select('*').order('order', { ascending: true }),
        supabase.from('hero_bubbles').select('*').order('order', { ascending: true }),
      ]);
      if (configRes.data) setConfig(configRes.data);
      if (titlesRes.data) setTitles(titlesRes.data);
      if (bubblesRes.data) setBubbles(bubblesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  // ─── Hero Config ───
  const saveConfig = async () => {
    setConfigSaving(true);
    try {
      const { error } = await supabase.from('hero_config').update({
        greeting: config.greeting,
        subtitle: config.subtitle,
        tagline: config.tagline,
        cta_text: config.cta_text,
        cta_link: config.cta_link,
        updated_at: new Date().toISOString(),
      }).eq('id', config.id);
      if (error) throw error;
      showMsg('Hero config saved!');
    } catch (err) {
      showMsg('Error: ' + err.message);
    } finally {
      setConfigSaving(false);
    }
  };

  // ─── Slider Titles ───
  const saveTitle = async () => {
    try {
      if (editingTitle === 'new') {
        const maxOrder = titles.length > 0 ? Math.max(...titles.map(t => t.order || 0)) : 0;
        const { error } = await supabase.from('hero_slider_titles').insert({ title: titleForm.title, order: maxOrder + 1 });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('hero_slider_titles').update({ title: titleForm.title }).eq('id', editingTitle);
        if (error) throw error;
      }
      setEditingTitle(null);
      fetchAll();
      showMsg('Title saved!');
    } catch (err) {
      showMsg('Error: ' + err.message);
    }
  };

  const deleteTitle = async (id) => {
    if (!confirm('Delete this slider title?')) return;
    await supabase.from('hero_slider_titles').delete().eq('id', id);
    fetchAll();
  };

  const toggleTitle = async (id) => {
    const item = titles.find(t => t.id === id);
    await supabase.from('hero_slider_titles').update({ is_visible: !item.is_visible }).eq('id', id);
    fetchAll();
  };

  // ─── Bubbles ───
  const saveBubble = async () => {
    try {
      const payload = {
        label: bubbleForm.label,
        icon: bubbleForm.icon,
        color: bubbleForm.color,
        pos_x: bubbleForm.pos_x,
        pos_y: bubbleForm.pos_y,
      };
      if (editingBubble === 'new') {
        const maxOrder = bubbles.length > 0 ? Math.max(...bubbles.map(b => b.order || 0)) : 0;
        const { error } = await supabase.from('hero_bubbles').insert({ ...payload, order: maxOrder + 1 });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('hero_bubbles').update(payload).eq('id', editingBubble);
        if (error) throw error;
      }
      setEditingBubble(null);
      fetchAll();
      showMsg('Bubble saved!');
    } catch (err) {
      showMsg('Error: ' + err.message);
    }
  };

  const deleteBubble = async (id) => {
    if (!confirm('Delete this bubble?')) return;
    await supabase.from('hero_bubbles').delete().eq('id', id);
    fetchAll();
  };

  const toggleBubble = async (id) => {
    const item = bubbles.find(b => b.id === id);
    await supabase.from('hero_bubbles').update({ is_visible: !item.is_visible }).eq('id', id);
    fetchAll();
  };

  if (loading) return <div style={{ color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</div>;

  return (
    <>
      <h2 style={{ marginBottom: '0.5rem' }}>Hero Section</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        Manage the hero banner text, rotating slider titles, and orbiting tech bubbles.
      </p>
      {msg && <div style={{ color: msg.startsWith('Error') ? '#ef4444' : '#10b981', marginBottom: '1rem', fontSize: '0.9rem' }}>{msg}</div>}

      {/* ── Section 1: Hero Text Config ── */}
      {config && (
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', marginBottom: '25px' }}>
          <div style={sectionHeaderStyle}><span>Hero Text Configuration</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={labelStyle}>Greeting Text</label>
              <input style={inputStyle} value={config.greeting} onChange={e => setConfig({ ...config, greeting: e.target.value })} />
            </div>
            <div>
              <label style={labelStyle}>CTA Button Text</label>
              <input style={inputStyle} value={config.cta_text} onChange={e => setConfig({ ...config, cta_text: e.target.value })} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Subtitle</label>
              <input style={inputStyle} value={config.subtitle} onChange={e => setConfig({ ...config, subtitle: e.target.value })} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Tagline</label>
              <textarea style={{ ...inputStyle, minHeight: '70px', resize: 'vertical' }} value={config.tagline} onChange={e => setConfig({ ...config, tagline: e.target.value })} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>CTA Link / File Path</label>
              <input style={inputStyle} value={config.cta_link} onChange={e => setConfig({ ...config, cta_link: e.target.value })} />
            </div>
          </div>
          <button onClick={saveConfig} disabled={configSaving} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000', marginTop: '15px' }}>
            {configSaving ? 'Saving...' : 'Save Config'}
          </button>
        </div>
      )}

      {/* ── Section 2: Slider Titles ── */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px', marginBottom: '25px' }}>
        <div style={sectionHeaderStyle}>
          <span>Slider Titles ({titles.length})</span>
          <button onClick={() => { setEditingTitle('new'); setTitleForm({ title: '' }); }} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000', fontSize: '0.8rem' }}>+ Add</button>
        </div>

        {editingTitle && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input style={{ ...inputStyle, flex: 1 }} value={titleForm.title} onChange={e => setTitleForm({ title: e.target.value })} placeholder="e.g. CODER" />
            <button onClick={saveTitle} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>Save</button>
            <button onClick={() => setEditingTitle(null)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Cancel</button>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {titles.map(t => (
            <div key={t.id} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 16px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              opacity: t.is_visible ? 1 : 0.4,
            }}>
              <span style={{ fontSize: '1rem', fontWeight: 600, background: 'linear-gradient(to right, var(--accent-saffron), var(--accent-primary))', WebkitBackgroundClip: 'text', color: 'transparent' }}>{t.title}</span>
              <button onClick={() => toggleTitle(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.is_visible ? '#10b981' : '#ef4444', fontSize: '0.8rem' }}>{t.is_visible ? '●' : '○'}</button>
              <button onClick={() => { setEditingTitle(t.id); setTitleForm({ title: t.title }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>✎</button>
              <button onClick={() => deleteTitle(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '0.8rem' }}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section 3: Orbiting Bubbles ── */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '20px' }}>
        <div style={sectionHeaderStyle}>
          <span>Tech Bubbles ({bubbles.length})</span>
          <button onClick={() => { setEditingBubble('new'); setBubbleForm({ label: '', icon: '🔧', color: '#00D9FF', pos_x: '0px', pos_y: '0px' }); }} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000', fontSize: '0.8rem' }}>+ Add Bubble</button>
        </div>

        {editingBubble && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Label</label>
                <input style={inputStyle} value={bubbleForm.label} onChange={e => setBubbleForm({ ...bubbleForm, label: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Icon / Emoji</label>
                <input style={inputStyle} value={bubbleForm.icon} onChange={e => setBubbleForm({ ...bubbleForm, icon: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Color</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input type="color" value={bubbleForm.color} onChange={e => setBubbleForm({ ...bubbleForm, color: e.target.value })} style={{ width: '40px', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
                  <input style={{ ...inputStyle, flex: 1 }} value={bubbleForm.color} onChange={e => setBubbleForm({ ...bubbleForm, color: e.target.value })} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Position X (e.g. "-300px")</label>
                <input style={inputStyle} value={bubbleForm.pos_x} onChange={e => setBubbleForm({ ...bubbleForm, pos_x: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Position Y (e.g. "-200px")</label>
                <input style={inputStyle} value={bubbleForm.pos_y} onChange={e => setBubbleForm({ ...bubbleForm, pos_y: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button onClick={saveBubble} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000' }}>Save</button>
              <button onClick={() => setEditingBubble(null)} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Cancel</button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {bubbles.map(b => (
            <div key={b.id} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px', borderRadius: '10px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              opacity: b.is_visible ? 1 : 0.4,
            }}>
              <span style={{ fontSize: '1.2rem' }}>{b.icon}</span>
              <span style={{ color: b.color, fontSize: '0.9rem', fontWeight: 500 }}>{b.label}</span>
              <button onClick={() => toggleBubble(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: b.is_visible ? '#10b981' : '#ef4444', fontSize: '0.8rem' }}>{b.is_visible ? '●' : '○'}</button>
              <button onClick={() => { setEditingBubble(b.id); setBubbleForm({ label: b.label, icon: b.icon, color: b.color, pos_x: b.pos_x, pos_y: b.pos_y }); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>✎</button>
              <button onClick={() => deleteBubble(b.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '0.8rem' }}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroEditor;
