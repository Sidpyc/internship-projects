
# Create your models here.
from django.db import models


# Create your models here.
class Fashion(models.Model):
    
    name = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    def __str__(self):
        return self.name