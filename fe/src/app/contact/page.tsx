'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FadeIn from '@/components/animations/FadeIn';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // In a real app, this would send the form data to a backend API
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
              Contact Us
            </h1>
            <p className="text-white/70 text-center max-w-2xl mx-auto mb-8">
              Have questions about SimulEx? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FadeIn>
            <Card className="bg-black/40 backdrop-blur-sm border border-white/10 h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input
                      id="name"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="min-h-[150px] bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
          
          {/* Contact Info */}
          <FadeIn delay={0.2}>
            <div className="space-y-8">
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                        <p className="text-white/70">contact@simulex.ai</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                        <p className="text-white/70">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                        <p className="text-white/70">123 Innovation Way<br />San Francisco, CA 94107</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-white">Connect With Us</h2>
                  
                  <div className="flex space-x-4">
                    {['twitter', 'linkedin', 'github', 'discord'].map((social) => (
                      <a
                        key={social}
                        href={`https://${social}.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                      >
                        <span className="sr-only">{social}</span>
                        <svg
                          className="w-5 h-5 text-white/70"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6 text-white">FAQ</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">How quickly will you respond?</h3>
                      <p className="text-white/70">We typically respond to all inquiries within 24-48 hours during business days.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Do you offer enterprise solutions?</h3>
                      <p className="text-white/70">Yes, we offer customized enterprise solutions. Contact our sales team for more information.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Can I request a demo?</h3>
                      <p className="text-white/70">Absolutely! You can request a personalized demo through this contact form.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
