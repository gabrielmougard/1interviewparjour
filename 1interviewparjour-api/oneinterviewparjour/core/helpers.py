import contextlib
import logging
import datetime
import math

LOGGER = logging.getLogger(__name__)

MINUTE = MINUTES = datetime.timedelta(minutes=1)
HOUR = HOURS = datetime.timedelta(hours=1)
DAY = DAYS = datetime.timedelta(days=1)
WEEK = WEEKS = datetime.timedelta(weeks=1)
MONTH = MONTHS = datetime.timedelta(days=365 / 12)
QUARTER = QUARTERS = datetime.timedelta(days=365 / 4)
SEMESTER = SEMESTERS = datetime.timedelta(days=365 / 2)
YEAR = YEARS = datetime.timedelta(days=365)


def to_minutes(td):
    """Convert to timedelta into a number of minutes"""
    seconds_in_a_day = 24 * 60 * 60
    seconds = td.days * seconds_in_a_day + td.seconds
    minutes = math.ceil(seconds / 60.)
    return minutes


def iter_management_commands():
    """Return an iterator over all available management commands."""
    cmd_infos = django.core.management.get_commands()
    for cmd_name, app_name in cmd_infos.items():
        if not app_name.startswith('oneinterviewparjour.'):
            continue

        try:
            cmd = django.core.management.load_command_class(app_name, cmd_name)
        except Exception:
            LOGGER.exception('Unable to load %s.%s', app_name, cmd_name)
            continue

        yield cmd

@contextlib.contextmanager
def no_debug_logs():
    # highest level is to be changed if a custom logging level is defined
    # higher thatn critical
    highest_level = logging.WARNING
    previous_level = logging.root.manager.disable
    logging.disable(highest_level)
    try:
        yield
    finally:
        logging.disable(previous_level)
