import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import ParticleBackground from '../atoms/ParticleBackground';
import Navbar from '../organisms/Navbar';
import Hero from '../organisms/Hero';
import Projects from '../organisms/Projects';
import About from '../organisms/About';
import Experience from '../organisms/Experience';
import Skills from '../organisms/Skills';
import Education from '../organisms/Education';
import Contact from '../organisms/Contact';
import Footer from '../organisms/Footer';
import '../../App.css';

const PortfolioView = () => {
  const { data, loading, error } = usePortfolio();

  if (error) return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red', background: '#0a0a0a' }}>Error loading data: {error}</div>;

  return (
    <>
      {data?.site_config?.enable_particles && <ParticleBackground />}
      
      {data?.sections && <Navbar profile={data.profile} sections={data.sections} />}
      
      <main>
        {data?.sections?.map(section => {
          if (!section.is_visible) return null;
          
          switch(section.section_type) {
            case 'hero':
              return <Hero key={section.id} profile={data.profile} section={section} />;
            case 'projects':
              return <Projects key={section.id} projects={data.projects} profile={data.profile} />;
            case 'about':
              return <About key={section.id} profile={data.profile} />;
            case 'experience':
              return <Experience key={section.id} experiences={data.experience} />;
            case 'skills':
              return <Skills key={section.id} skills={data.skills} />;
            case 'education':
              return <Education key={section.id} education={data.education} />;
            case 'contact':
              return <Contact key={section.id} socialLinks={data.social_links} />;
            case 'footer':
              return null; // Footer handled separately at the end
            default:
              return (
                <section key={section.id} id={section.section_type} className="section-padding container">
                  <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', display: 'block' }}>{section.subtitle}</span>
                    {section.title}
                  </h2>
                  <div className="glass" style={{ padding: '2rem', borderRadius: '20px', textAlign: 'center' }}>
                    Content for {section.name} coming soon.
                  </div>
                </section>
              );
          }
        })}
      </main>
      
      {data?.sections?.some(s => s.section_type === 'footer' && s.is_visible) && (
        <Footer profile={data.profile} />
      )}
    </>
  );
};

export default PortfolioView;
