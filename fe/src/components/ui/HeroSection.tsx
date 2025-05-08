'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import GlitchText from '@/components/animations/GlitchText';
import FloatingParticles from '@/components/animations/FloatingParticles';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  // GSAP animations
  useEffect(() => {
    if (!heroRef.current || !textRef.current || !circleRef.current) return;

    const tl = gsap.timeline();

    // Animate the circle
    tl.fromTo(
      circleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
    );

    // Animate the text elements
    const textElements = textRef.current.querySelectorAll('.animate-text');
    tl.fromTo(
      textElements,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power2.out' },
      '-=1'
    );

    // Mouse move effect for the circle
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !circleRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      gsap.to(circleRef.current, {
        x: x * 30,
        y: y * 30,
        duration: 1,
        ease: 'power2.out',
      });
    };

    heroRef.current.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (heroRef.current) {
        heroRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <FloatingParticles
          count={100}
          color="rgba(255, 255, 255, 0.2)"
          minSize={1}
          maxSize={3}
          className="absolute inset-0"
        />
      </div>

      {/* Animated circle */}
      <div
        ref={circleRef}
        className="absolute z-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-3xl"
      />

      {/* Grid lines */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block mb-4 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
        >
          <span className="text-white/80 text-sm font-medium">The Future of Work Training</span>
        </motion.div>

        <h1 className="animate-text text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          <GlitchText
            text="SimulEx"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            glitchIntensity={0.4}
            glitchFrequency={0.6}
          />
        </h1>

        <p className="animate-text text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          Immersive AI-driven simulations that bridge the gap between learning and real-world performance.
        </p>

        <div className="animate-text flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <Link href="/simulations">
            <Button className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
              Start Simulation
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg text-white border-white/20 hover:bg-white/5">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-text grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
          {[
            { value: '93%', label: 'Skill Retention' },
            { value: '40%', label: 'Faster Onboarding' },
            { value: '78%', label: 'Reduced Mis-hires' },
          ].map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                {stat.value}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white/50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
