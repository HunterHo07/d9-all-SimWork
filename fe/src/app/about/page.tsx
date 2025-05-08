'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FadeIn from '@/components/animations/FadeIn';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="pt-24 pb-12 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid opacity-20 z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] z-0"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient text-center">
              About SimulEx
            </h1>
            <p className="text-white/70 text-center max-w-3xl mx-auto mb-8">
              Revolutionizing skill development and hiring through immersive, AI-driven simulations
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-20">
        {/* Mission Section */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gradient">Our Mission</h2>
              <p className="text-white/70 mb-6 leading-relaxed">
                SimulEx was founded with a clear mission: to bridge the gap between theoretical knowledge and practical application in professional development and hiring.
              </p>
              <p className="text-white/70 mb-6 leading-relaxed">
                We believe that traditional methods of assessing skills—resumes, interviews, and certifications—often fail to capture a person's true capabilities. Our platform provides immersive, realistic simulations that allow individuals to demonstrate their skills in context, and organizations to evaluate candidates based on actual performance rather than self-reported experience.
              </p>
              <p className="text-white/70 leading-relaxed">
                By combining cutting-edge technology with insights from cognitive science and industry expertise, we're creating a future where skill development is engaging, assessment is accurate, and hiring is based on demonstrated abilities rather than credentials.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-30"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden h-[400px]">
                <div className="absolute inset-0 flex items-center justify-center text-white/20 text-lg">
                  Mission visualization would be here
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
        
        {/* Key Differentiators */}
        <FadeIn delay={0.1}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-gradient text-center">What Sets Us Apart</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Immersive Environments",
                  description: "Our simulations don't just test knowledge—they place users in realistic scenarios that mirror the complexity and challenges of real-world work environments.",
                  icon: "🌐",
                },
                {
                  title: "Adaptive Intelligence",
                  description: "Our AI-driven system adjusts difficulty and scenarios in real-time based on user performance, creating a personalized learning and assessment experience.",
                  icon: "🤖",
                },
                {
                  title: "Comprehensive Analytics",
                  description: "Beyond simple scores, we provide detailed insights into strengths, weaknesses, decision-making patterns, and skill gaps to guide improvement.",
                  icon: "📊",
                },
              ].map((item, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-sm border border-white/10">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-white/70">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeIn>
        
        {/* Team Section */}
        <FadeIn delay={0.2}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-gradient text-center">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alex Chen",
                  title: "Founder & CEO",
                  bio: "Former tech executive with a passion for revolutionizing skill development and hiring practices.",
                  avatar: "https://i.pravatar.cc/300?img=1",
                },
                {
                  name: "Sarah Johnson",
                  title: "Chief Technology Officer",
                  bio: "AI researcher and engineer specializing in adaptive learning systems and simulation technologies.",
                  avatar: "https://i.pravatar.cc/300?img=5",
                },
                {
                  name: "Michael Rodriguez",
                  title: "Head of Product",
                  bio: "UX expert focused on creating immersive, intuitive learning experiences that drive skill development.",
                  avatar: "https://i.pravatar.cc/300?img=3",
                },
                {
                  name: "Priya Patel",
                  title: "Chief Learning Officer",
                  bio: "Cognitive scientist with expertise in how people learn and develop skills in digital environments.",
                  avatar: "https://i.pravatar.cc/300?img=10",
                },
              ].map((person, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-sm border border-white/10">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-white/20">
                      <Image 
                        src={person.avatar} 
                        alt={person.name} 
                        width={96} 
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-white">{person.name}</h3>
                    <p className="text-purple-400 mb-3 text-sm">{person.title}</p>
                    <p className="text-white/70 text-sm">{person.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeIn>
        
        {/* Values Section */}
        <FadeIn delay={0.3}>
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-gradient text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Innovation",
                  description: "We constantly push the boundaries of what's possible in simulation technology and skill assessment.",
                },
                {
                  title: "Authenticity",
                  description: "Our simulations reflect the true complexity and challenges of real-world professional environments.",
                },
                {
                  title: "Accessibility",
                  description: "We're committed to making advanced skill development available to everyone, regardless of background.",
                },
                {
                  title: "Continuous Improvement",
                  description: "We believe in the power of feedback, iteration, and data-driven enhancement of our platform.",
                },
              ].map((value, index) => (
                <div key={index} className="flex">
                  <div className="mr-4 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">{value.title}</h3>
                    <p className="text-white/70">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        
        {/* CTA Section */}
        <FadeIn delay={0.4}>
          <div className="text-center bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl p-10 backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Ready to Experience the Future?</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8">
              Join thousands of professionals who are developing future-ready skills with SimulEx's immersive simulations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/simulations">
                <Button className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  Start Simulation
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg text-white border-white/20 hover:bg-white/5">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
