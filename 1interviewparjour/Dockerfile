FROM python:3.8-buster

WORKDIR /usr/src/1interviewparjour/1interviewparjour

ARG BUILD_COMMIT_ID
RUN echo $BUILD_COMMIT_ID

# set general environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE oneinterviewparjour.settings
ENV PYTHONPATH /usr/src/1interviewparjour/1interviewparjour

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

# Sync with the latest db snapshot
#RUN python3 manage.py dbrestore
# Collect the static files
#RUN python3 manage.py collectstatic --no-input
EXPOSE 8000
#CMD ["/bin/sh", "-c", "python3 ./oneinterviewparjour/run.py"]
# Only for testing purpose
CMD ["/bin/sh", "-c", "python3 manage.py runserver 0.0.0.0:8000"]
