'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Custom404() {
  const router = useRouter();

  // This helps with GitHub Pages routing issues
  useEffect(() => {
    // Check if we're on GitHub Pages
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // Get the current path without the basePath
      const path = window.location.pathname.replace('/d9-all-SimWork', '');
      
      // If it's a direct navigation to a page that should exist
      // Try to redirect to the correct path
      if (path && !path.includes('.') && !path.endsWith('/')) {
        router.replace(`/d9-all-SimWork${path}/`);
      }
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">The page you are looking for does not exist.</p>
      <Button 
        onClick={() => router.push('/')}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
      >
        Go Home
      </Button>
    </div>
  );
}
