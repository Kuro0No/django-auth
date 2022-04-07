from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Note (models.Model):
    user =models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    body = models.TextField(null=True)

    def __str__(self) -> str:
        return self.body