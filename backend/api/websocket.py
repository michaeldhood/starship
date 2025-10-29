"""
WebSocket manager for real-time updates
"""

from typing import List, Dict, Any
from fastapi import WebSocket
import json
import asyncio

class WebSocketManager:
    """Manage WebSocket connections"""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.connection_data: Dict[WebSocket, Dict[str, Any]] = {}
    
    async def connect(self, websocket: WebSocket):
        """Accept and store a new WebSocket connection"""
        await websocket.accept()
        self.active_connections.append(websocket)
        self.connection_data[websocket] = {
            "connected_at": asyncio.get_event_loop().time()
        }
        print(f"Client connected. Total connections: {len(self.active_connections)}")
    
    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket connection"""
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.connection_data:
            del self.connection_data[websocket]
        print(f"Client disconnected. Total connections: {len(self.active_connections)}")
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        """Send a message to a specific client"""
        await websocket.send_text(message)
    
    async def send_personal_json(self, data: Dict[str, Any], websocket: WebSocket):
        """Send JSON data to a specific client"""
        await websocket.send_json(data)
    
    async def broadcast(self, message: str):
        """Broadcast a message to all connected clients"""
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                # Connection might be closed
                pass
    
    async def broadcast_json(self, data: Dict[str, Any]):
        """Broadcast JSON data to all connected clients"""
        for connection in self.active_connections:
            try:
                await connection.send_json(data)
            except:
                # Connection might be closed
                pass
    
    async def broadcast_metrics_update(self, metrics: Dict[str, Any]):
        """Broadcast metrics update to all clients"""
        await self.broadcast_json({
            "type": "metrics_update",
            "data": metrics
        })
    
    async def broadcast_structure_update(self, structure: List[Dict[str, Any]]):
        """Broadcast repository structure update to all clients"""
        await self.broadcast_json({
            "type": "structure_update",
            "data": structure
        })