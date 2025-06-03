import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';

function GlowingOrb() {
  // This orb uses a MeshPhysicalMaterial for a glowing effect
  const meshRef = useRef<any>();
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshPhysicalMaterial
        color="#00ff88"
        emissive="#00ff88"
        emissiveIntensity={0.5}
        metalness={0.3}
        roughness={0.5}
        transparent={true}
        opacity={0.85}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

export default function ThreeDScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: 'linear-gradient(135deg, #121212 0%, #1e1e2e 100%)' }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <ambientLight intensity={0.18} />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#00ff88" />
        <GlowingOrb />
      </Canvas>
      {/* Navigation Bar */}
      <nav style={{ position: 'fixed', top: 0, left: 0, width: '100vw', background: 'rgba(18,18,18,0.95)', boxShadow: '0 2px 16px rgba(0,0,0,0.2)', zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 2rem' }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#fff', letterSpacing: 2 }}>Asanam</span>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem', margin: 0, padding: 0 }}>
            <li><a href="#home" style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none', position: 'relative' }}>Home</a></li>
            <li><a href="#about" style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none', position: 'relative' }}>About</a></li>
            <li><a href="#projects" style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none', position: 'relative' }}>Projects</a></li>
            <li><a href="#contact" style={{ color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '1.1rem', textDecoration: 'none', position: 'relative' }}>Contact</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}