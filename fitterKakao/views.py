from django.shortcuts import render, redirect
from django.http import Http404, JsonResponse, HttpResponseRedirect
from .models import Person, TopClothes
import os

from django.conf import settings
from django.contrib.auth.decorators import login_required

import readAndSave
from .forms import PersonForm, TopClothesForm, BottomClothesForm
from .anticipate_size import find_good_data, guess_size_by_question


def index(request):
    # reverse 는 url 하드코딩 피할수 있도록 해줌
    return render(request, 'fitterKakao/index.html')


@login_required
def suppose_size(request):
    try:
        """개인의 데이터"""
        person = Person.objects.filter(name=request.user)  # 나중에 로그인으로 바꿔야지
        top_clothes = TopClothes.objects.filter(name=request.user)  # POST 한 정보만 보게?(일단 그냥 하나만 보게 하자)

        """# readAndSave 파일 없는거니까 조심 - 데이터도 나중에 DB로 넣는걸로 해보자"""
        # 데이터 파일 읽어오기
        file_path = os.path.join(settings.STATIC_ROOT, 'json/hw_filtered_dict_every_1cm.json')
        hw_filtered_sizes = readAndSave.read_json(file_path, 'utf8')

        # 나중에 바꿔야지
        person_info_dict = person.values('height','weight','shoulder_a','chest_a','sleeve_a')[0] # queryset
        # 키는 1770 이런 형식으로 되어있으므로 10 곱해야함
        user_height, user_weight = person_info_dict['height']*10, person_info_dict['weight']
        # ['height', 'shoulder', 'chest', 'arm', 'waist'] 순서
        question = [1, person_info_dict['shoulder_a'], person_info_dict['chest_a'], person_info_dict['sleeve_a'], 1]  # ~하면 가 남는 편이다

        # 괜찮은 사이즈를 찾고 글자 데이터를 숫자로 바꾸기
        hw_filtered_size_nums = find_good_data(user_height, user_weight, hw_filtered_sizes)

        # 몸 부위별로 모으기 ['height', 'shoulder', 'chest', 'arm', 'waist'] 순서
        size_each_parameter = [[one_person[parameter]
                                for one_person in hw_filtered_size_nums] for parameter in range(5)]

        """예상 사이즈 추천하고 실측 데이터로 바꾸기"""
        suggest_size = guess_size_by_question(question, size_each_parameter, data_error=0.1)
        suggest_size_real = size_to_real(suggest_size)

    except KeyError:
        return render(request, 'fitterKakao/index.html',
                      {'error_message' : "다 안채웠어"})

    except TopClothes.DoesNotExist:
        raise Http404("Data does not exist")

    return render(request, 'fitterKakao/result.html', {'top_clothes': top_clothes,
                                                       'person': person,
                                                       'suggest_size': suggest_size_real, })

def size_to_real(size_list):
    """다시 실측값으로 바꾸기"""
    func_list = ['height', 'shoulder', 'chest', 'arm', 'waist']
    #["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
    criteria_list = {
        'shoulder' : [395, 410, 425, 440, 460, 480, 500], # 애매 기준
        'chest' : [840, 850, 930, 1010, 1080, 1200, 1280],
        'arm' : [560, 565, 585, 600, 615, 625, 625], # 애매 기준
        'waist' : [720, 760, 840, 920, 1000, 1080, 1160],
        'height': [1650, 1650, 1750, 2000, 2100, 2100, 2100], # 일단 작은걸로 되개 하자.2000은 그냥 의미없음
    }

    each_par_real = {}
    for i, size in enumerate(size_list):
        parameter_size_list = criteria_list[func_list[i]]
        each_par_real[func_list[i]] = parameter_size_list[size]

    return each_par_real


@login_required
def post_new(request):
    if request.method == "POST": #이미 보낸거라면
        person_form = PersonForm(request.POST)
        top_clothes_form = TopClothesForm(request.POST)
        bottom_clothes_form = BottomClothesForm(request.POST)
        if person_form.is_valid() and top_clothes_form.is_valid(): # 저장된 form 형식이 잘 맞는지
            person = person_form.save(commit=False) # False 바로 저장하지는 마
            person.name = request.user
            person.save()
            TopClothes = top_clothes_form.save(commit=False)
            TopClothes.name = request.user
            TopClothes.save()
            BottomClothes = bottom_clothes_form.save(commit=False)
            BottomClothes.name = request.user
            BottomClothes.save()
            return redirect('fitterKakao:suppose_size')
    else:
        person_form = PersonForm()
        top_clothes_form = TopClothesForm()
        bottom_clothes_form = BottomClothesForm()
    return render(request, 'fitterKakao/post_edit.html', {'person_form': person_form,
                                                          'top_clothes_form':top_clothes_form,
                                                          'bottom_clothes_form':bottom_clothes_form,})





