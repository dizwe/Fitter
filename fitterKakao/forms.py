from django import forms
from .models import Person, TopClothes, BottomClothes, SameClothes, CriteriaTop, CriteriaBottom


class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ('sex', 'height', 'weight', 'shoulder_a', 'chest_a', 'sleeve_a', 'waist_a',
                  'hip_a', 'crotch_a', 'thigh_a', 'length_a', 'hem_a')


class SameClothesForm(forms.ModelForm):
    class Meta:
        model = SameClothes
        fields = ('same_nick', 'same_photo', 'same_url')


class CriteriaTopForm(forms.ModelForm):
    class Meta:
        model = CriteriaTop
        fields = ('cri_top_length', 'cri_shoulder', 'cri_chest', 'cri_sleeve')


class CriteriaBottomForm(forms.ModelForm):
    class Meta:
        model = CriteriaBottom
        fields = ('cri_waist', 'cri_bot_length', 'cri_hip', 'cri_crotch', 'cri_thigh', 'cri_hem')


class TopClothesForm(forms.ModelForm):
    class Meta:
        model = TopClothes
        fields = ('size', 'top_length', 'shoulder', 'chest', 'sleeve')


class BottomClothesForm(forms.ModelForm):
    class Meta:
        model = BottomClothes
        fields = ('size', 'waist', 'bot_length', 'hip', 'crotch', 'thigh', 'hem')




