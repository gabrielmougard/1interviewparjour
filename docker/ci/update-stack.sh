#!/bin/bash

DOCKERHOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
cd env/
sed -e 's/\${dockerhost}/'"${DOCKERHOST}"'/' backend.env > backend-temp.env && rm backend.env && cat backend-temp.env > backend.env && rm backend-temp.env
cd ..

SWARM_NAME="1interviewparjour-swarm"
declare -a AppStackServices=("1interviewparjour-app" "1interviewparjour-web")

echo "Updating the application stack of the swarm ..."
for val in ${AppStackServices[@]}; do
    docker service update -d \
    --image gabrielmougard/${val}:latest \
    --update-parallelism 1 \
    --update-failure-action rollback \
    --update-order start-first \
    --update-delay 30s \
    --with-registry-auth \
    ${SWARM_NAME}_${val}
done


