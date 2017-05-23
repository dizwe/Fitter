from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'fitterKakao/index.html')

def keyboard(request):
    return JsonResponse({
        'type' : 'buttons',
        'buttons': ['남자', '여자'],
    })
# Create your views here.
