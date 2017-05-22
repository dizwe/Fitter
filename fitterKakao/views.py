from django.shortcuts import render

def index(request):
    return render(request, 'fitterKakao/index.html')

# Create your views here.
