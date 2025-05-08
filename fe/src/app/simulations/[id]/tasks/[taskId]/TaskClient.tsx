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

export default function TaskClient() {
  const params = useParams();
  const router = useRouter();
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState({
    score: 0,
    message: '',
    correct: false,
  });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const simulationId = params.id as string;
        const taskId = params.taskId as string;

        const [simulationData, taskData] = await Promise.all([
          api.simulations.getById(simulationId),
          api.tasks.getById(taskId),
        ]);

        setSimulation(simulationData);
        setTask(taskData);
        if (taskData.timeLimit) {
          setTimeLeft(taskData.timeLimit * 60); // Convert minutes to seconds
        } else {
          setTimeLeft(null); // No time limit
        }
      } catch (error) {
        console.error('Error fetching task data:', error);
        toast.error('Failed to load task data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [params.id, params.taskId]);

  useEffect(() => {
    if (timeLeft === null || loading) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, loading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = async () => {
    if (!task || !simulation) return;

    try {
      // Simulate API call for feedback
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Evaluate answer (in a real app, this would be done by the backend)
      const score = Math.floor(Math.random() * 100);
      const correct = score >= 70;

      // Create result
      await api.results.create({
        simulation: simulation.id,
        task: task.id,
        answer,
        score,
        completed: true,
        startTime: new Date(Date.now() - ((task.timeLimit || 0) * 60 * 1000) + (timeLeft || 0) * 1000).toISOString(),
        endTime: new Date().toISOString(),
      });

      setFeedback({
        score,
        message: correct
          ? 'Great job! Your solution demonstrates a good understanding of the concepts.'
          : 'Your solution needs some improvement. Consider reviewing the key concepts.',
        correct,
      });

      setShowFeedback(true);
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast.error('Failed to submit your answer');
    } finally {
      setLoading(false);
    }
  };

  const handleNextTask = () => {
    setShowFeedback(false);
    // In a real app, you would navigate to the next task or back to simulation
    router.push(`/simulations/${params.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (!task || !simulation) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="text-white text-2xl mb-4">Task not found</div>
        <Button onClick={() => router.push(`/simulations/${params.id}`)}>
          Back to Simulation
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <FadeIn>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white"
              onClick={() => router.push(`/simulations/${params.id}`)}
            >
              ← Back to Simulation
            </Button>
            <div className="bg-white/10 px-4 py-2 rounded-full">
              <span className={`font-mono ${timeLeft && timeLeft < 60 ? 'text-red-500' : 'text-white'}`}>
                Time: {timeLeft !== null ? formatTime(timeLeft) : '--:--'}
              </span>
            </div>
          </div>

          <Card className="bg-white/5 border-white/10 mb-8">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
              <div className="prose prose-invert max-w-none">
                <p>{task.description}</p>
                {task.instructions ? (
                  <div className="mt-4 p-4 bg-white/5 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Task Instructions:</h3>
                    <p>{task.instructions}</p>
                  </div>
                ) : (
                  <div className="mt-4 p-4 bg-white/5 rounded-md">
                    <h3 className="text-lg font-semibold mb-2">Task Instructions:</h3>
                    <p>{task.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Solution</h2>
              <textarea
                className="w-full h-64 bg-black/50 border border-white/20 rounded-md p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your solution here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={loading}
              />
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleSubmit}
                  disabled={loading || answer.trim() === ''}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  {loading ? 'Submitting...' : 'Submit Solution'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Dialog open={showFeedback} onOpenChange={setShowFeedback}>
            <DialogContent className="bg-black/90 border border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {feedback.correct ? 'Well Done!' : 'Needs Improvement'}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-4 border-white/10">
                    <span className="text-4xl font-bold">{feedback.score}%</span>
                  </div>
                </div>
                <p className="text-center mb-6">{feedback.message}</p>
                <div className="bg-white/5 p-4 rounded-md mb-4">
                  <h3 className="font-semibold mb-2">Key Takeaways:</h3>
                  <ul className="list-disc list-inside space-y-1 text-white/80">
                    <li>Focus on clear problem definition</li>
                    <li>Consider edge cases in your solution</li>
                    <li>Optimize for both readability and performance</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleNextTask}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </FadeIn>
    </div>
  );
}
