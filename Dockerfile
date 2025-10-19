# This Dockerfile is run from the project root (Vitapulse-system)

# ----------------------------------------------------------------------------------
# STAGE 1: FRONTEND BUILDER (Vitapulse-app)
# ----------------------------------------------------------------------------------
FROM oven/bun:latest AS vitapulse_app_builder

WORKDIR /app

COPY .env .
COPY package.json . 


WORKDIR /app/vitapulse-app
COPY vitapulse-app/package*.json ./
COPY vitapulse-app/ . 


RUN bun install --frozen-lockfile
RUN bun run build

# ----------------------------------------------------------------------------------
# STAGE 2: BACKEND RUNTIME (Vitapulse-api)
# ----------------------------------------------------------------------------------
FROM oven/bun:latest AS runtime

WORKDIR /app

COPY .env .
COPY package.json . 


COPY vitapulse-api/package*.json ./vitapulse-api/
COPY vitapulse-api/tsconfig.json ./vitapulse-api/
COPY vitapulse-api/src ./vitapulse-api/src/


WORKDIR /app/vitapulse-api
RUN bun install --frozen-lockfile


RUN bun run build


WORKDIR /app/vitapulse-api
COPY --from=vitapulse_app_builder /app/vitapulse-api/dist /app/vitapulse-api/dist




EXPOSE 3000


CMD ["./hono-app"]
