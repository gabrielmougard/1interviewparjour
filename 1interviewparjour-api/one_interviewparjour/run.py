#!/usr/bin/env python3

"""
Run 1interviewparjour backend (container entrypoint)
"""

import sys
import os
import textwrap
import atexit
import functools

import django
import docopt

from django.core.management import call_command
from django.core.wsgi import get_wsgi_application

from one_interviewparjour.core.migrations import update_database
from one_interviewparjour.core.workers import start_gunicorn_workers
from one_interviewparjour.core.queue import start_django_queue_cluster, stop_django_queue_cluster

DEFAULT_GUNICORN_PORT = '8000'

my_call_command = functools.partial(call_command, **{
    'traceback': True,
})

ACTIONS = [
    'migrations',  # apply migrations
    'schedules',   # schedule management commands
    'workers',     # launch Gunicorn workers
    'qcluster',    # launch DjangoQ workers
]


def run(args):
    application = get_wsgi_application()

    if "migrations" in args["action"]:
        update_database(args)

    if 'schedules' in args["action"]:
        my_call_command('schedule_management_commands')

    if "qcluster" in args["action"]:
        # must be imported after application load
        from django_q.cluster import Cluster
        cluster = Cluster()
        start_django_queue_cluster(cluster)
        atexit.register(stop_django_queue_cluster, cluster)

    if "workers" in args["action"]:
        start_gunicorn_workers(application, args)


def main():
    def parse_args(usage):
        script_name = os.path.basename(sys.argv[0])
        usage = usage.replace('CMD', script_name)
        usage = textwrap.dedent(usage)
        args = docopt.docopt(usage)
        return args

    django.setup()

    help_text = '''
        Run 1interviewparjour

        Usage:
            CMD [<action>...] [options]
            CMD -h | --help

        Valid actions are : {actions}.
        Order does not matter. Default is to run all actions.

        Options:
            --port=PORT                     TCP Port to bind [default: {default_port}]
            --http_worker_count=COUNT       Number of parallel workers to spawn [default: 1]
            -h --help                       Show this screen
    '''

    args = parse_args(
        help_text.format(actions=", ".join(ACTIONS),
                         default_port=DEFAULT_GUNICORN_PORT,
                        )
    )

    args["actions"] = set(args.pop("<action>") or ACTIONS)
    args["port"] = int(args.pop("--port"))
    args["http_worker_count"] = int(args.pop("--http_worker_count"))
    args["app_name"] = "one_interviewparjour"
    args["app_setting"] = "one_interviewparjour.settings"

    try:
        sys.exit(run(args))
    except KeyboardInterrupt:
        sys.exit(1)


if __name__ == '__main__':
    main()

