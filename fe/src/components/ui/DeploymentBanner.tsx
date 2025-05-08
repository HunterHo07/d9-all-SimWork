'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function DeploymentBanner() {
  const [isGitHubPages, setIsGitHubPages] = useState(false);
  
  useEffect(() => {
    // Check if we're running on GitHub Pages
    const hostname = window.location.hostname;
    const isGitHub = hostname.includes('github.io');
    setIsGitHubPages(isGitHub);
  }, []);
  
  if (!isGitHubPages) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 text-center z-50"
    >
      🚀 Successfully deployed on GitHub Pages!
    </motion.div>
  );
}
