import { useEffect, useRef } from 'react';

/**
 * Custom hook to handle ResizeObserver more gracefully and prevent loops
 * This hook debounces resize observations to prevent excessive callbacks
 */
export function useStableResize(
  callback: () => void,
  dependencies: any[] = [],
  debounceMs: number = 100
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallRef = useRef<number>(0);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the callback to prevent excessive calls
    timeoutRef.current = setTimeout(() => {
      const now = Date.now();
      
      // Prevent calls that are too frequent
      if (now - lastCallRef.current >= debounceMs) {
        lastCallRef.current = now;
        
        // Use requestAnimationFrame to ensure DOM is stable
        requestAnimationFrame(() => {
          try {
            callback();
          } catch (error) {
            // Silently handle ResizeObserver-related errors
            if (!(error instanceof Error) || !error.message.includes('ResizeObserver')) {
              console.error('Resize callback error:', error);
            }
          }
        });
      }
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, dependencies);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
}

/**
 * Custom hook that provides a stable element ref with resize observation
 */
export function useStableElementResize<T extends HTMLElement>(
  onResize?: (entry: ResizeObserverEntry) => void
) {
  const elementRef = useRef<T>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !onResize) return;

    // Create ResizeObserver with error handling
    observerRef.current = new ResizeObserver((entries) => {
      try {
        // Use requestAnimationFrame to prevent loops
        requestAnimationFrame(() => {
          entries.forEach(onResize);
        });
      } catch (error) {
        // Silently handle ResizeObserver loop errors
        if (error instanceof Error && !error.message.includes('ResizeObserver')) {
          console.error('ResizeObserver error:', error);
        }
      }
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [onResize]);

  return elementRef;
}
