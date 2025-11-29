<!-- 1eeb3896-b3a7-42ff-8afd-b7d58c7cc8de ee971842-40ef-42aa-b496-96019f1af67c -->
# Cursor Configuration Enhancement Plan

## Research Summary

Based on Context7 documentation and web research, here are the key findings:

### AGENTS.md Files

- **Purpose**: Provide dedicated, machine-readable context for AI coding agents
- **Placement**: Root level for global instructions, subdirectories for module-specific guidance
- **Content**: Project overview, build/test commands, code style, architecture patterns, security guidelines
- **Best Practice**: Use modular approach for monorepos, reference other files with `@` symbol

### Cursor Rules

- **Location**: `.cursor/rules` directory (version-controlled, project-specific)
- **Types**: Always (auto-applied), Auto Attached (glob patterns), Agent Requested (AI decides), Manual (explicit `@ruleName`)
- **Legacy**: `.cursorrules` file deprecated in favor of project rules
- **Scope**: Apply to Agent and Inline Edit only, not Cursor Tab

### Cursor Commands  

- **Location**: `.cursor/commands` directory
- **Format**: Markdown files (e.g., `review-code.md`, `write-tests.md`)
- **Usage**: Triggered with `/` prefix in chat
- **Purpose**: Reusable workflows for common tasks

## Implementation Plan

### 1. Root AGENTS.md File

Create `/AGENTS.md` with:

- Project overview (gamified repository health monitoring dashboard)
- Tech stack (Next.js 14 + TypeScript frontend, FastAPI Python backend)
- Setup instructions (npm install, python venv, pip install)
- Build commands (npm run dev, uvicorn main:app --reload)
- Test commands (pytest for backend, npm run lint for frontend)
- Code style guidelines (Python: Black + isort, TypeScript: ESLint)
- Architecture patterns (3D visualization with Three.js, WebSocket real-time updates)
- Security considerations (CORS configuration, WebSocket authentication)

### 2. Frontend AGENTS.md

Create `/frontend/AGENTS.md` with:

- Next.js 14 app router patterns
- React component structure (components/ directory)
- Three.js visualization guidelines
- TypeScript strict mode requirements
- Tailwind CSS conventions
- Socket.io client patterns
- State management approach

### 3. Backend AGENTS.md  

Create `/backend/AGENTS.md` with:

- FastAPI route organization (api/routes.py)
- Analyzer module structure (analyzers/ directory)
- Pydantic model conventions (models/ directory)
- Python type hints requirements
- Async/await patterns
- WebSocket manager usage
- Testing with pytest-asyncio

### 4. Cursor Rules (.cursor/rules/)

Create organized rule files:

**always-code-style.mdrule**

- Use Black for Python formatting (88 char line length)
- Use isort for Python imports
- Use ESLint + Prettier for TypeScript
- Prefer camelCase for JavaScript/TypeScript variables
- Prefer snake_case for Python variables
- Always add type hints in Python
- Always add TypeScript types (no `any`)

**auto-testing-standards.mdrule** (Auto Attached: `**/*.{py,ts,tsx}`)

- Write pytest tests for Python functions
- Use pytest-asyncio for async functions
- Write Jest tests for React components (when applicable)
- Aim for 80%+ code coverage
- Test edge cases and error conditions

**agent-python-best-practices.mdrule** (Agent Requested)

- Use async/await for I/O operations
- Implement proper error handling with try/except
- Use Pydantic for data validation
- Follow FastAPI dependency injection patterns
- Document all public functions with docstrings

**agent-react-patterns.mdrule** (Agent Requested)

- Use functional components with hooks
- Implement proper error boundaries
- Use React.memo for expensive renders
- Follow Three.js @react-three/fiber patterns
- Handle WebSocket reconnection logic

**manual-security-review.mdrule** (Manual: `@security-review`)

- Check for SQL injection vulnerabilities
- Validate all user inputs with Pydantic
- Use environment variables for secrets
- Implement rate limiting on API endpoints
- Sanitize data before WebSocket broadcast
- Review CORS configuration

### 5. Cursor Commands (.cursor/commands/)

**analyze-code-quality.md**

```
Analyze the current file or selection for:
- Cyclomatic complexity (flag functions >10)
- Code duplication
- Missing type hints/types
- Missing docstrings/comments
- Potential performance issues
Provide specific suggestions for improvements.
```

**run-full-test-suite.md**

```
Execute the full test suite:
1. Backend: Run `pytest --cov=. --cov-report=term-missing` 
2. Frontend: Run `npm run lint`
3. Report any failures with suggested fixes
4. Show coverage percentage
```

**review-pr-checklist.md**

```
Review the current changes against this checklist:
- [ ] All functions have type hints/types
- [ ] New code has test coverage
- [ ] Documentation updated (docstrings, comments)
- [ ] No console.log or print() statements left
- [ ] Error handling implemented
- [ ] No secrets hardcoded
- [ ] CORS/security reviewed
- [ ] Performance considered
Highlight any issues found.
```

**create-analyzer-module.md**

```
Create a new analyzer module in backend/analyzers/:
1. Create new Python file with proper imports
2. Implement analyzer class with type hints
3. Add docstrings for all public methods
4. Create corresponding test file in tests/
5. Register analyzer in __init__.py
6. Add integration with main analysis pipeline
```

**create-react-component.md**

```
Create a new React component in frontend/components/:
1. Create TypeScript file with proper imports
2. Define prop types interface
3. Implement functional component with hooks
4. Add proper error boundaries if needed
5. Include Tailwind CSS styling
6. Export component
```

**setup-dev-environment.md**

```
Set up the development environment from scratch:
1. Check prerequisites (Node.js 18+, Python 3.10+)
2. Install frontend dependencies: cd frontend && npm install
3. Set up Python venv: cd backend && python -m venv venv
4. Activate venv and install: pip install -r requirements.txt
5. Create .env file from .env.example
6. Verify setup by running both servers
```

### 6. Additional Configuration

**Create .cursorignore**

```
node_modules/
venv/
__pycache__/
.next/
dist/
build/
*.pyc
.pytest_cache/
coverage/
.env
```

**User Rules Suggestions** (in Cursor Settings):

- "Use concise explanations focused on teaching concepts"
- "Prefer functional programming patterns when applicable"
- "Always explain the 'why' behind architectural decisions"

## Benefits of This Setup

1. **Context-Aware AI**: AGENTS.md files provide AI with project-specific knowledge
2. **Consistent Code Style**: Rules enforce standards across frontend and backend
3. **Faster Development**: Commands automate common workflows
4. **Better Onboarding**: New developers (and AI) understand project faster
5. **Quality Assurance**: Automated checks for testing, security, types
6. **Modularity**: Subdirectory AGENTS.md files provide focused context

## File Organization

```
CFaSH/
├── .cursor/
│   ├── rules/
│   │   ├── always-code-style.mdrule
│   │   ├── auto-testing-standards.mdrule
│   │   ├── agent-python-best-practices.mdrule
│   │   ├── agent-react-patterns.mdrule
│   │   └── manual-security-review.mdrule
│   └── commands/
│       ├── analyze-code-quality.md
│       ├── run-full-test-suite.md
│       ├── review-pr-checklist.md
│       ├── create-analyzer-module.md
│       ├── create-react-component.md
│       └── setup-dev-environment.md
├── AGENTS.md
├── frontend/
│   ├── AGENTS.md
│   └── ...
├── backend/
│   ├── AGENTS.md
│   └── ...
├── .cursorignore
└── README.md
```

### To-dos

- [ ] Create .cursor/rules and .cursor/commands directory structure
- [ ] Create root-level AGENTS.md with global project context
- [ ] Create frontend/AGENTS.md with Next.js and React-specific guidance
- [ ] Create backend/AGENTS.md with FastAPI and Python-specific guidance
- [ ] Create all 5 cursor rules files (code style, testing, Python, React, security)
- [ ] Create all 6 cursor command files (analyze, test, review, create modules/components, setup)
- [ ] Create .cursorignore file to exclude build artifacts and dependencies