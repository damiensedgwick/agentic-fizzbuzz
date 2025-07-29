# Agentic FizzBuzz

A microservices-based FizzBuzz implementation using Bun workspaces and Docker.

## Architecture

This project consists of 5 microservices:

- **fizz**: Handles Fizz logic (divisible by 3)
- **buzz**: Handles Buzz logic (divisible by 5)
- **fizzbuzz**: Handles FizzBuzz logic (divisible by both 3 and 5)
- **number**: Handles number processing
- **coordinator**: Orchestrates the FizzBuzz workflow

## Setup

### Option 1: Docker (Recommended)

1. Build and run all services with Docker Compose:

```bash
docker-compose up --build
```

2. Or run in detached mode:

```bash
docker-compose up -d --build
```

3. View logs:

```bash
docker-compose logs -f
```

4. Stop all services:

```bash
docker-compose down
```

### Option 2: Local Development with Bun

1. Install dependencies:

```bash
bun install
```

2. Run all services in development mode:

```bash
bun run dev
```

3. Or run individual services:

```bash
bun run --cwd packages/fizz dev
bun run --cwd packages/buzz dev
bun run --cwd packages/fizzbuzz dev
bun run --cwd packages/coordinator dev
bun run --cwd packages/number dev
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

## Ports

- Fizz: 8001
- Buzz: 8002
- FizzBuzz: 8003
- Coordinator: 8004
- Number: 8005

## Health Checks

All services include health check endpoints:

- `GET /health` - Returns service health status

## Development

Each package can be developed independently. The workspace setup allows for:

- Shared dependencies
- Cross-package imports
- Unified build process
- Hot reloading during development

## Docker Features

- **Health checks** for all services
- **Service dependencies** - Coordinator waits for other services to be healthy
- **Environment variables** for service communication
- **Custom network** for inter-service communication
- **Production-ready** configuration
