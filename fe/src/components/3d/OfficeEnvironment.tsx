'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float, Text } from '@react-three/drei';
import { Vector3, Mesh, Group } from 'three';
import { gsap } from 'gsap';

// Workstation component
function Workstation({ 
  position, 
  rotation = [0, 0, 0], 
  color, 
  label, 
  onClick, 
  isActive 
}: { 
  position: [number, number, number]; 
  rotation?: [number, number, number]; 
  color: string; 
  label: string; 
  onClick: () => void; 
  isActive: boolean;
}) {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animation when hovered or active
  useEffect(() => {
    if (!groupRef.current) return;
    
    gsap.to(groupRef.current.position, {
      y: hovered || isActive ? 0.2 : 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    
    if (meshRef.current) {
      gsap.to(meshRef.current.material, {
        emissiveIntensity: hovered || isActive ? 0.5 : 0.2,
        duration: 0.5,
      });
    }
  }, [hovered, isActive]);

  return (
    <group 
      ref={groupRef} 
      position={position} 
      rotation={rotation as [number, number, number]}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Desk */}
      <mesh 
        ref={meshRef}
        position={[0, 0.5, 0]} 
        castShadow 
        receiveShadow
      >
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isActive ? 0.5 : 0.2} 
          metalness={0.8} 
          roughness={0.2} 
        />
      </mesh>
      
      {/* Computer */}
      <mesh position={[0, 0.8, -0.3]} castShadow>
        <boxGeometry args={[1, 0.6, 0.05]} />
        <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.6, 1.3]} />
        <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.8} />
      </mesh>
      
      {/* Label */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      
      {/* Glow effect when active */}
      {isActive && (
        <pointLight 
          position={[0, 1, 0]} 
          color={color} 
          intensity={5} 
          distance={3} 
        />
      )}
    </group>
  );
}

// Main scene component
function Scene({ 
  onSelectWorkstation 
}: { 
  onSelectWorkstation: (role: string) => void;
}) {
  const [activeWorkstation, setActiveWorkstation] = useState<string | null>(null);
  const { camera } = useThree();
  
  // Workstation data
  const workstations = [
    { id: 'developer', position: [-4, 0, 0], rotation: [0, 0.2, 0], color: '#3b82f6', label: 'Developer' },
    { id: 'designer', position: [-2, 0, 2], rotation: [0, -0.3, 0], color: '#ec4899', label: 'Designer' },
    { id: 'pm', position: [0, 0, -2], rotation: [0, 0, 0], color: '#10b981', label: 'Project Manager' },
    { id: 'data', position: [2, 0, 2], rotation: [0, 0.3, 0], color: '#f59e0b', label: 'Data Entry' },
    { id: 'ai', position: [4, 0, 0], rotation: [0, -0.2, 0], color: '#8b5cf6', label: 'AI Engineer' },
  ];
  
  // Handle workstation selection
  const handleWorkstationClick = (id: string) => {
    setActiveWorkstation(id);
    
    // Move camera to focus on the selected workstation
    const workstation = workstations.find(w => w.id === id);
    if (workstation) {
      const targetPosition = new Vector3(
        workstation.position[0], 
        workstation.position[1] + 2, 
        workstation.position[2] + 3
      );
      
      gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          onSelectWorkstation(id);
        }
      });
    }
  };
  
  // Floor
  const Floor = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#111111" metalness={0.2} roughness={0.8} />
    </mesh>
  );
  
  // Grid lines
  const Grid = () => (
    <gridHelper args={[30, 30, '#444444', '#222222']} position={[0, -0.49, 0]} />
  );
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} castShadow />
      
      <Environment preset="night" />
      
      <Floor />
      <Grid />
      
      {/* Workstations */}
      {workstations.map((station) => (
        <Float key={station.id} speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Workstation
            position={station.position as [number, number, number]}
            rotation={station.rotation as [number, number, number]}
            color={station.color}
            label={station.label}
            onClick={() => handleWorkstationClick(station.id)}
            isActive={activeWorkstation === station.id}
          />
        </Float>
      ))}
    </>
  );
}

// Main component
export default function OfficeEnvironment({ 
  onSelectWorkstation 
}: { 
  onSelectWorkstation: (role: string) => void;
}) {
  return (
    <div className="w-full h-full">
      <Canvas 
        shadows 
        camera={{ position: [0, 5, 10], fov: 50 }}
        className="bg-black"
      >
        <Scene onSelectWorkstation={onSelectWorkstation} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI / 2} 
          minDistance={3}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
}
