FROM python:3.8.1-slim-buster

WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install dependencies
RUN pip install --upgrde pip
COPY ../../../1interviewparjour/requirements/base.txt /usr/src/app/base.txt
RUN pip install -r base.txt

# copy project
COPY ../../../1interviewparjour /usr/src/app/
CMD ["/bin/sh", "-c", "launch-script.sh"]
