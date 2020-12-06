from django.conf import settings
from django.db import models
from pygments.lexers import get_all_lexers
from multiselectfield import MultiSelectField

from oneinterviewparjour.stripe.models import Price
from oneinterviewparjour.observability.mixins import ExportModelOperationsMixin


class Company(ExportModelOperationsMixin('company'), models.Model):
    name = models.CharField(max_length=250, default="1interviewparjour")

    def __str__(self):
        return f"name : {self.name}\n"


class User(ExportModelOperationsMixin('user'), models.Model):
    mail = models.CharField(max_length=250)
    training_languages = models.CharField(max_length=250, default="python")
    pro = models.BooleanField(default=False)
    inscription_timestamp = models.DateTimeField(auto_now_add=True)
    deinscription_timestamp = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return f"mail : {self.mail}\n"\
            + f"pro : {self.pro}\n"\
            + f"inscription : {self.inscription_timestamp}\n"\
            + f"deinscription : {self.deinscription_timestamp}\n"


class Topic(ExportModelOperationsMixin('topic'), models.Model):
    topic = models.CharField(max_length=50, default="aléatoire")

    def __str__(self):
        return f"topic : {self.topic}"


class Problem(ExportModelOperationsMixin('problem'), models.Model):

    DIFFICULTY = (
        ("easy","easy"),
        ("medium", "medium"),
        ("advanced", "advanced"),
        ("hard", "hard"),
        ("extrem", "extrem"),
    )

    LANGUAGES = [(l[1][0], l[0]) for l in get_all_lexers()]
    active = models.BooleanField(
        default=False,
        help_text=(
            f"Whether this problem is ready to be sent to the user."
            f"We recommend letting this False, receive the preview "
            f"and then update this field in True if the preview is OK."
        )
    )
    title = models.CharField(max_length=250, default="")
    difficulty = models.TextField(choices=DIFFICULTY, default="medium")
    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        null=True
    )

    def get_topics():
        return Topic.objects.values('topic')

    # A Problem model can have up to 3 different topics (callable here to avoid db error in the app registry)
    topic1 = MultiSelectField(choices=tuple([(idx, t['topic']) for idx, t in enumerate(get_topics())]), default="Aléatoire")
    topic2 = MultiSelectField(choices=tuple([(idx, t['topic']) for idx, t in enumerate(get_topics())]), default="Aléatoire")
    topic3 = MultiSelectField(choices=tuple([(idx, t['topic']) for idx, t in enumerate(get_topics())]), default="Aléatoire")

    keywords = models.TextField(default="")
    unit_price = models.ForeignKey(
        Price,
        on_delete=models.CASCADE,
        null=True,
        help_text="When a Problem is bought, we need to know what's the unit price of it. It could be a basic problem or a mini-project (more expensive)"
    )
    exercise = models.TextField()
    language = models.CharField(choices=LANGUAGES, max_length=250, default="Python")
    bootcode = models.TextField(default="")
    correction = models.TextField()
    explanation = models.TextField(default="")
    mail_preview = models.CharField(max_length=250, default="")


    def __str__(self):
        return f"title : {self.title}\n"\
            + f"company : {self.company}\n"


class ProblemHistory(ExportModelOperationsMixin('problemHistory'), models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE
    )

    sent_timestamp = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return (
            f"user : {self.user}\n"
            f"problem : {self.problem}\n"
            f"sent_timestamp : {self.sent_timestamp}\n"
        )


class BuyingHash(ExportModelOperationsMixin('buyingHash'), models.Model):
    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    hashed_token = models.CharField(max_length=128)


    def __str__(self):
        return (
            f"hashed_token : {self.hashed_token}\n"
            f"user : {self.user}\n"\
            f"problem : {self.problem}\n"
        )


class SupportedLanguage(models.Model):
    LANGUAGES = [(l[1][0], l[0]) for l in get_all_lexers()]
    language = models.CharField(choices=LANGUAGES, max_length=100, default="Python")
    description = models.TextField(default="")


    def __str__(self):
        return f"language : {self.language}\n"\
            + f"description : {self.description}\n"


class PlanningEvent(ExportModelOperationsMixin('planningEvent'), models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    title = models.TextField(default="Interview")
    day = models.IntegerField() # 0 to 6
    time = models.CharField(max_length=6) # ex: 12:30
    language = models.CharField(max_length=100, default="Python")
    difficulty = models.CharField(max_length=20, default="medium")
    topics = models.TextField(default="Aléatoire")

    def __str__(self):
        return (
            f"user : {self.user.mail}\n"
            f"title : {self.title}\n"
            f"language : {self.language}\n"
            f"difficulty : {self.difficulty}\n"
            f"topics : {self.topics}\n"
        )
