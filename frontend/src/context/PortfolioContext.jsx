import React, { createContext, useContext, useState, useEffect } from 'react';
import { portfolioService } from '../services/api';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

const LOCAL_DATA = {
  profile: {
    name: "Raj Vaibhav Rai",
    title: "Senior Android Developer",
    bio: "Senior Android Developer with 5+ years of experience building scalable, high-performance mobile applications using Kotlin and Java. Expertise in MVVM, Clean Architecture, Coroutines, Flow, Jetpack, Room, Hilt, Firebase, REST APIs, and modern Android development practices.",
    location: "Noida, INDIA",
    phone: "+91-8423914735",
    email: "rvrai1998@gmail.com",
    github: "github.com/rvrai",
    linkedin: "linkedin.com/in/rvrai",
    portfolio: "rajvaibhavrai.site"
  },
  site_config: { enable_particles: true },
  sections: [
    { id: 1, section_type: 'hero', is_visible: true, name: 'Hero' },
    { id: 2, section_type: 'about', is_visible: true, name: 'About' },
    { id: 3, section_type: 'experience', is_visible: true, name: 'Experience' },
    { id: 4, section_type: 'skills', is_visible: true, name: 'Skills' },
    { id: 5, section_type: 'projects', is_visible: true, name: 'Projects' },
    { id: 6, section_type: 'education', is_visible: true, name: 'Education' },
    { id: 7, section_type: 'contact', is_visible: true, name: 'Contact' },
    { id: 8, section_type: 'footer', is_visible: true, name: 'Footer' }
  ],
  skills: [
    { id: 1, name: "Java", category: "Core" },
    { id: 2, name: "Kotlin", category: "Core" },
    { id: 3, name: "Jetpack Compose", category: "Android" },
    { id: 4, name: "Material Design", category: "Android" },
    { id: 5, name: "MVVM", category: "Architecture" },
    { id: 6, name: "Solid Principles", category: "Architecture" },
    { id: 7, name: "Clean Architecture", category: "Architecture" },
    { id: 8, name: "Coroutine", category: "Concurrency" },
    { id: 9, name: "Flow", category: "Concurrency" },
    { id: 10, name: "Dagger / Hilt", category: "DI" },
    { id: 11, name: "Rest API Integration", category: "Networking" },
    { id: 12, name: "Retrofit", category: "Networking" },
    { id: 13, name: "Room", category: "Database" },
    { id: 14, name: "DataStore", category: "Database" },
    { id: 15, name: "Firebase", category: "Cloud" },
    { id: 16, name: "GIT / Github", category: "Tools" },
    { id: 17, name: "JIRA / Figma", category: "Tools" },
    { id: 18, name: "Agile / Scrum", category: "Workflow" }
  ],
  experience: [
    {
      id: 1, role: "Software Developer", company: "Rupyz Fintech Private Limited", period: "May 2024 - Present", is_current: true,
      highlights: [
        "Developed and maintained scalable Android applications using Kotlin and Java.",
        "Implemented MVVM architecture with Room, Hilt, Coroutines, and Flow.",
        "Improved performance, stability, and feature scalability across product modules.",
        "Collaborated with product, design, and QA teams in agile delivery cycles."
      ]
    },
    {
      id: 2, role: "Android Developer", company: "Techahead Software Private Limited", period: "Apr 2023 - May 2024", is_current: false,
      highlights: [
        "Built advanced Android features improving user engagement and app performance.",
        "Worked on modern Android components including DataStore and Flow.",
        "Contributed to scalable architecture and optimized code quality.",
        "Coordinated with cross-functional teams for production releases."
      ]
    },
    {
      id: 3, role: "Android Developer", company: "CEDCOSS Technologies Private Limited", period: "Aug 2020 - Apr 2023", is_current: false,
      highlights: [
        "Led Android development using MVVM, Room, Firebase, Dagger/Hilt, and Jetpack.",
        "Integrated payment SDKs, search capabilities, and third-party services.",
        "Reduced crash rates by 80% through optimization and debugging.",
        "Mentored junior developers and contributed to architectural decisions."
      ]
    },
    {
      id: 4, role: "Android Developer", company: "Coding Brains", period: "Sep 2019 - Aug 2020", is_current: false,
      highlights: [
        "Experienced in bug fixing, optimization, and new feature development.",
        "Capable of end-to-end app creation, including UI/UX design.",
        "Adept at client communication for delivering desired app functionality."
      ]
    }
  ],
  projects: [
    {
      id: 1, name: "HappyMob", description: "A platform for business to register and search local business.",
      tech_stack: ["Android", "Kotlin"], is_featured: true
    },
    {
      id: 2, name: "Kido Protect Parental Control", description: "Parental control application for screen monitoring and restrictions.",
      tech_stack: ["Kotlin", "Jetpack", "Firebase"], is_featured: true, playstore_url: "#"
    },
    {
      id: 3, name: "DolledUp", description: "Social-commerce Android application integrating content and shopping.",
      tech_stack: ["Kotlin", "MVVM", "Firebase", "REST APIs"], is_featured: true, playstore_url: "#"
    },
    {
      id: 4, name: "Magenative Shopify App", description: "Mobile commerce builder for Shopify stores.",
      tech_stack: ["Java", "Kotlin", "APIs", "Push Notifications"], is_featured: true, playstore_url: "#"
    },
    {
      id: 5, name: "Magenative Woocommerce App", description: "Sophisticated native Android solution for WooCommerce with dynamic experience. Seamlessly synchronizes products and categories.",
      tech_stack: ["Java", "Kotlin", "WooCommerce API"], is_featured: false, playstore_url: "#"
    },
    {
      id: 6, name: "Classical Archive", description: "Premier platform for classical music enthusiasts worldwide. Curated collection, seamless streaming.",
      tech_stack: ["Android", "Streaming"], is_featured: false, playstore_url: "#"
    },
    {
      id: 7, name: "ERP base Attendance system", description: "Freelancing project for third party to be introduced to government.",
      tech_stack: ["Android", "ERP"], is_featured: false
    }
  ],
  education: [
    { id: 1, degree: "B.Tech/B.E.", field: "Computers", institution: "ITM School of Management Lucknow", grade: "7.4/10", year: 2022 },
    { id: 2, degree: "12th", board: "CBSE", institution: "CBSE Board", grade: "60-64.9%", year: 2015 },
    { id: 3, degree: "10th", board: "CBSE", institution: "CBSE Board", grade: "65-69.9%", year: 2013 }
  ],
  social_links: [
    { id: 1, platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/rvrai" },
    { id: 2, platform: "github", label: "GitHub", url: "https://github.com/rvrai" },
    { id: 3, platform: "email", label: "rvrai1998@gmail.com", url: "mailto:rvrai1998@gmail.com" }
  ]
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(LOCAL_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let entries = null;
        let sections = null;
        let skillsData = null;
        let socialData = null;

        try {
          const { supabase } = await import('../lib/supabase.js');
          
          const [entriesResult, sectionsResult, skillsResult, socialResult] = await Promise.all([
            supabase.from('content_entries').select('*').is('deleted_at', null).order('id', { ascending: true }),
            supabase.from('sections').select('*').order('order', { ascending: true }),
            supabase.from('skills').select('*').eq('is_visible', true).order('order', { ascending: true }),
            supabase.from('social_links').select('*').eq('is_visible', true).order('order', { ascending: true }),
          ]);
          
          if (entriesResult.error) throw entriesResult.error;
          if (sectionsResult.error) throw sectionsResult.error;

          entries = entriesResult.data;
          sections = sectionsResult.data;
          skillsData = skillsResult.data || [];
          socialData = socialResult.data || [];
        } catch (dbError) {
          console.warn('Supabase fetch failed, falling back to cache file:', dbError);
          try {
            const cacheRes = await fetch('/cache/data.json');
            if (cacheRes.ok) {
              const cacheData = await cacheRes.json();
              entries = cacheData.entries;
              sections = cacheData.sections;
            } else {
              console.warn('Fallback cache file returned not ok status. Using local static data.');
            }
          } catch (cacheError) {
            console.warn('Fallback cache file fetch failed as well, using LOCAL_DATA fallback:', cacheError);
          }
        }
        
        if (entries && entries.length > 0) {
          const newProfile = entries.find(e => e.section === 'personal_info');
          const profile = newProfile ? {
            name: newProfile.name || LOCAL_DATA.profile.name,
            title: newProfile.title || LOCAL_DATA.profile.title,
            bio: newProfile.summary || LOCAL_DATA.profile.bio,
            location: LOCAL_DATA.profile.location, 
            phone: newProfile.contact_info || LOCAL_DATA.profile.phone,
            email: newProfile.email || LOCAL_DATA.profile.email,
            linkedin: newProfile.linkedin || LOCAL_DATA.profile.linkedin,
            github: LOCAL_DATA.profile.github,
            portfolio: LOCAL_DATA.profile.portfolio
          } : LOCAL_DATA.profile;

          const experience = entries.filter(e => e.section === 'experience').map((e, index) => ({
            id: e.id || index,
            role: e.position,
            company: e.company,
            period: e.duration,
            is_current: e.duration?.toLowerCase().includes('present') || false,
            highlights: e.responsibilities ? e.responsibilities.split('\n').map(h => h.trim()).filter(h => h !== '') : []
          }));

          const projects = entries.filter(e => e.section === 'project').map((e, index) => ({
            id: e.id || index,
            name: e.project_name,
            description: e.project_description,
            tech_stack: e.project_tags || [],
            is_featured: true,
            playstore_url: e.project_url || '#'
          }));

          const education = entries.filter(e => e.section === 'education').map((e, index) => ({
            id: e.id || index,
            degree: e.degree,
            institution: e.institution,
            year: e.year,
            grade: e.grade
          }));

          setData({
            ...LOCAL_DATA,
            sections: sections && sections.length > 0 ? sections : LOCAL_DATA.sections,
            profile,
            experience: experience.length > 0 ? experience : LOCAL_DATA.experience,
            projects: projects.length > 0 ? projects : LOCAL_DATA.projects,
            education: education.length > 0 ? education : LOCAL_DATA.education,
            skills: skillsData && skillsData.length > 0 ? skillsData : LOCAL_DATA.skills,
            social_links: socialData && socialData.length > 0 ? socialData.map(s => ({
              id: s.id, platform: s.platform, label: s.label, url: s.url
            })) : LOCAL_DATA.social_links,
          });
        }
      } catch (err) {
        console.error('Error fetching data, using LOCAL_DATA fallback:', err);
        setData(LOCAL_DATA);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
};
