FROM python:3.8-buster

WORKDIR /usr/src/1interviewparjour/1interviewparjour
# For storing logs of stdout
RUN touch logs

ARG BUILD_COMMIT_ID
RUN echo $BUILD_COMMIT_ID

# set general environment variables
#ENV PYTHONDONTWRITEBYTECODE 1
#ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE oneinterviewparjour.settings
ENV PYTHONPATH /usr/src/1interviewparjour/1interviewparjour

# install dependencies
RUN apt-get update -y \
    && apt-get install -y --no-install-recommends gcc \
    && rm -rf /var/lib/apt/lists/* \
    && pip install cryptography

# Needed for python3 manage.py dbrestore and dbbackup (scheduled tasks)
RUN apt update -y
RUN apt -y install mariadb-server
#
RUN apt-get -y install libssl-dev
RUN apt-get -y install default-libmysqlclient-dev

RUN pip install --upgrade pip
RUN pip install -U wheel
COPY requirements/base.txt /usr/src/1interviewparjour/1interviewparjour/base.txt
RUN pip install -r base.txt

# copy project
COPY . /usr/src/1interviewparjour/1interviewparjour

EXPOSE 8000

# For prod : Bulid static files and
# * Detect migration and if so migrate models
# * Start gunicorn server with at 0.0.0.0:8000
# * Start DjangoQ and 2 async workers for the scheduled tasks.
# * Sync with DB snapshot regularly sent to S3
CMD ["/bin/sh", "-c", "python3 manage.py collectstatic --no-input && python3 ./oneinterviewparjour/run.py"]

# Only for testing purpose
# Build static files and run the server
#CMD ["/bin/sh", "-c", "python3 manage.py collectstatic --no-input && python3 manage.py runserver 0.0.0.0:8000"]
