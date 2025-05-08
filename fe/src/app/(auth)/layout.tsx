'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import GlitchText from '@/components/animations/GlitchText';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-black">
      {/* Logo in top left */}
      <div className="absolute top-6 left-6 z-10">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SX</span>
            </div>
          </motion.div>
          <GlitchText
            text="SimulEx"
            className="text-white font-bold text-xl tracking-wider"
            glitchIntensity={0.2}
            glitchFrequency={0.3}
          />
        </Link>
      </div>
      
      {children}
    </div>
  );
}
