"""
API Routes for Repository Starship
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, HttpUrl
from typing import Dict, Any, List, Optional
import asyncio

from analyzers import analyze_repository

router = APIRouter()

# Simple in-memory cache
analysis_cache = {}

class RepositoryRequest(BaseModel):
    """Repository analysis request model"""
    repo_url: str  # Changed to str to allow local paths
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
        
        # Cache results
        repo_id = request.repo_url.split('/')[-1] or "unknown"
        analysis_cache[repo_id] = result
        
        return {
            "status": "success",
            "repo_id": repo_id,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/metrics/{repo_id}")
async def get_repository_metrics(repo_id: str):
    """
    Get cached metrics for a repository
    """
    if repo_id in analysis_cache:
        return {
            "repo_id": repo_id,
            "metrics": analysis_cache[repo_id]["metrics"]
        }
        
    # Fallback for demo if not found
    return {
        "repo_id": repo_id,
        "metrics": {
            "complexity": 0,
            "coverage": 0,
            "documentation": 0,
            "yagni": 0,
            "dependencies": 0,
            "tech_debt": 0,
            "vulnerabilities": {"critical": 0, "high": 0, "medium": 0, "low": 0}
        }
    }

@router.get("/modules/{repo_id}")
async def get_repository_modules(repo_id: str):
    """
    Get module structure for a repository
    """
    if repo_id in analysis_cache:
        return {
            "repo_id": repo_id,
            "modules": analysis_cache[repo_id]["structure"]
        }

    # Fallback for demo if not found
    return {
        "repo_id": repo_id,
        "modules": []
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
