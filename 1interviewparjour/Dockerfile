FROM python:3.8-buster

WORKDIR /usr/src/1interviewparjour/1interviewparjour

# set general environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE oneinterviewparjour.settings
ENV PYTHONPATH /usr/src/1interviewparjour/1interviewparjour

# Switch to 'dev' to be in dev mode
ENV ENV prod
# Switch to 'True' in dev mode
ENV DEBUG False
ENV FRONT_BASE_PATH https://1interviewparjour.com
# Switch to 'True' in prod mode
ENV STRIPE_LIVE_MODE False
ENV ASYNC_WORKER_COUNT 2
ENV VAULT_ENDPOINT http://${dockerhost}:8200
ENV DB_HOST ${dockerhost}
ENV DB_PORT 3306
# set AppRole environment variables
ENV APPROLE_ID ${approle_id}
ENV APPROLE_SECRET_ID ${approle_secret_id}

# install dependencies
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends gcc \
    && rm -rf /var/lib/apt/lists/* \
    && pip install cryptography
RUN apt-get -y install default-libmysqlclient-dev
RUN pip install --upgrade pip
RUN pip install -U wheel
COPY requirements/base.txt /usr/src/1interviewparjour/1interviewparjour/base.txt
RUN pip install -r base.txt

# copy project
COPY . /usr/src/1interviewparjour/1interviewparjour
RUN chmod +x launch-script.sh
RUN python3 manage.py collectstatic --no-input
CMD ["/bin/sh", "-c", "python3 ./oneinterviewparjour/run.py"]
