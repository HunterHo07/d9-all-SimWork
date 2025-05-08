'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import FadeIn from '@/components/animations/FadeIn';
import { api, Simulation, Task, Result } from '@/lib/api/pocketbase';
import { toast } from 'sonner';

// Using server-side rendering instead of static generation

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    accuracy: number;
    speed: number;
    feedback: string;
  } | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  // Fetch simulation, task, and result
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const simulationId = params.id as string;
        const taskId = params.taskId as string;

        const [simulationData, taskData] = await Promise.all([
          api.simulations.getById(simulationId),
          api.tasks.getById(taskId),
        ]);

        setSimulation(simulationData);
        setTask(taskData);

        // Get or create result
        const user = await api.auth.getUser();
        if (user) {
          const results = await api.results.getByUser(user.id);
          const currentResult = results.find(
            r => r.simulation === simulationId && r.task === taskId && !r.completed
          );

          if (currentResult) {
            setResult(currentResult);

            // Set timer if task has a time limit
            if (taskData.timeLimit) {
              const startTime = new Date(currentResult.startTime);
              const elapsedSeconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
              const remainingSeconds = Math.max(0, taskData.timeLimit - elapsedSeconds);
              setTimeLeft(remainingSeconds);
              startTimeRef.current = startTime;
            }
          } else {
            // Create a new result
            const newResult = await api.results.create({
              user: user.id,
              simulation: simulationId,
              task: taskId,
              startTime: new Date().toISOString(),
              completed: false,
            });

            setResult(newResult);

            // Set timer if task has a time limit
            if (taskData.timeLimit) {
              setTimeLeft(taskData.timeLimit);
              startTimeRef.current = new Date();
            }
          }
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load task. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (params.id && params.taskId) {
      fetchData();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [params.id, params.taskId]);

  // Set up timer
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(timerRef.current!);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [timeLeft]);

  // Handle time up
  const handleTimeUp = () => {
    toast.error('Time is up! Your submission will be evaluated based on current progress.');
    handleSubmit();
  };

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle submission
  const handleSubmit = async () => {
    if (!result || !task) return;

    try {
      setIsSubmitting(true);

      // Calculate time taken
      const endTime = new Date();
      const startTime = startTimeRef.current || new Date(result.startTime);
      const timeTakenSeconds = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);

      // Generate mock evaluation (in a real app, this would be done by the backend)
      const score = Math.floor(Math.random() * 30) + 70; // 70-100
      const accuracy = Math.floor(Math.random() * 20) + 80; // 80-100
      const speed = Math.min(100, Math.floor((task.timeLimit || 600) / timeTakenSeconds * 100));

      // Update result
      await api.results.update(result.id, {
        endTime: endTime.toISOString(),
        score,
        accuracy,
        speed,
        feedback: `You completed this task with a score of ${score}%. Your accuracy was ${accuracy}% and your speed rating was ${speed}%.`,
        completed: true,
      });

      // Set feedback
      setFeedback({
        score,
        accuracy,
        speed,
        feedback: `You completed this task with a score of ${score}%. Your accuracy was ${accuracy}% and your speed rating was ${speed}%.`,
      });

      // Show feedback dialog
      setShowFeedback(true);

    } catch (err) {
      console.error('Error submitting task:', err);
      toast.error('Failed to submit task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle continue to next task
  const handleContinue = () => {
    if (!simulation) return;

    // In a real app, you would navigate to the next task or completion page
    router.push(`/simulations/${simulation.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (error || !simulation || !task) {
    return (
      <div className="min-h-screen bg-black pt-24 flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">{error || 'Task not found'}</p>
        <Button onClick={() => router.push(`/simulations/${params.id}`)}>Back to Simulation</Button>
      </div>
    );
  }

  const roleColor = simulation.expand?.role?.color || '#3b82f6';

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="pt-24 pb-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid opacity-20 z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: roleColor }}
                >
                  <span className="text-white text-sm font-bold">
                    {simulation.expand?.role?.icon || simulation.expand?.role?.title.charAt(0)}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {simulation.title}
                </h1>
              </div>

              {timeLeft !== null && (
                <div className="bg-black/40 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className={`font-mono font-medium ${timeLeft < 60 ? 'text-red-500' : 'text-white'}`}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <FadeIn>
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10 mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-white">{task.title}</h2>
                  <p className="text-white/70 mb-6 whitespace-pre-line">
                    {task.description}
                  </p>

                  {/* Task content would go here - this would be different for each task type */}
                  <div className="border border-white/10 rounded-lg p-6 bg-black/60">
                    <h3 className="text-xl font-bold mb-4 text-white">Task Workspace</h3>

                    {task.type === 'code' && (
                      <div className="font-mono text-sm text-white/80 bg-black/80 p-4 rounded-md">
                        <pre>{JSON.parse(task.resources || '{}').files?.[0]?.content || 'Code editor would be here'}</pre>
                      </div>
                    )}

                    {task.type === 'design' && (
                      <div className="text-center py-12 text-white/70">
                        Design canvas would be here
                      </div>
                    )}

                    {task.type === 'decision' && (
                      <div className="space-y-4">
                        <p className="text-white/70">Make your decision by selecting one of the options below:</p>
                        <div className="space-y-2">
                          {['Option A', 'Option B', 'Option C'].map((option, index) => (
                            <div key={index} className="border border-white/10 rounded-md p-3 hover:bg-white/5 cursor-pointer">
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {task.type === 'data' && (
                      <div className="text-center py-12 text-white/70">
                        Data entry form would be here
                      </div>
                    )}

                    {task.type === 'ai' && (
                      <div className="text-center py-12 text-white/70">
                        AI prompt engineering interface would be here
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex justify-end">
                <Button
                  className="px-8 py-3 text-lg"
                  style={{
                    background: `linear-gradient(to right, ${roleColor}, ${roleColor}CC)`
                  }}
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Solution'}
                </Button>
              </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn delay={0.1}>
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10 mb-8 sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-white">Task Information</h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-white/50 mb-1">Type</h3>
                      <p className="text-white capitalize">{task.type}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-white/50 mb-1">Difficulty</h3>
                      <p className="text-white capitalize">{task.difficulty}</p>
                    </div>

                    {task.timeLimit && (
                      <div>
                        <h3 className="text-sm font-medium text-white/50 mb-1">Time Limit</h3>
                        <p className="text-white">{Math.floor(task.timeLimit / 60)} minutes</p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-medium text-white/50 mb-1">Evaluation Criteria</h3>
                      <ul className="list-disc list-inside text-white/70 space-y-1">
                        {task.evaluation ? (
                          JSON.parse(task.evaluation).criteria?.map((criterion: any, index: number) => (
                            <li key={index}>{criterion.name} ({criterion.weight * 100}%)</li>
                          ))
                        ) : (
                          <>
                            <li>Accuracy (50%)</li>
                            <li>Efficiency (30%)</li>
                            <li>Best Practices (20%)</li>
                          </>
                        )}
                      </ul>
                    </div>

                    {task.resources && JSON.parse(task.resources).hints && (
                      <div>
                        <h3 className="text-sm font-medium text-white/50 mb-1">Hints</h3>
                        <div className="space-y-2">
                          {JSON.parse(task.resources).hints.map((hint: string, index: number) => (
                            <div key={index} className="text-white/70 text-sm">
                              <span className="font-medium">Hint {index + 1}:</span> {hint}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
        <DialogContent className="bg-black/90 backdrop-blur-md border border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gradient">Task Completed!</DialogTitle>
            <DialogDescription className="text-white/70">
              Here's how you performed on this task.
            </DialogDescription>
          </DialogHeader>

          {feedback && (
            <div className="py-4">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{feedback.score}%</div>
                  <div className="text-sm text-white/50">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{feedback.accuracy}%</div>
                  <div className="text-sm text-white/50">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">{feedback.speed}%</div>
                  <div className="text-sm text-white/50">Speed</div>
                </div>
              </div>

              <div className="border border-white/10 rounded-lg p-4 bg-white/5 mb-6">
                <h3 className="font-medium mb-2">Feedback</h3>
                <p className="text-white/70">{feedback.feedback}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              className="w-full"
              style={{
                background: `linear-gradient(to right, ${roleColor}, ${roleColor}CC)`
              }}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
