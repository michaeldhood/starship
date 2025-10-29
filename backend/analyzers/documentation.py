"""
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
    return await analyzer.run()