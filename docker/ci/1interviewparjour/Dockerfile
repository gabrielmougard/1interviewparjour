FROM python:3.8.1-slim-buster

WORKDIR /usr/src/app

# set general environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# set AppRole environment variables
ENV APPROLE_ID ${approle_id}
ENV APPROLE_SECRET_ID ${approle_secret_id}

# install dependencies
RUN pip install --upgrde pip
COPY ../../../1interviewparjour/requirements/base.txt /usr/src/app/base.txt
RUN pip install -r base.txt

# copy project
COPY ../../../1interviewparjour /usr/src/app/
CMD ["/bin/sh", "-c", "launch-script.sh"]
