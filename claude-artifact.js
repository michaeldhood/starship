<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Repository Starship - Project Files Download</title>
    <style>
        body {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%);
            color: #00ffcc;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        h1 {
            text-align: center;
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 0 0 20px rgba(0, 255, 204, 0.5);
        }
        .subtitle {
            text-align: center;
            color: #888;
            margin-bottom: 30px;
        }
        .file-tree {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid #00ffcc;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
            box-shadow: 0 0 30px rgba(0, 255, 204, 0.2);
        }
        .download-section {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .file-card {
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid #00ffcc;
            border-radius: 8px;
            padding: 15px;
            transition: all 0.3s ease;
        }
        .file-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 255, 204, 0.3);
        }
        .file-name {
            color: #00ffcc;
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 1.1em;
        }
        .file-path {
            color: #666;
            font-size: 0.9em;
            margin-bottom: 10px;
        }
        button {
            background: linear-gradient(135deg, #00ffcc 0%, #00ccff 100%);
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            width: 100%;
        }
        button:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(0, 255, 204, 0.5);
        }
        .download-all {
            background: linear-gradient(135deg, #ff00cc 0%, #00ccff 100%);
            font-size: 1.2em;
            padding: 15px 30px;
            margin: 30px auto;
            display: block;
            width: auto;
        }
        pre {
            background: #0a0a0a;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
            font-size: 0.9em;
            line-height: 1.4;
        }
        .section-title {
            color: #00ffcc;
            font-size: 1.5em;
            margin: 30px 0 20px;
            border-bottom: 1px solid #00ffcc;
            padding-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Repository Starship Project</h1>
        <p class="subtitle">Complete Project Structure with Frontend & Backend</p>

        <div class="file-tree">
            <h2>Project Structure</h2>
            <pre>
repo-starship/
├── frontend/                 # Next.js application
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── StarshipView.tsx
│   │   ├── MetricsDashboard.tsx
│   │   └── ModuleInspector.tsx
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   └── tailwind.config.js
│
├── backend/                  # FastAPI application
│   ├── analyzers/
│   │   ├── __init__.py
│   │   ├── complexity.py
│   │   ├── dependencies.py
│   │   ├── documentation.py
│   │   └── yagni_detector.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── websocket.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── repository.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
│
├── docker-compose.yml
├── README.md
└── .gitignore
            </pre>
        </div>

        <button class="download-all" onclick="downloadAllFiles()">⬇ Download All Files as ZIP</button>

        <h2 class="section-title">Frontend Files</h2>
        <div class="download-section" id="frontend-files"></div>

        <h2 class="section-title">Backend Files</h2>
        <div class="download-section" id="backend-files"></div>

        <h2 class="section-title">Configuration Files</h2>
        <div class="download-section" id="config-files"></div>
    </div>

    <script>
        // File contents
        const files = {
            // Frontend files
            'frontend/package.json': {
                content: `{
  "name": "repo-starship-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.5.4",
    "recharts": "^2.10.0",
    "framer-motion": "^10.16.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.160.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-config-next": "14.0.0",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.3.0"
  }
}`,
                path: 'frontend/package.json'
            },
            'frontend/app/layout.tsx': {
                content: `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Repository Starship - Mission Control',
  description: 'Monitor your codebase vitals in real-time',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}`,
                path: 'frontend/app/layout.tsx'
            },
            'frontend/app/page.tsx': {
                content: `'use client';

import { useState, useEffect } from 'react';
import StarshipView from '@/components/StarshipView';
import MetricsDashboard from '@/components/MetricsDashboard';
import ModuleInspector from '@/components/ModuleInspector';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

export default function Home() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [repoStructure, setRepoStructure] = useState(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loading, setLoading] = useState(true);
  const [repoUrl, setRepoUrl] = useState('');

  useEffect(() => {
    // Initialize WebSocket connection
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    // Listen for real-time updates
    newSocket.on('metrics_update', (data) => {
      setMetrics(data);
    });

    newSocket.on('structure_update', (data) => {
      setRepoStructure(data);
    });

    // Load initial mock data (replace with actual API call)
    loadMockData();

    return () => {
      newSocket.close();
    };
  }, []);

  const loadMockData = () => {
    // Mock data for initial load
    setMetrics({
      complexity: 72,
      coverage: 87,
      documentation: 65,
      yagni: 28,
      dependencies: 143,
      techDebt: 34,
      vulnerabilities: { critical: 0, high: 1, medium: 3, low: 7 }
    });

    setRepoStructure([
      { id: 'core', name: 'core', size: 150, health: 0.9, x: 0, y: 0, z: 0, type: 'core' },
      { id: 'auth', name: 'auth', size: 80, health: 0.7, x: -3, y: 2, z: 1, type: 'module' },
      { id: 'api', name: 'api', size: 120, health: 0.6, x: 3, y: 1, z: -1, type: 'module' },
      { id: 'database', name: 'database', size: 100, health: 0.85, x: 0, y: -3, z: 2, type: 'module' },
      { id: 'ui', name: 'ui-components', size: 140, health: 0.4, x: -2, y: -1, z: -3, type: 'module' },
      { id: 'utils', name: 'utils', size: 60, health: 0.95, x: 4, y: 3, z: 2, type: 'module' },
    ]);

    setLoading(false);
  };

  const analyzeRepository = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/analyze', {
        repo_url: repoUrl
      });
      setRepoStructure(response.data.structure);
      setMetrics(response.data.metrics);
      setLoading(false);
    } catch (error) {
      console.error('Failed to analyze repository:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-cyan-400 text-2xl animate-pulse">
          Initializing Starship Systems...
        </div>
      </div>
    );
  }

  return (
    <main className="relative w-full h-screen bg-black overflow-hidden">
      {/* 3D Visualization */}
      <StarshipView 
        repoStructure={repoStructure}
        onModuleSelect={setSelectedModule}
        selectedModule={selectedModule}
      />

      {/* Metrics Dashboard */}
      <MetricsDashboard metrics={metrics} />

      {/* Module Inspector */}
      {selectedModule && (
        <ModuleInspector 
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
        />
      )}

      {/* Repository Input */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter repository URL..."
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="px-4 py-2 bg-black/80 border border-cyan-500/50 text-cyan-400 rounded"
          />
          <button
            onClick={analyzeRepository}
            className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-400 rounded transition-colors"
          >
            ANALYZE
          </button>
        </div>
      </div>
    </main>
  );
}`,
                path: 'frontend/app/page.tsx'
            },
            'frontend/app/globals.css': {
                content: `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 255, 255, 255;
  --background-start-rgb: 0, 0, 0;
  --background-end-rgb: 0, 0, 0;
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 255, 204, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 255, 204, 0.8);
}`,
                path: 'frontend/app/globals.css'
            },
            'frontend/components/StarshipView.tsx': {
                content: `'use client';

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
}`,
                path: 'frontend/components/StarshipView.tsx'
            },
            'frontend/components/MetricsDashboard.tsx': {
                content: `'use client';

interface Metrics {
  complexity: number;
  coverage: number;
  documentation: number;
  yagni: number;
  dependencies: number;
  techDebt: number;
  vulnerabilities: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

interface MetricsDashboardProps {
  metrics: Metrics;
}

export default function MetricsDashboard({ metrics }: MetricsDashboardProps) {
  const getStatusColor = (value: number, inverse = false) => {
    const v = inverse ? 100 - value : value;
    if (v > 70) return 'text-green-400';
    if (v > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getBarColor = (value: number, inverse = false) => {
    const v = inverse ? 100 - value : value;
    if (v > 70) return 'bg-green-500';
    if (v > 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="absolute left-0 top-24 w-80 bg-black/80 backdrop-blur-sm border border-cyan-500/30 p-4 space-y-4">
      <h2 className="text-cyan-400 text-lg font-bold border-b border-cyan-500/30 pb-2">
        SYSTEM VITALS
      </h2>
      
      <div className="space-y-3">
        {/* Complexity Reactor */}
        <div>
          <div className="flex justify-between text-sm">
            <span>Complexity Reactor</span>
            <span className={getStatusColor(metrics.complexity, true)}>
              {metrics.complexity.toFixed(1)}°C
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className={\`h-full \${getBarColor(metrics.complexity, true)} transition-all duration-500\`}
              style={{ width: \`\${metrics.complexity}%\` }}
            />
          </div>
        </div>

        {/* Shield Coverage */}
        <div>
          <div className="flex justify-between text-sm">
            <span>Shield Coverage</span>
            <span className={getStatusColor(metrics.coverage)}>
              {metrics.coverage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 transition-all duration-500"
              style={{ width: \`\${metrics.coverage}%\` }}
            />
          </div>
        </div>

        {/* Documentation Index */}
        <div>
          <div className="flex justify-between text-sm">
            <span>Documentation Index</span>
            <span className={getStatusColor(metrics.documentation)}>
              {metrics.documentation.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: \`\${metrics.documentation}%\` }}
            />
          </div>
        </div>

        {/* YAGNI Detector */}
        <div>
          <div className="flex justify-between text-sm">
            <span>YAGNI Detector</span>
            <span className={getStatusColor(metrics.yagni, true)}>
              {metrics.yagni.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: \`\${metrics.yagni}%\` }}
            />
          </div>
        </div>

        {/* Tech Debt */}
        <div>
          <div className="flex justify-between text-sm">
            <span>Tech Debt Accumulator</span>
            <span className={getStatusColor(metrics.techDebt, true)}>
              {metrics.techDebt.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-500"
              style={{ width: \`\${metrics.techDebt}%\` }}
            />
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="border-t border-cyan-500/30 pt-3">
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-400">Dependencies:</span>
            <span className="text-cyan-400">{Math.round(metrics.dependencies)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Vulnerabilities:</span>
            <span className="space-x-2">
              {metrics.vulnerabilities.critical > 0 && (
                <span className="text-red-500">{metrics.vulnerabilities.critical} CRIT</span>
              )}
              {metrics.vulnerabilities.high > 0 && (
                <span className="text-orange-500">{metrics.vulnerabilities.high} HIGH</span>
              )}
              {metrics.vulnerabilities.medium > 0 && (
                <span className="text-yellow-500">{metrics.vulnerabilities.medium} MED</span>
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Code Age:</span>
            <span className="text-green-400">87% FRESH</span>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="border-t border-cyan-500/30 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">SYSTEM STATUS</span>
          <span className="text-green-400 text-xs animate-pulse">● OPERATIONAL</span>
        </div>
      </div>
    </div>
  );
}`,
                path: 'frontend/components/MetricsDashboard.tsx'
            },
            'frontend/components/ModuleInspector.tsx': {
                content: `'use client';

interface Module {
  id: string;
  name: string;
  size: number;
  health: number;
  type: string;
  complexity?: number;
  coverage?: number;
  lastModified?: string;
  maintainers?: string[];
  dependencies?: string[];
}

interface ModuleInspectorProps {
  module: Module;
  onClose: () => void;
}

export default function ModuleInspector({ module, onClose }: ModuleInspectorProps) {
  const getHealthColor = (health: number) => {
    if (health > 0.7) return 'text-green-400';
    if (health > 0.4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getHealthStatus = (health: number) => {
    if (health > 0.7) return 'OPTIMAL';
    if (health > 0.4) return 'WARNING';
    return 'CRITICAL';
  };

  return (
    <div className="absolute right-0 top-24 w-80 bg-black/80 backdrop-blur-sm border border-cyan-500/30 p-4">
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2 mb-3">
        <h2 className="text-cyan-400 text-lg font-bold">
          MODULE: {module.name.toUpperCase()}
        </h2>
        <button
          onClick={onClose}
          className="text-cyan-400 hover:text-cyan-300 text-xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-3 text-sm">
        {/* Basic Info */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Type:</span>
            <span className="text-cyan-400">{module.type.toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Size:</span>
            <span className="text-white">{module.size.toLocaleString()} LOC</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Health:</span>
            <span className={getHealthColor(module.health)}>
              {(module.health * 100).toFixed(0)}% - {getHealthStatus(module.health)}
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="border-t border-gray-700 pt-3 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Complexity:</span>
            <span className="text-white">{module.complexity || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Coverage:</span>
            <span className="text-white">{module.coverage ? \`\${module.coverage}%\` : 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Last Modified:</span>
            <span className="text-white">{module.lastModified || '2 hours ago'}</span>
          </div>
        </div>

        {/* Dependencies */}
        {module.dependencies && module.dependencies.length > 0 && (
          <div className="border-t border-gray-700 pt-3">
            <p className="text-gray-400 mb-2">Dependencies:</p>
            <div className="flex flex-wrap gap-1">
              {module.dependencies.slice(0, 5).map(dep => (
                <span key={dep} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                  {dep}
                </span>
              ))}
              {module.dependencies.length > 5 && (
                <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded">
                  +{module.dependencies.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Status Message */}
        <div className="mt-4 p-3 bg-gray-900 rounded border border-gray-700">
          <p className="text-xs text-gray-300">
            {module.health < 0.5 ? (
              <>
                <span className="text-yellow-400">⚠️ WARNING:</span> Module requires immediate attention. 
                High complexity and low test coverage detected. Consider refactoring.
              </>
            ) : module.health < 0.8 ? (
              <>
                <span className="text-blue-400">ℹ️ INFO:</span> Module performance is acceptable but 
                could be improved. Review recent changes.
              </>
            ) : (
              <>
                <span className="text-green-400">✓ OPTIMAL:</span> Module operating within normal 
                parameters. All systems functioning correctly.
              </>
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-400 py-2 px-3 rounded text-xs transition-colors">
            VIEW CODE
          </button>
          <button className="flex-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500 text-purple-400 py-2 px-3 rounded text-xs transition-colors">
            RUN ANALYSIS
          </button>
        </div>
      </div>
    </div>
  );
}`,
                path: 'frontend/components/ModuleInspector.tsx'
            },
            'frontend/next.config.js': {
                content: `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Allow CORS for local development
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'http://localhost:8000' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
}

module.exports = nextConfig`,
                path: 'frontend/next.config.js'
            },
            'frontend/tsconfig.json': {
                content: `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,
                path: 'frontend/tsconfig.json'
            },
            'frontend/tailwind.config.js': {
                content: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00ffcc',
        'cyber-purple': '#ff00ff',
        'cyber-pink': '#ff00cc',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}`,
                path: 'frontend/tailwind.config.js'
            },
            // Backend files
            'backend/main.py': {
                content: `"""
Repository Starship - Backend API
Main FastAPI application for repository analysis
"""

from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
import json
from typing import Dict, Any

from api.routes import router as api_router
from api.websocket import WebSocketManager
from analyzers import analyze_repository

# WebSocket manager instance
manager = WebSocketManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle"""
    print("🚀 Starship Repository Backend Starting...")
    yield
    print("👋 Starship Repository Backend Shutting Down...")

# Create FastAPI app
app = FastAPI(
    title="Repository Starship API",
    description="Real-time code repository analysis and monitoring",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "Repository Starship API",
        "status": "operational",
        "version": "0.1.0"
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates"""
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive and handle messages
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("type") == "analyze":
                # Start repository analysis
                repo_url = message.get("repo_url")
                if repo_url:
                    # Run analysis in background
                    asyncio.create_task(
                        analyze_and_broadcast(repo_url, websocket)
                    )
            
            elif message.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
                
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        manager.disconnect(websocket)

async def analyze_and_broadcast(repo_url: str, websocket: WebSocket):
    """Analyze repository and broadcast updates"""
    try:
        # Send initial status
        await websocket.send_json({
            "type": "status",
            "message": "Starting analysis..."
        })
        
        # Perform analysis (this would be your actual analysis logic)
        result = await analyze_repository(repo_url)
        
        # Send results
        await websocket.send_json({
            "type": "analysis_complete",
            "data": result
        })
        
    except Exception as e:
        await websocket.send_json({
            "type": "error",
            "message": str(e)
        })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )`,
                path: 'backend/main.py'
            },
            'backend/requirements.txt': {
                content: `# Core
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
python-dotenv==1.0.0
websockets==12.0

# Repository Analysis
GitPython==3.1.40
radon==6.0.1
pygments==2.17.2
tree-sitter==0.20.4
jedi==0.19.1

# Code Analysis
astroid==3.0.1
pylint==3.0.3
bandit==1.7.5
vulture==2.10

# Data Processing
pandas==2.1.4
numpy==1.26.2
pydantic==2.5.2

# Async Support
aiofiles==23.2.1
httpx==0.25.2
asyncio==3.4.3

# Testing
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0

# Development
black==23.12.0
isort==5.13.2
mypy==1.7.1`,
                path: 'backend/requirements.txt'
            },
            'backend/.env.example': {
                content: `# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# CORS Settings
CORS_ORIGINS=http://localhost:3000

# Repository Analysis Settings
MAX_FILE_SIZE_MB=10
MAX_FILES_TO_ANALYZE=1000
ANALYSIS_TIMEOUT_SECONDS=300

# Cache Settings
ENABLE_CACHE=true
CACHE_TTL_SECONDS=3600

# GitHub API (optional, for private repos)
GITHUB_TOKEN=your_github_token_here

# Logging
LOG_LEVEL=INFO
LOG_FILE=logs/repo_starship.log`,
                path: 'backend/.env.example'
            },
            'backend/api/__init__.py': {
                content: `"""API module for Repository Starship"""

from .routes import router

__all__ = ["router"]`,
                path: 'backend/api/__init__.py'
            },
            'backend/api/routes.py': {
                content: `"""
API Routes for Repository Starship
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, HttpUrl
from typing import Dict, Any, List, Optional
import asyncio

from analyzers import (
    analyze_complexity,
    analyze_dependencies,
    analyze_documentation,
    detect_yagni,
    analyze_repository
)

router = APIRouter()

class RepositoryRequest(BaseModel):
    """Repository analysis request model"""
    repo_url: HttpUrl
    branch: Optional[str] = "main"
    depth: Optional[int] = 1
    include_tests: Optional[bool] = True

class MetricsResponse(BaseModel):
    """Metrics response model"""
    complexity: float
    coverage: float
    documentation: float
    yagni: float
    dependencies: int
    tech_debt: float
    vulnerabilities: Dict[str, int]
    timestamp: str

class ModuleInfo(BaseModel):
    """Module information model"""
    id: str
    name: str
    path: str
    size: int
    health: float
    complexity: float
    coverage: float
    dependencies: List[str]
    issues: List[str]

@router.post("/analyze")
async def analyze_repository_endpoint(
    request: RepositoryRequest,
    background_tasks: BackgroundTasks
):
    """
    Analyze a repository and return metrics
    """
    try:
        # Start analysis
        result = await analyze_repository(
            str(request.repo_url),
            branch=request.branch,
            depth=request.depth
        )
        
        return {
            "status": "success",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/metrics/{repo_id}")
async def get_repository_metrics(repo_id: str):
    """
    Get cached metrics for a repository
    """
    # TODO: Implement cache lookup
    return {
        "repo_id": repo_id,
        "metrics": {
            "complexity": 72.5,
            "coverage": 87.3,
            "documentation": 65.0,
            "yagni": 28.4,
            "dependencies": 143,
            "tech_debt": 34.2,
            "vulnerabilities": {
                "critical": 0,
                "high": 1,
                "medium": 3,
                "low": 7
            }
        }
    }

@router.get("/modules/{repo_id}")
async def get_repository_modules(repo_id: str):
    """
    Get module structure for a repository
    """
    # TODO: Implement actual module analysis
    modules = [
        {
            "id": "core",
            "name": "core",
            "path": "/src/core",
            "size": 15000,
            "health": 0.9,
            "x": 0, "y": 0, "z": 0,
            "type": "core"
        },
        {
            "id": "auth",
            "name": "authentication",
            "path": "/src/auth",
            "size": 8000,
            "health": 0.7,
            "x": -3, "y": 2, "z": 1,
            "type": "module"
        },
        {
            "id": "api",
            "name": "api",
            "path": "/src/api",
            "size": 12000,
            "health": 0.6,
            "x": 3, "y": 1, "z": -1,
            "type": "module"
        }
    ]
    
    return {
        "repo_id": repo_id,
        "modules": modules
    }

@router.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "service": "Repository Starship API",
        "version": "0.1.0"
    }

@router.post("/webhook/github")
async def github_webhook(payload: Dict[str, Any]):
    """
    Handle GitHub webhook events for real-time updates
    """
    event_type = payload.get("event_type")
    
    if event_type == "push":
        # Trigger re-analysis on push
        repo_url = payload.get("repository", {}).get("clone_url")
        if repo_url:
            # Queue analysis task
            asyncio.create_task(analyze_repository(repo_url))
    
    return {"status": "received"}`,
                path: 'backend/api/routes.py'
            },
            'backend/api/websocket.py': {
                content: `"""
WebSocket manager for real-time updates
"""

from typing import List, Dict, Any
from fastapi import WebSocket
import json
import asyncio

class WebSocketManager:
    """Manage WebSocket connections"""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.connection_data: Dict[WebSocket, Dict[str, Any]] = {}
    
    async def connect(self, websocket: WebSocket):
        """Accept and store a new WebSocket connection"""
        await websocket.accept()
        self.active_connections.append(websocket)
        self.connection_data[websocket] = {
            "connected_at": asyncio.get_event_loop().time()
        }
        print(f"Client connected. Total connections: {len(self.active_connections)}")
    
    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket connection"""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.connection_data:
            del self.connection_data[websocket]
        print(f"Client disconnected. Total connections: {len(self.active_connections)}")
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        """Send a message to a specific client"""
        await websocket.send_text(message)
    
    async def send_personal_json(self, data: Dict[str, Any], websocket: WebSocket):
        """Send JSON data to a specific client"""
        await websocket.send_json(data)
    
    async def broadcast(self, message: str):
        """Broadcast a message to all connected clients"""
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                # Connection might be closed
                pass
    
    async def broadcast_json(self, data: Dict[str, Any]):
        """Broadcast JSON data to all connected clients"""
        for connection in self.active_connections:
            try:
                await connection.send_json(data)
            except:
                # Connection might be closed
                pass
    
    async def broadcast_metrics_update(self, metrics: Dict[str, Any]):
        """Broadcast metrics update to all clients"""
        await self.broadcast_json({
            "type": "metrics_update",
            "data": metrics
        })
    
    async def broadcast_structure_update(self, structure: List[Dict[str, Any]]):
        """Broadcast repository structure update to all clients"""
        await self.broadcast_json({
            "type": "structure_update",
            "data": structure
        })`,
                path: 'backend/api/websocket.py'
            },
            'backend/analyzers/__init__.py': {
                content: `"""
Repository analysis modules
"""

from .complexity import analyze_complexity
from .dependencies import analyze_dependencies
from .documentation import analyze_documentation
from .yagni_detector import detect_yagni

async def analyze_repository(repo_url: str, branch: str = "main", depth: int = 1):
    """
    Main repository analysis function
    """
    # TODO: Implement actual repository cloning and analysis
    # For now, return mock data
    
    return {
        "metrics": {
            "complexity": 72.5,
            "coverage": 87.3,
            "documentation": 65.0,
            "yagni": 28.4,
            "dependencies": 143,
            "tech_debt": 34.2,
            "vulnerabilities": {
                "critical": 0,
                "high": 1,
                "medium": 3,
                "low": 7
            }
        },
        "structure": [
            {
                "id": "core",
                "name": "core",
                "size": 15000,
                "health": 0.9,
                "x": 0, "y": 0, "z": 0,
                "type": "core"
            },
            {
                "id": "auth",
                "name": "auth",
                "size": 8000,
                "health": 0.7,
                "x": -3, "y": 2, "z": 1,
                "type": "module"
            }
        ]
    }

__all__ = [
    "analyze_complexity",
    "analyze_dependencies", 
    "analyze_documentation",
    "detect_yagni",
    "analyze_repository"
]`,
                path: 'backend/analyzers/__init__.py'
            },
            'backend/analyzers/complexity.py': {
                content: `"""
Complexity Analysis Module
Analyzes cyclomatic complexity, cognitive complexity, and code maintainability
"""

import ast
import os
from typing import Dict, List, Any, Optional
from pathlib import Path
from radon.cc import cc_visit, cc_rank
from radon.metrics import mi_visit, mi_rank
from radon.raw import analyze
import asyncio

class ComplexityAnalyzer:
    """Analyze code complexity metrics"""
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.results = {
            "cyclomatic_complexity": {},
            "cognitive_complexity": {},
            "maintainability_index": {},
            "raw_metrics": {}
        }
    
    async def analyze_file(self, file_path: Path) -> Dict[str, Any]:
        """Analyze a single Python file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                code = f.read()
            
            # Cyclomatic complexity
            cc_results = cc_visit(code)
            cc_data = []
            for item in cc_results:
                cc_data.append({
                    "name": item.name,
                    "complexity": item.complexity,
                    "rank": cc_rank(item.complexity),
                    "lineno": item.lineno
                })
            
            # Maintainability index
            mi_score = mi_visit(code, multi=True)
            
            # Raw metrics (LOC, comments, etc.)
            raw = analyze(code)
            
            return {
                "file": str(file_path.relative_to(self.repo_path)),
                "cyclomatic_complexity": cc_data,
                "maintainability_index": mi_score,
                "maintainability_rank": mi_rank(mi_score),
                "raw_metrics": {
                    "loc": raw.loc,
                    "lloc": raw.lloc,
                    "sloc": raw.sloc,
                    "comments": raw.comments,
                    "multi": raw.multi,
                    "blank": raw.blank
                }
            }
        except Exception as e:
            return {
                "file": str(file_path.relative_to(self.repo_path)),
                "error": str(e)
            }
    
    async def analyze_directory(self, directory: Path) -> List[Dict[str, Any]]:
        """Analyze all Python files in a directory"""
        results = []
        
        for py_file in directory.rglob("*.py"):
            # Skip test files and __pycache__
            if "__pycache__" in str(py_file) or "test_" in py_file.name:
                continue
            
            result = await self.analyze_file(py_file)
            results.append(result)
        
        return results
    
    async def calculate_summary(self, results: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculate summary statistics"""
        total_complexity = 0
        total_files = 0
        high_complexity_functions = []
        total_loc = 0
        
        for file_result in results:
            if "error" in file_result:
                continue
            
            total_files += 1
            
            # Sum up complexity
            for func in file_result.get("cyclomatic_complexity", []):
                total_complexity += func["complexity"]
                if func["complexity"] > 10:  # High complexity threshold
                    high_complexity_functions.append({
                        "file": file_result["file"],
                        "function": func["name"],
                        "complexity": func["complexity"],
                        "rank": func["rank"]
                    })
            
            # Sum up LOC
            if file_result.get("raw_metrics"):
                total_loc += file_result["raw_metrics"]["loc"]
        
        avg_complexity = total_complexity / total_files if total_files > 0 else 0
        
        return {
            "total_files": total_files,
            "total_loc": total_loc,
            "average_complexity": round(avg_complexity, 2),
            "high_complexity_functions": high_complexity_functions,
            "complexity_score": min(100, max(0, 100 - (avg_complexity * 5)))  # Convert to 0-100 score
        }
    
    async def run(self) -> Dict[str, Any]:
        """Run the complete complexity analysis"""
        results = await self.analyze_directory(self.repo_path)
        summary = await self.calculate_summary(results)
        
        return {
            "summary": summary,
            "details": results
        }

async def analyze_complexity(repo_path: str) -> Dict[str, Any]:
    """Main entry point for complexity analysis"""
    analyzer = ComplexityAnalyzer(repo_path)
    return await analyzer.run()`,
                path: 'backend/analyzers/complexity.py'
            },
            'backend/analyzers/dependencies.py': {
                content: `"""
Dependency Analysis Module
Analyzes import statements, circular dependencies, and package dependencies
"""

import ast
import os
import json
from typing import Dict, List, Set, Any, Optional
from pathlib import Path
import asyncio
from collections import defaultdict

class DependencyAnalyzer:
    """Analyze code dependencies and imports"""
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.import_graph = defaultdict(set)
        self.external_deps = set()
        self.internal_deps = defaultdict(set)
        self.circular_deps = []
    
    def extract_imports(self, file_path: Path) -> Dict[str, Any]:
        """Extract import statements from a Python file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                tree = ast.parse(f.read())
            
            imports = {
                "standard_library": [],
                "external": [],
                "internal": []
            }
            
            for node in ast.walk(tree):
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        module_name = alias.name
                        self.categorize_import(module_name, imports)
                
                elif isinstance(node, ast.ImportFrom):
                    if node.module:
                        self.categorize_import(node.module, imports)
            
            return {
                "file": str(file_path.relative_to(self.repo_path)),
                "imports": imports
            }
        
        except Exception as e:
            return {
                "file": str(file_path.relative_to(self.repo_path)),
                "error": str(e)
            }
    
    def categorize_import(self, module_name: str, imports: Dict[str, List[str]]):
        """Categorize import as standard library, external, or internal"""
        # Standard library modules (simplified list)
        stdlib_modules = {
            'os', 'sys', 'json', 'math', 'random', 'datetime', 'collections',
            'itertools', 'functools', 'typing', 'pathlib', 'asyncio', 're',
            'urllib', 'http', 'email', 'csv', 'sqlite3', 'threading'
        }
        
        if module_name.split('.')[0] in stdlib_modules:
            imports["standard_library"].append(module_name)
        elif module_name.startswith('.'):
            imports["internal"].append(module_name)
        else:
            imports["external"].append(module_name)
            self.external_deps.add(module_name.split('.')[0])
    
    async def build_dependency_graph(self, directory: Path):
        """Build a dependency graph for all Python files"""
        for py_file in directory.rglob("*.py"):
            if "__pycache__" in str(py_file):
                continue
            
            result = self.extract_imports(py_file)
            if "error" not in result:
                file_key = str(py_file.relative_to(self.repo_path))
                
                for imp in result["imports"]["internal"]:
                    self.internal_deps[file_key].add(imp)
                
                for imp in result["imports"]["external"]:
                    self.import_graph[file_key].add(imp)
    
    def detect_circular_dependencies(self) -> List[List[str]]:
        """Detect circular dependencies in the import graph"""
        visited = set()
        rec_stack = set()
        cycles = []
        
        def dfs(node, path):
            visited.add(node)
            rec_stack.add(node)
            path.append(node)
            
            for neighbor in self.internal_deps.get(node, []):
                if neighbor not in visited:
                    dfs(neighbor, path.copy())
                elif neighbor in rec_stack:
                    # Found a cycle
                    cycle_start = path.index(neighbor)
                    cycle = path[cycle_start:] + [neighbor]
                    cycles.append(cycle)
            
            rec_stack.remove(node)
        
        for node in self.internal_deps:
            if node not in visited:
                dfs(node, [])
        
        return cycles
    
    async def analyze_requirements(self) -> Dict[str, Any]:
        """Analyze requirements.txt or pyproject.toml"""
        requirements = {}
        
        # Check for requirements.txt
        req_file = self.repo_path / "requirements.txt"
        if req_file.exists():
            with open(req_file, 'r') as f:
                requirements["requirements.txt"] = [
                    line.strip() for line in f 
                    if line.strip() and not line.startswith('#')
                ]
        
        # Check for pyproject.toml
        pyproject_file = self.repo_path / "pyproject.toml"
        if pyproject_file.exists():
            # Simplified parsing - in production use toml library
            requirements["pyproject.toml"] = "Found"
        
        return requirements
    
    async def calculate_metrics(self) -> Dict[str, Any]:
        """Calculate dependency metrics"""
        total_imports = sum(len(deps) for deps in self.import_graph.values())
        unique_external = len(self.external_deps)
        circular_count = len(self.circular_deps)
        
        # Calculate coupling score (lower is better)
        coupling_score = min(100, (total_imports / max(len(self.import_graph), 1)) * 10)
        
        return {
            "total_imports": total_imports,
            "unique_external_dependencies": unique_external,
            "circular_dependencies_count": circular_count,
            "coupling_score": 100 - coupling_score,  # Convert to 0-100 where higher is better
            "most_imported": self.get_most_imported(),
            "external_dependencies": list(self.external_deps)
        }
    
    def get_most_imported(self, top_n: int = 5) -> List[Dict[str, Any]]:
        """Get the most imported modules"""
        import_counts = defaultdict(int)
        
        for deps in self.import_graph.values():
            for dep in deps:
                import_counts[dep] += 1
        
        sorted_imports = sorted(
            import_counts.items(), 
            key=lambda x: x[1], 
            reverse=True
        )[:top_n]
        
        return [
            {"module": module, "count": count}
            for module, count in sorted_imports
        ]
    
    async def run(self) -> Dict[str, Any]:
        """Run the complete dependency analysis"""
        await self.build_dependency_graph(self.repo_path)
        self.circular_deps = self.detect_circular_dependencies()
        requirements = await self.analyze_requirements()
        metrics = await self.calculate_metrics()
        
        return {
            "metrics": metrics,
            "circular_dependencies": self.circular_deps,
            "requirements": requirements
        }

async def analyze_dependencies(repo_path: str) -> Dict[str, Any]:
    """Main entry point for dependency analysis"""
    analyzer = DependencyAnalyzer(repo_path)
    return await analyzer.run()`,
                path: 'backend/analyzers/dependencies.py'
            },
            'backend/analyzers/documentation.py': {
                content: `"""
Documentation Analysis Module
Analyzes docstrings, comments, and documentation coverage
"""

import ast
import os
from typing import Dict, List, Any, Optional
from pathlib import Path
import asyncio

class DocumentationAnalyzer:
    """Analyze documentation coverage and quality"""
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.results = {
            "documented_functions": 0,
            "undocumented_functions": 0,
            "documented_classes": 0,
            "undocumented_classes": 0,
            "documented_modules": 0,
            "undocumented_modules": 0,
            "comment_lines": 0,
            "total_lines": 0
        }
    
    def has_docstring(self, node) -> bool:
        """Check if a node has a docstring"""
        return (
            ast.get_docstring(node) is not None and
            len(ast.get_docstring(node).strip()) > 0
        )
    
    def analyze_docstring_quality(self, docstring: str) -> Dict[str, Any]:
        """Analyze the quality of a docstring"""
        if not docstring:
            return {"quality": "missing", "score": 0}
        
        lines = docstring.strip().split('\\n')
        word_count = len(docstring.split())
        
        # Check for common docstring patterns
        has_params = any('param' in line.lower() or 'args' in line.lower() for line in lines)
        has_returns = any('return' in line.lower() for line in lines)
        has_raises = any('raise' in line.lower() or 'except' in line.lower() for line in lines)
        
        # Calculate quality score
        score = 25  # Base score for having a docstring
        if word_count > 10:
            score += 25
        if has_params:
            score += 20
        if has_returns:
            score += 20
        if has_raises:
            score += 10
        
        quality = "good" if score >= 70 else "adequate" if score >= 40 else "poor"
        
        return {
            "quality": quality,
            "score": score,
            "word_count": word_count,
            "has_params": has_params,
            "has_returns": has_returns,
            "has_raises": has_raises
        }
    
    async def analyze_file(self, file_path: Path) -> Dict[str, Any]:
        """Analyze documentation in a single Python file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                tree = ast.parse(content)
            
            file_info = {
                "file": str(file_path.relative_to(self.repo_path)),
                "module_docstring": ast.get_docstring(tree) is not None,
                "functions": [],
                "classes": [],
                "total_lines": len(content.split('\\n')),
                "comment_lines": content.count('#')
            }
            
            # Analyze functions
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef) or isinstance(node, ast.AsyncFunctionDef):
                    func_info = {
                        "name": node.name,
                        "has_docstring": self.has_docstring(node),
                        "lineno": node.lineno
                    }
                    
                    if func_info["has_docstring"]:
                        docstring = ast.get_docstring(node)
                        func_info["docstring_quality"] = self.analyze_docstring_quality(docstring)
                        self.results["documented_functions"] += 1
                    else:
                        self.results["undocumented_functions"] += 1
                    
                    file_info["functions"].append(func_info)
                
                elif isinstance(node, ast.ClassDef):
                    class_info = {
                        "name": node.name,
                        "has_docstring": self.has_docstring(node),
                        "lineno": node.lineno,
                        "methods": []
                    }
                    
                    if class_info["has_docstring"]:
                        docstring = ast.get_docstring(node)
                        class_info["docstring_quality"] = self.analyze_docstring_quality(docstring)
                        self.results["documented_classes"] += 1
                    else:
                        self.results["undocumented_classes"] += 1
                    
                    # Analyze methods
                    for item in node.body:
                        if isinstance(item, ast.FunctionDef):
                            method_info = {
                                "name": item.name,
                                "has_docstring": self.has_docstring(item)
                            }
                            class_info["methods"].append(method_info)
                    
                    file_info["classes"].append(class_info)
            
            # Update module stats
            if file_info["module_docstring"]:
                self.results["documented_modules"] += 1
            else:
                self.results["undocumented_modules"] += 1
            
            self.results["total_lines"] += file_info["total_lines"]
            self.results["comment_lines"] += file_info["comment_lines"]
            
            return file_info
        
        except Exception as e:
            return {
                "file": str(file_path.relative_to(self.repo_path)),
                "error": str(e)
            }
    
    async def analyze_readme(self) -> Dict[str, Any]:
        """Check for and analyze README file"""
        readme_files = ["README.md", "README.rst", "README.txt", "README"]
        
        for readme_name in readme_files:
            readme_path = self.repo_path / readme_name
            if readme_path.exists():
                with open(readme_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                return {
                    "exists": True,
                    "file": readme_name,
                    "size": len(content),
                    "word_count": len(content.split()),
                    "has_installation": "install" in content.lower(),
                    "has_usage": "usage" in content.lower() or "example" in content.lower(),
                    "has_api": "api" in content.lower(),
                    "has_contributing": "contribut" in content.lower()
                }
        
        return {"exists": False}
    
    async def calculate_coverage(self) -> Dict[str, Any]:
        """Calculate documentation coverage metrics"""
        total_functions = self.results["documented_functions"] + self.results["undocumented_functions"]
        total_classes = self.results["documented_classes"] + self.results["undocumented_classes"]
        total_modules = self.results["documented_modules"] + self.results["undocumented_modules"]
        
        function_coverage = (
            self.results["documented_functions"] / total_functions * 100
            if total_functions > 0 else 0
        )
        
        class_coverage = (
            self.results["documented_classes"] / total_classes * 100
            if total_classes > 0 else 0
        )
        
        module_coverage = (
            self.results["documented_modules"] / total_modules * 100
            if total_modules > 0 else 0
        )
        
        comment_ratio = (
            self.results["comment_lines"] / self.results["total_lines"] * 100
            if self.results["total_lines"] > 0 else 0
        )
        
        # Overall documentation score
        overall_score = (
            function_coverage * 0.4 +
            class_coverage * 0.3 +
            module_coverage * 0.2 +
            min(comment_ratio * 5, 10)  # Cap comment contribution at 10%
        )
        
        return {
            "function_coverage": round(function_coverage, 2),
            "class_coverage": round(class_coverage, 2),
            "module_coverage": round(module_coverage, 2),
            "comment_ratio": round(comment_ratio, 2),
            "overall_score": round(overall_score, 2)
        }
    
    async def run(self) -> Dict[str, Any]:
        """Run the complete documentation analysis"""
        file_results = []
        
        for py_file in self.repo_path.rglob("*.py"):
            if "__pycache__" in str(py_file):
                continue
            
            result = await self.analyze_file(py_file)
            file_results.append(result)
        
        readme_info = await self.analyze_readme()
        coverage = await self.calculate_coverage()
        
        return {
            "coverage": coverage,
            "readme": readme_info,
            "summary": {
                "documented_functions": self.results["documented_functions"],
                "undocumented_functions": self.results["undocumented_functions"],
                "documented_classes": self.results["documented_classes"],
                "undocumented_classes": self.results["undocumented_classes"],
                "documented_modules": self.results["documented_modules"],
                "undocumented_modules": self.results["undocumented_modules"]
            },
            "files": file_results
        }

async def analyze_documentation(repo_path: str) -> Dict[str, Any]:
    """Main entry point for documentation analysis"""
    analyzer = DocumentationAnalyzer(repo_path)
    return await analyzer.run()`,
                path: 'backend/analyzers/documentation.py'
            },
            'backend/analyzers/yagni_detector.py': {
                content: `"""
YAGNI (You Aren't Gonna Need It) Detector
Identifies over-engineering, dead code, and unnecessary abstractions
"""

import ast
import os
from typing import Dict, List, Set, Any
from pathlib import Path
import asyncio
from collections import defaultdict

class YAGNIDetector:
    """Detect over-engineering and unnecessary code"""
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.unused_functions = []
        self.unused_classes = []
        self.unused_variables = []
        self.single_use_abstractions = []
        self.over_engineered_patterns = []
        self.dead_code_blocks = []
        
        # Track usage
        self.function_calls = defaultdict(int)
        self.class_instantiations = defaultdict(int)
        self.variable_usage = defaultdict(int)
        self.defined_functions = set()
        self.defined_classes = set()
        self.defined_variables = set()
    
    async def analyze_file(self, file_path: Path) -> Dict[str, Any]:
        """Analyze a single file for YAGNI violations"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                tree = ast.parse(content)
            
            file_name = str(file_path.relative_to(self.repo_path))
            
            # First pass: collect definitions
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef) or isinstance(node, ast.AsyncFunctionDef):
                    self.defined_functions.add(f"{file_name}:{node.name}")
                elif isinstance(node, ast.ClassDef):
                    self.defined_classes.add(f"{file_name}:{node.name}")
                elif isinstance(node, ast.Assign):
                    for target in node.targets:
                        if isinstance(target, ast.Name):
                            self.defined_variables.add(f"{file_name}:{target.id}")
            
            # Second pass: track usage
            for node in ast.walk(tree):
                if isinstance(node, ast.Call):
                    if isinstance(node.func, ast.Name):
                        self.function_calls[node.func.id] += 1
                    elif isinstance(node.func, ast.Attribute):
                        self.function_calls[node.func.attr] += 1
                
                elif isinstance(node, ast.Name) and isinstance(node.ctx, ast.Load):
                    # Track variable/class usage
                    self.variable_usage[node.id] += 1
            
            # Detect patterns
            yagni_issues = {
                "file": file_name,
                "issues": []
            }
            
            # Check for single implementation interfaces
            interfaces = self.detect_single_implementation_interfaces(tree, file_name)
            if interfaces:
                yagni_issues["issues"].extend(interfaces)
            
            # Check for unnecessary abstractions
            abstractions = self.detect_unnecessary_abstractions(tree, file_name)
            if abstractions:
                yagni_issues["issues"].extend(abstractions)
            
            # Check for premature optimization
            optimizations = self.detect_premature_optimization(tree, file_name)
            if optimizations:
                yagni_issues["issues"].extend(optimizations)
            
            return yagni_issues
        
        except Exception as e:
            return {
                "file": str(file_path.relative_to(self.repo_path)),
                "error": str(e)
            }
    
    def detect_single_implementation_interfaces(self, tree: ast.AST, file_name: str) -> List[Dict[str, Any]]:
        """Detect interfaces/abstract classes with only one implementation"""
        issues = []
        
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                # Check if it's an abstract class or interface-like
                is_abstract = any(
                    isinstance(base, ast.Name) and 'ABC' in base.id
                    for base in node.bases if isinstance(base, ast.Name)
                )
                
                if is_abstract:
                    # Check for abstract methods
                    abstract_methods = []
                    for item in node.body:
                        if isinstance(item, ast.FunctionDef):
                            for decorator in item.decorator_list:
                                if isinstance(decorator, ast.Name) and 'abstract' in decorator.id:
                                    abstract_methods.append(item.name)
                    
                    if abstract_methods:
                        issues.append({
                            "type": "single_implementation_interface",
                            "class": node.name,
                            "line": node.lineno,
                            "severity": "medium",
                            "message": f"Abstract class '{node.name}' might be over-engineering if it has only one implementation"
                        })
        
        return issues
    
    def detect_unnecessary_abstractions(self, tree: ast.AST, file_name: str) -> List[Dict[str, Any]]:
        """Detect unnecessary abstraction layers"""
        issues = []
        
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                # Check for wrapper classes that just delegate
                delegation_count = 0
                total_methods = 0
                
                for item in node.body:
                    if isinstance(item, ast.FunctionDef) and not item.name.startswith('__'):
                        total_methods += 1
                        
                        # Check if method just delegates to another object
                        if len(item.body) == 1:
                            stmt = item.body[0]
                            if isinstance(stmt, ast.Return) and isinstance(stmt.value, ast.Call):
                                if isinstance(stmt.value.func, ast.Attribute):
                                    delegation_count += 1
                
                if total_methods > 0 and delegation_count / total_methods > 0.8:
                    issues.append({
                        "type": "unnecessary_wrapper",
                        "class": node.name,
                        "line": node.lineno,
                        "severity": "low",
                        "message": f"Class '{node.name}' appears to be mostly delegating calls, consider if this abstraction is necessary"
                    })
        
        return issues
    
    def detect_premature_optimization(self, tree: ast.AST, file_name: str) -> List[Dict[str, Any]]:
        """Detect potential premature optimizations"""
        issues = []
        
        for node in ast.walk(tree):
            # Check for caching without clear need
            if isinstance(node, ast.FunctionDef):
                for decorator in node.decorator_list:
                    if isinstance(decorator, ast.Name) and 'cache' in decorator.id.lower():
                        # Check if function is simple (low complexity)
                        if len(node.body) < 5:  # Simple heuristic
                            issues.append({
                                "type": "premature_caching",
                                "function": node.name,
                                "line": node.lineno,
                                "severity": "low",
                                "message": f"Function '{node.name}' uses caching but appears simple - might be premature optimization"
                            })
            
            # Check for complex data structures for simple use cases
            if isinstance(node, ast.Assign):
                if isinstance(node.value, ast.Call):
                    if isinstance(node.value.func, ast.Name):
                        if node.value.func.id in ['OrderedDict', 'deque', 'ChainMap']:
                            issues.append({
                                "type": "complex_data_structure",
                                "line": node.lineno,
                                "severity": "low",
                                "message": f"Using {node.value.func.id} - ensure this complexity is needed"
                            })
        
        return issues
    
    def detect_dead_code(self) -> List[Dict[str, Any]]:
        """Identify potentially dead code"""
        dead_code = []
        
        # Find unused functions
        for func in self.defined_functions:
            func_name = func.split(':')[1]
            if func_name not in ['__init__', '__str__', '__repr__', 'main']:
                if self.function_calls[func_name] == 0:
                    dead_code.append({
                        "type": "unused_function",
                        "identifier": func,
                        "severity": "medium"
                    })
        
        # Find unused classes
        for cls in self.defined_classes:
            cls_name = cls.split(':')[1]
            if self.variable_usage[cls_name] == 0:
                dead_code.append({
                    "type": "unused_class",
                    "identifier": cls,
                    "severity": "medium"
                })
        
        return dead_code
    
    async def calculate_yagni_score(self, all_issues: List[Dict[str, Any]]) -> float:
        """Calculate overall YAGNI score (0-100, higher is better)"""
        total_issues = sum(len(file_result.get("issues", [])) for file_result in all_issues)
        
        # Weight by severity
        severity_weights = {"high": 3, "medium": 2, "low": 1}
        weighted_issues = 0
        
        for file_result in all_issues:
            for issue in file_result.get("issues", []):
                weighted_issues += severity_weights.get(issue.get("severity", "low"), 1)
        
        # Calculate score (inverse of issues, normalized to 0-100)
        # Assume 50 weighted issues = 0 score, 0 issues = 100 score
        score = max(0, 100 - (weighted_issues * 2))
        
        return score
    
    async def run(self) -> Dict[str, Any]:
        """Run the complete YAGNI detection"""
        file_results = []
        
        # Analyze all Python files
        for py_file in self.repo_path.rglob("*.py"):
            if "__pycache__" in str(py_file) or "test_" in py_file.name:
                continue
            
            result = await self.analyze_file(py_file)
            if result.get("issues"):
                file_results.append(result)
        
        # Detect dead code across all files
        dead_code = self.detect_dead_code()
        
        # Calculate overall score
        yagni_score = await self.calculate_yagni_score(file_results)
        
        return {
            "score": round(yagni_score, 2),
            "total_issues": sum(len(f.get("issues", [])) for f in file_results),
            "dead_code": dead_code,
            "files_with_issues": file_results,
            "summary": {
                "unused_functions": len([d for d in dead_code if d["type"] == "unused_function"]),
                "unused_classes": len([d for d in dead_code if d["type"] == "unused_class"]),
                "single_implementations": sum(
                    1 for f in file_results 
                    for i in f.get("issues", []) 
                    if i["type"] == "single_implementation_interface"
                ),
                "unnecessary_wrappers": sum(
                    1 for f in file_results 
                    for i in f.get("issues", []) 
                    if i["type"] == "unnecessary_wrapper"
                )
            }
        }

async def detect_yagni(repo_path: str) -> Dict[str, Any]:
    """Main entry point for YAGNI detection"""
    detector = YAGNIDetector(repo_path)
    return await detector.run()`,
                path: 'backend/analyzers/yagni_detector.py'
            },
            'backend/models/__init__.py': {
                content: `"""Data models for Repository Starship"""

from .repository import Repository, Module, Metrics

__all__ = ["Repository", "Module", "Metrics"]`,
                path: 'backend/models/__init__.py'
            },
            'backend/models/repository.py': {
                content: `"""
Repository data models
"""

from pydantic import BaseModel, Field, HttpUrl
from typing import List, Dict, Any, Optional
from datetime import datetime
from enum import Enum

class ModuleType(str, Enum):
    """Module type enumeration"""
    CORE = "core"
    MODULE = "module"
    UTILITY = "utility"
    TEST = "test"
    CONFIG = "config"

class HealthStatus(str, Enum):
    """Health status enumeration"""
    CRITICAL = "critical"
    WARNING = "warning"
    HEALTHY = "healthy"
    OPTIMAL = "optimal"

class Module(BaseModel):
    """Repository module model"""
    id: str
    name: str
    path: str
    size: int = Field(description="Lines of code")
    health: float = Field(ge=0, le=1, description="Health score 0-1")
    type: ModuleType
    complexity: Optional[float] = None
    coverage: Optional[float] = None
    dependencies: List[str] = []
    maintainers: List[str] = []
    last_modified: Optional[datetime] = None
    
    # 3D positioning
    x: float = 0
    y: float = 0
    z: float = 0
    
    def get_health_status(self) -> HealthStatus:
        """Get health status based on health score"""
        if self.health < 0.3:
            return HealthStatus.CRITICAL
        elif self.health < 0.6:
            return HealthStatus.WARNING
        elif self.health < 0.85:
            return HealthStatus.HEALTHY
        else:
            return HealthStatus.OPTIMAL

class Vulnerability(BaseModel):
    """Security vulnerability model"""
    severity: str
    package: str
    version: str
    description: str
    cve: Optional[str] = None
    fix_version: Optional[str] = None

class Metrics(BaseModel):
    """Repository metrics model"""
    complexity: float = Field(ge=0, le=100)
    coverage: float = Field(ge=0, le=100)
    documentation: float = Field(ge=0, le=100)
    yagni: float = Field(ge=0, le=100)
    dependencies: int = Field(ge=0)
    tech_debt: float = Field(ge=0, le=100)
    vulnerabilities: Dict[str, int] = {
        "critical": 0,
        "high": 0,
        "medium": 0,
        "low": 0
    }
    
    # Additional metrics
    build_time: Optional[float] = None
    bundle_size: Optional[int] = None
    test_count: Optional[int] = None
    code_smells: Optional[int] = None
    duplications: Optional[float] = None
    
    timestamp: datetime = Field(default_factory=datetime.now)

class Repository(BaseModel):
    """Repository model"""
    id: str
    name: str
    url: HttpUrl
    branch: str = "main"
    
    # Structure
    modules: List[Module] = []
    
    # Metrics
    metrics: Metrics
    
    # Metadata
    language: str = "python"
    stars: Optional[int] = None
    forks: Optional[int] = None
    contributors: List[str] = []
    last_commit: Optional[datetime] = None
    created_at: Optional[datetime] = None
    analyzed_at: datetime = Field(default_factory=datetime.now)
    
    # Analysis results
    issues: List[Dict[str, Any]] = []
    recommendations: List[str] = []
    
    def get_overall_health(self) -> float:
        """Calculate overall repository health"""
        if not self.modules:
            return 0.0
        
        total_health = sum(module.health * module.size for module in self.modules)
        total_size = sum(module.size for module in self.modules)
        
        return total_health / total_size if total_size > 0 else 0.0
    
    def get_critical_modules(self) -> List[Module]:
        """Get modules with critical health status"""
        return [
            module for module in self.modules 
            if module.get_health_status() == HealthStatus.CRITICAL
        ]
    
    class Config:
        """Model configuration"""
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }`,
                path: 'backend/models/repository.py'
            },
            // Root configuration files
            'docker-compose.yml': {
                content: `version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      - API_HOST=0.0.0.0