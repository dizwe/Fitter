from django.contrib.postgres.fields import JSONField
from django.db import models

# Create your models here.
class Person(models.Model):
    SMALL =0; AVG = 1; BIG = 2
    CHOICES = [(SMALL, '많이 남는다'), (AVG, '별로 불편한 것이 없다'), (BIG, '낀다')]

    name = models.CharField(max_length = 10)
    weight = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    shoulder_a = models.IntegerField(choices=CHOICES, default=AVG)
    chest_a = models.IntegerField(choices=CHOICES, default=AVG)
    sleeve_a = models.IntegerField(choices=CHOICES, default=AVG)

    def __str__(self): # Change title as name(메소드처럼)
        return self.name

class TopClothes(models.Model):
    length = models.FloatField(default=0)
    shoulder = models.FloatField(default=0)
    chest = models.FloatField(default=0)
    sleeve = models.FloatField(default=0)


# Create your models here.
