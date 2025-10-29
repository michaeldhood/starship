'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface Module {
  id: string;
  name: string;
  size: number;
  health: number;
  x: number;
  y: number;
  z: number;
  type: string;
}

interface StarshipViewProps {
  repoStructure: Module[];
  onModuleSelect: (module: Module) => void;
  selectedModule: Module | null;
}

export default function StarshipView({ 
  repoStructure, 
  onModuleSelect, 
  selectedModule 
}: StarshipViewProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);
  const modulesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    if (!mountRef.current || !repoStructure) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.05);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(8, 6, 8);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 5;
    controls.maxDistance = 50;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff00ff, 0.5, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // Create stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];
    for (let i = 0; i < 2000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 200
      );
    }
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Create modules
    const modules: THREE.Mesh[] = [];
    repoStructure.forEach((module) => {
      // Module geometry based on type
      let geometry: THREE.BufferGeometry;
      if (module.type === 'core') {
        geometry = new THREE.OctahedronGeometry(module.size / 100);
      } else {
        geometry = new THREE.BoxGeometry(
          module.size / 100,
          module.size / 100,
          module.size / 100
        );
      }

      // Color based on health
      const color = new THREE.Color();
      color.setHSL(module.health * 0.3, 1, 0.5);

      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(module.x, module.y, module.z);
      mesh.userData = module;
      
      // Add wireframe
      const wireframe = new THREE.WireframeGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff, 
        transparent: true, 
        opacity: 0.3 
      });
      const wireframeMesh = new THREE.LineSegments(wireframe, lineMaterial);
      mesh.add(wireframeMesh);

      scene.add(mesh);
      modules.push(mesh);
    });
    modulesRef.current = modules;

    // Create connections between modules
    const coreModule = modules.find(m => m.userData.type === 'core');
    if (coreModule) {
      modules.forEach((module) => {
        if (module.userData.type !== 'core') {
          const points = [];
          points.push(coreModule.position);
          points.push(module.position);
          
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = new THREE.LineBasicMaterial({ 
            color: 0x00ffff, 
            transparent: true, 
            opacity: 0.2 
          });
          const line = new THREE.Line(geometry, material);
          scene.add(line);
        }
      });
    }

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current!.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(modules);

      modules.forEach((module) => {
        module.scale.set(1, 1, 1);
        (module.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.2;
      });

      if (intersects.length > 0) {
        const hoveredModule = intersects[0].object as THREE.Mesh;
        hoveredModule.scale.set(1.2, 1.2, 1.2);
        (hoveredModule.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.5;
        renderer.domElement.style.cursor = 'pointer';
      } else {
        renderer.domElement.style.cursor = 'default';
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(modules);
      
      if (intersects.length > 0) {
        onModuleSelect(intersects[0].object.userData as Module);
      }
    };

    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('click', handleClick);

    // Animation loop
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate modules slowly
      modules.forEach((module, i) => {
        if (module.userData.type === 'core') {
          module.rotation.y = time * 0.5;
          module.rotation.x = time * 0.3;
        } else {
          module.rotation.y = time * 0.2;
          module.position.y = module.userData.y + Math.sin(time + i) * 0.1;
        }
      });

      // Rotate stars
      stars.rotation.y = time * 0.05;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('click', handleClick);
      controls.dispose();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [repoStructure, onModuleSelect]);

  // Highlight selected module
  useEffect(() => {
    modulesRef.current.forEach((module) => {
      if (selectedModule && module.userData.id === selectedModule.id) {
        module.scale.set(1.5, 1.5, 1.5);
        (module.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.8;
      } else {
        module.scale.set(1, 1, 1);
        (module.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.2;
      }
    });
  }, [selectedModule]);

  return <div ref={mountRef} className="absolute inset-0" />;
}