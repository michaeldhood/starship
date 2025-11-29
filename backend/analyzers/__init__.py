"""
Repository analysis modules
"""

import os
from pathlib import Path
from typing import Dict, List, Any
from collections import defaultdict
import math

from .complexity import analyze_complexity
from .dependencies import analyze_dependencies
from .documentation import analyze_documentation
from .yagni_detector import detect_yagni

def _is_local_path(path: str) -> bool:
    """Check if the path is a local file system path"""
    return os.path.exists(path) or not path.startswith(('http://', 'https://', 'git@'))

def _get_repo_path(repo_url: str) -> Path:
    """Get the repository path - either local path or backend directory for local analysis"""
    if _is_local_path(repo_url):
        return Path(repo_url)
    # For remote repos, we'd clone them, but for now analyze the backend itself
    # This handles the case where we want to analyze the local starship repo
    return Path(__file__).parent.parent

def _generate_3d_positions(modules: List[Dict[str, Any]], center: tuple = (0, 0, 0)) -> List[Dict[str, Any]]:
    """Generate 3D positions for modules in a sphere around center"""
    if not modules:
        return modules
    
    count = len(modules)
    radius = max(5, count * 0.8)  # Dynamic radius based on module count
    
    # Distribute modules on a sphere
    for i, module in enumerate(modules):
        # Golden angle spiral for even distribution
        theta = 2 * math.pi * i * 0.618034  # Golden angle
        phi = math.acos(1 - 2 * (i + 0.5) / count) if count > 1 else math.pi / 2
        
        # Convert to cartesian coordinates
        x = radius * math.sin(phi) * math.cos(theta)
        y = radius * math.sin(phi) * math.sin(theta)
        z = radius * math.cos(phi)
        
        # Scale by module size (larger modules closer to center)
        size_factor = 1 - (module.get("size", 0) / max(m.get("size", 1) for m in modules)) * 0.3
        module["x"] = round(x * size_factor + center[0], 2)
        module["y"] = round(y * size_factor + center[1], 2)
        module["z"] = round(z * size_factor + center[2], 2)
    
    return modules

def _calculate_module_health(complexity_score: float, doc_score: float, yagni_score: float) -> float:
    """Calculate module health score (0-1)"""
    # Normalize scores to 0-1 range
    complexity_norm = max(0, min(1, complexity_score / 100))
    doc_norm = max(0, min(1, doc_score / 100))
    yagni_norm = max(0, min(1, yagni_score / 100))
    
    # Weighted average (complexity is inverse - lower is better)
    health = (doc_norm * 0.4 + yagni_norm * 0.3 + (1 - complexity_norm) * 0.3)
    return round(health, 2)

async def analyze_repository(repo_url: str, branch: str = "main", depth: int = 1):
    """
    Main repository analysis function
    Analyzes the repository using all available analyzers
    """
    repo_path = _get_repo_path(repo_url)
    
    # Run all analyzers in parallel
    complexity_result = await analyze_complexity(str(repo_path))
    dependencies_result = await analyze_dependencies(str(repo_path))
    documentation_result = await analyze_documentation(str(repo_path))
    yagni_result = await detect_yagni(str(repo_path))
    
    # Extract metrics
    complexity_summary = complexity_result.get("summary", {})
    dep_metrics = dependencies_result.get("metrics", {})
    doc_coverage = documentation_result.get("coverage", {})
    yagni_score = yagni_result.get("score", 0)
    
    # Aggregate metrics
    metrics = {
        "complexity": complexity_summary.get("complexity_score", 0),
        "coverage": 0,  # Would need test coverage tool
        "documentation": doc_coverage.get("overall_score", 0),
        "yagni": yagni_score,
        "dependencies": dep_metrics.get("unique_external_dependencies", 0),
        "tech_debt": max(0, 100 - (complexity_summary.get("complexity_score", 0) * 0.5 + doc_coverage.get("overall_score", 0) * 0.5)),
        "vulnerabilities": {
            "critical": 0,
            "high": 0,
            "medium": 0,
            "low": 0
        }
    }
    
    # Build module structure from directory analysis
    modules = []
    module_data = defaultdict(lambda: {
        "files": [],
        "complexity_details": [],
        "doc_details": [],
        "size": 0
    })
    
    # Group files by top-level directory
    for py_file in repo_path.rglob("*.py"):
        if "__pycache__" in str(py_file) or "test_" in py_file.name or "venv" in str(py_file):
            continue
        
        rel_path = py_file.relative_to(repo_path)
        
        # Determine module name: use first directory if exists, otherwise use filename without extension
        if len(rel_path.parts) > 1:
            top_level = rel_path.parts[0]
        else:
            # File in root - use filename without extension as module name
            top_level = rel_path.stem if rel_path.stem != "__init__" else "root"
        
        # Count lines
        try:
            with open(py_file, 'r', encoding='utf-8') as f:
                lines = len(f.readlines())
                module_data[top_level]["size"] += lines
                module_data[top_level]["files"].append(str(rel_path))
        except Exception:
            pass
    
    # Get complexity and documentation per module
    complexity_details = complexity_result.get("details", [])
    doc_files = documentation_result.get("files", [])
    
    # Map files to modules
    for detail in complexity_details:
        file_path = detail.get("file", "")
        top_level = file_path.split("/")[0] if "/" in file_path else "root"
        if top_level in module_data:
            module_data[top_level]["complexity_details"].append(detail)
    
    for doc_file in doc_files:
        file_path = doc_file.get("file", "")
        top_level = file_path.split("/")[0] if "/" in file_path else "root"
        if top_level in module_data:
            module_data[top_level]["doc_details"].append(doc_file)
    
    # Create module entries
    for module_name, data in module_data.items():
        # Calculate module-specific metrics
        module_complexity = 0
        if data["complexity_details"]:
            total_cc = sum(
                sum(f.get("complexity", 0) for f in detail.get("cyclomatic_complexity", []))
                for detail in data["complexity_details"]
            )
            module_complexity = min(100, max(0, 100 - (total_cc / len(data["complexity_details"]) * 5)))
        
        module_doc = 0
        if data["doc_details"]:
            doc_scores = [
                detail.get("functions", [])
                for detail in data["doc_details"]
            ]
            # Simplified: use overall documentation score
            module_doc = doc_coverage.get("overall_score", 0)
        
        module_yagni = yagni_score  # Use overall for now
        
        health = _calculate_module_health(module_complexity, module_doc, module_yagni)
        
        # Determine module type
        module_type = "core" if module_name in ["api", "analyzers", "models"] else "module"
        
        modules.append({
            "id": module_name,
            "name": module_name,
            "size": data["size"],
            "health": health,
            "type": module_type
        })
    
    # Generate 3D positions
    modules = _generate_3d_positions(modules)
    
    return {
        "metrics": metrics,
        "structure": modules
    }

__all__ = [
    "analyze_complexity",
    "analyze_dependencies", 
    "analyze_documentation",
    "detect_yagni",
    "analyze_repository"
]