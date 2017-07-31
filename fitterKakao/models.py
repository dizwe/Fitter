from django.contrib.postgres.fields import JSONField
from django.db import models
from django.conf import settings

required = '채워주세요.'
class SizeInfo(models.Model):
    MAN = 'man'; WOMAN = 'woman'
    SEX_CHOICES = [(MAN, '남자'), (WOMAN, '여자')]
    sex = models.CharField(max_length=5, choices=SEX_CHOICES, default=WOMAN)
    weight = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    shoulder = models.CharField(max_length=30, default=None)
    chest = models.CharField(max_length=30, default=None)
    arm = models.CharField(max_length=30, default=None)
    waist = models.CharField(max_length=30, default=None)
    bottom_waist = models.CharField(max_length=30, default=None)
    crotch = models.CharField(max_length=30, default=None)
    thigh = models.CharField(max_length=30, default=None)
    length = models.CharField(max_length=30, default=None)
    hem = models.CharField(max_length=30, default=None)
    hip = models.CharField(max_length=30, default=None)
    crotch_height = models.CharField(max_length=30, default=None)
    middle_thigh = models.CharField(max_length=30, default=None)
    knee = models.CharField(max_length=30, default=None)
    calf = models.CharField(max_length=30, default=None)
    nipple = models.CharField(max_length=30, default=None)

    def __str__(self):  # Change title as name(메소드처럼)
        return r"%s %s %s" % (self.sex, str(self.height), str(self.weight))



class Person(models.Model):
    SMALL =0; AVG = 1; BIG = 2
    CHOICES = [(SMALL, '많이 남는다'), (AVG, '별로 불편한 것이 없다'), (BIG, '낀다')]
    MAN = 'man'; WOMAN = 'woman'
    SEX_CHOICES = [(MAN, '남자'), (WOMAN, '여자')]
    name = models.ForeignKey(settings.AUTH_USER_MODEL)
    sex = models.CharField(max_length=5, choices=SEX_CHOICES, default=WOMAN)
    weight = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    # 상의
    shoulder_a = models.IntegerField(choices=CHOICES, default=AVG)
    chest_a = models.IntegerField(choices=CHOICES, default=AVG)
    sleeve_a = models.IntegerField(choices=CHOICES, default=AVG)
    waist_a = models.IntegerField(choices=CHOICES, default=AVG)
    # 하의
    hip_a = models.IntegerField(choices=CHOICES, default=AVG)
    crotch_a = models.IntegerField(choices=CHOICES, default=AVG)
    length_a = models.IntegerField(choices=CHOICES, default=AVG)
    thigh_a = models.IntegerField(choices=CHOICES, default=AVG)
    hem_a = models.IntegerField(choices=CHOICES, default=AVG)

    def __str__(self):  # Change title as name(메소드처럼)
        return self.name.username


class ClothesNick(models.Model):
    nick = models.CharField(max_length=20, default='Untitled')


class TopClothes(models.Model):
    name = models.ForeignKey(settings.AUTH_USER_MODEL)
    photo = models.ImageField(blank=True, upload_to="top/%Y/%m/%d")
    nick = models.CharField(max_length=50, default='Untitled')
    size = models.CharField(max_length=4, default='FREE')
    top_length = models.FloatField(default=0)
    shoulder = models.FloatField(default=0)
    chest = models.FloatField(default=0)
    sleeve = models.FloatField(default=0)

    def __str__(self):  # Change title as name(메소드처럼)
        return self.nick

class BottomClothes(models.Model):
    name = models.ForeignKey(settings.AUTH_USER_MODEL)
    photo = models.ImageField(blank=True, upload_to="bot/%Y/%m/%d")
    nick = models.CharField(max_length=20, default='Untitled')
    size = models.CharField(max_length=4, default='FREE')
    bot_length = models.FloatField(default=0)
    waist = models.FloatField(default=0)
    hip = models.FloatField(default=0)
    crotch = models.FloatField(default=0)
    thigh = models.FloatField(default=0)
    hem = models.FloatField(default=0)

    def __str__(self):  # Change title as name(메소드처럼)
        return self.nick

# Create your models here.
