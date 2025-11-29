<!-- 0e313244-fb41-4486-865b-ef0997ce2dfb 22f53e09-3461-466d-bc77-f3a51d7979c4 -->
# Extract and Organize Starship Project Files

## Overview

The `claude-artifact.js` file contains an HTML page with embedded JavaScript that defines all project files. We need to extract these files and create the proper project structure for a repository visualization/monitoring tool called "starship".

## Project Structure

Based on the artifact, the project should have:

- `frontend/` - Next.js application with TypeScript, Three.js, Tailwind
- `backend/` - FastAPI application with Python analyzers
- Root configuration files (docker-compose.yml, README.md, .gitignore)

## Steps

### 1. Parse Artifact File

- Read the claude-artifact.js file
- Extract the JavaScript `files` object (starts around line 168)
- Parse each file definition containing `content` and `path` properties

### 2. Create Directory Structure

- Create `frontend/` directory and subdirectories:
- `frontend/app/` (layout.tsx, page.tsx, globals.css)
- `frontend/components/` (StarshipView.tsx, MetricsDashboard.tsx, ModuleInspector.tsx)
- Create `backend/` directory and subdirectories:
- `backend/analyzers/` (complexity.py, dependencies.py, documentation.py, yagni_detector.py)
- `backend/api/` (routes.py, websocket.py, **init**.py)
- `backend/models/` (repository.py, **init**.py)

### 3. Extract and Write Files

- Frontend files (11 files):
- package.json, next.config.js, tsconfig.json, tailwind.config.js
- app/layout.tsx, app/page.tsx, app/globals.css
- components/StarshipView.tsx, components/MetricsDashboard.tsx, components/ModuleInspector.tsx
- Backend files (14 files):
- main.py, requirements.txt, .env.example
- api/**init**.py, api/routes.py, api/websocket.py
- analyzers/**init**.py, analyzers/complexity.py, analyzers/dependencies.py, analyzers/documentation.py, analyzers/yagni_detector.py
- models/**init**.py, models/repository.py
- Configuration files:
- docker-compose.yml (partial in artifact, may need completion)

### 4. Handle Missing Files

- Create basic README.md with project description and setup instructions
- Create .gitignore with standard Node.js and Python patterns
- Verify docker-compose.yml is complete (artifact appears truncated)

### 5. Clean Up

- Remove or archive the original claude-artifact.js file (after extraction verified)
- Optionally keep initial-conversation.md as project documentation

## Notes

- The artifact uses template literals with escaped characters - need to handle JavaScript string escaping
- Some file paths may need normalization
- Project name in package.json is "repo-starship-frontend" - consider consistency
- The artifact file is incomplete (docker-compose.yml cut off at line 2601) - may need completion

### To-dos

- [ ] Parse claude-artifact.js to extract the files object and all file definitions
- [ ] Create frontend/ and backend/ directory structures with all subdirectories
- [ ] Extract and write all frontend files (11 files) to their proper locations
- [ ] Extract and write all backend files (14 files) to their proper locations
- [ ] Create missing README.md and .gitignore files, complete docker-compose.yml if needed
- [ ] Verify all files are properly extracted and project structure is correct