'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FadeIn from '@/components/animations/FadeIn';
import GlitchText from '@/components/animations/GlitchText';
import { api, Simulation, Task } from '@/lib/api/pocketbase';

export default function SimulationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch simulation and tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const simulationId = params.id as string;
        const [simulationData, tasksData] = await Promise.all([
          api.simulations.getById(simulationId),
          api.tasks.getBySimulation(simulationId),
        ]);
        setSimulation(simulationData);
        setTasks(tasksData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load simulation. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id]);

  // Start simulation
  const handleStartSimulation = async () => {
    try {
      if (!simulation) return;
      
      // Create a new result record to track this simulation session
      const result = await api.results.create({
        simulation: simulation.id,
        task: tasks[0]?.id, // Start with the first task
        startTime: new Date().toISOString(),
        completed: false,
      });
      
      // Navigate to the task page
      router.push(`/simulations/${simulation.id}/tasks/${tasks[0]?.id}`);
    } catch (err) {
      console.error('Error starting simulation:', err);
      setError('Failed to start simulation. Please try again.');
    }
  };

  // Get difficulty label and color
  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return { label: 'Beginner', color: 'bg-green-500' };
      case 'intermediate':
        return { label: 'Intermediate', color: 'bg-blue-500' };
      case 'advanced':
        return { label: 'Advanced', color: 'bg-yellow-500' };
      case 'expert':
        return { label: 'Expert', color: 'bg-red-500' };
      case 'adaptive':
        return { label: 'Adaptive', color: 'bg-purple-500' };
      default:
        return { label: 'Unknown', color: 'bg-gray-500' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (error || !simulation) {
    return (
      <div className="min-h-screen bg-black pt-24 flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">{error || 'Simulation not found'}</p>
        <Button onClick={() => router.push('/simulations')}>Back to Simulations</Button>
      </div>
    );
  }

  const difficultyInfo = getDifficultyInfo(simulation.difficulty);
  const roleColor = simulation.expand?.role?.color || '#3b82f6';

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="pt-24 pb-12 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid opacity-20 z-0"></div>
        <div 
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] z-0"
          style={{ backgroundColor: `${roleColor}10` }}
        ></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center mb-4">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                style={{ backgroundColor: roleColor }}
              >
                <span className="text-white text-sm font-bold">
                  {simulation.expand?.role?.icon || simulation.expand?.role?.title.charAt(0)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient">
                <GlitchText
                  text={simulation.title}
                  glitchIntensity={0.3}
                  glitchFrequency={0.4}
                />
              </h1>
            </div>
            
            <div className="flex items-center justify-center mb-6 space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${difficultyInfo.color}`}>
                {difficultyInfo.label}
              </div>
              <div className="text-white/70">
                <span className="font-medium">{simulation.duration}</span> minutes
              </div>
              <div className="text-white/70">
                <span className="font-medium">{tasks.length}</span> tasks
              </div>
            </div>
            
            <p className="text-white/70 text-center max-w-3xl mx-auto mb-8">
              {simulation.description}
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-20">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/40 backdrop-blur-sm border border-white/10">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">
                Overview
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-white/10">
                Tasks
              </TabsTrigger>
              <TabsTrigger value="requirements" className="data-[state=active]:bg-white/10">
                Requirements
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="mt-0">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card className="bg-black/40 backdrop-blur-sm border border-white/10 h-full">
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-bold mb-4 text-white">About This Simulation</h2>
                      <p className="text-white/70 mb-6">
                        This simulation is designed to test and improve your skills as a {simulation.expand?.role?.title}. 
                        You will face realistic challenges that mirror the actual work environment and tasks you would 
                        encounter in this role.
                      </p>
                      
                      <h3 className="text-xl font-bold mb-3 text-white">What You'll Learn</h3>
                      <ul className="list-disc list-inside text-white/70 mb-6 space-y-2">
                        <li>Practical application of {simulation.expand?.role?.title} skills</li>
                        <li>Problem-solving under realistic constraints</li>
                        <li>Time management and prioritization</li>
                        <li>Adapting to changing requirements</li>
                        <li>Industry best practices and standards</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold mb-3 text-white">How You'll Be Evaluated</h3>
                      <p className="text-white/70">
                        Your performance will be measured across multiple dimensions including accuracy, 
                        speed, decision quality, and adherence to best practices. Our AI-powered evaluation 
                        system provides detailed feedback to help you improve.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card className="bg-black/40 backdrop-blur-sm border border-white/10 mb-8">
                    <CardContent className="p-6">
                      <h2 className="text-xl font-bold mb-4 text-white">Simulation Details</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-white/50 mb-1">Role</h3>
                          <p className="text-white">{simulation.expand?.role?.title}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-white/50 mb-1">Difficulty</h3>
                          <p className="text-white">{difficultyInfo.label}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-white/50 mb-1">Duration</h3>
                          <p className="text-white">{simulation.duration} minutes</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-white/50 mb-1">Tasks</h3>
                          <p className="text-white">{tasks.length} tasks</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button 
                    className="w-full py-6 text-lg"
                    style={{ 
                      background: `linear-gradient(to right, ${roleColor}, ${roleColor}CC)` 
                    }}
                    onClick={handleStartSimulation}
                  >
                    Start Simulation
                  </Button>
                </div>
              </div>
            </FadeIn>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-0">
            <FadeIn>
              <div className="grid grid-cols-1 gap-4">
                {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                    <Card key={task.id} className="bg-black/40 backdrop-blur-sm border border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
                            <span className="text-white font-medium">{index + 1}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white">{task.title}</h3>
                        </div>
                        <p className="text-white/70 ml-11">{task.description}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-white/70">No tasks available for this simulation yet.</p>
                  </div>
                )}
              </div>
            </FadeIn>
          </TabsContent>
          
          <TabsContent value="requirements" className="mt-0">
            <FadeIn>
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-white">Technical Requirements</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">System Requirements</h3>
                      <ul className="list-disc list-inside text-white/70 space-y-1">
                        <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
                        <li>Stable internet connection</li>
                        <li>Minimum 4GB RAM</li>
                        <li>WebGL-enabled graphics</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Knowledge Prerequisites</h3>
                      <ul className="list-disc list-inside text-white/70 space-y-1">
                        <li>Basic understanding of {simulation.expand?.role?.title} concepts</li>
                        <li>Familiarity with industry tools and practices</li>
                        <li>Problem-solving skills</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Recommended Setup</h3>
                      <ul className="list-disc list-inside text-white/70 space-y-1">
                        <li>Desktop or laptop computer</li>
                        <li>External mouse</li>
                        <li>Quiet environment</li>
                        <li>Headphones for audio cues</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
