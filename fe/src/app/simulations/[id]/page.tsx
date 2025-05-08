// Server component for static generation
import { Metadata } from 'next';
import SimulationClient from './SimulationClient';

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  // For static export, we'll pre-render these IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ];
}

export const metadata: Metadata = {
  title: 'Simulation Details | SimulEx',
  description: 'View details and start a simulation',
};

export default function SimulationPage() {
  return <SimulationClient />;
}
