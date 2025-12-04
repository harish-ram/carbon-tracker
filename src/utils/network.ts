// Network utilities for mobile connectivity monitoring
export class NetworkMonitor {
  private online: boolean = navigator.onLine;
  private listeners: ((online: boolean) => void)[] = [];

  constructor() {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.online = true;
      this.notifyListeners();
    });

    window.addEventListener('offline', () => {
      this.online = false;
      this.notifyListeners();
    });

    // Check connection quality (if supported)
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection?.addEventListener('change', () => {
        this.checkConnectionQuality();
      });
    }
  }

  isOnline(): boolean {
    return this.online;
  }

  onStatusChange(callback: (online: boolean) => void): () => void {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback(this.online));
  }

  private checkConnectionQuality() {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType;
      const downlink = connection?.downlink;

      // Log connection quality for debugging
      console.log('Connection quality:', { effectiveType, downlink });
    }
  }

  // Test actual connectivity (not just navigator.onLine)
  async testConnectivity(url: string = 'https://www.google.com/favicon.ico'): Promise<boolean> {
    try {
      await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache'
      });
      return true;
    } catch {
      return false;
    }
  }
}

// Singleton instance
export const networkMonitor = new NetworkMonitor();

// Retry utility with exponential backoff
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        break;
      }

      // Check if we're offline before retrying
      if (!networkMonitor.isOnline()) {
        throw new Error('No internet connection available');
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Mobile-friendly error messages
export function getMobileErrorMessage(error: any): string {
  if (!networkMonitor.isOnline()) {
    return 'No internet connection. Please check your network and try again.';
  }

  if (error?.code === 'unavailable') {
    return 'Service temporarily unavailable. Please try again in a few moments.';
  }

  if (error?.message?.includes('timeout')) {
    return 'Request timed out. Please check your connection and try again.';
  }

  if (error?.message?.includes('quota')) {
    return 'Too many requests. Please wait a moment before trying again.';
  }

  return 'Something went wrong. Please try again.';
}