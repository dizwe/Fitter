# -*- coding: utf-8 -*-

from django.conf.urls import url
from . import views  # .은 현재 디렉토리 의미

app_name = 'fitterKakao'
urlpatterns = [
    url(r'^$', views.index, name = 'index'),
    url(r'^result/', views.suppose_size, name = 'suppose_size'),
    url(r'^new/$', views.post_new, name='post_new'),
    url(r'^keyboard/', views.keyboard), # 카톡
    url(r'^message', views.answer), # 카톡
]