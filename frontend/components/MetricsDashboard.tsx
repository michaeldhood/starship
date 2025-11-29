'use client';

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
              className={`h-full ${getBarColor(metrics.complexity, true)} transition-all duration-500`}
              style={{ width: `${metrics.complexity}%` }}
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
              style={{ width: `${metrics.coverage}%` }}
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
              style={{ width: `${metrics.documentation}%` }}
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
              style={{ width: `${metrics.yagni}%` }}
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
              style={{ width: `${metrics.techDebt}%` }}
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
}