FROM oven/bun:1 as base
WORKDIR /usr/src/app

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json .
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 8002

# Start the application
CMD ["bun", "run", "start"]