run docker container:
    - "docker build . -t vitapulse-system"
    - "docker run -d -p 8000:8000 --env-file ./vitapulse-api/.env --name vitapulse-app vitapulse-system"

run application:
    - bun run start
