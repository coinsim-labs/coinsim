from django.db.models import QuerySet
from django.conf import settings
import requests
from drf_openapi.utils import view_config
from requests import RequestException
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

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

class InstantOrder(CreateAPIView):
    """
    <jwt></jwt>
    Performs an instance order trasnaction.<br>
    Buys coins in `dest_currency` paying with `amount` of coins in `source_currency`. <br>Use ticker symbols of the supported currencies.
    """
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

    @view_config(request_serializer=TransactionSerializer)
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        transaction = serializer.validated_data
        currencies = [ c.sym for c in Currency.objects.all() ]
        if transaction.source_currency not in currencies \
                or transaction.dest_currency not in currencies:
            raise APIException('currency-unsupported', 400)

        if transaction.amount <= 0:
            raise APIException('invalid-balance', 400)

        balance = Balance.objects.get(user=request.user.profile, currency=transaction.dest_currency)
        if transaction.amount < balance.amount:
            raise APIException('balance-too-low', 400)

        r = requests.get(settings.CRYPTO_API.format(
            fsym=transaction.source_currency,
            tsym=transaction.dest_currency
        ))

        try:
            r.raise_for_status()
        except RequestException as err:
            raise APIException('external-api-error', 500)

        response = r.json()
        order = response \
            .get(transaction.source_currency, {}) \
            .get(transaction.dest_currency_currency)

        if order is None:
            raise APIException('external-api-error', 500)

        with transaction.atomic():
            source_balance, _ = Balance.objects.get_or_create(
                user=request.user.profile,
                currency=transaction.source_currency
            )
            source_balance.amount -= transaction.amount

            dest_balance, _ = Balance.objects.get_or_create(
                user=request.user.profile,
                currency=transaction.dest_currency
            )
            dest_balance.amount += order

            source_balance.save()
            dest_balance.save()

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
