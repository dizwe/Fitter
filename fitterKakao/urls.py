# -*- coding: utf-8 -*-

from django.conf.urls import url
from . import views  # .은 현재 디렉토리 의미

app_name = 'elections'
urlpatterns = [
    url(r'^$', views.index),
]