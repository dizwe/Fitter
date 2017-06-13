from django.contrib.postgres.fields import JSONField
from django.db import models
from django.conf import settings


# Create your models here.
class Person(models.Model):
    SMALL =0; AVG = 1; BIG = 2
    CHOICES = [(SMALL, '많이 남는다'), (AVG, '별로 불편한 것이 없다'), (BIG, '낀다')]

    name = models.ForeignKey(settings.AUTH_USER_MODEL)
    weight = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    shoulder_a = models.IntegerField(choices=CHOICES, default=AVG)
    chest_a = models.IntegerField(choices=CHOICES, default=AVG)
    sleeve_a = models.IntegerField(choices=CHOICES, default=AVG)
    # 하의
    hip_a = models.IntegerField(choices=CHOICES, default=AVG)
    crotch_a = models.IntegerField(choices=CHOICES, default=AVG)
    length_a = models.IntegerField(choices=CHOICES, default=AVG)
    thigh_a = models.IntegerField(choices=CHOICES, default=AVG)
    hem_a = models.IntegerField(choices=CHOICES, default=AVG)

    # def __str__(self):  # Change title as name(메소드처럼)
    #     return self.height


class TopClothes(models.Model):
    name = models.ForeignKey(settings.AUTH_USER_MODEL)
    nick = models.CharField(max_length=10, default='Untitled')
    size = models.CharField(max_length=4, default='FREE')
    top_length = models.FloatField(default=0)
    shoulder = models.FloatField(default=0)
    chest = models.FloatField(default=0)
    sleeve = models.FloatField(default=0)


class BottomClothes(models.Model):
    name = models.ForeignKey(settings.AUTH_USER_MODEL)
    nick = models.CharField(max_length=10, default='Untitled')
    size = models.CharField(max_length=4, default='FREE')
    waist = models.FloatField(default=0)
    bot_length = models.FloatField(default=0)
    crotch = models.FloatField(default=0)
    thigh = models.FloatField(default=0)
    hem = models.FloatField(default=0)


# Create your models here.
