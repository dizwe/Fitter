from django.db import models
from django.conf import settings
from django_resized import ResizedImageField

required = '채워주세요.'
class SizeInfo(models.Model):
    MAN = 'man'; WOMAN = 'woman'
    SEX_CHOICES = [(MAN, '남자'), (WOMAN, '여자')]
    sex = models.CharField(max_length=5, choices=SEX_CHOICES, default=WOMAN)
    weight = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    shoulder = models.CharField(max_length=40, default=None)
    chest = models.CharField(max_length=40, default=None)
    arm = models.CharField(max_length=40, default=None)
    waist = models.CharField(max_length=40, default=None)
    bottom_waist = models.CharField(max_length=40, default=None)
    crotch = models.CharField(max_length=40, default=None)
    thigh = models.CharField(max_length=40, default=None)
    length = models.CharField(max_length=40, default=None)
    hem = models.CharField(max_length=40, default=None)
    hip = models.CharField(max_length=40, default=None)
    crotch_height = models.CharField(max_length=40, default=None)
    middle_thigh = models.CharField(max_length=40, default=None)
    knee = models.CharField(max_length=40, default=None)
    calf = models.CharField(max_length=40, default=None)
    nipple = models.CharField(max_length=40, default=None)

    def __str__(self):  # Change title as name(메소드처럼)
        return r"%s %s %s" % (self.sex, str(self.height), str(self.weight))



class Person(models.Model):
    SMALL =0; AVG = 1; BIG = 2
    CHOICES = [(SMALL, '작다'), (AVG, '보통'), (BIG, '크다')]
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


class CriteriaTop(models.Model):
    cri_top_length = models.FloatField(default=0)
    cri_shoulder = models.FloatField(default=0)
    cri_chest = models.FloatField(default=0)
    cri_sleeve = models.FloatField(default=0)


class CriteriaBottom(models.Model):
    cri_bot_length = models.FloatField(default=0)
    cri_waist = models.FloatField(default=0)
    cri_hip = models.FloatField(default=0)
    cri_crotch = models.FloatField(default=0)
    cri_thigh = models.FloatField(default=0)
    cri_hem = models.FloatField(default=0)


class SameClothes(models.Model):
    same_nick = models.CharField(max_length=80, default='Untitled')
    same_photo = ResizedImageField(blank=True, size=[300, 300], upload_to="%Y/%m/%d")
    same_url = models.URLField(blank=True, default='')

    def __str__(self):  # Change title as name(메소드처럼)
        return str(self.same_nick)


class TopClothes(models.Model):
    name = models.ForeignKey(settings.AUTH_USER_MODEL)
    photo = models.ForeignKey(SameClothes, on_delete=models.CASCADE, related_name='topclothes_photo_set')
    url = models.ForeignKey(SameClothes, on_delete=models.CASCADE, related_name='topclothes_url_set', null=True)
    nick = models.ForeignKey(SameClothes, on_delete=models.CASCADE, related_name='topclothes_nick_set')
    size = models.CharField(max_length=4, default='FREE')
    top_length = models.FloatField(default=0)
    shoulder = models.FloatField(default=0)
    chest = models.FloatField(default=0)
    sleeve = models.FloatField(default=0)

    def __str__(self):  # Change title as name(메소드처럼)
        print(self.nick.same_nick)
        return str(self.nick.same_nick)


class BottomClothes(models.Model):
    name = models.ForeignKey(settings.AUTH_USER_MODEL)
    photo = models.ForeignKey(SameClothes, on_delete=models.CASCADE, related_name='bottomclothes_photo_set')
    url = models.ForeignKey(SameClothes, on_delete=models.CASCADE, related_name='bottomclothes_url_set', null=True)
    nick = models.ForeignKey(SameClothes, on_delete=models.CASCADE, related_name='bottomclothes_nick_set')
    size = models.CharField(max_length=4, default='FREE')
    bot_length = models.FloatField(default=0)
    waist = models.FloatField(default=0)
    hip = models.FloatField(default=0)
    crotch = models.FloatField(default=0)
    thigh = models.FloatField(default=0)
    hem = models.FloatField(default=0)

    def __str__(self):  # Change title as name(메소드처럼)
        return str(self.nick.same_nick)


class SingleDataList(models.Model):
    suggested_size = models.CharField(max_length=800, default='{}')
    single_person_dict = models.CharField(max_length=800, default='{}')
    clothes_dict = models.CharField(max_length=800, default='{}')
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def __str__(self):  # Change title as name(메소드처럼)
        return str(self.created)