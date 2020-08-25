# 1interviewparjour.com

This is the repo of 1interviewparjour.com platform



## docker :

to launch the test MySQL DB for backend : `docker run --name 1interviewparjour-mysql -e MYSQL_ROOT_PASSWORD=oneinterviewparjour -d mysql:8`


## DjangoQ

link : valentinog.com/blog/django-q/


## Backend dockerfile :

the idea is to launch : `python3 ./one_interviewparjour/run.py --http_worker_count=<MACHINE_CPU_CORE_COUNT> --port=<PORT_TO_BIND>`

It'll do the following (in the given order):

* Apply all the migrations
* Schedule all the management commands
* Launch the Gunicorn workers
* Launch the DjangoQ cluster
