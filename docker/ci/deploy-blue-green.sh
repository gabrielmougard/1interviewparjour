#!/bin/sh
if [ $(docker ps -f name=1interviewparjour-backend-blue -q) ]
then
    ENV_BACK="1interviewparjour-backend-green"
    OLD_BACK="1interviewparjour-backend-blue"
else
    ENV_BACK="1interviewparjour-backend-blue"
    OLD_BACK="1interviewparjour-backend-green"
fi

echo "Starting "$ENV_BACK" container"
docker-compose --project-name=$ENV_BACK up -d

echo "Waiting..."
sleep 5s

echo "Stopping "$OLD_BACK" container"
docker-compose --project-name=$OLD_BACK stop

# frontend configuration
sed -e 's/\${backend-endpoint}/$ENV_BACK/' web.env > web-temp.env && rm web.env && cat web-temp.env > web.env && rm web-temp.env

if [ $(docker ps -f name=1interviewparjour-web-blue -q) ]
then
    ENV_FRONT="1interviewparjour-web-green"
    OLD_FRONT="1interviewparjour-web-blue"
else
    ENV_FRONT="1interviewparjour-web-blue"
    OLD_FRONT="1interviewparjour-web-green"
fi

echo "Starting "$ENV_FRONT" container"
docker-compose --project-name=$ENV_FRONT up -d

echo "Waiting..."
sleep 5s

echo "Stopping "$OLD_FRONT" container"
docker-compose --project-name=$OLD_FRONT stop