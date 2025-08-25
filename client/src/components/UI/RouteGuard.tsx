import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);

  // Define all valid routes
  const validRoutes = [
    '/',
    '/programs',
    '/products',
    '/services',
    '/contact',
    '/enroll',
    '/login',
    '/register',
    '/programs/internship',
    '/programs/fellowship',
    '/programs/summer',
    '/programs/winter',
    '/programs/international',
    '/products/fundalytics',
    '/products/investlocal',
    '/products/ai-builder',
    '/products/stacksage',
    '/products/collabxnation',
    '/products/autoservehub',
    '/dashboard',
    '/admin'
  ];

  useEffect(() => {
    const validateRoute = () => {
      const currentPath = location.pathname;
      
      // Check if current path is valid
      if (!validRoutes.includes(currentPath)) {
        // Try to find a similar valid route
        const similarRoute = findSimilarRoute(currentPath);
        
        if (similarRoute) {
          // Navigate to similar route
          navigate(similarRoute, { replace: true });
        } else {
          // Check if we have a saved valid route
          const savedRoute = localStorage.getItem('codespaze_current_route');
          if (savedRoute && validRoutes.includes(savedRoute)) {
            navigate(savedRoute, { replace: true });
          } else {
            // Fallback to home page
            navigate('/', { replace: true });
          }
        }
      } else {
        // Route is valid, save it
        localStorage.setItem('codespaze_current_route', currentPath);
        localStorage.setItem('codespaze_timestamp', Date.now().toString());
      }
      
      setIsValidating(false);
    };

    // Small delay to ensure app is fully loaded
    const timer = setTimeout(validateRoute, 100);
    
    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  // Find similar route based on current path
  const findSimilarRoute = (currentPath: string): string | null => {
    // Remove trailing slashes and split path
    const cleanPath = currentPath.replace(/\/$/, '');
    const pathParts = cleanPath.split('/').filter(Boolean);
    
    if (pathParts.length === 0) return null;
    
    // Try to find exact matches first
    for (const route of validRoutes) {
      if (route === currentPath) return route;
    }
    
    // Try to find partial matches
    for (const route of validRoutes) {
      const routeParts = route.split('/').filter(Boolean);
      
      // Check if route starts with the same base path
      if (routeParts.length > 0 && routeParts[0] === pathParts[0]) {
        return route;
      }
    }
    
    // Try to find routes with similar structure
    for (const route of validRoutes) {
      if (route.includes(pathParts[0])) {
        return route;
      }
    }
    
    return null;
  };

  // Show loading while validating
  if (isValidating) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#19c973] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuard;
