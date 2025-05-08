// Server component for static generation
import { Metadata } from 'next';
import TaskClient from './TaskClient';

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // For static export, we'll pre-render these combinations
  return [
    { id: '1', taskId: '1' },
    { id: '2', taskId: '1' },
    { id: '3', taskId: '1' },
    { id: '4', taskId: '1' },
    { id: '5', taskId: '1' },
  ];
}

export const metadata: Metadata = {
  title: 'Task | SimulEx',
  description: 'Complete a simulation task',
};

export default function TaskPage() {
  return <TaskClient />;
}
