
from django.db import models
# Create your models here.
class Groceries(models.Model):
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
