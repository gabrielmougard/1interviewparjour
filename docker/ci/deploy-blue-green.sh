#!/bin/sh

if [ $(docker ps -f name=ci_1interviewparjour-backend-blue -q) ]
then
    ENV_BACK="ci_1interviewparjour-backend-green"
    OLD_BACK="ci_1interviewparjour-backend-blue"
else
    ENV_BACK="ci_1interviewparjour-backend-blue"
    OLD_BACK="ci_1interviewparjour-backend-green"
fi

echo "Starting "$ENV_BACK" container"
docker-compose --project-name=$ENV_BACK up -d

echo "Waiting..."
sleep 5s

echo "Stopping "$OLD_BACK" container"
docker-compose --project-name=$OLD_BACK stop

# frontend configuration
if [ $ENV_BACK == "ci_1interviewparjour-backend-green" ]; then
    BACKEND_ENDPOINT="http://localhost:8001"
    echo "The backend endpoint (green mode) is $BACKEND_ENDPOINT"
else
    BACKEND_ENDPOINT="http://localhost:8000"
    echo "The backend endpoint (blue mode) is $BACKEND_ENDPOINT"
fi
sed -e "s/\${backend-endpoint}/$BACKEND_ENDPOINT/" web.env > web-temp.env && rm web.env && cat web-temp.env > web.env && rm web-temp.env
#

if [ $(docker ps -f name=ci_1interviewparjour-web-blue -q) ]
then
    ENV_FRONT="ci_1interviewparjour-web-green"
    OLD_FRONT="ci_1interviewparjour-web-blue"
else
    ENV_FRONT="ci_1interviewparjour-web-blue"
    OLD_FRONT="ci_1interviewparjour-web-green"
fi

echo "Starting "$ENV_FRONT" container"
docker-compose --project-name=$ENV_FRONT up -d

echo "Waiting..."
sleep 5s

echo "Stopping "$OLD_FRONT" container"
docker-compose --project-name=$OLD_FRONT stop