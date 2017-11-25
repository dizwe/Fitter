from django.contrib import admin

from .models import Person, TopClothes, BottomClothes, SizeInfo, SameClothes, SingleDataList, CriteriaTop, CriteriaBottom
# Register your models here.

admin.site.register(Person)
admin.site.register(TopClothes)
admin.site.register(BottomClothes)
admin.site.register(SizeInfo)
admin.site.register(SameClothes)
admin.site.register(SingleDataList)
admin.site.register(CriteriaTop)
admin.site.register(CriteriaBottom)

# Register your models here.
