# Agentic FizzBuzz

A distributed, agent-based FizzBuzz implementation where each microservice operates as an autonomous agent with its own tooling.

[Demo Link](https://drive.google.com/file/d/1wX8WFe4oAcE_WvoAx1V6yPVZ8a4P8p8R/view?usp=share_link)

## Architecture

This system consists of 5 specialized agents, each handling a specific aspect of the FizzBuzz problem:

- **Number Agent** (Port 8005): Returns the number as a string if not divisible by 3 or 5
- **Fizz Agent** (Port 8001): Returns "Fizz" if divisible by 3, null otherwise
- **Buzz Agent** (Port 8002): Returns "Buzz" if divisible by 5, null otherwise
- **FizzBuzz Agent** (Port 8003): Returns "FizzBuzz" if divisible by both 3 and 5, null otherwise
- **Coordinator Agent** (Port 8004): Orchestrates the workflow, routes requests to appropriate agents, and returns the final result

## How It Works

1. **Coordinator Agent** receives a number and task via `/process` endpoint
2. **Coordinator** validates the task is "fizzbuzz" and number is in range 1-100
3. **Coordinator** determines which agent to route to based on divisibility:
   - Divisible by both 3 and 5 → FizzBuzz Agent
   - Divisible by 5 → Buzz Agent
   - Divisible by 3 → Fizz Agent
   - Not divisible by 3 or 5 → Number Agent
4. **Selected Agent** processes the number and returns the result
5. **Coordinator** returns the final result

## Setup

### Docker (Recommended)

```bash
docker-compose up --build
```

### Local Development

```bash
bun install
bun run dev
```

## API Endpoints

### Coordinator Agent (Main Entry Point)

- `POST /process` - Submit a number for FizzBuzz processing
  ```json
  {
    "task": "fizzbuzz",
    "number": 15
  }
  ```

### Individual Agents

- `GET /health` - Agent health status
- `POST /check` - Check divisibility (agent-specific logic)

## Development

Each agent operates independently and can be scaled horizontally. The system provides:

- **Autonomy**: Each agent operates independently
- **Specialization**: Agents focus on specific divisibility checks
- **Scalability**: Individual agents can be scaled based on load
- **Resilience**: System continues operating even if some agents fail
