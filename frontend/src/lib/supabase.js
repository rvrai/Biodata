import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://erapzxkcacxzhbzwifhl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYXB6eGtjYWN4emhiendpZmhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4ODI5MzQsImV4cCI6MjA4NjQ1ODkzNH0.exlba7EcAZKsUgsmPY3B34j6dH_5_ZwpHFKhMShsHP8';

// Seed initial data matching database.sql
const SEED_SECTIONS = [
  { id: 1, name: 'Hero', section_type: 'hero', is_visible: true, order: 1, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 2, name: 'About', section_type: 'about', is_visible: true, order: 2, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 5, name: 'Projects', section_type: 'projects', is_visible: true, order: 3, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 3, name: 'Experience', section_type: 'experience', is_visible: true, order: 4, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 4, name: 'Skills', section_type: 'skills', is_visible: true, order: 5, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 6, name: 'Education', section_type: 'education', is_visible: true, order: 6, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 7, name: 'Contact', section_type: 'contact', is_visible: true, order: 7, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 8, name: 'Footer', section_type: 'footer', is_visible: true, order: 8, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 9, name: 'Certificates', section_type: 'certificates', is_visible: false, order: 7, created_at: "2026-05-02T10:23:08.376732+00:00" }
];

const SEED_SKILLS = [
  { id: 1, name: 'Java', category: 'Core', order: 1, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 2, name: 'Kotlin', category: 'Core', order: 2, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 3, name: 'Jetpack Compose', category: 'Android', order: 3, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 4, name: 'Material Design', category: 'Android', order: 4, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 5, name: 'MVVM', category: 'Architecture', order: 5, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 6, name: 'Solid Principles', category: 'Architecture', order: 6, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 7, name: 'Clean Architecture', category: 'Architecture', order: 7, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 8, name: 'Coroutine', category: 'Concurrency', order: 8, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 9, name: 'Flow', category: 'Concurrency', order: 9, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 10, name: 'Dagger / Hilt', category: 'DI', order: 10, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 11, name: 'Rest API Integration', category: 'Networking', order: 11, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 12, name: 'Retrofit', category: 'Networking', order: 12, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 13, name: 'Room', category: 'Database', order: 13, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 14, name: 'DataStore', category: 'Database', order: 14, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 15, name: 'Firebase', category: 'Cloud', order: 15, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 16, name: 'GIT / Github', category: 'Tools', order: 16, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 17, name: 'JIRA / Figma', category: 'Tools', order: 17, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 18, name: 'Agile / Scrum', category: 'Workflow', order: 18, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" }
];

const SEED_SOCIAL_LINKS = [
  { id: 1, platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/rvrai', is_visible: true, order: 1, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 2, platform: 'github', label: 'GitHub', url: 'https://github.com/rvrai', is_visible: true, order: 2, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 3, platform: 'email', label: 'rvrai1998@gmail.com', url: 'mailto:rvrai1998@gmail.com', is_visible: true, order: 3, created_at: "2026-05-02T10:23:08.376732+00:00" }
];

const SEED_HERO_CONFIG = [
  {
    id: 1,
    greeting: "Hello! I'm",
    subtitle: "A passionate Senior Android Developer",
    tagline: "Building scalable, high-performance mobile applications using modern Android architecture and practices.",
    cta_text: "Download Resume",
    cta_link: "/Raj_Vaibhav_Rai_Android.pdf",
    updated_at: "2026-05-22T06:32:52Z"
  }
];

const SEED_HERO_SLIDER_TITLES = [
  { id: 1, title: 'ANDROID', order: 1, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 2, title: 'PROGRAMMER', order: 2, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 3, title: 'DEVELOPER', order: 3, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 4, title: 'ENGINEER', order: 4, is_visible: true, created_at: "2026-05-02T10:23:08.376732+00:00" }
];

const SEED_HERO_BUBBLES = [
  { id: 1, label: 'Kotlin', icon: 'Kt', color: '#7F52FF', pos_x: '-300px', pos_y: '-200px', is_visible: true, order: 1, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 2, label: 'Android', icon: '🤖', color: '#3DDC84', pos_x: '280px', pos_y: '-280px', is_visible: true, order: 2, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 3, label: 'Jetpack', icon: '📦', color: '#4285F4', pos_x: '-380px', pos_y: '60px', is_visible: true, order: 3, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 4, label: 'Firebase', icon: '🔥', color: '#FFCA28', pos_x: '400px', pos_y: '-40px', is_visible: true, order: 4, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 5, label: 'Java', icon: '☕', color: '#f89820', pos_x: '-300px', pos_y: '250px', is_visible: true, order: 5, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 6, label: 'Room DB', icon: '🗄️', color: '#00B0FF', pos_x: '310px', pos_y: '230px', is_visible: true, order: 6, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 7, label: 'Hilt/Dagger', icon: '🗡️', color: '#D81B60', pos_x: '-130px', pos_y: '360px', is_visible: true, order: 7, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 8, label: 'Figma', icon: '🎨', color: '#F24E1E', pos_x: '150px', pos_y: '380px', is_visible: true, order: 8, created_at: "2026-05-02T10:23:08.376732+00:00" },
  { id: 9, label: 'Git', icon: '◆', color: '#f34f29', pos_x: '0px', pos_y: '480px', is_visible: true, order: 9, created_at: "2026-05-02T10:23:08.376732+00:00" }
];

const SEED_CONTENT_ENTRIES = [
  {
    id: 'fc6ba557-105a-4ab9-b098-5f487bc4673b',
    section: 'personal_info',
    locale: 'en',
    name: 'Raj Vaibhav Rai',
    title: 'Senior Android Developer',
    contact_info: '+91-8423914735',
    email: 'rvrai1998@gmail.com',
    linkedin: 'linkedin.com/in/rvrai',
    summary: 'Senior Android Developer with 5+ years of experience building scalable, high-performance mobile applications using Kotlin and Java. Expertise in MVVM, Clean Architecture, Coroutines, Flow, Jetpack, Room, Hilt, Firebase, REST APIs, and modern Android development practices.',
    skills: ['Java','Kotlin','Jetpack Compose','Material Design','MVVM','Solid Principles','Clean Architecture','Coroutine','Flow','Dagger / Hilt','Rest API Integration','Retrofit','Room','DataStore','Firebase','GIT / Github','JIRA / Figma','Agile / Scrum'],
    approved: true,
    order: 0,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'c2d09135-c4fc-407d-9bb4-4b18e5665afa',
    section: 'experience',
    locale: 'en',
    company: 'Rupyz Fintech Private Limited',
    position: 'Software Developer',
    duration: 'May 2024 - Present',
    responsibilities: 'Developed and maintained scalable Android applications using Kotlin and Java.\nImplemented MVVM architecture with Room, Hilt, Coroutines, and Flow.\nImproved performance, stability, and feature scalability across product modules.\nCollaborated with product, design, and QA teams in agile delivery cycles.',
    approved: true,
    order: 0,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: '11f0bd22-eb1c-49ab-be62-c1da53b41cd3',
    section: 'experience',
    locale: 'en',
    company: 'Techahead Software Private Limited',
    position: 'Android Developer',
    duration: 'Apr 2023 - May 2024',
    responsibilities: 'Built advanced Android features improving user engagement and app performance.\nWorked on modern Android components including DataStore and Flow.\nContributed to scalable architecture and optimized code quality.\nCoordinated with cross-functional teams for production releases.',
    approved: true,
    order: 1,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: '2aeb68f4-64a6-43c5-b6db-14b880307dfe',
    section: 'experience',
    locale: 'en',
    company: 'CEDCOSS Technologies Private Limited',
    position: 'Android Developer',
    duration: 'Aug 2020 - Apr 2023',
    responsibilities: 'Led Android development using MVVM, Room, Firebase, Dagger/Hilt, and Jetpack.\nIntegrated payment SDKs, search capabilities, and third-party services.\nReduced crash rates by 80% through optimization and debugging.\nMentored junior developers and contributed to architectural decisions.',
    approved: true,
    order: 2,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'af46e6b9-5f07-4ca4-8f93-ebeef7092628',
    section: 'experience',
    locale: 'en',
    company: 'Coding Brains',
    position: 'Android Developer',
    duration: 'Sep 2019 - Aug 2020',
    responsibilities: 'Experienced in bug fixing, optimization, and new feature development.\nCapable of end-to-end app creation, including UI/UX design.\nAdept at client communication for delivering desired app functionality.',
    approved: true,
    order: 3,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'ef3cf250-0d85-4ab5-9ca6-f573abe34227',
    section: 'education',
    locale: 'en',
    degree: 'B.Tech/B.E.',
    institution: 'ITM School of Management Lucknow',
    year: 2022,
    grade: '7.4/10',
    approved: true,
    order: 0,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'e84c433c-7fb7-43b7-91f7-4c01c5c68204',
    section: 'education',
    locale: 'en',
    degree: '12th',
    institution: 'CBSE Board',
    year: 2015,
    grade: '60-64.9%',
    approved: true,
    order: 1,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: '5a7ade4c-9b88-4b9d-9b31-7db80d006f0f',
    section: 'education',
    locale: 'en',
    degree: '10th',
    institution: 'CBSE Board',
    year: 2013,
    grade: '65-69.9%',
    approved: true,
    order: 2,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: '2cab69af-7dda-4d96-b884-d36fc829f1c6',
    section: 'project',
    locale: 'en',
    project_name: 'HappyMob',
    project_description: 'A platform for business to register and search local business.',
    project_tags: ['Android','Kotlin'],
    approved: true,
    order: 0,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'c7c5d3c1-073a-4808-a215-1563e3524a5b',
    section: 'project',
    locale: 'en',
    project_name: 'Kido Protect Parental Control',
    project_description: 'Parental control application for screen monitoring and restrictions.',
    project_url: '#',
    project_tags: ['Kotlin','Jetpack','Firebase'],
    approved: true,
    order: 1,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'd1ca9f15-0544-46ec-bd2f-425e9cd1a9c3',
    section: 'project',
    locale: 'en',
    project_name: 'DolledUp',
    project_description: 'Social-commerce Android application integrating content and shopping.',
    project_url: '#',
    project_tags: ['Kotlin','MVVM','Firebase','REST APIs'],
    approved: true,
    order: 2,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'f49d5a28-6099-4fa5-894f-9e30b79e52af',
    section: 'project',
    locale: 'en',
    project_name: 'Magenative Shopify App',
    project_description: 'Mobile commerce builder for Shopify stores.',
    project_url: '#',
    project_tags: ['Java','Kotlin','APIs','Push Notifications'],
    approved: true,
    order: 3,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'dac6c67f-4455-40f2-8007-c15f9653319b',
    section: 'project',
    locale: 'en',
    project_name: 'Magenative Woocommerce App',
    project_description: 'Sophisticated native Android solution for WooCommerce with dynamic experience. Seamlessly synchronizes products and categories.',
    project_url: '#',
    project_tags: ['Java','Kotlin','WooCommerce API'],
    approved: true,
    order: 4,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: '6d2c20d4-2e25-461c-991d-373a43fb4d6b',
    section: 'project',
    locale: 'en',
    project_name: 'Classical Archive',
    project_description: 'Premier platform for classical music enthusiasts worldwide. Curated collection, seamless streaming.',
    project_url: '#',
    project_tags: ['Android','Streaming'],
    approved: true,
    order: 5,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  },
  {
    id: 'c8af6a1e-540b-47a4-b301-2ca98738349e',
    section: 'project',
    locale: 'en',
    project_name: 'ERP base Attendance system',
    project_description: 'Freelancing project for third party to be introduced to government.',
    project_tags: ['Android','ERP'],
    approved: true,
    order: 6,
    created_at: "2026-05-02T09:58:39.754812+00:00"
  }
];

class MockSupabaseQueryBuilder {
  constructor(tableName, client) {
    this.tableName = tableName;
    this.client = client;
    this.filters = [];
    this.mutationType = 'select'; // select, insert, update, delete, upsert
    this.payload = null;
    this.orderConfig = [];
    this.isSingle = false;
  }

  select(columns = '*') {
    this.mutationType = 'select';
    return this;
  }

  insert(payload) {
    this.mutationType = 'insert';
    this.payload = payload;
    return this;
  }

  update(payload) {
    this.mutationType = 'update';
    this.payload = payload;
    return this;
  }

  delete() {
    this.mutationType = 'delete';
    return this;
  }

  upsert(payload) {
    this.mutationType = 'upsert';
    this.payload = payload;
    return this;
  }

  eq(column, value) {
    this.filters.push({ type: 'eq', column, value });
    return this;
  }

  neq(column, value) {
    this.filters.push({ type: 'neq', column, value });
    return this;
  }

  is(column, value) {
    this.filters.push({ type: 'is', column, value });
    return this;
  }

  order(column, options = {}) {
    this.orderConfig.push({ column, ascending: options.ascending !== false });
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  async execute() {
    let tableData = this.client.getTableData(this.tableName);

    if (this.mutationType === 'select') {
      let data = [...tableData];
      for (const filter of this.filters) {
        if (filter.type === 'eq') {
          data = data.filter(row => row[filter.column] === filter.value);
        } else if (filter.type === 'neq') {
          data = data.filter(row => row[filter.column] !== filter.value);
        } else if (filter.type === 'is') {
          if (filter.value === null) {
            data = data.filter(row => row[filter.column] === null || row[filter.column] === undefined);
          } else {
            data = data.filter(row => row[filter.column] === filter.value);
          }
        }
      }

      // Apply ordering
      if (this.orderConfig.length > 0) {
        data.sort((a, b) => {
          for (const ord of this.orderConfig) {
            const { column, ascending } = ord;
            let valA = a[column];
            let valB = b[column];
            if (valA === null || valA === undefined) return ascending ? -1 : 1;
            if (valB === null || valB === undefined) return ascending ? 1 : -1;
            if (valA < valB) return ascending ? -1 : 1;
            if (valA > valB) return ascending ? 1 : -1;
          }
          return 0;
        });
      }

      if (this.isSingle) {
        return { data: data[0] || null, error: null };
      }
      return { data, error: null };
    }

    if (this.mutationType === 'insert') {
      const payloads = Array.isArray(this.payload) ? this.payload : [this.payload];
      const inserted = [];
      for (const p of payloads) {
        const newRow = { 
          id: p.id || (typeof tableData[0]?.id === 'number' ? (Math.max(...tableData.map(r => r.id), 0) + 1) : crypto.randomUUID()), 
          created_at: new Date().toISOString(), 
          updated_at: new Date().toISOString(),
          ...p 
        };
        tableData.push(newRow);
        inserted.push(newRow);
      }
      this.client.setTableData(this.tableName, tableData);
      return { data: Array.isArray(this.payload) ? inserted : inserted[0], error: null };
    }

    if (this.mutationType === 'update') {
      let indicesToUpdate = [];
      for (let i = 0; i < tableData.length; i++) {
        let match = true;
        for (const filter of this.filters) {
          if (filter.type === 'eq') {
            if (tableData[i][filter.column] !== filter.value) match = false;
          } else if (filter.type === 'neq') {
            if (tableData[i][filter.column] === filter.value) match = false;
          } else if (filter.type === 'is') {
            if (filter.value === null) {
              if (tableData[i][filter.column] !== null && tableData[i][filter.column] !== undefined) match = false;
            } else {
              if (tableData[i][filter.column] !== filter.value) match = false;
            }
          }
        }
        if (match) indicesToUpdate.push(i);
      }

      const updated = [];
      for (const idx of indicesToUpdate) {
        tableData[idx] = {
          ...tableData[idx],
          ...this.payload,
          updated_at: new Date().toISOString()
        };
        updated.push(tableData[idx]);
      }
      this.client.setTableData(this.tableName, tableData);
      return { data: updated, error: null };
    }

    if (this.mutationType === 'delete') {
      let remainingData = [];
      let deletedRows = [];
      for (let i = 0; i < tableData.length; i++) {
        let match = true;
        for (const filter of this.filters) {
          if (filter.type === 'eq') {
            if (tableData[i][filter.column] !== filter.value) match = false;
          } else if (filter.type === 'neq') {
            if (tableData[i][filter.column] === filter.value) match = false;
          } else if (filter.type === 'is') {
            if (filter.value === null) {
              if (tableData[i][filter.column] !== null && tableData[i][filter.column] !== undefined) match = false;
            } else {
              if (tableData[i][filter.column] !== filter.value) match = false;
            }
          }
        }
        if (match) {
          deletedRows.push(tableData[i]);
        } else {
          remainingData.push(tableData[i]);
        }
      }
      this.client.setTableData(this.tableName, remainingData);
      return { data: deletedRows, error: null };
    }

    if (this.mutationType === 'upsert') {
      const payloads = Array.isArray(this.payload) ? this.payload : [this.payload];
      const upserted = [];
      for (const p of payloads) {
        const existingIdx = tableData.findIndex(row => row.id !== undefined && row.id === p.id);
        if (existingIdx !== -1) {
          tableData[existingIdx] = {
            ...tableData[existingIdx],
            ...p,
            updated_at: new Date().toISOString()
          };
          upserted.push(tableData[existingIdx]);
        } else {
          const newRow = {
            id: p.id !== undefined ? p.id : (typeof tableData[0]?.id === 'number' ? (Math.max(...tableData.map(r => r.id), 0) + 1) : crypto.randomUUID()),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            ...p
          };
          tableData.push(newRow);
          upserted.push(newRow);
        }
      }
      this.client.setTableData(this.tableName, tableData);
      return { data: Array.isArray(this.payload) ? upserted : upserted[0], error: null };
    }

    return { data: null, error: new Error('Invalid query state') };
  }

  then(onfulfilled, onrejected) {
    return this.execute().then(onfulfilled, onrejected);
  }
}

class MockSupabaseAuth {
  constructor(client) {
    this.client = client;
    this.listeners = new Set();
  }

  async getSession() {
    const sessionToken = localStorage.getItem('adminToken');
    if (sessionToken === 'mock-token-xyz') {
      return {
        data: {
          session: {
            access_token: 'mock-token-xyz',
            user: { email: 'rvrai1998@gmail.com', id: 'e518468b-dd35-4d33-8795-1d4bdae886f0' }
          }
        },
        error: null
      };
    }
    return { data: { session: null }, error: null };
  }

  onAuthStateChange(callback) {
    this.listeners.add(callback);
    
    // Trigger immediately with current state
    const sessionToken = localStorage.getItem('adminToken');
    let session = null;
    if (sessionToken === 'mock-token-xyz') {
      session = {
        access_token: 'mock-token-xyz',
        user: { email: 'rvrai1998@gmail.com', id: 'e518468b-dd35-4d33-8795-1d4bdae886f0' }
      };
    }
    
    // Execute on next tick to avoid React state updates during render
    setTimeout(() => {
      callback('INITIAL_SESSION', session);
    }, 0);

    return {
      data: {
        subscription: {
          unsubscribe: () => {
            this.listeners.delete(callback);
          }
        }
      }
    };
  }

  async signInWithPassword({ email, password }) {
    if (email === 'rvrai1998@gmail.com' && password === 'admin123') {
      const session = {
        access_token: 'mock-token-xyz',
        user: { email, id: 'e518468b-dd35-4d33-8795-1d4bdae886f0' }
      };
      localStorage.setItem('adminToken', 'mock-token-xyz');
      
      for (const listener of this.listeners) {
        listener('SIGNED_IN', session);
      }

      return {
        data: { session, user: session.user },
        error: null
      };
    }
    return { 
      data: { session: null, user: null }, 
      error: new Error('Invalid email or password. Use rvrai1998@gmail.com / admin123 for local mock admin access.') 
    };
  }

  async signOut() {
    localStorage.removeItem('adminToken');
    for (const listener of this.listeners) {
      listener('SIGNED_OUT', null);
    }
    return { error: null };
  }
}

class MockSupabaseClient {
  constructor() {
    this.auth = new MockSupabaseAuth(this);
    this.initializeTables();
  }

  initializeTables() {
    const isSeeded = localStorage.getItem('mock_supabase_seeded');
    if (!isSeeded) {
      localStorage.setItem('mock_tbl_sections', JSON.stringify(SEED_SECTIONS));
      localStorage.setItem('mock_tbl_skills', JSON.stringify(SEED_SKILLS));
      localStorage.setItem('mock_tbl_social_links', JSON.stringify(SEED_SOCIAL_LINKS));
      localStorage.setItem('mock_tbl_hero_config', JSON.stringify(SEED_HERO_CONFIG));
      localStorage.setItem('mock_tbl_hero_slider_titles', JSON.stringify(SEED_HERO_SLIDER_TITLES));
      localStorage.setItem('mock_tbl_hero_bubbles', JSON.stringify(SEED_HERO_BUBBLES));
      localStorage.setItem('mock_tbl_content_entries', JSON.stringify(SEED_CONTENT_ENTRIES));
      localStorage.setItem('mock_tbl_certificates', JSON.stringify([]));
      localStorage.setItem('mock_supabase_seeded', 'true');
    }
  }

  getTableData(tableName) {
    const data = localStorage.getItem(`mock_tbl_${tableName}`);
    return data ? JSON.parse(data) : [];
  }

  setTableData(tableName, data) {
    localStorage.setItem(`mock_tbl_${tableName}`, JSON.stringify(data));
  }

  from(tableName) {
    return new MockSupabaseQueryBuilder(tableName, this);
  }
}

// Enable local mock if VITE_USE_LOCAL_MOCK env variable is true or if using the dead default Supabase URL
const useLocalMock = import.meta.env.VITE_USE_LOCAL_MOCK === 'true' || supabaseUrl.includes('erapzxkcacxzhbzwifhl.supabase.co');

export const supabase = useLocalMock ? new MockSupabaseClient() : createClient(supabaseUrl, supabaseAnonKey);
