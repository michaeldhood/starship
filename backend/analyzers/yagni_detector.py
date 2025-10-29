"""
YAGNI (You Aren't Gonna Need It) Detector
Identifies over-engineering, dead code, and unnecessary abstractions
"""

import ast
import os
from typing import Dict, List, Set, Any
from pathlib import Path
import asyncio
from collections import defaultdict

class YAGNIDetector:
    """Detect over-engineering and unnecessary code"""
    
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.unused_functions = []
        self.unused_classes = []
        self.unused_variables = []
        self.single_use_abstractions = []
        self.over_engineered_patterns = []
        self.dead_code_blocks = []
        
        # Track usage
        self.function_calls = defaultdict(int)
        self.class_instantiations = defaultdict(int)
        self.variable_usage = defaultdict(int)
        self.defined_functions = set()
        self.defined_classes = set()
        self.defined_variables = set()
    
    async def analyze_file(self, file_path: Path) -> Dict[str, Any]:
        """Analyze a single file for YAGNI violations"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                tree = ast.parse(content)
            
            file_name = str(file_path.relative_to(self.repo_path))
            
            # First pass: collect definitions
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef) or isinstance(node, ast.AsyncFunctionDef):
                    self.defined_functions.add(f"{file_name}:{node.name}")
                elif isinstance(node, ast.ClassDef):
                    self.defined_classes.add(f"{file_name}:{node.name}")
                elif isinstance(node, ast.Assign):
                    for target in node.targets:
                        if isinstance(target, ast.Name):
                            self.defined_variables.add(f"{file_name}:{target.id}")
            
            # Second pass: track usage
            for node in ast.walk(tree):
                if isinstance(node, ast.Call):
                    if isinstance(node.func, ast.Name):
                        self.function_calls[node.func.id] += 1
                    elif isinstance(node.func, ast.Attribute):
                        self.function_calls[node.func.attr] += 1
                
                elif isinstance(node, ast.Name) and isinstance(node.ctx, ast.Load):
                    # Track variable/class usage
                    self.variable_usage[node.id] += 1
            
            # Detect patterns
            yagni_issues = {
                "file": file_name,
                "issues": []
            }
            
            # Check for single implementation interfaces
            interfaces = self.detect_single_implementation_interfaces(tree, file_name)
            if interfaces:
                yagni_issues["issues"].extend(interfaces)
            
            # Check for unnecessary abstractions
            abstractions = self.detect_unnecessary_abstractions(tree, file_name)
            if abstractions:
                yagni_issues["issues"].extend(abstractions)
            
            # Check for premature optimization
            optimizations = self.detect_premature_optimization(tree, file_name)
            if optimizations:
                yagni_issues["issues"].extend(optimizations)
            
            return yagni_issues
        
        except Exception as e:
            return {
                "file": str(file_path.relative_to(self.repo_path)),
                "error": str(e)
            }
    
    def detect_single_implementation_interfaces(self, tree: ast.AST, file_name: str) -> List[Dict[str, Any]]:
        """Detect interfaces/abstract classes with only one implementation"""
        issues = []
        
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                # Check if it's an abstract class or interface-like
                is_abstract = any(
                    isinstance(base, ast.Name) and 'ABC' in base.id
                    for base in node.bases if isinstance(base, ast.Name)
                )
                
                if is_abstract:
                    # Check for abstract methods
                    abstract_methods = []
                    for item in node.body:
                        if isinstance(item, ast.FunctionDef):
                            for decorator in item.decorator_list:
                                if isinstance(decorator, ast.Name) and 'abstract' in decorator.id:
                                    abstract_methods.append(item.name)
                    
                    if abstract_methods:
                        issues.append({
                            "type": "single_implementation_interface",
                            "class": node.name,
                            "line": node.lineno,
                            "severity": "medium",
                            "message": f"Abstract class '{node.name}' might be over-engineering if it has only one implementation"
                        })
        
        return issues
    
    def detect_unnecessary_abstractions(self, tree: ast.AST, file_name: str) -> List[Dict[str, Any]]:
        """Detect unnecessary abstraction layers"""
        issues = []
        
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                # Check for wrapper classes that just delegate
                delegation_count = 0
                total_methods = 0
                
                for item in node.body:
                    if isinstance(item, ast.FunctionDef) and not item.name.startswith('__'):
                        total_methods += 1
                        
                        # Check if method just delegates to another object
                        if len(item.body) == 1:
                            stmt = item.body[0]
                            if isinstance(stmt, ast.Return) and isinstance(stmt.value, ast.Call):
                                if isinstance(stmt.value.func, ast.Attribute):
                                    delegation_count += 1
                
                if total_methods > 0 and delegation_count / total_methods > 0.8:
                    issues.append({
                        "type": "unnecessary_wrapper",
                        "class": node.name,
                        "line": node.lineno,
                        "severity": "low",
                        "message": f"Class '{node.name}' appears to be mostly delegating calls, consider if this abstraction is necessary"
                    })
        
        return issues
    
    def detect_premature_optimization(self, tree: ast.AST, file_name: str) -> List[Dict[str, Any]]:
        """Detect potential premature optimizations"""
        issues = []
        
        for node in ast.walk(tree):
            # Check for caching without clear need
            if isinstance(node, ast.FunctionDef):
                for decorator in node.decorator_list:
                    if isinstance(decorator, ast.Name) and 'cache' in decorator.id.lower():
                        # Check if function is simple (low complexity)
                        if len(node.body) < 5:  # Simple heuristic
                            issues.append({
                                "type": "premature_caching",
                                "function": node.name,
                                "line": node.lineno,
                                "severity": "low",
                                "message": f"Function '{node.name}' uses caching but appears simple - might be premature optimization"
                            })
            
            # Check for complex data structures for simple use cases
            if isinstance(node, ast.Assign):
                if isinstance(node.value, ast.Call):
                    if isinstance(node.value.func, ast.Name):
                        if node.value.func.id in ['OrderedDict', 'deque', 'ChainMap']:
                            issues.append({
                                "type": "complex_data_structure",
                                "line": node.lineno,
                                "severity": "low",
                                "message": f"Using {node.value.func.id} - ensure this complexity is needed"
                            })
        
        return issues
    
    def detect_dead_code(self) -> List[Dict[str, Any]]:
        """Identify potentially dead code"""
        dead_code = []
        
        # Find unused functions
        for func in self.defined_functions:
            func_name = func.split(':')[1]
            if func_name not in ['__init__', '__str__', '__repr__', 'main']:
                if self.function_calls[func_name] == 0:
                    dead_code.append({
                        "type": "unused_function",
                        "identifier": func,
                        "severity": "medium"
                    })
        
        # Find unused classes
        for cls in self.defined_classes:
            cls_name = cls.split(':')[1]
            if self.variable_usage[cls_name] == 0:
                dead_code.append({
                    "type": "unused_class",
                    "identifier": cls,
                    "severity": "medium"
                })
        
        return dead_code
    
    async def calculate_yagni_score(self, all_issues: List[Dict[str, Any]]) -> float:
        """Calculate overall YAGNI score (0-100, higher is better)"""
        total_issues = sum(len(file_result.get("issues", [])) for file_result in all_issues)
        
        # Weight by severity
        severity_weights = {"high": 3, "medium": 2, "low": 1}
        weighted_issues = 0
        
        for file_result in all_issues:
            for issue in file_result.get("issues", []):
                weighted_issues += severity_weights.get(issue.get("severity", "low"), 1)
        
        # Calculate score (inverse of issues, normalized to 0-100)
        # Assume 50 weighted issues = 0 score, 0 issues = 100 score
        score = max(0, 100 - (weighted_issues * 2))
        
        return score
    
    async def run(self) -> Dict[str, Any]:
        """Run the complete YAGNI detection"""
        file_results = []
        
        # Analyze all Python files
        for py_file in self.repo_path.rglob("*.py"):
            if "__pycache__" in str(py_file) or "test_" in py_file.name:
                continue
            
            result = await self.analyze_file(py_file)
            if result.get("issues"):
                file_results.append(result)
        
        # Detect dead code across all files
        dead_code = self.detect_dead_code()
        
        # Calculate overall score
        yagni_score = await self.calculate_yagni_score(file_results)
        
        return {
            "score": round(yagni_score, 2),
            "total_issues": sum(len(f.get("issues", [])) for f in file_results),
            "dead_code": dead_code,
            "files_with_issues": file_results,
            "summary": {
                "unused_functions": len([d for d in dead_code if d["type"] == "unused_function"]),
                "unused_classes": len([d for d in dead_code if d["type"] == "unused_class"]),
                "single_implementations": sum(
                    1 for f in file_results 
                    for i in f.get("issues", []) 
                    if i["type"] == "single_implementation_interface"
                ),
                "unnecessary_wrappers": sum(
                    1 for f in file_results 
                    for i in f.get("issues", []) 
                    if i["type"] == "unnecessary_wrapper"
                )
            }
        }

async def detect_yagni(repo_path: str) -> Dict[str, Any]:
    """Main entry point for YAGNI detection"""
    detector = YAGNIDetector(repo_path)
    return await detector.run()