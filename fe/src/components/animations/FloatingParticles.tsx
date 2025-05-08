'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  size: number;
  speed: number;
  vx: number;
  vy: number;
  alpha: number;
}

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  className?: string;
}

export default function FloatingParticles({
  count = 50,
  color = 'rgba(255, 255, 255, 0.5)',
  minSize = 1,
  maxSize = 4,
  minSpeed = 0.1,
  maxSpeed = 0.5,
  className = '',
}: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Create particles
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      // Create particle element
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.borderRadius = '50%';
      element.style.pointerEvents = 'none';

      // Random properties
      const size = Math.random() * (maxSize - minSize) + minSize;
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
      const x = Math.random() * containerWidth;
      const y = Math.random() * containerHeight;
      const alpha = Math.random() * 0.5 + 0.2;

      // Set styles
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      element.style.backgroundColor = color;
      element.style.opacity = alpha.toString();

      // Add to container
      container.appendChild(element);

      // Create particle object
      const particle: Particle = {
        element,
        x,
        y,
        size,
        speed,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        alpha,
      };

      particles.push(particle);

      // Initial position
      gsap.set(element, {
        x,
        y,
      });
    }

    particlesRef.current = particles;

    // Animation loop
    const animate = () => {
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > containerWidth) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > containerHeight) {
          particle.vy *= -1;
        }

        // Apply position
        gsap.set(particle.element, {
          x: particle.x,
          y: particle.y,
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      particles.forEach((particle) => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, [count, color, minSize, maxSize, minSpeed, maxSpeed]);

  return (
    <div
      ref={containerRef}
      className={`floating-particles relative overflow-hidden ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
