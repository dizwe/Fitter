from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.http import Http404, JsonResponse, HttpResponseRedirect
from .models import Person, TopClothes
import os
from django.conf import settings

from django.urls import reverse
import readAndSave
from .forms import PersonForm, TopClothesForm
from .anticipate_size import find_good_data, guess_size_by_question
import json


def index(request):
    # reverse 는 url 하드코딩 피할수 있도록 해줌
    return render(request, 'fitterKakao/index.html')


def suppose_size(request):
    try:
        """개인의 데이터"""
        person = Person.objects.filter(name=request.user)  # 나중에 로그인으로 바꿔야지
        top_clothes = TopClothes.objects.filter(pk=1)  # POST 한 정보만 보게?(일단 그냥 하나만 보게 하자)

        """# readAndSave 파일 없는거니까 조심 - 데이터도 나중에 DB로 넣는걸로 해보자"""
        # 데이터 파일 읽어오기
        file_path = os.path.join(settings.STATIC_ROOT, 'json/hw_filtered_dict_every_1cm.json')
        hw_filtered_sizes = readAndSave.read_json(file_path, 'utf8')

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


def post_new(request):
    if request.method == "POST": #이미 보낸거라면
        person_form = PersonForm(request.POST)
        top_clothes_form = TopClothesForm(request.POST)
        if person_form.is_valid() and top_clothes_form.is_valid(): # 저장된 form 형식이 잘 맞는지
            person = person_form.save(commit=False) # False 바로 저장하지는 마
            person.name = request.user # self.name 처럼 되는거지.
            person.save()
            clothes = top_clothes_form.save(commit=False)
            clothes.save()
            print(request.user)
            return redirect('fitterKakao:suppose_size')
    else:
        person_form = PersonForm()
        top_clothes_form = TopClothesForm()
    return render(request, 'fitterKakao/post_edit.html', {'person_form': person_form,
                                                          'top_clothes_form':top_clothes_form})



def keyboard(request):
    return JsonResponse({
        'type' : 'buttons',
        'buttons': ['남자', '여자'],
    })


@csrf_exempt
def answer(request):
    # 이게 더 간단할거라 생각했는데 ㅅㅂ 더 힘들듯.
    json_str = (request.body.decode('utf-8'))
    recieved_json_data = json.loads(json_str)
    user = recieved_json_data
    content = recieved_json_data['content']
    # recieved_json_data에는 user_key, type, content가 들어 있을거다

    if content == "남" or content == "여자":
        return JsonResponse({
            'message': {
                '키 몸무게를 띄어서 적어주세욥(예를 들어, 177 70)'
            },
            'keyboard': {
                'type': 'text',
            }
        })

    elif content == "170 70":
        return JsonResponse({
            'message': {
                '보통 옷을 입으면 어깨가 ( )'
            },
            'keyboard': {
                'type': 'button',
                'buttons': ['남는다', '별일없다', '낀다'],
            }
        })
        # 자료를 어떻게 저장힐건데
    elif content == "70 47 58 62": # 없으면 0
        pass



