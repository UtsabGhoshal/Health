// Suppress harmless ResizeObserver warnings that don't affect functionality
export function suppressResizeObserverWarnings() {
  // Store the original console.error
  const originalConsoleError = console.error;

  // Override console.error to filter out ResizeObserver warnings
  console.error = (...args: any[]) => {
    const errorMessage = args[0];

    // Skip ResizeObserver loop warnings as they are harmless
    if (
      typeof errorMessage === "string" &&
      (errorMessage.includes(
        "ResizeObserver loop completed with undelivered notifications",
      ) ||
        errorMessage.includes("ResizeObserver loop limit exceeded"))
    ) {
      return;
    }

    // Skip if it's an Error object with ResizeObserver message
    if (
      errorMessage instanceof Error &&
      errorMessage.message?.includes("ResizeObserver loop")
    ) {
      return;
    }

    // Call the original console.error for all other errors
    originalConsoleError.apply(console, args);
  };

  // Handle unhandled promise rejections
  window.addEventListener(
    "unhandledrejection",
    (event: PromiseRejectionEvent) => {
      const reason = (event as PromiseRejectionEvent).reason;
      if (
        reason instanceof Error &&
        reason.message?.includes("ResizeObserver loop")
      ) {
        event.preventDefault();
        return;
      }
    },
  );

  // Also handle unhandled errors
  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (
      typeof message === "string" &&
      message.includes("ResizeObserver loop")
    ) {
      return true; // Prevent the error from being logged
    }

    // Call original error handler if it exists
    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }

    return false;
  };

  // Add a global ResizeObserver polyfill enhancement
  if (typeof window.ResizeObserver !== "undefined") {
    const OriginalResizeObserver = window.ResizeObserver;

    window.ResizeObserver = class extends OriginalResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        super((entries, observer) => {
          try {
            // Debounce the callback using requestAnimationFrame
            requestAnimationFrame(() => {
              callback(entries, observer);
            });
          } catch (error) {
            // Silently catch ResizeObserver loop errors
            if (
              !(error instanceof Error) ||
              !error.message.includes("ResizeObserver")
            ) {
              throw error;
            }
          }
        });
      }
    };
  }
}

// Initialize error suppression when this module is imported
if (typeof window !== "undefined") {
  suppressResizeObserverWarnings();
}
