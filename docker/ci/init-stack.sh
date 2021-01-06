#!/bin/sh

# Executed the first time after the machine boot.
export DOCKERHOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
export VAULT_ADDR=http://127.0.0.1:8200
sed -e 's/\${dockerhost}/'"${DOCKERHOST}"'/' backend.env > backend-temp.env && rm backend.env && cat backend-temp.env > backend.env && rm backend-temp.env

echo "Deploying stack..."
docker stack deploy -d --compose-file 1interviewparjour-stack.yml 1interviewparjour-swarm
