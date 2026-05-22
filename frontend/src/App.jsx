import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabase';
import PortfolioView from './components/templates/PortfolioView';
import LenisProvider from './components/providers/LenisProvider';
import GlassCursor from './components/atoms/GlassCursor';
import SplashScreen from './components/atoms/SplashScreen';
import './App.css';

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Fix #1: ProtectedRoute now receives isAuthenticated as a prop (driven by Supabase session)
// instead of reading raw localStorage — so expired tokens are properly rejected.
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  // Fix #2: Start as false + authLoading to avoid flash of dashboard on expired token.
  // Previously this was initialized from localStorage which allowed expired JWTs to pass.
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Fix #3: Check the real Supabase session on mount — not just a localStorage string.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        localStorage.setItem('adminToken', session.access_token);
      } else {
        localStorage.removeItem('adminToken');
      }
      setAuthLoading(false);
    });

    // Fix #4: onAuthStateChange keeps isAuthenticated in sync with Supabase at all times.
    // This handles: login, logout, token refresh, and session expiry automatically.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        localStorage.setItem('adminToken', session.access_token);
      } else {
        localStorage.removeItem('adminToken');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    // onAuthStateChange will fire and set isAuthenticated=true automatically on login.
    // This explicit call is kept as an immediate trigger for the login redirect.
    setIsAuthenticated(true);
  };

  // Show a blank screen (matching the splash bg) while we verify the session.
  // This prevents the 'flash to login' on page reload for valid sessions.
  if (authLoading) {
    return <div style={{ height: '100vh', background: '#0a0a0a' }} />;
  }

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
                <ProtectedRoute isAuthenticated={isAuthenticated}>
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
