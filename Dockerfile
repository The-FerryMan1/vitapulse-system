# --------------------------------------------------------------------------
# STAGE 1: Frontend Build (Builds assets using Bun/Vite)
# --------------------------------------------------------------------------
FROM oven/bun:latest AS vitapulse_app_builder

# Set the working directory for the frontend app
WORKDIR /app/vitapulse-app

# Copy the frontend package files and install dependencies
COPY vitapulse-app/package*.json ./
RUN bun install --frozen-lockfile

# Copy the rest of the frontend source code
COPY vitapulse-app/ .
RUN bun run build

# --------------------------------------------------------------------------
# STAGE 2: Backend & Runtime (Serves the app using Bun/Hono)
# --------------------------------------------------------------------------
FROM oven/bun:latest AS runtime

# Set the working directory for the server application
WORKDIR /app

# 1. Copy the Hono/Bun server files and package files
COPY vitapulse-api/package*.json ./vitapulse-api/
COPY vitapulse-api/tsconfig.json ./vitapulse-api/
# FIX 1: Ensure the destination path for source code is correct
COPY vitapulse-api/src ./vitapulse-api/src/

# Copy the root package.json (needed if 'start' is defined here)
COPY package.json .

# Install backend dependencies (in its sub-folder context)
WORKDIR /app/vitapulse-api
RUN bun install --frozen-lockfile

# Copy the compiled frontend assets from the builder stage back to the root's /app/dist
WORKDIR /app
COPY --from=vitapulse_app_builder /app/dist /app/dist

# Expose the port the Hono server will listen on
EXPOSE 3000

# FIX 2: Explicitly change directory to 'vitapulse-api' before running the 'start' script
# This ensures Bun uses the package.json and dependencies from the correct directory.
CMD ["bun", "run", "vitapulse-api/src/index.ts"]
