from django.db.models import QuerySet
from drf_openapi.utils import view_config
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import AllowAny

from ..serializers import *


class Currencies(ListAPIView):
    """
    Retrieves a list of currencies supported by coinsim.
    Use the ticker symbol (`sym`) for requests to the transaction endpoint
    """
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()
    permission_classes = (AllowAny,)

    @view_config(response_serializer=CurrencySerializer)
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class Transaction(CreateAPIView):
    """
    <jwt></jwt>
    Performs a transaction.<br>
    Buys coins in `dest_currency` paying with `amount` of coins in `source_currency`. <br>Use ticker symbols of the supported currencies.
    """
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

    @view_config(request_serializer=TransactionSerializer)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


