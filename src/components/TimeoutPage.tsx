import React, { useLayoutEffect, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TimeoutPage() {
  useLayoutEffect(() => {
    // Create a stronger history trap by replacing the current state
    // This effectively makes this page a "dead end" in the history stack
    window.history.replaceState(null, '', '/timeout');
    
    // Push multiple timeout entries to create a deeper trap
    for (let i = 0; i < 3; i++) {
      window.history.pushState(null, '', '/timeout');
    }
  }, []);

  useEffect(() => {
    // Handle browser back button attempts with more aggressive prevention
    const handlePopState = (event: PopStateEvent) => {
      // Prevent the default back navigation
      event.preventDefault();
      
      // Immediately push forward multiple times to counteract any back navigation
      window.history.pushState(null, '', '/timeout');
      window.history.pushState(null, '', '/timeout');
      
      // Force forward navigation as a fallback
      setTimeout(() => {
        window.history.forward();
      }, 10);
    };

    // Handle page visibility changes (when user switches tabs/apps and comes back)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // When page becomes visible again, reinforce the history trap
        window.history.pushState(null, '', '/timeout');
      }
    };

    // Handle focus events (additional reinforcement)
    const handleFocus = () => {
      window.history.pushState(null, '', '/timeout');
    };

    // Add multiple event listeners for comprehensive coverage
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    // Mobile-specific: Handle touch events that might trigger navigation
    const handleTouchStart = (e: TouchEvent) => {
      // If touch starts near the left edge (common swipe-back gesture area)
      if (e.touches[0] && e.touches[0].clientX < 50) {
        // Reinforce history trap
        window.history.pushState(null, '', '/timeout');
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Cleanup all event listeners on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center border border-red-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="mb-6"
        >
          <div className="rounded-full bg-red-100 p-4 inline-block mb-4">
            <Clock className="h-12 w-12 text-red-500" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Session Timed Out
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8 leading-relaxed"
        >
          Your session has expired due to inactivity. Please re-scan the QR code to access the attendance form and sign your attendance.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <p className="text-blue-800 font-medium text-sm">
            📱 Re-scan your QR code to continue
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="pt-6 border-t border-gray-100"
        >
          <p className="text-xs text-gray-400">
            Sessions automatically expire after 1 minute for security purposes
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}