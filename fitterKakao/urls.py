# -*- coding: utf-8 -*-

from django.conf.urls import url
from . import views  # .은 현재 디렉토리 의미

app_name = 'fitterKakao'
urlpatterns = [
    url(r'^$', views.index, name = 'index'),
    url(r'^result/(?P<kinds>[a-z]+)/(?P<tag_num>[0-9]+)/$', views.suppose_size, name='suppose_size'),
    url(r'^new/$', views.post_new, name='post_new'),
    url(r'^edit/(?P<user_name>[a-zA-Z]+)/$', views.post_edit, name='post_edit'),
    url(r'^check/$', views.check_data, name='check_data'),
    url(r'^clothes/$', views.choose_clothes, name='choose_clothes'),
    url(r'^clothes/new/(?P<kinds>[a-z]+)/$', views.add_clothes, name='add_clothes'),
    url(r'^clothes/del/(?P<kinds>[a-z]+)/(?P<tag_num>[0-9]+)/$', views.delete_clothes, name='delete_clothes'),
    url(r'^clothes/edit/(?P<kinds>[a-z]+)/(?P<tag_num>[0-9]+)/$', views.edit_clothes, name='edit_clothes'),
    url(r'^queer/$', views.data_add, name='data_add'),
    # url(r'^keyboard/', views.keyboard), # 카톡
    # url(r'^message', views.answer), # 카톡
]