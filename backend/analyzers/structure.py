"""
Structure Analysis Module
Analyzes the file system structure and maps it to 3D coordinates for visualization
"""

import os
from pathlib import Path
from typing import List, Dict, Any, Optional
import math
import random

class StructureAnalyzer:
    """Analyze repository structure and generate 3D modules"""
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.modules = []
        
    async def analyze_structure(self) -> List[Dict[str, Any]]:
        """Analyze the repository structure"""
        # Reset modules
        self.modules = []
        
        # Add core module (root)
        core_size = await self._calculate_dir_size(self.repo_path)
        self.modules.append({
            "id": "root",
            "name": self.repo_path.name,
            "path": "/",
            "size": core_size,
            "health": 1.0,  # Placeholder, will be updated by other analyzers
            "type": "core",
            "x": 0, "y": 0, "z": 0,
            "dependencies": []
        })
        
        # Analyze top-level directories as modules
        await self._analyze_directory(self.repo_path, depth=0)
        
        return self.modules
    
    async def _calculate_dir_size(self, path: Path) -> int:
        """Calculate total lines of code in a directory"""
        total_loc = 0
        try:
            for root, _, files in os.walk(path):
                if any(part.startswith('.') or part == '__pycache__' for part in Path(root).parts):
                    continue
                    
                for file in files:
                    if file.endswith(('.py', '.js', '.ts', '.tsx', '.jsx', '.html', '.css')):
                        try:
                            with open(os.path.join(root, file), 'r', encoding='utf-8', errors='ignore') as f:
                                total_loc += sum(1 for _ in f)
                        except Exception:
                            pass
        except Exception:
            pass
        return total_loc
    
    async def _analyze_directory(self, path: Path, depth: int):
        """Recursively analyze directories"""
        # Only look at top-level directories for the "modules"
        if depth > 1:
            return
            
        try:
            # Get all subdirectories
            subdirs = [
                d for d in path.iterdir() 
                if d.is_dir() 
                and not d.name.startswith('.') 
                and d.name != '__pycache__'
                and d.name != 'node_modules'
                and d.name != 'venv'
            ]
            
            # Calculate positions based on a sphere/orbit layout
            count = len(subdirs)
            radius = 5 * (depth + 1)
            
            for i, subdir in enumerate(subdirs):
                # Calculate position
                phi = math.acos(-1 + (2 * i) / max(count, 1))
                theta = math.sqrt(count * math.pi) * phi
                
                x = radius * math.cos(theta) * math.sin(phi)
                y = radius * math.sin(theta) * math.sin(phi)
                z = radius * math.cos(phi)
                
                # Add randomness
                x += random.uniform(-1, 1)
                y += random.uniform(-1, 1)
                z += random.uniform(-1, 1)
                
                size = await self._calculate_dir_size(subdir)
                if size == 0:
                    continue
                    
                module_type = "module"
                if subdir.name in ['api', 'core', 'lib', 'utils']:
                    module_type = "utility"
                elif subdir.name in ['tests', 'test']:
                    module_type = "test"
                elif subdir.name in ['config', 'settings']:
                    module_type = "config"
                
                self.modules.append({
                    "id": str(subdir.relative_to(self.repo_path)),
                    "name": subdir.name,
                    "path": str(subdir.relative_to(self.repo_path)),
                    "size": size,
                    "health": 0.8,  # Default health
                    "type": module_type,
                    "x": float(x),
                    "y": float(y),
                    "z": float(z),
                    "dependencies": []
                })
                
                # Recurse
                await self._analyze_directory(subdir, depth + 1)
                
        except Exception as e:
            print(f"Error analyzing structure: {e}")

async def analyze_structure(repo_path: str) -> List[Dict[str, Any]]:
    """Main entry point for structure analysis"""
    analyzer = StructureAnalyzer(repo_path)
    return await analyzer.analyze_structure()
