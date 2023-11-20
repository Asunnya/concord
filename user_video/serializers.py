from rest_framework import serializers
from .models import UserVideo

class UserVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserVideo
        fields = '__all__'
