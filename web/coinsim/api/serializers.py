from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import *
from django.contrib.auth import get_user_model

class BalanceSerializer(ModelSerializer):

    class Meta:
        model = Balance
        exclude = ('id', 'user',)


class RankingSerializer(ModelSerializer):

    # rank = serializers.SlugRelatedField(slug_field='pos', read_only=True)
    userID = serializers.CharField(source='user.id', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    usermail = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = Ranking
        fields = ('userID','username','usermail','pos','totalUSD')


class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        exclude = ('id', 'user',)
        read_only_fields = ('new_balance_source', 'new_balance_dest',)


class CurrencySerializer(ModelSerializer):
    class Meta:
        model = Currency
        exclude = ('id', )


class CryptoDescriptionSerializer(ModelSerializer):
    class Meta:
        model = CryptoDescription
        exclude = ('id', )


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