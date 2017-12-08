from django.db.models import QuerySet
from drf_openapi.utils import view_config
from rest_framework.generics import ListAPIView, CreateAPIView
from ..serializers import *


class Currencies(ListAPIView):
    """
    Retrieves a list of currencies supported by coinsim.
    Use the ticker symbol (`sym`) for requests to the transaction endpoint
    """
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()

    @view_config(response_serializer=CurrencySerializer)
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class Transaction(CreateAPIView):
    """
    Performs a transaction.<br>
    Buys `dest_currency` coins paying with `amount` of coins in `source_currency`. Use ticker symbols of the supported currencies.
    """
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

    @view_config(request_serializer=TransactionSerializer)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


