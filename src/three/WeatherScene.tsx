import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Cloud } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface WeatherSceneProps {
  condition: string;
  isDay: boolean;
}

const Sun = () => {
  const sunRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });
  
  return (
    <group>
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
      />
      <mesh ref={sunRef} position={[3, 3, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#FFA500"
          emissive="#FFA500"
          emissiveIntensity={0.6}
        />
      </mesh>
      <pointLight
        position={[3, 3, 0]}
        intensity={1}
        distance={10}
        color="#FFA500"
      />
    </group>
  );
};

const Moon = () => {
  const moonRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });
  
  return (
    <group>
      <mesh ref={moonRef} position={[3, 3, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#E6E6FA"
          emissive="#E6E6FA"
          emissiveIntensity={0.3}
        />
      </mesh>
      <pointLight
        position={[3, 3, 0]}
        intensity={0.5}
        distance={10}
        color="#E6E6FA"
      />
    </group>
  );
};

const RainDrops = () => {
  const rainRef = useRef<THREE.Group>(null);
  const raindrops = useMemo(() => {
    const drops = [];
    for (let i = 0; i < 200; i++) {
      drops.push({
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 10,
        z: (Math.random() - 0.5) * 10,
        speed: Math.random() * 0.1 + 0.05,
      });
    }
    return drops;
  }, []);
  
  useFrame(() => {
    if (rainRef.current) {
      rainRef.current.children.forEach((drop, index) => {
        drop.position.y -= raindrops[index].speed;
        if (drop.position.y < -5) {
          drop.position.y = 5;
        }
      });
    }
  });
  
  return (
    <group ref={rainRef}>
      {raindrops.map((drop, index) => (
        <mesh key={index} position={[drop.x, drop.y, drop.z]}>
          <cylinderGeometry args={[0.01, 0.01, 0.2]} />
          <meshStandardMaterial color="#4FC3F7" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

const SnowFlakes = () => {
  const snowRef = useRef<THREE.Group>(null);
  const snowflakes = useMemo(() => {
    const flakes = [];
    for (let i = 0; i < 150; i++) {
      flakes.push({
        x: (Math.random() - 0.5) * 10,
        y: Math.random() * 10,
        z: (Math.random() - 0.5) * 10,
        speed: Math.random() * 0.05 + 0.02,
        rotationSpeed: Math.random() * 0.02,
      });
    }
    return flakes;
  }, []);
  
  useFrame(() => {
    if (snowRef.current) {
      snowRef.current.children.forEach((flake, index) => {
        flake.position.y -= snowflakes[index].speed;
        flake.rotation.y += snowflakes[index].rotationSpeed;
        if (flake.position.y < -5) {
          flake.position.y = 5;
        }
      });
    }
  });
  
  return (
    <group ref={snowRef}>
      {snowflakes.map((flake, index) => (
        <mesh key={index} position={[flake.x, flake.y, flake.z]}>
          <octahedronGeometry args={[0.05]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}
    </group>
  );
};

const WeatherScene3D = ({ condition, isDay }: WeatherSceneProps) => {
  const cameraPosition: [number, number, number] = [0, 0, 5];
  
  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 60 }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={isDay ? 0.6 : 0.2} />
      
      {!isDay && <Stars radius={100} depth={50} count={1000} factor={4} />}
      
      {condition === 'Clear' && (isDay ? <Sun /> : <Moon />)}
      
      {condition === 'Clouds' && (
        <group>
          <Cloud position={[-2, 1, 0]} opacity={0.6} speed={0.4} />
          <Cloud position={[2, 0, -1]} opacity={0.4} speed={0.6} />
          <Cloud position={[0, -1, 1]} opacity={0.5} speed={0.5} />
        </group>
      )}
      
      {(condition === 'Rain' || condition === 'Drizzle') && (
        <group>
          <Cloud position={[0, 2, 0]} opacity={0.8} speed={0.3} />
          <RainDrops />
        </group>
      )}
      
      {condition === 'Snow' && (
        <group>
          <Cloud position={[0, 2, 0]} opacity={0.6} speed={0.2} />
          <SnowFlakes />
        </group>
      )}
      
      {condition === 'Thunderstorm' && (
        <group>
          <Cloud position={[0, 2, 0]} opacity={0.9} speed={0.1} />
          <RainDrops />
        </group>
      )}
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default WeatherScene3D;