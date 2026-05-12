import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PortfolioView from './components/templates/PortfolioView';
import LenisProvider from './components/providers/LenisProvider';
import GlassCursor from './components/atoms/GlassCursor';
import SplashScreen from './components/atoms/SplashScreen';
import './App.css';

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminToken'));

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <LenisProvider>
      <GlassCursor />
      <SplashScreen />
      <BrowserRouter>
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0a0a0a' }} />}>
          <Routes>
            <Route path="/" element={<PortfolioView />} />
            <Route 
              path="/admin/login" 
              element={isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLogin onLogin={handleLogin} />} 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </LenisProvider>
  );
}

export default App;
