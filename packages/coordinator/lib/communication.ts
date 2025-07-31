interface AgentResponse {
  result: string | null;
  message?: string;
}

export async function sendToAgent(
  agentName: string,
  number: number
): Promise<AgentResponse> {
  const serviceUrls = {
    fizz: process.env.FIZZ_SERVICE_URL || "http://localhost:8001",
    buzz: process.env.BUZZ_SERVICE_URL || "http://localhost:8002",
    fizzbuzz: process.env.FIZZBUZZ_SERVICE_URL || "http://localhost:8003",
    number: process.env.NUMBER_SERVICE_URL || "http://localhost:8005",
  };

  const serviceUrl = serviceUrls[agentName as keyof typeof serviceUrls];

  if (!serviceUrl) {
    throw new Error(`Unknown agent: ${agentName}`);
  }

  try {
    console.log(
      `📤 [COORDINATOR] Sending request to ${agentName} agent at ${serviceUrl}/check`
    );

    const response = await fetch(`${serviceUrl}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`
      );
    }

    const data = await response.json();

    if (typeof data.result !== "string" && data.result !== null) {
      throw new Error(
        `Invalid response format from ${agentName} agent: ${JSON.stringify(
          data
        )}`
      );
    }

    return data;
  } catch (error) {
    console.error(
      `🚨 [COORDINATOR] Error communicating with ${agentName} agent:`,
      error
    );
    throw error;
  }
}

export async function checkAgentHealth(agentName: string): Promise<boolean> {
  const serviceUrls = {
    fizz: process.env.FIZZ_SERVICE_URL || "http://localhost:8001",
    buzz: process.env.BUZZ_SERVICE_URL || "http://localhost:8002",
    fizzbuzz: process.env.FIZZBUZZ_SERVICE_URL || "http://localhost:8003",
    number: process.env.NUMBER_SERVICE_URL || "http://localhost:8005",
  };

  const serviceUrl = serviceUrls[agentName as keyof typeof serviceUrls];

  if (!serviceUrl) {
    return false;
  }

  try {
    const response = await fetch(`${serviceUrl}/health`, {
      method: "GET",
    });
    return response.ok;
  } catch (error) {
    console.error(
      `🚨 [COORDINATOR] Health check failed for ${agentName} agent:`,
      error
    );
    return false;
  }
}
