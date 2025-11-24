"""
Repository analysis modules
"""

import os
import shutil
import tempfile
from pathlib import Path
import asyncio

from .complexity import analyze_complexity
from .dependencies import analyze_dependencies
from .documentation import analyze_documentation
from .yagni_detector import detect_yagni
from .structure import analyze_structure

async def analyze_repository(repo_url: str, branch: str = "main", depth: int = 1):
    """
    Main repository analysis function
    """
    repo_path = None
    is_temp = False
    
    try:
        # Determine if it's a URL or local path
        if repo_url.startswith("http") or repo_url.startswith("git@"):
            # In a real app, we would clone the repo here
            # For now, we'll simulate by analyzing the current workspace if the URL matches
            # or create a temp directory and clone if we had git access
            repo_path = Path("/workspace") # Fallback to workspace for demo
            # is_temp = True # Only set true if we actually cloned to a temp dir
        else:
            repo_path = Path(repo_url)
            if not repo_path.exists():
                # Fallback to workspace
                repo_path = Path("/workspace")

        # Run analyzers in parallel
        complexity_task = analyze_complexity(str(repo_path))
        dependencies_task = analyze_dependencies(str(repo_path))
        documentation_task = analyze_documentation(str(repo_path))
        yagni_task = detect_yagni(str(repo_path))
        structure_task = analyze_structure(str(repo_path))
        
        # Wait for all tasks
        complexity_results, dependency_results, doc_results, yagni_results, structure_results = await asyncio.gather(
            complexity_task,
            dependencies_task,
            documentation_task,
            yagni_task,
            structure_task
        )
        
        # Aggregate metrics
        metrics = {
            "complexity": complexity_results.get("summary", {}).get("complexity_score", 0),
            "coverage": 0, # Placeholder - needs test coverage tool integration
            "documentation": doc_results.get("score", 0),
            "yagni": yagni_results.get("score", 0),
            "dependencies": dependency_results.get("metrics", {}).get("total_imports", 0),
            "tech_debt": (100 - complexity_results.get("summary", {}).get("complexity_score", 100)) * 0.5 + (100 - doc_results.get("score", 100)) * 0.5,
            "vulnerabilities": {
                "critical": 0,
                "high": 0,
                "medium": 0,
                "low": 0
            }
        }
        
        # Integrate health scores into structure
        for module in structure_results:
            # Try to match module path to complexity results
            # This is a simplified matching strategy
            module_path = module["path"]
            
            # Find complexity for this module (if it's a directory)
            module_complexity = 0
            file_count = 0
            
            for file_res in complexity_results.get("details", []):
                if file_res.get("file", "").startswith(module_path):
                    module_complexity += file_res.get("maintainability_index", 0)
                    file_count += 1
            
            avg_mi = module_complexity / file_count if file_count > 0 else 100
            
            # Calculate health based on Maintainability Index (MI)
            # MI > 75 is green (1.0), < 50 is red (0.0)
            health = max(0.0, min(1.0, (avg_mi - 50) / 50))
            module["health"] = health
        
        return {
            "metrics": metrics,
            "structure": structure_results,
            "details": {
                "complexity": complexity_results,
                "dependencies": dependency_results,
                "documentation": doc_results,
                "yagni": yagni_results
            }
        }
        
    except Exception as e:
        print(f"Analysis failed: {e}")
        raise e
    finally:
        if is_temp and repo_path and repo_path.exists():
            shutil.rmtree(repo_path)

__all__ = [
    "analyze_complexity",
    "analyze_dependencies", 
    "analyze_documentation",
    "detect_yagni",
    "analyze_structure",
    "analyze_repository"
]
