#!/bin/bash

DOCKERHOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
cd docker/ci/env/
sed -e 's/\${dockerhost}/'"${DOCKERHOST}"'/' backend.env > backend-temp.env && rm backend.env && cat backend-temp.env > backend.env && rm backend-temp.env
cd ..

SWARM_NAME="1interviewparjour-swarm"
SWARM_CREATED=1
declare -a ServiceNameSuffixes=("1interviewparjour-app" "1interviewparjour-web" "prometheus" "node-exporter" "granfana")
declare -a AppStackServices=("1interviewparjour-app" "1interviewparjour-web")

# Iterate the string array using for loop
for val in ${ServiceNameSuffixes[@]}; do
    REACHABLE=$(docker service ps ${SWARM_NAME}_${val} 2>&1)
    if [ "$REACHABLE" == "no such service: ${SWARM_NAME}_${val}" ]; then
        SWARM_CREATED=0
        break
    fi
done

if [[ "$SWARM_CREATED" -eq 0 ]]
then
    # The swarm is not created yet. Create it.
    echo "Creating the swarm ..."
    docker stack deploy --compose-file 1interviewparjour-stack.yml 1interviewparjour-swarm
else
    # The swarm is created (all the services are up and running).
    # Then, we just update the application stack without shuting it down
    for val in ${AppStackServices[@]}; do
        docker service update -d \
        --image gabrielmougard/${val}:latest \
        --update-parallelism 1 \
        --update-failure-action rollback \
        --update-order start-first \
        --update-delay 30s \
        ${SWARM_NAME}_${val}
    done
fi


