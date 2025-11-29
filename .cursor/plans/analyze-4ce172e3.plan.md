<!-- 4ce172e3-6542-4647-8cc5-6af8b475ed82 94e04c40-4628-4c64-87a9-ec9129602a6d -->
# Self-Analysis Mode for Starship

## What We Have

The analyzers are already implemented and ready:

- [complexity.py](backend/analyzers/complexity.py) - Radon-based cyclomatic complexity, maintainability index
- [dependencies.py](backend/analyzers/dependencies.py) - Import graph, external deps, circular deps
- [documentation.py](backend/analyzers/documentation.py) - Docstring coverage, README analysis  
- [yagni_detector.py](backend/analyzers/yagni_detector.py) - Dead code, unused functions/classes

## Changes Required

### 1. Backend: Wire up real analysis in `analyze_repository()`

Modify [backend/analyzers/__init__.py](backend/analyzers/__init__.py) to:

- Detect when analyzing the local repo (use repo path or special flag)
- Run all four analyzers against the backend directory
- Aggregate results into the expected `metrics` and `structure` format
- Generate 3D positions for modules based on directory structure

### 2. Backend: Fix API response structure

In [backend/api/routes.py](backend/api/routes.py), the response is:

```python
return { "status": "success", "data": result }
```

But frontend expects `response.data.structure` — needs to be:

```python
return result  # or fix frontend to access response.data.data
```

### 3. Frontend: Auto-analyze on startup (optional)

In [frontend/app/page.tsx](frontend/app/page.tsx), replace `loadMockData()` with an API call to analyze the local repo, or add a "Demo Mode" button.

## Key Implementation Detail

The structure generation needs to map Python modules to 3D coordinates. Strategy:

- Each top-level directory becomes a module
- Position based on file count / complexity (spread around center)
- Health derived from complexity + documentation scores

### To-dos

- [ ] Implement real analysis in analyze_repository() using existing analyzers
- [ ] Fix API response structure mismatch between backend and frontend
- [ ] Replace mock data with API call to analyze local repo on startup