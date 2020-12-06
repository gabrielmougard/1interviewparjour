#!/bin/sh

# This script needs to be executed with the 'source' command otherwise the env variable will not be registered.
# https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach#:~:text=To%20access%20host%20machine%20from,using%20it%20to%20anything%20else.&text=Then%20make%20sure%20that%20you,IP%20mentioned%20above%20or%200.0.
# In order to access to the host services like Vault from inside isolted docker containers.
# Then we just have to change http://localhost to http://dockerhost in your our code when we want to access such services.
export DOCKERHOST=$(ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d: | head -n1)
export VAULT_ADDR=http://127.0.0.1:8200
cd ../../1interviewparjour && sed -e 's/\${dockerhost}/'"${DOCKERHOST}"'/' Dockerfile > Dockerfile-temp && rm Dockerfile && cat Dockerfile-temp > Dockerfile && rm Dockerfile-temp
cd ../../1interviewparjour/docker/ci
docker-compose build
docker-compose up
