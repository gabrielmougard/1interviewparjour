import contextlib
import logging
import datetime
import math

import django
from django.conf import settings

from oneinterviewparjour.mail_scheduler.helpers import generate_template_mail

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


def send_preview(problem, ses_client):
    """
    Send a preview mail directly after inserting a Problem into DB
    """
    problem_metadata = {
        "problem": problem,
        "payment_gateway_link": settings.FRONT_BASE_PATH  # In the preview we do not test the payment, only the mail aspect.
    }

    if problem.company.name == "1interviewparjour":
        problem_metadata["company_message"] = "Cette interview est une création originale"
    else:
        problem_metadata["company_message"] = "Ce probleme est inspiré d'une interview donnée par"

    mail_content = [generate_template_mail(problem_metadata, True), generate_template_mail(problem_metadata, False)]

    for idx, m in enumerate(mail_content):
        ses_client.send_email(
            "h3llb0t@1interviewparjour.com",
            [problem.mail_preview],
            f"[1INTERVIEWPARJOUR][PREVIEW]{'[PRO]' if idx == 0 else ''} {problem_metadata['problem'].title}",
            m
        )

