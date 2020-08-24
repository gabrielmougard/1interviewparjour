from django.db import models


class User(models.Model):
    mail = models.CharField(max_length=250)
    pro = models.BooleanField(default=False)
    inscription_timestamp = models.DateTimeField(auto_now_add=True)
    deinscription_timestamp = models.DateTimeField(null=True, blank=True)


    def __str__(self):
        return f"mail : {self.mail}\n"\
            + f"pro : {self.pro}\n"\
            + f"inscription : {self.inscription_timestamp}\n"\
            + f"deinscription : {self.deinscription_timestamp}\n"


class Problem(models.Model):
    exercise = models.TextField()
    correction = models.TextField()
    difficulty = models.TextField()

    def __str__(self):
        return f"exercise : {self.exercise}\n"\
            + f"correction : {self.correction}\n"\
            + f"difficulty : {self.difficulty}\n"

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

