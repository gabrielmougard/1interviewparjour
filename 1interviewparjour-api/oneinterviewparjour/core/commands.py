import collections
import datetime
import re
import arrow

from oneinterviewparjour.core.helpers import to_minutes

SchedulingInfo = collections.namedtuple('SchedulingInfo', (
    'frequency_in_minutes', 'starting_datetime', 'ending_datetime'
))


def schedule(every, starting='09:00:00', ending='19:00:00'):
    """
    Returning a class decorator for scheduling a management command.

    This class decorator only marks the decorated class with an additional
    attribute called `scheduling_info`. This information is then used by the
    `schedule_management_commands` management command which, when called,
    update the DjangoQ's Schedule instances accordingly.

    Example:
        >>> from oneinterviewparjour.core.helpers import HOURS
        >>> @schedule(every= HOURS, starting='09:00:00', ending='19:00:00')
        >>> class Command(MailScheduler):
        >>>     pass
    """
    if not isinstance(every, datetime.timedelta):
        raise ValueError(
            'First parameter must be a datetime.timedelta instance.'
        )

    datetime_or_time_pattern = r'(\d{4}-\d{2}-\d{2}T)?\d{2}:\d{2}:\d{2}'
    if not re.match(datetime_or_time_pattern, starting):
        raise ValueError(
            'Second parameter must be one of the following forms:'
            ' "YYYYY-MM-DDThh:mm:ss" or "hh:mm:ss"'
        )
    if not re.match(datetime_or_time_pattern, ending):
        raise ValueError(
            'Third parameter must be one of the following forms:'
            ' "YYYYY-MM-DDThh:mm:ss" or "hh:mm:ss"'
        )

    # Make sure `starting` and `ending` are ISO8601-compliant timestamp string
    def class_decorator(cls):
        cls.scheduling_info = SchedulingInfo(
            frequency_in_minutes=to_minutes(every),
            starting_datetime=arrow.get(starting),
            ending_datetime=arrow.get(ending)
        )
        return cls

    return class_decorator
