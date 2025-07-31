# Agentic FizzBuzz 

A distributed, agent-based FizzBuzz implementation where each microservice operates as an autonomous agent with its own tooling.

[Demo Video](./demo/daf.mp4)

## Architecture

This system consists of 5 specialized agents, each handling a specific aspect of the FizzBuzz problem:

- **Number Agent** (Port 8005): Receives and validates input numbers, manages the initial processing pipeline
- **Fizz Agent** (Port 8001): Specialized in detecting divisibility by 3, returns "Fizz" when applicable
- **Buzz Agent** (Port 8002): Specialized in detecting divisibility by 5, returns "Buzz" when applicable  
- **FizzBuzz Agent** (Port 8003): Handles the complex case of numbers divisible by both 3 and 15, returns "FizzBuzz"
- **Coordinator Agent** (Port 8004): Orchestrates the workflow, routes requests between agents, and aggregates results

## Agent Responsibilities

### Number Agent
- Validates input numbers
- Determines which agent(s) should process the number
- Manages the processing pipeline

### Fizz Agent
- Receives numbers and checks divisibility by 3
- Returns "Fizz" for divisible numbers, null otherwise
- Operates independently and can be scaled horizontally

### Buzz Agent  
- Receives numbers and checks divisibility by 5
- Returns "Buzz" for divisible numbers, null otherwise
- Operates independently and can be scaled horizontally

### FizzBuzz Agent
- Handles the special case of numbers divisible by both 3 and 5
- Returns "FizzBuzz" for divisible numbers, null otherwise
- Optimized for the complex divisibility logic

### Coordinator Agent
- Acts as the central orchestrator
- Routes requests to appropriate agents based on number properties
- Aggregates responses from multiple agents
- Provides the final FizzBuzz result

## Setup

### Option 1: Docker (Recommended)

1. Build and run all agents with Docker Compose:
```bash
docker-compose up --build
```

2. Or run in detached mode:
```bash
docker-compose up -d --build
```

3. View agent logs:
```bash
docker-compose logs -f
```

4. Stop all agents:
```bash
docker-compose down
```

### Option 2: Local Development with Bun

1. Install dependencies:
```bash
bun install
```

2. Run all agents in development mode:
```bash
bun run dev
```

3. Or run individual agents:
```bash
bun run --cwd packages/number dev
bun run --cwd packages/fizz dev
bun run --cwd packages/buzz dev
bun run --cwd packages/fizzbuzz dev
bun run --cwd packages/coordinator dev
```

## Build

### Docker
```bash
docker-compose build
```

### Local
```bash
bun run build:all
```

## Agent Communication

- **Health Checks**: All agents expose `/health` endpoints for monitoring
- **Service Discovery**: Agents communicate via Docker network using service names
- **Load Balancing**: Each agent can be scaled independently
- **Fault Tolerance**: Coordinator waits for all agents to be healthy before starting

## API Endpoints

### Coordinator Agent (Main Entry Point)
- `GET /health` - Agent health status
- `POST /process` - Submit a number for FizzBuzz processing

### Individual Agents
- `GET /health` - Agent health status
- `POST /check` - Check divisibility (agent-specific logic)

## Development

Each agent can be developed and deployed independently. The agentic architecture provides:
- **Autonomy**: Each agent operates independently
- **Specialization**: Agents focus on specific tasks
- **Scalability**: Individual agents can be scaled based on load
- **Resilience**: System continues operating even if some agents fail
- **Modularity**: Easy to add new agents or modify existing ones

## Docker Features

- **Health checks** for all agents
- **Service dependencies** - Coordinator waits for other agents to be healthy
- **Environment variables** for inter-agent communication
- **Custom network** for secure agent communication
- **Production-ready** configuration with proper isolation
