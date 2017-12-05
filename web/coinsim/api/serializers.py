from rest_framework.serializers import ModelSerializer
from .models import *

class CurrencySerializer(ModelSerializer):

    class Meta:
        model = Currency
        fields = '__all__'

class PriceSerializer(ModelSerializer):

    class Meta:
        model = Price
        fields = '__all__'
        depth = 1