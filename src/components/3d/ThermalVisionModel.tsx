import React, { useRef, useEffect } from 'react';
import { GroupProps } from '@react-three/fiber';
import { useGLTF, useTexture, OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

interface ModelProps {
  modelPath: string;
  texturePath: string;
  mtlPath: string;
}

// Model component that loads and displays the 3D model
const Model: React.FC<ModelProps> = ({ modelPath, texturePath, mtlPath }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [obj, setObj] = React.useState<THREE.Object3D | null>(null);

  useEffect(() => {
    // Load the MTL file first
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlPath, (materials) => {
      materials.preload();
      
      // Then load the OBJ file with the materials
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(modelPath, (object) => {
        // Apply texture to the model if texturePath is provided
        if (texturePath) {
          const textureLoader = new THREE.TextureLoader();
          const texture = textureLoader.load(texturePath);
          
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material.map = texture;
              child.material.needsUpdate = true;
            }
          });
        }
        
        // Center the model
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.sub(center);
        
        // Scale the model to fit the view
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1.5 / maxDim;
        object.scale.multiplyScalar(scale);
        
        setObj(object);
      });
    });
  }, [modelPath, texturePath, mtlPath]);

  // Rotate the model
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {obj && <primitive object={obj} />}
    </group>
  );
};

interface ThermalVisionModelProps {
  className?: string;
}

// Main component that sets up the 3D scene
const ThermalVisionModel: React.FC<ThermalVisionModelProps> = ({ className }) => {
  const modelPath = '/3dimage/tripo_convert_bee9f7b1-6ec1-42ba-9dfe-344b7aa4761f.obj';
  const texturePath = '/3dimage/tripo_image_bee9f7b1-6ec1-42ba-9dfe-344b7aa4761f_0.jpg';
  const mtlPath = '/3dimage/tripo_convert_bee9f7b1-6ec1-42ba-9dfe-344b7aa4761f.mtl';

  return (
    <div className={`w-full h-80 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        shadows
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Model modelPath={modelPath} texturePath={texturePath} mtlPath={mtlPath} />
        <OrbitControls enableZoom={false} enablePan={true} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ThermalVisionModel;
