# Starship - Repository Health Monitoring Dashboard

A gamified, immersive dashboard for monitoring codebase health. Visualize your repository as a starship with interconnected systems, track code quality metrics in real-time, and identify issues before they become problems.

## Features

- **3D Visualization**: Interactive Three.js visualization of repository structure as a space station
- **Real-time Metrics**: Monitor complexity, coverage, documentation, YAGNI violations, and more
- **Code Analysis**: Deep analysis using Python AST parsing, Radon, and custom analyzers
- **Gamified Experience**: Space-themed UI with alerts, achievements, and visual feedback
- **WebSocket Updates**: Real-time updates as code changes

## Tech Stack

### Frontend
- Next.js 14 with TypeScript
- Three.js for 3D visualization
- Tailwind CSS for styling
- Socket.io client for real-time updates

### Backend
- FastAPI (Python)
- Radon for complexity analysis
- AST parsing for dependency analysis
- GitPython for repository analysis

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd starship
```

2. Set up the frontend:
```bash
cd frontend
npm install
```

3. Set up the backend:
```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

4. Configure environment variables:
```bash
cp backend/.env.example backend/.env
# Edit backend/.env with your settings
```

### Running Locally

1. Start the backend:
```bash
cd backend
uvicorn main:app --reload
```

2. Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Running with Docker

```bash
docker-compose up
```

This will start both services. The frontend will be available at http://localhost:3000 and the backend API at http://localhost:8000.

## Project Structure

```
starship/
├── frontend/                 # Next.js application
│   ├── app/                 # Next.js app directory
│   ├── components/          # React components
│   └── package.json
├── backend/                 # FastAPI application
│   ├── analyzers/           # Code analysis modules
│   ├── api/                 # API routes and WebSocket
│   ├── models/              # Pydantic models
│   ├── main.py             # FastAPI app entry point
│   └── requirements.txt
├── docker-compose.yml
└── README.md
```

## API Endpoints

- `GET /` - API health check
- `POST /api/analyze` - Analyze a repository
- `GET /api/metrics/{repo_id}` - Get cached metrics
- `GET /api/modules/{repo_id}` - Get module structure
- `GET /api/health` - Health check
- `WS /ws` - WebSocket endpoint for real-time updates

## Metrics Tracked

- **Complexity Reactor**: Cyclomatic and cognitive complexity
- **Shield Coverage**: Test coverage percentage
- **Documentation Index**: Docstring and comment coverage
- **YAGNI Detector**: Over-engineering and dead code detection
- **Tech Debt Accumulator**: Accumulated technical debt
- **Dependencies**: External and internal dependency tracking
- **Vulnerabilities**: Security vulnerability scanning

## Development

### Frontend Development

```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run linter
```

### Backend Development

```bash
cd backend
# Activate virtual environment first
pytest           # Run tests
black .          # Format code
mypy .           # Type checking
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Your License Here]

## Acknowledgments

Inspired by the concept of treating codebases as living systems that need monitoring and care.

