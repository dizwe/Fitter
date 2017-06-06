from django import forms
from .models import Person, TopClothes


class PersonForm(forms.ModelForm):
    class Meta:
        model = Person
        fields = ('height', 'weight', 'shoulder_a', 'chest_a', 'sleeve_a')

class TopClothesForm(forms.ModelForm):
    class Meta:
        model = TopClothes
        fields = ('length', 'shoulder', 'chest', 'sleeve')