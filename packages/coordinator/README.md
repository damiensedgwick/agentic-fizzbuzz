# Coordinator Agent

The Coordinator Agent is the central orchestrator for the Agentic FizzBuzz system. It determines which specialized agent should process a given number and routes the request accordingly.

## How Agent Messaging Works

### 1. Request Flow

1. Client sends a POST request to `/process` with `{ task: string, number: number }`
2. The coordinator agent uses its AI-powered decision making to determine the next agent
3. The coordinator sends an HTTP POST request to the appropriate agent's `/check` endpoint
4. The specialized agent processes the number and returns the result
5. The coordinator returns the final result to the client

### 2. Agent Routing Logic

The coordinator determines which agent to use based on the number's divisibility:

- **FizzBuzz Agent** (Port 8003): Numbers divisible by both 3 and 5
- **Buzz Agent** (Port 8002): Numbers divisible by 5 only
- **Fizz Agent** (Port 8001): Numbers divisible by 3 only
- **Number Agent** (Port 8005): Numbers not divisible by 3 or 5

### 3. Communication Protocol

#### Coordinator → Agent Request

```http
POST /check
Content-Type: application/json

{
  "number": 15
}
```

#### Agent → Coordinator Response

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "result": "FizzBuzz"
}
```

### 4. Environment Variables

The coordinator uses these environment variables to locate agents:

- `FIZZ_SERVICE_URL`: URL for the Fizz agent (default: http://fizz:8001)
- `BUZZ_SERVICE_URL`: URL for the Buzz agent (default: http://buzz:8002)
- `FIZZBUZZ_SERVICE_URL`: URL for the FizzBuzz agent (default: http://fizzbuzz:8003)
- `NUMBER_SERVICE_URL`: URL for the Number agent (default: http://number:8005)

### 5. Error Handling

- If an agent is unavailable, the coordinator returns a 500 error
- Invalid requests return a 400 error with details
- Network timeouts and connection errors are properly handled and logged

### 6. Health Checks

The coordinator can check agent health using the `checkAgentHealth()` function, which calls each agent's `/health` endpoint.

## Example Usage

```bash
# Send a number to the coordinator
curl -X POST http://localhost:8004/process \
  -H "Content-Type: application/json" \
  -d '{"task": "fizzbuzz", "number": 15}'

# Response: {"message": "FizzBuzz"}
```

## Architecture Benefits

- **Decentralized**: Each agent operates independently
- **Scalable**: Agents can be scaled horizontally
- **Resilient**: System continues working even if some agents fail
- **Maintainable**: Each agent has a single responsibility
- **Observable**: Clear logging and health checks throughout
