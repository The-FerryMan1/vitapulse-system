run docker container:
    1. change vitapulse-app env VITE_PRODUCTION=dev to VITE_PRODUCTION=production
    2. change vitapulse-api env PRODUCTION=dev to PRODUCTION=production
    3. "docker build -t vitapulse-system ."
    4. docker run -d -p 8000:3000 --env-file ./vitapulse-api/.env --name vitapulse-app vitapulse-system
    
    //if you decided to use a different port than 8000, make sure to edit vitapulse-app VITE_DOCKER_DOMAIN=http://localhost:8000/api/ to your desired port and rebuild the docker image


run localhost:
    change vitapulse-app env VITE_PRODUCTION=production to VITE_PRODUCTION=dev
    change vitapulse-api env PRODUCTION=production to PRODUCTION=dev
    bun run start to build frontend and backend and run