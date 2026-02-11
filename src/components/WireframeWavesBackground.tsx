import { useEffect, useRef } from "react";
import * as THREE from "three";

const WireframeWavesBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene, camera, renderer, wireframeMesh, animationId;
    let mouseX = 0, mouseY = 0;
    let targetRotationX = 0, targetRotationY = 0;

    function init() {
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0xf1f5f9, 10, 50);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 8, 12);
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0xf8fafc, 0);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      createWireframeMesh();

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(10, 10, 5);
      directionalLight.castShadow = true;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      scene.add(directionalLight);

      document.addEventListener('mousemove', onMouseMove, false);
      window.addEventListener('resize', onWindowResize, false);
    }

    function createWireframeMesh() {
      const gridSize = 40;
      const segments = 80;
      const geometry = new THREE.PlaneGeometry(gridSize, gridSize, segments, segments);

      const positions = geometry.attributes.position;
      const originalPositions = new Float32Array(positions.array);
      geometry.userData.originalPositions = originalPositions;

      const material = new THREE.MeshBasicMaterial({
        color: 0x64748b,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });

      wireframeMesh = new THREE.Mesh(geometry, material);
      wireframeMesh.rotation.x = -Math.PI / 2;
      scene.add(wireframeMesh);

      const material2 = new THREE.MeshBasicMaterial({
        color: 0x94a3b8,
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });

      const wireframeMesh2 = new THREE.Mesh(geometry.clone(), material2);
      wireframeMesh2.rotation.x = -Math.PI / 2;
      wireframeMesh2.position.y = -2;
      scene.add(wireframeMesh2);
      wireframeMesh.userData.secondary = wireframeMesh2;
    }

    function onMouseMove(event) {
      mouseX = (event.clientX - window.innerWidth / 2) / window.innerWidth;
      mouseY = (event.clientY - window.innerHeight / 2) / window.innerHeight;
    }

    function animate() {
      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      if (wireframeMesh) {
        const positions = wireframeMesh.geometry.attributes.position;
        const originalPositions = wireframeMesh.geometry.userData.originalPositions;

        for (let i = 0; i < positions.count; i++) {
          const x = originalPositions[i * 3];
          const y = originalPositions[i * 3 + 1];
          const wave1 = Math.sin(x * 0.3 + time) * 0.8;
          const wave2 = Math.sin(y * 0.2 + time * 1.2) * 0.6;
          const wave3 = Math.sin((x + y) * 0.15 + time * 0.8) * 0.4;
          positions.setZ(i, wave1 + wave2 + wave3);
        }
        positions.needsUpdate = true;
        wireframeMesh.geometry.computeVertexNormals();

        if (wireframeMesh.userData.secondary) {
          const secondaryPositions = wireframeMesh.userData.secondary.geometry.attributes.position;
          const secondaryOriginal = wireframeMesh.userData.secondary.geometry.userData.originalPositions || originalPositions;
          for (let i = 0; i < secondaryPositions.count; i++) {
            const x = secondaryOriginal[i * 3];
            const y = secondaryOriginal[i * 3 + 1];
            const wave1 = Math.sin(x * 0.25 + time * 0.7) * 0.6;
            const wave2 = Math.sin(y * 0.18 + time * 0.9) * 0.4;
            secondaryPositions.setZ(i, wave1 + wave2);
          }
          secondaryPositions.needsUpdate = true;
        }
      }

      targetRotationX = mouseY * 0.1;
      targetRotationY = mouseX * 0.1;

      camera.position.x += (targetRotationY * 2 - camera.position.x) * 0.02;
      camera.position.y += (8 + targetRotationX * 2 - camera.position.y) * 0.02;

      const radius = 12;
      camera.position.x = Math.sin(time * 0.1) * radius * 0.3;
      camera.position.z = Math.cos(time * 0.1) * radius;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    init();
    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (renderer && renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}
      aria-hidden="true"
    />
  );
};

export default WireframeWavesBackground; 