run docker container:
    docker run -d -p 8000:3000 --env-file ./vitapulse-api/.env --name vitapulse-app vitapulse-system 


run localhost:
    change vitapulse-app VITE_PRODUCTION=production to VITE_PRODUCTION=dev
    change vitapulse-api PRODUCTION=production to PRODUCTION=dev