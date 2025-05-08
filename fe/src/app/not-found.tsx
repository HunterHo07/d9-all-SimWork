'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';
import FloatingParticles from '@/components/animations/FloatingParticles';
import GlitchText from '@/components/animations/GlitchText';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden p-4">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-20 z-0"></div>
      <div className="absolute inset-0 z-0">
        <FloatingParticles
          count={50}
          color="rgba(255, 0, 0, 0.2)"
          minSize={1}
          maxSize={3}
          className="absolute inset-0"
        />
      </div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[100px] z-0"></div>
      
      <FadeIn className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500">
            <GlitchText
              text="404"
              glitchIntensity={0.5}
              glitchFrequency={0.7}
            />
          </div>
        </motion.div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Simulation Not Found</h1>
        <p className="text-white/70 max-w-md mx-auto mb-8">
          The simulation you're looking for doesn't exist or has been terminated. Please return to a stable environment.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/">
            <Button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Return Home
            </Button>
          </Link>
          <Link href="/simulations">
            <Button variant="outline" className="w-full sm:w-auto px-6 py-3 text-white border-white/20 hover:bg-white/5">
              Browse Simulations
            </Button>
          </Link>
        </div>
      </FadeIn>
      
      {/* Glitchy elements */}
      <motion.div
        className="absolute z-0 w-64 h-64 bg-red-500/10 rounded-full blur-xl"
        animate={{
          x: [0, 10, -10, 0],
          y: [0, -10, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
        style={{ left: '20%', top: '30%' }}
      />
      
      <motion.div
        className="absolute z-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        animate={{
          x: [0, -15, 15, 0],
          y: [0, 15, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        style={{ right: '25%', bottom: '20%' }}
      />
    </div>
  );
}
