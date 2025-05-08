'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimulationCard from '@/components/simulations/SimulationCard';
import OfficeEnvironment from '@/components/3d/OfficeEnvironment';
import FadeIn from '@/components/animations/FadeIn';
import { api, Simulation, Role } from '@/lib/api/pocketbase';

export default function SimulationsPage() {
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [view, setView] = useState<'3d' | 'list'>('3d');

  // Fetch simulations and roles
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [simulationsData, rolesData] = await Promise.all([
          api.simulations.getAll(),
          api.roles.getAll(),
        ]);
        setSimulations(simulationsData);
        setRoles(rolesData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load simulations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter simulations by role
  const filteredSimulations = activeTab === 'all'
    ? simulations
    : simulations.filter(sim => sim.role === activeTab);

  // Handle role selection in 3D view
  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setActiveTab(roleId);
    setView('list');
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
              Simulation Environment
            </h1>
            <p className="text-white/70 text-center max-w-2xl mx-auto mb-8">
              Choose your role and start developing future-ready skills in our immersive simulation environments.
            </p>
          </FadeIn>
          
          {/* View toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-full p-1 flex">
              <Button
                variant="ghost"
                className={`rounded-full px-4 ${view === '3d' ? 'bg-white/10 text-white' : 'text-white/60'}`}
                onClick={() => setView('3d')}
              >
                3D Office
              </Button>
              <Button
                variant="ghost"
                className={`rounded-full px-4 ${view === 'list' ? 'bg-white/10 text-white' : 'text-white/60'}`}
                onClick={() => setView('list')}
              >
                List View
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-blue-500 animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        ) : (
          <>
            {view === '3d' ? (
              <div className="h-[600px] rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
                <OfficeEnvironment onSelectWorkstation={handleRoleSelect} />
              </div>
            ) : (
              <div>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex justify-center mb-8">
                    <TabsList className="bg-black/40 backdrop-blur-sm border border-white/10">
                      <TabsTrigger value="all" className="data-[state=active]:bg-white/10">
                        All Roles
                      </TabsTrigger>
                      {roles.map((role) => (
                        <TabsTrigger 
                          key={role.id} 
                          value={role.id}
                          className="data-[state=active]:bg-white/10"
                          style={{ 
                            color: activeTab === role.id ? role.color : undefined,
                          }}
                        >
                          {role.title}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  
                  <TabsContent value={activeTab} className="mt-0">
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {filteredSimulations.length > 0 ? (
                        filteredSimulations.map((simulation) => (
                          <SimulationCard key={simulation.id} simulation={simulation} />
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-12">
                          <p className="text-white/70 mb-4">No simulations available for this role yet.</p>
                          <Button onClick={() => setActiveTab('all')}>View All Simulations</Button>
                        </div>
                      )}
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
