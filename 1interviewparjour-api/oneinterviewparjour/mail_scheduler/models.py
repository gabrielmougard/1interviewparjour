from django.db import models

# Create your models here.
class CompanyLogo(models.Model):
    name = models.CharField(max_length=250, default="1interviewparjour")
    logo = models.TextField()

    def __str__(self):
        return f"name : {self.name}\n"\
            + f"logo : {self.logo}\n"