
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useInView } from 'framer-motion';

function Particles({ count = 200, color = '#2563eb' }) {
  const mesh = useRef(null);
  const dummy = useRef(new Array(count).fill(null).map(() => new Float32Array(3)));
  const particles = useRef<Float32Array>(new Float32Array(count * 3));
  
  // Initialize particles array with the correct size
  if (particles.current.length === 0) {
    particles.current = new Float32Array(count * 3);
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.1;
    if (mesh.current) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        particles.current[i3] = Math.sin(i * 0.1 + time) * 15;
        particles.current[i3 + 1] = Math.cos(i * 0.1 + time) * 15;
        particles.current[i3 + 2] = Math.sin(i * 0.1 + time) * Math.cos(i * 0.1 + time) * 15;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="position"
          count={count}
          itemSize={3}
          array={new Float32Array(particles.current)}
        />
      </bufferGeometry>
      <pointsMaterial size={0.3} color={color} transparent opacity={0.6} />
    </points>
  );
}

export default function AnimatedBackground({ className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <div 
      ref={ref}
      className={`absolute inset-0 -z-10 opacity-60 ${className} ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
    >
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
