#!/bin/sh

export DOCKERHOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
export VAULT_ADDR=http://127.0.0.1:8200
sed -e 's/\${dockerhost}/'"${DOCKERHOST}"'/' backend.env > backend-temp.env && rm backend.env && cat backend-temp.env > backend.env && rm backend-temp.env

# Required : the docker swarm '1interviewparjour-swarm' is already up and running
# Update the application stack without shuting it down
docker service update -d \
    --image gabrielmougard/1interviewparjour-web:latest \
    --update-parallelism 1 \
    --update-failure-action rollback \
    --update-order start-first \
    --update-delay 30s \
    1interviewparjour-swarm_1interviewparjour-web
docker service update -d \
    --image gabrielmougard/1interviewparjour-app:latest \
    --update-parallelism 1 \
    --update-failure-action rollback \
    --update-order start-first \
    --update-delay 30s \
    1interviewparjour-swarm_1interviewparjour

