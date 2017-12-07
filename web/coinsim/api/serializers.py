from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import get_user_model

class BalanceSerializer(ModelSerializer):

    class Meta:
        model = Balance
        exclude = ('id', 'user',)


class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        exclude = ('id', 'user',)


class UserSerializer(ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = (
            'id',
            'username',
            'password',
            'email'
        )
        extra_kwargs = {
            'password': {'write_only': True},
        }
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        return super(UserSerializer, self).update(instance, validated_data)
