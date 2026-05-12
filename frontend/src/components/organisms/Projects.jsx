import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';

const Projects = () => {
  const { data } = usePortfolio();
  const profile = data?.profile;
  const projects = data?.projects;
  const experience = data?.experience;
  const socialLinks = data?.social_links;

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); // home, experience, social, profile

  // Fake time for status bar
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const dockTabs = [
    { id: 'home', icon: '🏠' },
    { id: 'experience', icon: '💼' },
    { id: 'social', icon: '🔗' },
    { id: 'profile', icon: '👤' }
  ];

  return (
    <section id="projects" className="section-padding container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', display: 'block' }}>Featured Work</span>
        Projects
      </h2>

      {/* Mobile Skeleton */}
      <div 
        className="glass glow-cyan"
        style={{
          width: '380px',
          height: '780px',
          borderRadius: '50px',
          border: '8px solid #1a1a2e',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 217, 255, 0.2)'
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '30px',
          backgroundColor: '#1a1a2e',
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          zIndex: 10
        }} />

        {/* Status Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '15px 25px 10px 25px',
          fontSize: '0.8rem',
          fontWeight: 'bold',
          color: '#fff',
          zIndex: 5,
          position: 'relative'
        }}>
          <span>{time}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span>LTE</span>
            <span>100%</span>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ padding: '20px', height: 'calc(100% - 100px)', position: 'relative', overflowY: 'auto' }} className="hide-scrollbar">
          <AnimatePresence mode="wait">
            {activeTab === 'home' && !selectedProject && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                {/* Search Bar */}
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '10px 20px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  marginBottom: '20px'
                }}>
                  🔍 Search projects...
                </div>

                {/* Featured Widget (Real Phone Widget Aesthetic) */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                  borderRadius: '20px',
                  padding: '15px',
                  marginBottom: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '12px', 
                    background: 'linear-gradient(135deg, #00C6FF, #0072FF)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(0, 114, 255, 0.3)'
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 3 0 5 1 7 2a1 1 0 0 1 1 1z"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-saffron)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}>⭐ App of the Day</div>
                    <div style={{ fontWeight: 'bold', fontSize: '1.05rem', margin: '2px 0', color: '#fff' }}>Kido Protect</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Parental Control & Security</div>
                  </div>
                </div>

                {/* App Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '25px 15px',
                  justifyItems: 'center',
                  paddingBottom: '20px'
                }}>
                  {projects?.map(project => (
                    <div 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', gap: '8px' }}
                    >
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '15px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '1.5rem',
                        border: project.is_featured ? '2px solid var(--accent-primary)' : '1px solid rgba(255,255,255,0.05)',
                        transition: 'transform 0.2s',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      >
                               {project.project_icon || '📱'}
                      </div>
                      <span style={{ fontSize: '0.75rem', textAlign: 'center', color: '#fff', maxWidth: '90px', lineHeight: '1.2' }}>
                        {project.project_name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'home' && selectedProject && (
              <motion.div
                key="detail"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ paddingBottom: '40px' }}
              >
                {/* Back Button */}
                <div 
                  onClick={() => setSelectedProject(null)}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', cursor: 'pointer', color: '#fff' }}
                >
                  <span style={{ fontSize: '1.5rem' }}>←</span>
                  <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{selectedProject.project_name}</span>
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '20px',
                  padding: '20px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '15px' }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                       <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>My Role</div>
                       <div style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.9rem' }}>{selectedProject.role || 'Developer'}</div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ textAlign: 'center', flex: 1 }}>
                       <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Team Size</div>
                       <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '0.9rem' }}>{selectedProject.team_size || 1} Person(s)</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                    {selectedProject.project_description}
                  </p>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ color: '#fff', marginBottom: '10px' }}>Tech Stack</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedProject.project_tags?.map(tech => (
                        <span key={tech} style={{ 
                          padding: '5px 12px', 
                          background: 'rgba(0, 217, 255, 0.1)', 
                          color: 'var(--accent-primary)',
                          borderRadius: '15px', 
                          fontSize: '0.8rem',
                          border: '1px solid rgba(0, 217, 255, 0.2)'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={selectedProject.project_url || '#'}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '15px',
                      background: 'var(--accent-primary)',
                      color: '#000',
                      textAlign: 'center',
                      borderRadius: '15px',
                      fontWeight: 'bold',
                      textDecoration: 'none'
                    }}
                  >
                    Open Actual Project 🚀
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingBottom: '40px' }}
              >
                <h3 style={{ color: '#fff', marginBottom: '10px', fontSize: '1.5rem' }}>Career Journey</h3>
                {experience?.map(exp => (
                  <div key={exp.id} style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '15px',
                    padding: '15px',
                    borderLeft: `4px solid ${exp.is_current ? 'var(--accent-primary)' : 'var(--text-secondary)'}`,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#fff' }}>{exp.role}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{exp.company}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-saffron)', marginTop: '8px', fontFamily: 'JetBrains Mono' }}>{exp.period}</div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ paddingBottom: '40px' }}
              >
                <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: '1.5rem' }}>Connect</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  {socialLinks?.map(link => (
                    <a key={link.id} href={link.url} target="_blank" rel="noreferrer" style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))',
                      borderRadius: '20px',
                      padding: '25px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '15px',
                      textDecoration: 'none',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.05)',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <div style={{ fontSize: '2.5rem' }}>
                        {link.platform === 'linkedin' ? '💼' : link.platform === 'github' ? '🐙' : '✉️'}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 'bold', textAlign: 'center' }}>
                        {link.label || link.platform}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '40px' }}
              >
                <div style={{ 
                  width: '90px', height: '90px', borderRadius: '50%', 
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  fontSize: '2.5rem', marginBottom: '15px',
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)'
                }}>
                  👨‍💻
                </div>
                <h3 style={{ color: '#fff', margin: '0', fontSize: '1.5rem' }}>{profile?.name}</h3>
                <div style={{ color: 'var(--accent-primary)', fontSize: '0.9rem', marginBottom: '25px', fontFamily: 'JetBrains Mono' }}>{profile?.title}</div>
                
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.2rem' }}>📍</span> <span style={{ fontSize: '0.9rem', color: '#fff' }}>{profile?.location}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.2rem' }}>📧</span> <span style={{ fontSize: '0.9rem', color: '#fff' }}>{profile?.email}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.2rem' }}>📱</span> <span style={{ fontSize: '0.9rem', color: '#fff' }}>{profile?.phone}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {profile?.bio?.substring(0, 150)}...
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Bottom Dock */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          right: '20px',
          background: 'rgba(255,255,255,0.08)',
          borderRadius: '30px',
          padding: '12px 15px',
          display: 'flex',
          justifyContent: 'space-around',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255,255,255,0.1)',
          zIndex: 20,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {dockTabs.map((tab) => (
            <div 
              key={tab.id} 
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'home') setSelectedProject(null);
              }}
              style={{ 
                width: '45px', 
                height: '45px', 
                borderRadius: '50%', 
                background: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                fontSize: '1.3rem',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                color: activeTab === tab.id ? '#000' : '#fff',
                transform: activeTab === tab.id ? 'translateY(-8px)' : 'none',
                boxShadow: activeTab === tab.id ? '0 8px 20px rgba(0, 217, 255, 0.5)' : 'none'
              }}
              onMouseOver={(e) => {
                if(activeTab !== tab.id) e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseOut={(e) => {
                if(activeTab !== tab.id) e.currentTarget.style.background = 'transparent';
              }}
            >
              {tab.icon}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

