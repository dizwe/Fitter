from django.views.generic import TemplateView
from django.views.generic.edit import CreateView
from django.core.urlresolvers import reverse_lazy
from .forms import CreateUserForm
from django.shortcuts import render

# form이나 model을 이용해서 새로운 데이터를 넣을 때
class CreateUser(CreateView):
    template_name = 'signup.html'
    form_class = CreateUserForm
    # 타이밍 로딩 문제로 generic view라서 reverse_lazy 라는걸 사용햐애된다네
    success_url = reverse_lazy('create_user_done')


def registered(request):
    return render(request, 'signup_done.html')
