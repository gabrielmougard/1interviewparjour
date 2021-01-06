#!/bin/bash

BUILD_COMMIT_ID=$(git log -n1 --format="%h")

if [[ $# -eq 0 ]]; then
    echo "No options. Pushing every images..."
    docker build ../../web -t gabrielmougard/1interviewparjour-web:latest --build-arg BUILD_COMMIT_ID=${BUILD_COMMIT_ID}
    docker push gabrielmougard/1interviewparjour-web:latest
    docker build ../../1interviewparjour -t gabrielmougard/1interviewparjour-app:latest --build-arg BUILD_COMMIT_ID=${BUILD_COMMIT_ID}
    docker push gabrielmougard/1interviewparjour-app:latest
    exit 0
fi

while [[ $# -gt 0 ]]
do
    key="$1"

    case $key in
        -a|--all)
        echo "Pushing every images..."
        docker build ../../web -t gabrielmougard/1interviewparjour-web:latest --build-arg BUILD_COMMIT_ID=${BUILD_COMMIT_ID}
        docker push gabrielmougard/1interviewparjour-web:latest
        docker build ../../1interviewparjour -t gabrielmougard/1interviewparjour-app:latest --build-arg BUILD_COMMIT_ID=${BUILD_COMMIT_ID}
        docker push gabrielmougard/1interviewparjour-app:latest
        exit 0
        ;;
        -w|--web)
        echo "Pushing only gabrielmougard/1interviewparjour-web:latest..."
        docker build ../../web -t gabrielmougard/1interviewparjour-web:latest --build-arg BUILD_COMMIT_ID=${BUILD_COMMIT_ID}
        docker push gabrielmougard/1interviewparjour-web:latest
        shift # past argument
        shift # past value
        ;;
        -b|--back)
        echo "Pushing only gabrielmougard/1interviewparjour-app:latest..."
        docker build ../../1interviewparjour -t gabrielmougard/1interviewparjour-app:latest --build-arg BUILD_COMMIT_ID=${BUILD_COMMIT_ID}
        docker push gabrielmougard/1interviewparjour-app:latest
        shift # past argument
        shift # past value
        ;;
        *) # unknown option, push everything by default
        echo "Unknow option. Pushing every images..."
        docker build ../../web -t gabrielmougard/1interviewparjour-web:latest --build-arg BUILD_COMMIT_ID=${BUILD_COMMIT_ID}
        docker push gabrielmougard/1interviewparjour-web:latest
        docker build ../../1interviewparjour -t gabrielmougard/1interviewparjour-app:latest --build-arg BUILD_COMMIT_ID=${BUILD_COMMIT_ID}
        docker push gabrielmougard/1interviewparjour-app:latest
        exit 0
        ;;
    esac
done

echo "Images pushed successfully !"
exit 0
