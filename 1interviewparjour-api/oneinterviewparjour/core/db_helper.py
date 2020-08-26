import functools
import logging
import time

from django.core.management import call_command
from django.db import connections
from django.db.migrations.executor import MigrationExecutor
from django_mysql.exceptions import TimeoutError as MysqlTimeoutError
from django_mysql.locks import Lock


my_call_command = functools.partial(call_command, **{"traceback": True})


def fibonacci():
    """
    Return an iterator over the Fibonacci series
    """
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


def has_pending_migrations():
    """
    Return True if there are pending migrations for default database.
    """
    connection = connections["default"]
    connection.prepare_database()
    executor = MigrationExecutor(connection)
    targets = executor.loader.graph.leaf_nodes()
    _has_pending_migrations = bool(executor.migration_plan(targets))
    return _has_pending_migrations


def apply_migrations_actions(actions):
    if "migrations" in actions:
        logging.debug("apply new database migrations")
        my_call_command("migrate", "--noinput")
        logging.debug("create cache table if needed")
        my_call_command("createcachetable")

    if has_pending_migrations():
        raise Exception("pending migrations")


def update_database(args, migration_actions=apply_migrations_actions):
    """
    Apply migrations once at startup
    """
    # Database migrations are re-entrant (ie. they can be ran multiple times in
    # a row, while producing the same output) but they cannot be ran in
    # parallel. In order to prevent multiple starting instances to run the
    # migrations at the same time, we must elect a single one which will be
    # in charge of applying them once.
    #
    # This is done through a shared user lock implemented on top of the
    # database server. The instance that acquires the lock can apply the
    # migrations. The other instances must wait for the lock to be released
    # before continuing.

    lock = Lock("migrations", acquire_timeout=0.1)
    lock_info = "{lock} on {hostname} port:{port}".format(
        lock=lock.name,
        hostname=lock.get_cursor().db.connection.get_host_info(),
        port=lock.get_cursor().db.connection.port,
    )
    try:
        lock.acquire()
    except MysqlTimeoutError:
        # The startup lock has already been acquired by another starting
        # instance of the service. Let's just wait for it to complete the
        # database-related changes before going further o our side.
        increasing_seconds = fibonacci()
        while lock.is_held():
            logging.debug("waiting for the lock to be released: %s", lock_info)
            time.sleep(next(increasing_seconds))

        if has_pending_migrations():
            # The lock has been released but, apparently, the migrations have
            # not been completely applied. Something is wrong. We should
            # probably stop here and let an human see what is happening.
            logging.debug("lock released but migrations not applied")
            raise Exception("pending migrations, not starting")
    else:
        # Yay! We acquired the startup lock before other competing instances.
        # Let's apply all database-related changes while the other instances
        # are simply waiting for us to release the lock.
        logging.debug("lock acquired: %s", lock_info)
        try:
            migration_actions(args["actions"])
        finally:
            lock.release()
            logging.debug("lock released: %s", lock_info)
