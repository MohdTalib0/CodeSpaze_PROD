import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { mobileRouteRecovery } from '../../utils';

interface RouteRecoveryDebugProps {
  show?: boolean;
}

const RouteRecoveryDebug: React.FC<RouteRecoveryDebugProps> = ({ show = false }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(show);
  const [debugInfo, setDebugInfo] = useState({
    currentPath: '',
    savedRoute: '',
    timestamp: '',
    routeHash: '',
    isValidRoute: false
  });

  useEffect(() => {
    updateDebugInfo();
  }, [location.pathname]);

  const updateDebugInfo = () => {
    const currentPath = window.location.pathname;
    const savedRoute = localStorage.getItem('codespaze_current_route');
    const timestamp = localStorage.getItem('codespaze_timestamp');
    const routeHash = localStorage.getItem('codespaze_route_hash');
    
    setDebugInfo({
      currentPath,
      savedRoute: savedRoute || 'none',
      timestamp: timestamp || 'none',
      routeHash: routeHash || 'none',
      isValidRoute: mobileRouteRecovery['config'].validRoutes.includes(currentPath)
    });
  };

  const handleForceRecovery = () => {
    const success = mobileRouteRecovery.forceRecovery();
    if (success) {
      alert('Route recovery successful!');
    } else {
      alert('Route recovery failed. Check console for details.');
    }
    updateDebugInfo();
  };

  const handleResetRecovery = () => {
    mobileRouteRecovery.reset();
    alert('Route recovery reset. You can try recovery again.');
    updateDebugInfo();
  };

  const handleClearStorage = () => {
    localStorage.removeItem('codespaze_current_route');
    localStorage.removeItem('codespaze_timestamp');
    localStorage.removeItem('codespaze_route_hash');
    alert('Local storage cleared. This will reset route recovery.');
    updateDebugInfo();
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg"
        title="Show Route Recovery Debug"
      >
        🐛
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg shadow-lg max-w-sm text-xs font-mono">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-green-400">Route Recovery Debug</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 mb-4">
        <div>
          <span className="text-gray-400">Current Path:</span>
          <span className={`ml-2 ${debugInfo.isValidRoute ? 'text-green-400' : 'text-red-400'}`}>
            {debugInfo.currentPath}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Saved Route:</span>
          <span className="ml-2 text-blue-400">{debugInfo.savedRoute}</span>
        </div>
        <div>
          <span className="text-gray-400">Timestamp:</span>
          <span className="ml-2 text-yellow-400">{debugInfo.timestamp}</span>
        </div>
        <div>
          <span className="text-gray-400">Route Hash:</span>
          <span className="ml-2 text-purple-400">{debugInfo.routeHash}</span>
        </div>
        <div>
          <span className="text-gray-400">Valid Route:</span>
          <span className={`ml-2 ${debugInfo.isValidRoute ? 'text-green-400' : 'text-red-400'}`}>
            {debugInfo.isValidRoute ? 'Yes' : 'No'}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <button
          onClick={handleForceRecovery}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs"
        >
          Force Route Recovery
        </button>
        <button
          onClick={handleResetRecovery}
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded text-xs"
        >
          Reset Recovery
        </button>
        <button
          onClick={handleClearStorage}
          className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-xs"
        >
          Clear Storage
        </button>
        <button
          onClick={updateDebugInfo}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs"
        >
          Refresh Info
        </button>
      </div>
    </div>
  );
};

export default RouteRecoveryDebug;
