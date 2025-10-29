"""
Repository data models
"""

from pydantic import BaseModel, Field, HttpUrl
from typing import List, Dict, Any, Optional
from datetime import datetime
from enum import Enum

class ModuleType(str, Enum):
    """Module type enumeration"""
    CORE = "core"
    MODULE = "module"
    UTILITY = "utility"
    TEST = "test"
    CONFIG = "config"

class HealthStatus(str, Enum):
    """Health status enumeration"""
    CRITICAL = "critical"
    WARNING = "warning"
    HEALTHY = "healthy"
    OPTIMAL = "optimal"

class Module(BaseModel):
    """Repository module model"""
    id: str
    name: str
    path: str
    size: int = Field(description="Lines of code")
    health: float = Field(ge=0, le=1, description="Health score 0-1")
    type: ModuleType
    complexity: Optional[float] = None
    coverage: Optional[float] = None
    dependencies: List[str] = []
    maintainers: List[str] = []
    last_modified: Optional[datetime] = None
    
    # 3D positioning
    x: float = 0
    y: float = 0
    z: float = 0
    
    def get_health_status(self) -> HealthStatus:
        """Get health status based on health score"""
        if self.health < 0.3:
            return HealthStatus.CRITICAL
        elif self.health < 0.6:
            return HealthStatus.WARNING
        elif self.health < 0.85:
            return HealthStatus.HEALTHY
        else:
            return HealthStatus.OPTIMAL

class Vulnerability(BaseModel):
    """Security vulnerability model"""
    severity: str
    package: str
    version: str
    description: str
    cve: Optional[str] = None
    fix_version: Optional[str] = None

class Metrics(BaseModel):
    """Repository metrics model"""
    complexity: float = Field(ge=0, le=100)
    coverage: float = Field(ge=0, le=100)
    documentation: float = Field(ge=0, le=100)
    yagni: float = Field(ge=0, le=100)
    dependencies: int = Field(ge=0)
    tech_debt: float = Field(ge=0, le=100)
    vulnerabilities: Dict[str, int] = {
        "critical": 0,
        "high": 0,
        "medium": 0,
        "low": 0
    }
    
    # Additional metrics
    build_time: Optional[float] = None
    bundle_size: Optional[int] = None
    test_count: Optional[int] = None
    code_smells: Optional[int] = None
    duplications: Optional[float] = None
    
    timestamp: datetime = Field(default_factory=datetime.now)

class Repository(BaseModel):
    """Repository model"""
    id: str
    name: str
    url: HttpUrl
    branch: str = "main"
    
    # Structure
    modules: List[Module] = []
    
    # Metrics
    metrics: Metrics
    
    # Metadata
    language: str = "python"
    stars: Optional[int] = None
    forks: Optional[int] = None
    contributors: List[str] = []
    last_commit: Optional[datetime] = None
    created_at: Optional[datetime] = None
    analyzed_at: datetime = Field(default_factory=datetime.now)
    
    # Analysis results
    issues: List[Dict[str, Any]] = []
    recommendations: List[str] = []
    
    def get_overall_health(self) -> float:
        """Calculate overall repository health"""
        if not self.modules:
            return 0.0
        
        total_health = sum(module.health * module.size for module in self.modules)
        total_size = sum(module.size for module in self.modules)
        
        return total_health / total_size if total_size > 0 else 0.0
    
    def get_critical_modules(self) -> List[Module]:
        """Get modules with critical health status"""
        return [
            module for module in self.modules 
            if module.get_health_status() == HealthStatus.CRITICAL
        ]
    
    class Config:
        """Model configuration"""
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }