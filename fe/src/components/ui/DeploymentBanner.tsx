'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function DeploymentBanner() {
  // Simply return null to disable the banner completely
  return null;

  // The code below is kept but not used, in case you want to re-enable a less intrusive banner later
  /*
  const [isGitHubPages, setIsGitHubPages] = useState(false);
  const [path, setPath] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if we're running on GitHub Pages
    const hostname = window.location.hostname;
    const isGitHub = hostname.includes('github.io');
    setIsGitHubPages(isGitHub);

    // Get the current path for debugging
    setPath(window.location.pathname);

    // Auto-hide the banner after 5 seconds
    if (isGitHub) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isGitHubPages || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-1 text-center z-50 text-sm"
    >
      🚀 GitHub Pages
      <button
        onClick={() => setIsVisible(false)}
        className="ml-2 bg-white/20 px-1 rounded hover:bg-white/30"
      >
        ✕
      </button>
    </motion.div>
  );
  */
}
