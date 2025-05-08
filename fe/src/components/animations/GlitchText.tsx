'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: number;
  glitchFrequency?: number;
}

export default function GlitchText({
  text,
  className = '',
  glitchIntensity = 0.3,
  glitchFrequency = 0.5,
}: GlitchTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Characters to use for glitching
  const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Create a GSAP timeline
    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

    const textElement = containerRef.current;
    const originalText = text;

    // Function to generate a random glitched version of the text
    const getGlitchedText = () => {
      return originalText
        .split('')
        .map((char) => {
          if (Math.random() < glitchIntensity && char !== ' ') {
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
          return char;
        })
        .join('');
    };

    // Add glitch animations to the timeline
    for (let i = 0; i < 10; i++) {
      const delay = i * 0.1;
      tl.add(
        () => {
          if (textElement) {
            textElement.innerText = getGlitchedText();
          }
        },
        delay
      );
    }

    // Restore original text at the end
    tl.add(() => {
      if (textElement) {
        textElement.innerText = originalText;
      }
    });

    // Set up random glitching when not hovering
    let glitchInterval: NodeJS.Timeout;

    const startRandomGlitching = () => {
      glitchInterval = setInterval(() => {
        if (Math.random() < glitchFrequency && !isHovering) {
          const duration = Math.random() * 0.2 + 0.1;
          timelineRef.current?.progress(0).play();
          gsap.delayedCall(duration, () => {
            if (textElement) {
              textElement.innerText = originalText;
            }
          });
        }
      }, 2000);
    };

    startRandomGlitching();

    return () => {
      clearInterval(glitchInterval);
      timelineRef.current?.kill();
    };
  }, [text, isHovering, glitchIntensity, glitchFrequency]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (timelineRef.current) {
      timelineRef.current.progress(0).play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (containerRef.current) {
      containerRef.current.innerText = text;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`glitch-text ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </div>
  );
}
