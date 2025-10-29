'use client';

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
}