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
  const [repoUrl, setRepoUrl] = useState('');

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
      { id: 'database', name: 'database', size: 100, health: 0.85, x: 0, y: -3, z: 2, type: 'module' },
      { id: 'ui', name: 'ui-components', size: 140, health: 0.4, x: -2, y: -1, z: -3, type: 'module' },
      { id: 'utils', name: 'utils', size: 60, health: 0.95, x: 4, y: 3, z: 2, type: 'module' },
    ]);

    setLoading(false);
  };

  const analyzeLocalRepository = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/analyze/local');
      
      // Transform metrics to match frontend expectations
      const metricsData = response.data.metrics || {};
      setMetrics({
        complexity: metricsData.complexity || 0,
        coverage: metricsData.coverage || 0,
        documentation: metricsData.documentation || 0,
        yagni: metricsData.yagni || 0,
        dependencies: metricsData.dependencies || 0,
        techDebt: metricsData.tech_debt || 0,
        vulnerabilities: metricsData.vulnerabilities || { critical: 0, high: 0, medium: 0, low: 0 }
      });
      
      setRepoStructure(response.data.structure || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to analyze local repository:', error);
      // Fallback to mock data if API fails
      loadMockData();
    }
  };

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

    // Analyze local repository on startup
    analyzeLocalRepository();

    return () => {
      newSocket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const analyzeRepository = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/analyze', {
        repo_url: repoUrl
      });
      
      // Transform metrics to match frontend expectations
      const metricsData = response.data.metrics || {};
      setMetrics({
        complexity: metricsData.complexity || 0,
        coverage: metricsData.coverage || 0,
        documentation: metricsData.documentation || 0,
        yagni: metricsData.yagni || 0,
        dependencies: metricsData.dependencies || 0,
        techDebt: metricsData.tech_debt || 0,
        vulnerabilities: metricsData.vulnerabilities || { critical: 0, high: 0, medium: 0, low: 0 }
      });
      
      setRepoStructure(response.data.structure || []);
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
}