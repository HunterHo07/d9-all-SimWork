'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FadeIn from '@/components/animations/FadeIn';
import { api, Result, Simulation, Role } from '@/lib/api/pocketbase';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [simulations, setSimulations] = useState<Record<string, Simulation>>({});
  const [roles, setRoles] = useState<Record<string, Role>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch user and data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const currentUser = await api.auth.getUser();
        if (!currentUser) {
          router.push('/login');
          return;
        }
        
        setUser(currentUser);
        
        // Get all roles and create a lookup map
        const rolesData = await api.roles.getAll();
        const rolesMap: Record<string, Role> = {};
        rolesData.forEach(role => {
          rolesMap[role.id] = role;
        });
        setRoles(rolesMap);
        
        // Get all simulations and create a lookup map
        const simulationsData = await api.simulations.getAll();
        const simulationsMap: Record<string, Simulation> = {};
        simulationsData.forEach(simulation => {
          simulationsMap[simulation.id] = simulation;
        });
        setSimulations(simulationsMap);
        
        // Get user's results
        const resultsData = await api.results.getByUser(currentUser.id);
        setResults(resultsData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  // Calculate stats
  const calculateStats = () => {
    if (results.length === 0) {
      return {
        completedSimulations: 0,
        averageScore: 0,
        averageAccuracy: 0,
        averageSpeed: 0,
        totalTime: 0,
      };
    }
    
    const completedResults = results.filter(result => result.completed);
    const completedSimulationIds = new Set(completedResults.map(result => result.simulation));
    
    const scores = completedResults.map(result => result.score || 0);
    const accuracies = completedResults.map(result => result.accuracy || 0);
    const speeds = completedResults.map(result => result.speed || 0);
    
    const totalTime = completedResults.reduce((total, result) => {
      if (result.startTime && result.endTime) {
        const start = new Date(result.startTime);
        const end = new Date(result.endTime);
        return total + (end.getTime() - start.getTime()) / 1000 / 60; // in minutes
      }
      return total;
    }, 0);
    
    return {
      completedSimulations: completedSimulationIds.size,
      averageScore: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0,
      averageAccuracy: accuracies.length > 0 ? accuracies.reduce((a, b) => a + b, 0) / accuracies.length : 0,
      averageSpeed: speeds.length > 0 ? speeds.reduce((a, b) => a + b, 0) / speeds.length : 0,
      totalTime: Math.round(totalTime),
    };
  };

  // Get role performance
  const getRolePerformance = () => {
    const rolePerformance: Record<string, { count: number; score: number; }> = {};
    
    results.forEach(result => {
      if (!result.completed || !result.score) return;
      
      const simulation = simulations[result.simulation];
      if (!simulation) return;
      
      const roleId = simulation.role;
      if (!rolePerformance[roleId]) {
        rolePerformance[roleId] = { count: 0, score: 0 };
      }
      
      rolePerformance[roleId].count += 1;
      rolePerformance[roleId].score += result.score;
    });
    
    // Calculate averages
    Object.keys(rolePerformance).forEach(roleId => {
      rolePerformance[roleId].score = rolePerformance[roleId].score / rolePerformance[roleId].count;
    });
    
    return rolePerformance;
  };

  // Get recent activity
  const getRecentActivity = () => {
    return [...results]
      .filter(result => result.completed)
      .sort((a, b) => {
        const dateA = new Date(a.endTime || a.startTime);
        const dateB = new Date(b.endTime || b.startTime);
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-24 flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black pt-24 flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const stats = calculateStats();
  const rolePerformance = getRolePerformance();
  const recentActivity = getRecentActivity();

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
              Your Dashboard
            </h1>
            <p className="text-white/70 text-center max-w-2xl mx-auto mb-8">
              Track your progress, view your performance metrics, and continue your skill development journey.
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
              <TabsTrigger value="performance" className="data-[state=active]:bg-white/10">
                Performance
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white/10">
                History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="mt-0">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { 
                    label: 'Completed Simulations', 
                    value: stats.completedSimulations, 
                    icon: '🏆',
                    color: 'from-blue-500/20 to-blue-600/20' 
                  },
                  { 
                    label: 'Average Score', 
                    value: `${Math.round(stats.averageScore)}%`, 
                    icon: '📊',
                    color: 'from-purple-500/20 to-purple-600/20' 
                  },
                  { 
                    label: 'Average Accuracy', 
                    value: `${Math.round(stats.averageAccuracy)}%`, 
                    icon: '🎯',
                    color: 'from-green-500/20 to-green-600/20' 
                  },
                  { 
                    label: 'Total Time', 
                    value: `${stats.totalTime} min`, 
                    icon: '⏱️',
                    color: 'from-orange-500/20 to-orange-600/20' 
                  },
                ].map((stat, index) => (
                  <Card key={index} className="bg-black/40 backdrop-blur-sm border border-white/10 overflow-hidden">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                      <h3 className="text-sm font-medium text-white/50 mb-1">{stat.label}</h3>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Role Performance */}
                <Card className="bg-black/40 backdrop-blur-sm border border-white/10 md:col-span-2">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-white">Role Performance</h2>
                    
                    {Object.keys(rolePerformance).length > 0 ? (
                      <div className="space-y-4">
                        {Object.entries(rolePerformance).map(([roleId, data]) => {
                          const role = roles[roleId];
                          if (!role) return null;
                          
                          return (
                            <div key={roleId} className="flex items-center">
                              <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                                style={{ backgroundColor: role.color }}
                              >
                                <span className="text-white text-sm font-bold">
                                  {role.icon || role.title.charAt(0)}
                                </span>
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between mb-1">
                                  <span className="text-white font-medium">{role.title}</span>
                                  <span className="text-white">{Math.round(data.score)}%</span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                  <div 
                                    className="h-2 rounded-full" 
                                    style={{ 
                                      width: `${Math.round(data.score)}%`,
                                      backgroundColor: role.color 
                                    }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-white/70">Complete simulations to see your role performance.</p>
                    )}
                  </CardContent>
                </Card>
                
                {/* Recent Activity */}
                <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-white">Recent Activity</h2>
                    
                    {recentActivity.length > 0 ? (
                      <div className="space-y-4">
                        {recentActivity.map((result) => {
                          const simulation = simulations[result.simulation];
                          if (!simulation) return null;
                          
                          const role = roles[simulation.role];
                          const date = new Date(result.endTime || result.startTime);
                          
                          return (
                            <div key={result.id} className="border-b border-white/10 pb-3 last:border-0">
                              <div className="flex items-start">
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1"
                                  style={{ backgroundColor: role?.color || '#3b82f6' }}
                                >
                                  <span className="text-white text-xs font-bold">
                                    {role?.icon || role?.title.charAt(0) || 'S'}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-white font-medium">{simulation.title}</p>
                                  <p className="text-white/50 text-sm">
                                    Score: {result.score || 0}% • {date.toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-white/70">No activity yet. Start a simulation!</p>
                    )}
                    
                    <div className="mt-4">
                      <Link href="/simulations">
                        <Button variant="outline" className="w-full text-white border-white/20 hover:bg-white/5">
                          Start New Simulation
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-0">
            <FadeIn>
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10 mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 text-white">Performance Metrics</h2>
                  
                  {results.length > 0 ? (
                    <div className="space-y-8">
                      {/* Skill Radar Chart would go here */}
                      <div className="h-64 border border-white/10 rounded-lg flex items-center justify-center">
                        <p className="text-white/70">Skill radar chart visualization would be displayed here</p>
                      </div>
                      
                      {/* Progress Over Time Chart would go here */}
                      <div className="h-64 border border-white/10 rounded-lg flex items-center justify-center">
                        <p className="text-white/70">Progress over time chart would be displayed here</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/70">Complete simulations to see your performance metrics.</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4 text-white">Skill Breakdown</h2>
                  
                  {results.length > 0 ? (
                    <div className="space-y-6">
                      {[
                        { skill: 'Problem Solving', score: 85 },
                        { skill: 'Technical Knowledge', score: 78 },
                        { skill: 'Efficiency', score: 92 },
                        { skill: 'Attention to Detail', score: 88 },
                        { skill: 'Adaptability', score: 75 },
                      ].map((skill, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-1">
                            <span className="text-white">{skill.skill}</span>
                            <span className="text-white">{skill.score}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" 
                              style={{ width: `${skill.score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/70">Complete simulations to see your skill breakdown.</p>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <FadeIn>
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-6 text-white">Simulation History</h2>
                  
                  {results.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            <th className="text-left py-3 px-4 text-white/70 font-medium">Simulation</th>
                            <th className="text-left py-3 px-4 text-white/70 font-medium">Role</th>
                            <th className="text-left py-3 px-4 text-white/70 font-medium">Date</th>
                            <th className="text-left py-3 px-4 text-white/70 font-medium">Score</th>
                            <th className="text-left py-3 px-4 text-white/70 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results
                            .sort((a, b) => {
                              const dateA = new Date(a.endTime || a.startTime);
                              const dateB = new Date(b.endTime || b.startTime);
                              return dateB.getTime() - dateA.getTime();
                            })
                            .map((result) => {
                              const simulation = simulations[result.simulation];
                              if (!simulation) return null;
                              
                              const role = roles[simulation.role];
                              const date = new Date(result.endTime || result.startTime);
                              
                              return (
                                <tr key={result.id} className="border-b border-white/10 hover:bg-white/5">
                                  <td className="py-3 px-4 text-white">{simulation.title}</td>
                                  <td className="py-3 px-4">
                                    <div className="flex items-center">
                                      <div 
                                        className="w-6 h-6 rounded-full flex items-center justify-center mr-2"
                                        style={{ backgroundColor: role?.color || '#3b82f6' }}
                                      >
                                        <span className="text-white text-xs font-bold">
                                          {role?.icon || role?.title.charAt(0) || 'S'}
                                        </span>
                                      </div>
                                      <span className="text-white">{role?.title || 'Unknown'}</span>
                                    </div>
                                  </td>
                                  <td className="py-3 px-4 text-white/70">{date.toLocaleDateString()}</td>
                                  <td className="py-3 px-4 text-white">{result.score || 0}%</td>
                                  <td className="py-3 px-4">
                                    <span 
                                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        result.completed 
                                          ? 'bg-green-500/20 text-green-400' 
                                          : 'bg-yellow-500/20 text-yellow-400'
                                      }`}
                                    >
                                      {result.completed ? 'Completed' : 'In Progress'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-white/70">No simulation history yet. Start a simulation!</p>
                  )}
                  
                  {results.length > 0 && (
                    <div className="mt-6 text-center">
                      <Link href="/simulations">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                          Start New Simulation
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
