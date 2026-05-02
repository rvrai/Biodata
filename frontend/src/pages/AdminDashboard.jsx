import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import ProfileEditor from '../components/admin/ProfileEditor';
import ProjectsEditor from '../components/admin/ProjectsEditor';
import ExperienceEditor from '../components/admin/ExperienceEditor';
import SkillsEditor from '../components/admin/SkillsEditor';
import EducationEditor from '../components/admin/EducationEditor';
import MessagesEditor from '../components/admin/MessagesEditor';
import SocialLinksEditor from '../components/admin/SocialLinksEditor';
import HeroEditor from '../components/admin/HeroEditor';

const AdminDashboard = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('order', { ascending: true });
      if (error) throw error;
      setSections(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      const section = sections.find(s => s.id === id);
      const { error } = await supabase
        .from('sections')
        .update({ is_visible: !section.is_visible })
        .eq('id', id);
      if (error) throw error;
      fetchSections();
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrders = async (newSections) => {
    try {
      const updates = newSections.map((s, idx) => ({
        id: s.id,
        name: s.name,
        section_type: s.section_type,
        is_visible: s.is_visible,
        order: idx + 1
      }));
      const { error } = await supabase.from('sections').upsert(updates);
      if (error) throw error;
    } catch (err) {
      console.error(err);
      fetchSections();
    }
  };

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index - 1];
    newSections[index - 1] = temp;
    
    setSections(newSections);
    updateOrders(newSections);
  };

  const handleMoveDown = async (index) => {
    if (index === sections.length - 1) return;
    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + 1];
    newSections[index + 1] = temp;
    
    setSections(newSections);
    updateOrders(newSections);
  };

  const [activeTab, setActiveTab] = useState('Sections (DOM Control)');

  if (loading) return <div style={{ color: '#fff', padding: '2rem' }}>Loading Dashboard...</div>;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '2rem', color: '#fff' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--accent-primary)' }}>Control Panel</h1>
        <button 
          onClick={async () => { await supabase.auth.signOut(); localStorage.removeItem('adminToken'); window.location.reload(); }}
          style={{ padding: '10px 20px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
        {/* Sidebar Nav */}
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '15px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Management</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Sections (DOM Control)', 'Hero Section', 'Profile Info', 'Projects', 'Experience', 'Skills', 'Education', 'Messages', 'Site Settings'].map(item => (
              <li key={item}>
                <button 
                  onClick={() => setActiveTab(item)}
                  style={{ 
                    display: 'block', 
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px', 
                    borderRadius: '8px', 
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === item ? 'var(--accent-primary)' : 'transparent', 
                    color: activeTab === item ? '#000' : '#fff' 
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '15px' }}>
          {activeTab === 'Sections (DOM Control)' && (
            <>
              <h2 style={{ marginBottom: '1rem' }}>DOM Configuration</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Drag and drop or use arrows to dynamically reorder sections on the live website. Toggle visibility to hide/show sections.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {sections.map((section, idx) => (
                  <div 
                    key={section.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px 20px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      opacity: section.is_visible ? 1 : 0.5
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <button onClick={() => handleMoveUp(idx)} disabled={idx === 0} style={{ background: 'none', border: 'none', cursor: 'pointer', color: idx === 0 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: '1rem' }}>▲</button>
                        <button onClick={() => handleMoveDown(idx)} disabled={idx === sections.length - 1} style={{ background: 'none', border: 'none', cursor: 'pointer', color: idx === sections.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff', fontSize: '1rem' }}>▼</button>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem' }}>{section.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>{section.section_type}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <button 
                        onClick={() => handleToggleVisibility(section.id)}
                        style={{
                          padding: '8px 15px',
                          borderRadius: '20px',
                          cursor: 'pointer',
                          background: section.is_visible ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: section.is_visible ? '#10b981' : '#ef4444',
                          border: `1px solid ${section.is_visible ? '#10b981' : '#ef4444'}`
                        }}
                      >
                        {section.is_visible ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'Hero Section' && <HeroEditor />}
          {activeTab === 'Profile Info' && <ProfileEditor />}
          {activeTab === 'Projects' && <ProjectsEditor />}
          {activeTab === 'Experience' && <ExperienceEditor />}
          {activeTab === 'Skills' && <SkillsEditor />}
          {activeTab === 'Education' && <EducationEditor />}
          {activeTab === 'Messages' && <MessagesEditor />}
          {activeTab === 'Site Settings' && <SocialLinksEditor />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
