import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { AsyncStatus } from '../../utils/result';
import useAsync from '../../hooks/useAsync';
import StatusMessage from '../atoms/StatusMessage';
import { inputStyle, labelStyle, btnStyle } from './styles';

const loadConfig = async () => {
  const { data, error } = await supabase.from('about_config').select('*').single();
  if (error) throw new Error(error.message);
  return { ...data, pillars: data?.pillars || [] };
};

const AboutEditor = () => {
  const { data: loaded, isLoading, isError, error } = useAsync(loadConfig, { immediate: true });
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ status: null, message: '' });

  useEffect(() => {
    if (loaded) setConfig(loaded);
  }, [loaded]);

  const update = (field, value) => setConfig({ ...config, [field]: value });

  const updatePillar = (idx, field, value) => {
    const pillars = [...config.pillars];
    pillars[idx] = { ...pillars[idx], [field]: value };
    setConfig({ ...config, pillars });
  };

  const addPillar = () => setConfig({ ...config, pillars: [...config.pillars, { title: '', desc: '' }] });

  const removePillar = (idx) => setConfig({ ...config, pillars: config.pillars.filter((_, i) => i !== idx) });

  const handleSave = async () => {
    setSaving(true);
    setFeedback({ status: null, message: '' });
    try {
      const { error } = await supabase.from('about_config').update({
        location: config.location,
        tagline: config.tagline,
        years_exp: config.years_exp,
        apps_shipped: config.apps_shipped,
        downloads: config.downloads,
        pillars: config.pillars,
        updated_at: new Date().toISOString(),
      }).eq('id', config.id);
      if (error) throw error;
      setFeedback({ status: AsyncStatus.SUCCESS, message: 'About section saved!' });
      setTimeout(() => setFeedback({ status: null, message: '' }), 3000);
    } catch (err) {
      setFeedback({ status: AsyncStatus.ERROR, message: 'Error: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) return <div style={{ color: 'var(--text-secondary)', padding: '2rem' }}>Loading...</div>;
  if (isError) return <div style={{ color: '#ef4444', padding: '2rem' }}>Failed to load: {error}</div>;
  if (!config) return <div style={{ color: '#ef4444', padding: '2rem' }}>No about config found.</div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ marginBottom: '0.3rem' }}>About Me</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Edit the About section content, stats, and pillars.</p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ ...btnStyle, background: 'var(--accent-primary)', color: '#000', opacity: saving ? 0.6 : 1 }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <StatusMessage status={feedback.status} message={feedback.message} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        <div>
          <label style={labelStyle}>Location</label>
          <input style={inputStyle} value={config.location || ''} onChange={e => update('location', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Section Label</label>
          <input style={inputStyle} value={config.tagline || ''} onChange={e => update('tagline', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Years Experience (e.g. "5+")</label>
          <input style={inputStyle} value={config.years_exp || ''} onChange={e => update('years_exp', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>Apps Shipped (e.g. "8+")</label>
          <input style={inputStyle} value={config.apps_shipped || ''} onChange={e => update('apps_shipped', e.target.value)} />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={labelStyle}>Downloads Impact (e.g. "1M+")</label>
          <input style={inputStyle} value={config.downloads || ''} onChange={e => update('downloads', e.target.value)} />
        </div>
      </div>

      <h3 style={{ margin: '20px 0 10px', color: 'var(--accent-primary)' }}>Pillars</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {config.pillars.map((p, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <input style={inputStyle} value={p.title} placeholder="Title" onChange={e => updatePillar(idx, 'title', e.target.value)} />
            <input style={inputStyle} value={p.desc} placeholder="Description" onChange={e => updatePillar(idx, 'desc', e.target.value)} />
            <button onClick={() => removePillar(idx)} style={{ ...btnStyle, background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>✕</button>
          </div>
        ))}
        <button onClick={addPillar} style={{ ...btnStyle, background: 'rgba(255,255,255,0.1)', color: '#fff', alignSelf: 'flex-start' }}>+ Add Pillar</button>
      </div>
    </>
  );
};

export default AboutEditor;
