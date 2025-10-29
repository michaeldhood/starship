"""
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
    return await analyzer.run()