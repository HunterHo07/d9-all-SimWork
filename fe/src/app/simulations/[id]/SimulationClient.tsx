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

export default function SimulationClient() {
  const params = useParams();
  const router = useRouter();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = params.id as string;
        const simulationData = await api.simulations.getById(id);
        setSimulation(simulationData);

        const tasksData = await api.tasks.getBySimulation(id);
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching simulation data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleStartTask = (taskId: string) => {
    router.push(`/simulations/${params.id}/tasks/${taskId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-2xl">Loading simulation...</div>
      </div>
    );
  }

  if (!simulation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <div className="text-white text-2xl mb-4">Simulation not found</div>
        <Button onClick={() => router.push('/simulations')}>
          Back to Simulations
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <FadeIn>
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              className="mb-4 text-white/70 hover:text-white"
              onClick={() => router.push('/simulations')}
            >
              ← Back to Simulations
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <GlitchText
                text={simulation.title}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
                glitchIntensity={0.3}
                glitchFrequency={0.4}
              />
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl">
              {simulation.description}
            </p>
          </motion.div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8 bg-white/5 border border-white/10">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">Difficulty</h3>
                    <div className="flex items-center">
                      <div className="w-full bg-white/10 h-2 rounded-full">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{
                            width: `${(typeof simulation.difficulty === 'number' ? simulation.difficulty : parseInt(simulation.difficulty as string)) / 5 * 100}%`,
                          }}
                        />
                      </div>
                      <span className="ml-3 text-white/70">
                        {simulation.difficulty}/5
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">Duration</h3>
                    <p className="text-white/70">
                      {simulation.duration} minutes
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {simulation.skills && simulation.skills.length > 0 ? (
                        simulation.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-white/10 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="px-3 py-1 bg-white/10 rounded-full text-sm">
                          No skills specified
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">About this Simulation</h2>
                <p>{simulation.longDescription || simulation.description}</p>

                {simulation.objectives && simulation.objectives.length > 0 && (
                  <>
                    <h2 className="text-2xl font-bold mb-4 mt-8">Learning Objectives</h2>
                    <ul>
                      {simulation.objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent value="tasks" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.map((task) => (
                  <Card
                    key={task.id}
                    className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                      <p className="text-white/70 mb-4">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-white/50">
                          {task.duration ? `${task.duration} minutes` : (task.timeLimit ? `${task.timeLimit} minutes` : 'Duration not specified')}
                        </div>
                        <Button
                          onClick={() => handleStartTask(task.id)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          Start Task
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="resources" className="mt-6">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">Resources</h2>
                {simulation.resources && simulation.resources.length > 0 ? (
                  <>
                    <p>
                      The following resources will help you succeed in this simulation:
                    </p>
                    <ul>
                      {simulation.resources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            {resource.title}
                          </a>{' '}
                          {resource.description && `- ${resource.description}`}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p>
                    No additional resources available for this simulation.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </FadeIn>
    </div>
  );
}
