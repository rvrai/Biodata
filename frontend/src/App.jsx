import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PortfolioView from './components/templates/PortfolioView';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LenisProvider from './components/providers/LenisProvider';
import GlassCursor from './components/atoms/GlassCursor';
import SplashScreen from './components/atoms/SplashScreen';
import './App.css';

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
    </BrowserRouter>
    </LenisProvider>
  );
}

export default App;
