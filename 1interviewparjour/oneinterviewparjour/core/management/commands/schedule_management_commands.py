from datetime import timedelta

import arrow
from django_q.models import Schedule

from oneinterviewparjour.core.base import BaseCommandWithLogger
from oneinterviewparjour.core.helpers import (
    iter_management_commands,
    to_minutes,
    WEEK, DAY, HOUR, MINUTE,
)


def infer_next_run(scheduling_info):
    """Return next arrow time for given scheduling info."""
    now = arrow.utcnow()
    start = arrow.get(scheduling_info.starting_datetime)
    delta = now - start
    run_count = to_minutes(delta) // scheduling_info.frequency_in_minutes + 1
    minutes_count = run_count * scheduling_info.frequency_in_minutes

    next_run = start.shift(minutes=+minutes_count)
    return next_run


class Command(BaseCommandWithLogger):
    """Schedule all management commands.

    This management command iterates over all available management commands
    and update their scheduling according to their `@schedule` decorator.

    Depending on the case, the scheduling can be either created (when a
    command is newly scheduled), updated (when a command's schedule is changed) or
    delered (when a command is unscheduled).
    """

    def handle(self, *args, **options):
        seen_cmds = set()
        for cmd in iter_management_commands():
            seen_cmds.add(cmd.name)

            if hasattr(cmd, 'scheduling_info'):
                self._schedule_command(cmd)
            else:
                self._unschedule_command(cmd)

        self._remove_missing_commands(seen_cmds)

    def _schedule_command(self, cmd):
        try:
            # Assume that the one running indefinitely is the one we scheduled
            current_schedule = Schedule.objects.exclude(
                schedule_type=Schedule.ONCE
            ).get(
                name=cmd.name,
                repeats__lt=0,
            )
        except Schedule.DoesNotExist:
            current_schedule = None
        except Schedule.MultipleObjectsReturned:
            self.logger.exception()

        next_run = infer_next_run(cmd.scheduling_info)
        new_schedule, created = Schedule.objects.update_or_create(
            name=cmd.name,
            defaults={
                'func': 'django.core.management.call_command',
                'args': str((cmd.name,)),
                'schedule_type': Schedule.MINUTES,
                'minutes': cmd.scheduling_info.frequency_in_minutes,
                'next_run': next_run.datetime,
                'repeats': -1, # always
            }
        )
        updated = (current_schedule and any([
            new_schedule.func != current_schedule.func,
            new_schedule.args != current_schedule.args,
            new_schedule.schedule_type != current_schedule.schedule_type,
            new_schedule.minutes != current_schedule.minutes,
            new_schedule.next_run != current_schedule.next_run,
            new_schedule.repeats != current_schedule.repeats,
        ]))
        schedule_str = self._build_scheduling_info_string(
            cmd.scheduling_info, next_run
        )
        if created:
            self.logger.info('Scheduled %s, %s.', cmd.name, schedule_str)
        elif updated:
            self.logger.info('Rescheduled %s, %s.', cmd.name, schedule_str)

    def _unschedule_command(self, cmd):
        count, _ = Schedule.objects.filter(name=cmd.name).delete()
        if count:
            self.logger.info('Unscheduled %s.', cmd.name)

    def _remove_missing_commands(self, present_cmds):
        for schedule in Schedule.objects.exclude(name__in=present_cmds):
            schedule.delete()
            self.logger.info('Removed %s', schedule.name)

    def _build_scheduling_info_string(self, scheduling_info, next_run):
        chunks = ['every ']
        frequency = timedelta(minutes=scheduling_info.frequency_in_minutes)
        if WEEK < frequency:
            chunks.extend([str(frequency.days // 7), ' weeks'])
        elif frequency == WEEK:
            chunks.append('week')
        elif DAY < frequency < WEEK:
            chunks.extend([frequency.days, ' days'])
        elif frequency == DAY:
            chunks.append('day')
        elif HOUR < frequency:
            chunks.extend([str(frequency.seconds // 60 // 60), ' hours'])
        elif frequency == HOUR:
            chunks.append('hour')
        elif MINUTE < frequency < HOUR:
            chunks.extend([str(frequency.seconds // 60), ' minutes'])
        elif frequency == MINUTE:
            chunks.append('minute')
        chunks.extend([', starting ', next_run.humanize()])
        msg = ''.join(chunks)
        return msg
