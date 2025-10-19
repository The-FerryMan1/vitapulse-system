
FROM oven/bun:latest AS vitapulse_app_builder


WORKDIR /app/vitapulse-app


COPY vitapulse-app/package*.json ./
RUN bun install --frozen-lockfile

COPY vitapulse-app/ .
RUN bun run build

FROM oven/bun:latest AS runtime

WORKDIR /app


COPY vitapulse-api/package*.json ./vitapulse-api/
COPY vitapulse-api/tsconfig.json ./vitapulse-api/
COPY vitapulse-api/src ./vitapulse-api/src/


COPY package.json .


WORKDIR /app/vitapulse-api
RUN bun install --frozen-lockfile


RUN bun run build

WORKDIR /app/vitapulse-api


COPY --from=vitapulse_app_builder /app/vitapulse-api/dist /app/vitapulse-api/dist

EXPOSE 3000


CMD ["./hono-app"]
