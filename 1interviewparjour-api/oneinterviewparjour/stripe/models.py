from django.db import models

# Create your models here.
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
        return f"hashed_token : {self.hashed_token}\n"\
            + f"user : {self.user}\n"\
            + f"problem : {self.problem}\n"
