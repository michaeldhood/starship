"""
Repository Starship - Backend API
Main FastAPI application for repository analysis
"""

from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import asyncio
import json
from typing import Dict, Any

from api.routes import router as api_router
from api.websocket import WebSocketManager
from analyzers import analyze_repository

# WebSocket manager instance
manager = WebSocketManager()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage application lifecycle"""
    print("🚀 Starship Repository Backend Starting...")
    yield
    print("👋 Starship Repository Backend Shutting Down...")

# Create FastAPI app
app = FastAPI(
    title="Repository Starship API",
    description="Real-time code repository analysis and monitoring",
    version="0.1.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "name": "Repository Starship API",
        "status": "operational",
        "version": "0.1.0"
    }

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates"""
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive and handle messages
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message.get("type") == "analyze":
                # Start repository analysis
                repo_url = message.get("repo_url")
                if repo_url:
                    # Run analysis in background
                    asyncio.create_task(
                        analyze_and_broadcast(repo_url, websocket)
                    )
            
            elif message.get("type") == "ping":
                await websocket.send_json({"type": "pong"})
                
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        manager.disconnect(websocket)

async def analyze_and_broadcast(repo_url: str, websocket: WebSocket):
    """Analyze repository and broadcast updates"""
    try:
        # Send initial status
        await websocket.send_json({
            "type": "status",
            "message": "Starting analysis..."
        })
        
        # Perform analysis (this would be your actual analysis logic)
        result = await analyze_repository(repo_url)
        
        # Send results
        await websocket.send_json({
            "type": "analysis_complete",
            "data": result
        })
        
    except Exception as e:
        await websocket.send_json({
            "type": "error",
            "message": str(e)
        })

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )