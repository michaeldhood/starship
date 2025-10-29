"""
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
    return await analyzer.run()