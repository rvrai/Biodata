import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for JWT tokens (Admin usage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const portfolioService = {
  // Public data
  getAllData: () => api.get('/portfolio/').then(res => res.data),
  
  // Contact
  submitContact: (data) => api.post('/contact/', data).then(res => res.data),
};

export const adminService = {
  login: (username, password) => api.post('/admin/login/', { username, password }).then(res => res.data),
  
  // CRUD operations
  getSections: () => api.get('/admin/sections/').then(res => res.data),
  updateSection: (id, data) => api.put(`/admin/sections/${id}/`, data).then(res => res.data),
  reorderSections: (sectionIds) => api.post('/admin/sections/reorder/', { section_ids: sectionIds }).then(res => res.data),
  toggleSectionVisibility: (id) => api.post(`/admin/sections/${id}/toggle_visibility/`).then(res => res.data),
  
  // Example for other entities (will add dynamically as needed)
  updateSiteConfig: (data) => api.put('/admin/site-config/', data).then(res => res.data),
};

export default api;
