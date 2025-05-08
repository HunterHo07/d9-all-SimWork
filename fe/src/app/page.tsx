import HeroSection from "@/components/ui/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Features section data
  const features = [
    {
      title: "Immersive Simulations",
      description: "Experience realistic work scenarios in a futuristic 3D environment with adaptive difficulty.",
      icon: "🌐",
    },
    {
      title: "AI-Powered Evaluation",
      description: "Get real-time feedback and personalized insights powered by advanced AI algorithms.",
      icon: "🤖",
    },
    {
      title: "Multi-Role Training",
      description: "Develop skills across different roles including Developer, Designer, PM, Data Entry, and AI Engineer.",
      icon: "👥",
    },
    {
      title: "Performance Analytics",
      description: "Track progress with comprehensive metrics and visualizations of your skill development.",
      icon: "📊",
    },
    {
      title: "Hiring Integration",
      description: "Seamlessly integrate with hiring processes to evaluate candidates in realistic scenarios.",
      icon: "🔍",
    },
    {
      title: "Skill Certification",
      description: "Earn verifiable credentials that showcase your practical abilities to employers.",
      icon: "🏆",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-grid opacity-20"></div>

        {/* Gradient orb */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[80px]"></div>

        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Future-Ready Features</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                SimulEx combines cutting-edge technology with practical skill development to create a training experience unlike any other.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <Card className="bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all duration-300">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-gradient transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-black to-black/95 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)]"></div>

        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">How SimulEx Works</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                A seamless process designed to maximize skill development and assessment accuracy.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Select Your Role",
                description: "Choose from Developer, Designer, PM, Data Entry, or AI Engineer simulations.",
              },
              {
                step: "02",
                title: "Complete Challenges",
                description: "Tackle realistic tasks in an immersive environment with adaptive difficulty.",
              },
              {
                step: "03",
                title: "Analyze Performance",
                description: "Review detailed metrics and receive AI-powered feedback to improve your skills.",
              },
            ].map((item, index) => (
              <FadeIn key={index} delay={index * 0.2} direction="up">
                <div className="relative">
                  <div className="text-6xl font-bold text-white/10 absolute -top-6 -left-4">
                    {item.step}
                  </div>
                  <div className="border border-white/10 rounded-xl p-6 bg-black/40 backdrop-blur-sm relative z-10">
                    <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.6}>
            <div className="text-center mt-12">
              <Link href="/simulations">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg">
                  Start Your Simulation
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>

        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">What Users Say</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Hear from professionals who have experienced the future of work training.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                quote: "SimulEx transformed our hiring process. We can now evaluate candidates based on real skills, not just interviews.",
                name: "Alex Chen",
                title: "CTO, FutureTech Inc.",
                avatar: "https://i.pravatar.cc/100?img=1",
              },
              {
                quote: "The adaptive difficulty made learning challenging but never frustrating. I improved my coding skills faster than with any other platform.",
                name: "Sarah Johnson",
                title: "Senior Developer",
                avatar: "https://i.pravatar.cc/100?img=5",
              },
              {
                quote: "As someone transitioning careers, SimulEx gave me the practical experience I needed to land my first tech job.",
                name: "Michael Rodriguez",
                title: "UX Designer",
                avatar: "https://i.pravatar.cc/100?img=3",
              },
            ].map((testimonial, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                <Card className="bg-black/40 backdrop-blur-sm border border-white/10 h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <p className="text-white/80 italic mb-6">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-white/20">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{testimonial.name}</h4>
                        <p className="text-white/60 text-sm">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-black/95 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15)_0,transparent_70%)]"></div>

        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
                Ready to Experience the Future of Work Training?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who are developing future-ready skills with SimulEx's immersive simulations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/simulations">
                  <Button className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    Start Simulation
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg text-white border-white/20 hover:bg-white/5">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
