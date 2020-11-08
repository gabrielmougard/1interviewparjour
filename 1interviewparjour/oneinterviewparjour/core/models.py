from django.db import models
from pygments.lexers import get_all_lexers

from oneinterviewparjour.stripe.models import Price

from oneinterviewparjour.core.helpers import send_preview
from oneinterviewparjour.mail_scheduler.ses import AmazonSender


class Company(models.Model):
    name = models.CharField(max_length=250, default="1interviewparjour")

    def __str__(self):
        return f"name : {self.name}\n"


class User(models.Model):
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


class Problem(models.Model):

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

    def save(self, *args, **kwargs):
        """
        After effectively creating a problem to DB, we must
        send a preview to the `mail_preview` address.
        """
        super(Problem, self).save(*args, **kwargs)
        ses_client = AmazonSender()
        send_preview(self, ses_client)

    def update(self, *args, **kwargs):
        """
        After effectively updating a problem to DB, we must
        send a preview to the `mail_preview` address.
        """
        super(Problem, self).update(*args, **kwargs)
        ses_client = AmazonSender()
        send_preview(self, ses_client)

    def __str__(self):
        return f"title : {self.title}\n"\
            + f"company : {self.company}\n"


class Program(models.Model):
    hour = models.IntegerField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    problem = models.ForeignKey(
        Problem,
        on_delete=models.CASCADE
    )


    def __str__(self):
        return f"hour : {self.hour}\n"\
            + f"user : {self.user}\n"\
            + f"problem : {self.problem}\n"


class ProgramHistory(models.Model):
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


class BuyingHash(models.Model):
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
