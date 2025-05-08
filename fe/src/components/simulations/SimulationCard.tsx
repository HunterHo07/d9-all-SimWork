'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Simulation } from '@/lib/api/pocketbase';

interface SimulationCardProps {
  simulation: Simulation;
}

export default function SimulationCard({ simulation }: SimulationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Get role color or default to blue
  const roleColor = simulation.expand?.role?.color || '#3b82f6';
  
  // Get difficulty color
  const getDifficultyColor = () => {
    switch (simulation.difficulty) {
      case 'beginner':
        return 'bg-green-500';
      case 'intermediate':
        return 'bg-blue-500';
      case 'advanced':
        return 'bg-yellow-500';
      case 'expert':
        return 'bg-red-500';
      case 'adaptive':
        return 'bg-purple-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  // 3D tilt effect
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovered) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    if (isHovered) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transition: 'transform 0.2s ease-out' }}
    >
      <Card className="h-full overflow-hidden border-0 bg-black/40 backdrop-blur-sm relative group">
        {/* Border gradient effect */}
        <div 
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ 
            background: `linear-gradient(45deg, ${roleColor}00, ${roleColor}40, ${roleColor}00)`,
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 3s ease infinite'
          }}
        />
        
        {/* Difficulty badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getDifficultyColor()}`}>
            {simulation.difficulty.charAt(0).toUpperCase() + simulation.difficulty.slice(1)}
          </div>
        </div>
        
        {/* Role icon */}
        <div 
          className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
          style={{ backgroundColor: roleColor }}
        >
          <span className="text-white text-xs font-bold">
            {simulation.expand?.role?.icon || simulation.expand?.role?.title.charAt(0)}
          </span>
        </div>
        
        <CardContent className="p-6 pb-0">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-500"
              style={{ 
                backgroundImage: `linear-gradient(to right, white, ${roleColor})`,
                WebkitBackgroundClip: 'text'
              }}
            >
              {simulation.title}
            </h3>
            <p className="text-white/70 text-sm line-clamp-3">
              {simulation.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-white/60 mb-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{simulation.duration} min</span>
            </div>
            <div>
              <span>{simulation.expand?.role?.title}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-2">
          <Link href={`/simulations/${simulation.id}`} className="w-full">
            <Button 
              className="w-full transition-all duration-300 border-0"
              style={{ 
                background: isHovered 
                  ? `linear-gradient(to right, ${roleColor}, ${roleColor}CC)` 
                  : 'rgba(255, 255, 255, 0.1)'
              }}
            >
              Start Simulation
            </Button>
          </Link>
        </CardFooter>
        
        {/* Hover effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at center, ${roleColor} 0%, transparent 70%)`,
          }}
        />
      </Card>
    </motion.div>
  );
}
