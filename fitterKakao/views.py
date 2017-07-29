from django.shortcuts import render, redirect
from django.http import Http404, JsonResponse, HttpResponseRedirect, HttpResponse
from .models import Person, TopClothes, BottomClothes, SizeInfo
import os

from django.conf import settings
from django.contrib.auth.decorators import login_required, user_passes_test
from django.forms.formsets import formset_factory, BaseFormSet
import json
from .forms import PersonForm, TopClothesForm, BottomClothesForm


def index(request):
    # reverse 는 url 하드코딩 피할수 있도록 해줌
    return render(request, 'fitterKakao/index.html')


def make_question_generator(whole_d):
    # data 과부하 줄이기
    for sex in ['man', 'woman']:
        shw_filtered_sizes = whole_d[sex]
        height_key = list(shw_filtered_sizes.keys())
        height_key = list(map(int, height_key))  # 원래 문자니까
        for height in range(min(height_key), max(height_key)+10, 10):
            for weight in range(15, 152):  # 해보니 그렇던데?
                yield sex, height, weight


def read_json(fname, encoder):
    with open(fname, encoding=encoder) as data_file:
        json_data = json.load(data_file)
    return json_data


@user_passes_test(lambda u: u.is_superuser)
def data_add(request):
    file_path = os.path.join(settings.STATIC_ROOT, 'json/question_tree.json')
    question_tree = read_json(file_path, 'utf8')
    for sex, height, weight in make_question_generator(question_tree):
        print(sex, height, weight)
        parameters_data = question_tree[sex][str(height)][str(weight)]  # 자료가 있어야함
        try:
            if parameters_data:  # 데이터가 있다면
                size_info = SizeInfo(sex=sex, height=int(height), weight=int(weight))
                parameter_list = ['shoulder', 'chest', 'arm', 'waist',
                                  'bottom_waist', 'crotch', 'thigh', 'length', 'hem', 'hip',
                                  'crotch_height', 'middle_thigh', 'knee', 'calf', 'nipple']
                for parameter in parameter_list:
                    setattr(size_info, parameter, parameters_data[parameter])  # get attr

                size_info.save()
        except KeyError as e:
            continue

    return HttpResponse("DONE")


def size_list_to_dict(suggested_size):
    param_list = ['shoulder', 'chest', 'arm', 'waist',
                  'bottom_waist', 'crotch', 'thigh', 'length', 'hem', 'hip',
                  'crotch_height', 'middle_thigh', 'knee', 'calf', 'nipple']

    each_par_dict = {}
    for i, size in enumerate(suggested_size):
        each_par_dict[param_list[i]] = size
    return each_par_dict


@login_required
def suppose_size(request, kinds, tag_num):
    try:
        """개인의 데이터"""
        person = Person.objects.filter(name=request.user)
        # 나중에 이거 [0]하는 부분 바꿔야함!
        person_info_dict = person.values('sex', 'height', 'weight', 'shoulder_a', 'chest_a', 'sleeve_a', 'waist_a',
                                         'hip_a', 'crotch_a', 'length_a', 'thigh_a', 'hem_a')[0]  # queryset
        # 키는 1770 이런 형식으로 되어있으므로 10 곱해야함
        user_sex = person_info_dict['sex']
        user_height, user_weight = person_info_dict['height'] * 10, person_info_dict['weight']

        # ['shoulder', 'chest', 'arm', 'waist'
        # 'bottom_waist', 'crotch', 'thigh', 'length', 'hem', 'hip',
        # 'crotch_height', 'middle_thigh', 'knee', 'calf', 'nipple'] 순서
        question = []
        for answer in ['shoulder_a', 'chest_a', 'sleeve_a', 'waist_a',
                       'waist_a', 'crotch_a', 'thigh_a', 'length_a', 'hem_a', 'hip_a',
                       'length_a', 'thigh_a', '', '', 'chest_a']:
            if len(answer) == 0:
                question.append(1)
            else:
                question.append(person_info_dict[answer])

        """데이터 찾기"""
        suggested_size_filter = \
            SizeInfo.objects.filter(sex=user_sex).filter(height=user_height).filter(weight=user_weight)

        parameter_list = ['shoulder', 'chest', 'arm', 'waist',
                          'bottom_waist', 'crotch', 'thigh', 'length', 'hem', 'hip',
                          'crotch_height', 'middle_thigh', 'knee', 'calf', 'nipple']

        """예상 사이즈 추천하고 실측 데이터로 바꾸기"""

        suggested_size = []
        for parameter, q in zip(parameter_list, question):
            parameter_dict = suggested_size_filter.values(parameter).first()[parameter]
            parameter_dict = json.loads(parameter_dict.replace("'", '"'))
            suggested_size.append(parameter_dict[str(q)])
        print(suggested_size)
        suggested_size = size_list_to_dict(suggested_size)

        if kinds == 'top':
            clothes = TopClothes.objects.filter(pk=tag_num)  # POST 한 정보만 보게?(일단 그냥 하나만 보게 하자)

        elif kinds == 'bot':
            clothes = BottomClothes.objects.filter(pk=tag_num)  # POST 한 정보만 보게?(일단 그냥 하나만 보게 하자)

    except TopClothes.DoesNotExist or BottomClothes.DoesNotExist:
        raise Http404("Data does not exist")

    return render(request, 'fitterKakao/result.html', {'types' : kinds,
                                                       'clothes': clothes,
                                                       'person': person,
                                                       'suggest_size': suggested_size, })


@login_required
def check_data(request):
    try:
        return render(request, 'fitterKakao/update_p.html')
    except Person.DoesNotExist:
        return redirect('fitterKakao:post_new')


@login_required
def post_new(request):
    if request.method == "POST": #이미 보낸거라면
        person_form = PersonForm(request.POST)
        if person_form.is_valid(): # 저장된 form 형식이 잘 맞는지
            print(person_form)
            person = person_form.save(commit=False) # False 바로 저장하지는 마
            person.name = request.user
            person.save()
            return redirect('fitterKakao:choose_clothes')
    else:
        person_form = PersonForm()

    return render(request, 'fitterKakao/post_new.html', {'person_form': person_form,})


@login_required
def post_edit(request, user_name):
    if not user_name == request.user.username:
        return render(request, 'fitterKakao/index.html')
    try:
        existing_data = Person.objects.get(name__username=user_name)
    except Person.DoesNotExist:
        return redirect('fitterKakao:post_new')

    if request.method == "POST":  # 이미 보낸거라면
        person_form = PersonForm(request.POST, instance=existing_data)
        if person_form.is_valid(): # 저장된 form 형식이 잘 맞는지
            person = person_form.save(commit=False) # False 바로 저장하지는 마
            person.name = request.user
            person.save()
            return redirect('fitterKakao:choose_clothes')
    else:
        person_form = PersonForm(instance=existing_data)

    return render(request, 'fitterKakao/post_new.html', {'person_form': person_form, })


@login_required
def add_clothes(request, kinds):
    class RequiredFormSet(BaseFormSet):
        def __init__(self, *args, **kwargs):
            super(RequiredFormSet, self).__init__(*args, **kwargs)
            for form in self.forms:
                form.empty_permitted = False
    top_clothes_formset = formset_factory(TopClothesForm, max_num=3,
                                     formset=RequiredFormSet)
    bottom_clothes_formset = formset_factory(BottomClothesForm, max_num=3,
                                        formset=RequiredFormSet)

    if request.method == "POST":
        if kinds == 'top':
            clothes_formset = top_clothes_formset(request.POST)
        elif kinds == 'bot':
            clothes_formset = bottom_clothes_formset(request.POST)
        if clothes_formset.is_valid():
            for form in clothes_formset.forms:
                clothes = form.save(commit=False)
                print(clothes)
                clothes.name = request.user
                clothes.save()

            return redirect('fitterKakao:choose_clothes')
    else:
        if kinds == 'top':
            clothes_formset = top_clothes_formset()
        elif kinds == 'bot':
            clothes_formset = bottom_clothes_formset()

    return render(request, 'fitterKakao/add_clothes.html', {'types' : kinds,
                                                            'clothes_formset': clothes_formset, })


@login_required
def edit_clothes(request, kinds, tag_num):
    # 데이터 내거인지 확인
    if kinds == 'top':
        dataName = TopClothes.objects.filter(pk=tag_num).values('name__username').first()['name__username']
    elif kinds == 'bot':
        dataName = BottomClothes.objects.filter(pk=tag_num).values('name__username').first()['name__username']
    if not dataName == request.user.username:
        return render(request, 'fitterKakao/index.html')

    if request.method == "POST":
        if kinds == 'top':
            existing_clothes = TopClothes.objects.get(pk=tag_num)
            clothes_form = TopClothesForm(request.POST, instance=existing_clothes)
        elif kinds == 'bot':
            existing_clothes = BottomClothes.objects.get(pk=tag_num)
            clothes_form = BottomClothesForm(request.POST, instance=existing_clothes)
        if clothes_form.is_valid():
            clothes = clothes_form.save(commit=False)
            clothes.name = request.user
            clothes.save()

            return redirect('fitterKakao:choose_clothes')
    else:
        if kinds == 'top':
            existing_clothes = TopClothes.objects.get(pk=tag_num)
            clothes_form = TopClothesForm(instance=existing_clothes)
        elif kinds == 'bot':
            existing_clothes = BottomClothes.objects.get(pk=tag_num)
            clothes_form = BottomClothesForm(instance=existing_clothes)

    return render(request, 'fitterKakao/edit_clothes.html', {'types' : kinds,
                                                             'clothes_form': clothes_form, })


@login_required
def choose_clothes(request):
    top_clothes = TopClothes.objects.filter(name=request.user)
    bottom_clothes = BottomClothes.objects.filter(name=request.user)

    return render(request, 'fitterKakao/clothes.html', {'top_clothes': top_clothes,
                                                        'bottom_clothes': bottom_clothes, })


def delete_clothes(request, kinds, tag_num):
    if kinds == 'top':
        clothes = TopClothes.objects.filter(pk=tag_num)  # POST 한 정보만 보게?(일단 그냥 하나만 보게 하자)
    elif kinds == 'bot':
        clothes = BottomClothes.objects.filter(pk=tag_num)  # POST 한 정보만 보게?(일단 그냥 하나만 보게 하자)

    clothes.delete()
    return redirect('fitterKakao:choose_clothes')



