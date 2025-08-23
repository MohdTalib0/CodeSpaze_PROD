import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="text-primary text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login with return location
  if (!isAuthenticated || !user) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  // If authenticated but not admin, redirect to dashboard
  if (user.role !== 'admin') {
    return (
      <Navigate 
        to="/dashboard" 
        state={{ 
          message: 'Access denied. Admin privileges required.',
          from: location.pathname 
        }}
        replace 
      />
    );
  }

  // If authenticated and admin, render the children
  return <>{children}</>;
};

export default AdminRoute;
