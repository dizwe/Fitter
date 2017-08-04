from django import forms
from .models import Person, TopClothes, BottomClothes, SameClothes


class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ('sex', 'height', 'weight', 'shoulder_a', 'chest_a', 'sleeve_a', 'waist_a',
                  'hip_a', 'crotch_a', 'thigh_a', 'length_a', 'hem_a')


class SameClothesForm(forms.ModelForm):
    class Meta:
        model = SameClothes
        fields = ('same_photo',)


class TopClothesForm(forms.ModelForm):
    class Meta:
        model = TopClothes
        fields = ('nick', 'size', 'top_length', 'shoulder', 'chest', 'sleeve')


class BottomClothesForm(forms.ModelForm):
    class Meta:
        model = BottomClothes
        fields = ('nick', 'size', 'waist', 'bot_length', 'hip', 'crotch', 'thigh', 'hem')




