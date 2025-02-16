from django.db import models

# Create your models here.
from django.db import models

class Student(models.Model):
    roll_num = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.name
