// Mobile Route Recovery Utility
// Handles mobile-specific routing issues like Chrome app cutting and state restoration

export interface RouteRecoveryConfig {
  validRoutes: string[];
  fallbackRoute: string;
  recoveryTimeout: number;
  maxRetries: number;
}

export class MobileRouteRecovery {
  private config: RouteRecoveryConfig;
  private retryCount = 0;
  private isRecovering = false;

  constructor(config: RouteRecoveryConfig) {
    this.config = config;
    this.initializeMobileRecovery();
  }

  private initializeMobileRecovery() {
    // Handle mobile-specific events
    this.setupMobileEventListeners();
    
    // Handle page visibility changes
    this.setupVisibilityListeners();
    
    // Handle mobile app state changes
    this.setupAppStateListeners();
  }

  private setupMobileEventListeners() {
    // Handle pageshow event (important for mobile back/forward navigation)
    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        // Page was loaded from cache (back/forward navigation)
        this.recoverRoute();
      }
    });

    // Handle pagehide event
    window.addEventListener('pagehide', () => {
      // Save current route before page hides
      this.saveCurrentRoute();
    });

    // Handle beforeunload event
    window.addEventListener('beforeunload', () => {
      this.saveCurrentRoute();
    });
  }

  private setupVisibilityListeners() {
    let hiddenTime = 0;
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        hiddenTime = Date.now();
        this.saveCurrentRoute();
      } else {
        // Page became visible again
        const timeHidden = Date.now() - hiddenTime;
        
        // If hidden for more than 1 second, attempt recovery
        if (timeHidden > 1000) {
          setTimeout(() => this.recoverRoute(), 100);
        }
      }
    });
  }

  private setupAppStateListeners() {
    // Handle mobile app state changes
    if ('onpagehide' in window) {
      window.addEventListener('pagehide', () => {
        this.saveCurrentRoute();
      });
    }

    // Handle focus events (important for mobile)
    window.addEventListener('focus', () => {
      setTimeout(() => this.recoverRoute(), 200);
    });

    // Handle blur events
    window.addEventListener('blur', () => {
      this.saveCurrentRoute();
    });
  }

  private saveCurrentRoute() {
    const currentPath = window.location.pathname;
    if (this.config.validRoutes.includes(currentPath)) {
      localStorage.setItem('codespaze_current_route', currentPath);
      localStorage.setItem('codespaze_timestamp', Date.now().toString());
      localStorage.setItem('codespaze_route_hash', this.hashRoute(currentPath));
    }
  }

  private hashRoute(route: string): string {
    // Simple hash for route validation
    return btoa(route).slice(0, 8);
  }

  public recoverRoute(): boolean {
    if (this.isRecovering || this.retryCount >= this.config.maxRetries) {
      return false;
    }

    this.isRecovering = true;
    this.retryCount++;

    try {
      const currentPath = window.location.pathname;
      const savedRoute = localStorage.getItem('codespaze_current_route');
      const savedHash = localStorage.getItem('codespaze_route_hash');
      const timestamp = localStorage.getItem('codespaze_timestamp');

      // Check if we need to recover
      if (this.shouldRecoverRoute(currentPath, savedRoute, savedHash, timestamp)) {
        const targetRoute = this.determineTargetRoute(currentPath, savedRoute);
        
        if (targetRoute && targetRoute !== currentPath) {
          // Use history.replaceState for immediate route change
          window.history.replaceState(null, '', targetRoute);
          
          // Trigger route change event
          window.dispatchEvent(new PopStateEvent('popstate'));
          
          // Update localStorage
          this.saveCurrentRoute();
          
          this.isRecovering = false;
          return true;
        }
      }
    } catch (error) {
      console.warn('Route recovery failed:', error);
    }

    this.isRecovering = false;
    return false;
  }

  private shouldRecoverRoute(
    currentPath: string, 
    savedRoute: string | null, 
    savedHash: string | null, 
    timestamp: string | null
  ): boolean {
    // Don't recover if we're already on a valid route
    if (this.config.validRoutes.includes(currentPath)) {
      return false;
    }

    // Don't recover if no saved route
    if (!savedRoute || !savedHash) {
      return false;
    }

    // Don't recover if saved route is invalid
    if (!this.config.validRoutes.includes(savedRoute)) {
      return false;
    }

    // Check timestamp (within recovery timeout)
    if (timestamp) {
      const timeDiff = Date.now() - parseInt(timestamp);
      if (timeDiff > this.config.recoveryTimeout) {
        return false;
      }
    }

    // Validate hash
    if (savedHash !== this.hashRoute(savedRoute)) {
      return false;
    }

    return true;
  }

  private determineTargetRoute(currentPath: string, savedRoute: string | null): string | null {
    if (savedRoute && this.config.validRoutes.includes(savedRoute)) {
      return savedRoute;
    }

    // Try to find a similar route
    const similarRoute = this.findSimilarRoute(currentPath);
    if (similarRoute) {
      return similarRoute;
    }

    // Fallback to default route
    return this.config.fallbackRoute;
  }

  private findSimilarRoute(currentPath: string): string | null {
    const pathParts = currentPath.split('/').filter(Boolean);
    
    if (pathParts.length === 0) return null;

    // Try exact matches first
    for (const route of this.config.validRoutes) {
      if (route === currentPath) return route;
    }

    // Try partial matches
    for (const route of this.config.validRoutes) {
      const routeParts = route.split('/').filter(Boolean);
      if (routeParts.length > 0 && routeParts[0] === pathParts[0]) {
        return route;
      }
    }

    return null;
  }

  public forceRecovery(): boolean {
    this.retryCount = 0;
    return this.recoverRoute();
  }

  public reset(): void {
    this.retryCount = 0;
    this.isRecovering = false;
  }
}

// Default configuration
export const defaultRouteRecoveryConfig: RouteRecoveryConfig = {
  validRoutes: [
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
  ],
  fallbackRoute: '/',
  recoveryTimeout: 10 * 60 * 1000, // 10 minutes
  maxRetries: 3
};

// Create default instance
export const mobileRouteRecovery = new MobileRouteRecovery(defaultRouteRecoveryConfig);
