'use client';

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
  const [repoUrl, setRepoUrl] = useState('/workspace');

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

    // Trigger initial analysis
    analyzeRepository('/workspace');

    return () => {
      newSocket.close();
    };
  }, []);

  const analyzeRepository = async (urlOverride?: string) => {
    try {
      setLoading(true);
      const urlToAnalyze = urlOverride || repoUrl;
      const response = await axios.post('http://localhost:8000/api/analyze', {
        repo_url: urlToAnalyze
      });
      
      // Update state with real data
      if (response.data && response.data.data) {
        setRepoStructure(response.data.data.structure);
        setMetrics(response.data.data.metrics);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to analyze repository:', error);
      setLoading(false);
      // Fallback to mock data if API fails (for demo purposes)
      loadMockData();
    }
  };

  const loadMockData = () => {
    // Mock data for fallback
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
    ]);
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
            onClick={() => analyzeRepository()}
            className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-cyan-400 rounded transition-colors"
          >
            ANALYZE
          </button>
        </div>
      </div>
    </main>
  );
}
