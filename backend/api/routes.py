"""
API Routes for Repository Starship
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, HttpUrl
from typing import Dict, Any, List, Optional
import asyncio

from analyzers import (
    analyze_complexity,
    analyze_dependencies,
    analyze_documentation,
    detect_yagni,
    analyze_repository
)

router = APIRouter()

class RepositoryRequest(BaseModel):
    """Repository analysis request model"""
    repo_url: HttpUrl
    branch: Optional[str] = "main"
    depth: Optional[int] = 1
    include_tests: Optional[bool] = True

class MetricsResponse(BaseModel):
    """Metrics response model"""
    complexity: float
    coverage: float
    documentation: float
    yagni: float
    dependencies: int
    tech_debt: float
    vulnerabilities: Dict[str, int]
    timestamp: str

class ModuleInfo(BaseModel):
    """Module information model"""
    id: str
    name: str
    path: str
    size: int
    health: float
    complexity: float
    coverage: float
    dependencies: List[str]
    issues: List[str]

@router.post("/analyze")
async def analyze_repository_endpoint(
    request: RepositoryRequest,
    background_tasks: BackgroundTasks
):
    """
    Analyze a repository and return metrics
    """
    try:
        # Start analysis
        result = await analyze_repository(
            str(request.repo_url),
            branch=request.branch,
            depth=request.depth
        )
        
        return {
            "status": "success",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/metrics/{repo_id}")
async def get_repository_metrics(repo_id: str):
    """
    Get cached metrics for a repository
    """
    # TODO: Implement cache lookup
    return {
        "repo_id": repo_id,
        "metrics": {
            "complexity": 72.5,
            "coverage": 87.3,
            "documentation": 65.0,
            "yagni": 28.4,
            "dependencies": 143,
            "tech_debt": 34.2,
            "vulnerabilities": {
                "critical": 0,
                "high": 1,
                "medium": 3,
                "low": 7
            }
        }
    }

@router.get("/modules/{repo_id}")
async def get_repository_modules(repo_id: str):
    """
    Get module structure for a repository
    """
    # TODO: Implement actual module analysis
    modules = [
        {
            "id": "core",
            "name": "core",
            "path": "/src/core",
            "size": 15000,
            "health": 0.9,
            "x": 0, "y": 0, "z": 0,
            "type": "core"
        },
        {
            "id": "auth",
            "name": "authentication",
            "path": "/src/auth",
            "size": 8000,
            "health": 0.7,
            "x": -3, "y": 2, "z": 1,
            "type": "module"
        },
        {
            "id": "api",
            "name": "api",
            "path": "/src/api",
            "size": 12000,
            "health": 0.6,
            "x": 3, "y": 1, "z": -1,
            "type": "module"
        }
    ]
    
    return {
        "repo_id": repo_id,
        "modules": modules
    }

@router.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "service": "Repository Starship API",
        "version": "0.1.0"
    }

@router.post("/webhook/github")
async def github_webhook(payload: Dict[str, Any]):
    """
    Handle GitHub webhook events for real-time updates
    """
    event_type = payload.get("event_type")
    
    if event_type == "push":
        # Trigger re-analysis on push
        repo_url = payload.get("repository", {}).get("clone_url")
        if repo_url:
            # Queue analysis task
            asyncio.create_task(analyze_repository(repo_url))
    
    return {"status": "received"}