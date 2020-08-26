import datetime
import math


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