#!/bin/bash

# Usage: ./realteeth.sh [build|run|exec|sync]

set -e

case "$1" in
  build)
    docker build -t realteeth .
    ;;
  run)
    # Bind mount source, but keep node_modules inside the container via anonymous volumes
    docker run -d \
      -p 5173:5173 \
      -v "$PWD/realteeth:/usr/app" \
      --name realteeth realteeth
    ;;
  sync)
    # Extract node_modules using tar to properly handle symlinks
    echo "Syncing node_modules from Docker image to local..."
    TEMP_CONTAINER=$(docker create realteeth)
    
    # Extract each node_modules directory using tar
    docker cp $TEMP_CONTAINER:/usr/app/node_modules - | tar -xC ./realteeth/
    docker rm $TEMP_CONTAINER
    echo "✓ node_modules synced successfully!"
    ;;
  exec)
    docker exec -it realteeth sh
    ;;
  *)
    echo "Usage: $0 [build|run|exec|sync]"
    exit 1
    ;;
esac
