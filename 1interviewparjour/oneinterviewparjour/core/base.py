import inspect
import json
import logging
import os
import types


from django.core.management import BaseCommand
from oneinterviewparjour import settings


class BaseCommandWithLogger(BaseCommand):
    """Drop-in replacement for BaseCommand with a pre-instanciated logger.

    In addition, if the command is ran in a Kubernetes environment, any uncaught
    exception arising from the `handle` method is transparently logged and
    silenced. Depending on the logger configuration, such exceptions may then
    be routed to a log reporting tool like Sentry.

    At last, if the command has a return value, try to serialize it to JSON or
    casting it to a string as fallback (Django raises a non-explicit error if a
    management commands returns something else than None or a string)
    """

    def __new__(cls, *args, **kwargs):
        """Decorate the handle method in order to log uncaught exceptions"""
        obj = super(BaseCommandWithLogger, cls).__new__(cls, *args, **kwargs)
        _initial_handle = obj.handle

        def handle(self, *args, **kwargs):
            try:
                result = _initial_handle(*args, **kwargs)
                try:
                    return json.dumps(result)
                except TypeError:
                    return str(result)
            except Exception as exc:
                if not settings.K8S_ENV:
                    raise

                elf.logger.exception(str(exc))

                # If the exception was raised from a command running on the
                # Django Q cluster, we need to raise it again to mark the task
                # as failed and record the exception in the task result.
                if hasattr(self, 'scheduling_info'):
                    raise

        obj.handle = types.MethodType(handle, obj)
        return obj

    def __init__(self, *args, **kwargs):
        """Instantiate a logger for this command"""
        super(BaseCommandWithLogger, self).__init__(*args, **kwargs)
        logger_name = '/'.join([self.app_name, self.name])
        self.logger = logging.getLogger(logger_name)

    def handle(self, *args, **options):
        raise NotImplementedError(
            'subclasses of BaseCommandWithLogger must provide a handle()'
            ' method'
        )

    @property
    def app_name(self):
        """Return this command's application name.

        This implementation assumes the path to this management command is of
        the following form:

            <app_name>/management/commands/<command_name>.py

        This precise path is actually a requirement for Django to be able to
        run the command.
        """
        module_filepath = inspect.getfile(type(self))
        parent_dir = os.path.dirname
        app_dirpath = parent_dir(parent_dir(parent_dir(module_filepath)))
        app_name = os.path.basename(app_dirpath)
        return app_name

    @property
    def name(self):
        """Return this command's name.

        The name of a Django management command is nothing more than the name
        of the file where it sits, with the extension stripped out.
        """
        module_filepath = inspect.getfile(type(self))
        module_filename = os.path.basename(module_filepath)
        command_name, _ = os.path.splitext(module_filename)
        return command_name

