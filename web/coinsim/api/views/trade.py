from django.db.models import QuerySet
from django.conf import settings
import requests
import django.db.transaction
from drf_openapi.utils import view_config
from requests import RequestException
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import pdb;

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
        source_currency = serializer.validated_data.get('source_currency')
        dest_currency = serializer.validated_data.get('dest_currency')
        amount = serializer.validated_data.get('amount')

        currencies = [ c.sym for c in Currency.objects.all() ]
        if source_currency not in currencies \
                or dest_currency not in currencies:
            raise APIException('currency-unsupported', 400)

        if amount <= 0:
            raise APIException('invalid-balance', 400)


        r = requests.get(settings.CRYPTO_API.format(
            fsym=source_currency,
            tsym=dest_currency
        ))

        try:
            r.raise_for_status()
        except RequestException as err:
            raise APIException('external-api-error', 500)
        response = r.json()
        dest_price = response \
            .get(source_currency, {}) \
            .get(dest_currency)

        if dest_price is None:
            raise APIException('external-api-error', 500)

        order = amount * dest_price

        source_balance = None
        dest_balance = None
        with django.db.transaction.atomic():
            try:
                source_balance = Balance.objects.select_for_update().get(user=request.user.profile, currency=source_currency)
            except Balance.DoesNotExist:
                raise APIException('source-balance-not-avail', 500)

            if amount > source_balance.amount:
                amount = source_balance.amount
                #raise APIException('balance-too-low', 400)

            source_balance.amount -= amount

            dest_balance, _ = Balance.objects.select_for_update().get_or_create(
                user=request.user.profile,
                currency=dest_currency
            )
            dest_balance.amount += order

            source_balance.save()
            dest_balance.save()

        self.kwargs['new_balance_source'] = source_balance.amount
        self.kwargs['new_balance_dest'] = dest_balance.amount
        self.kwargs['dest_price'] = dest_price

        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user.profile,
            new_balance_source=self.kwargs['new_balance_source'],
            new_balance_dest=self.kwargs['new_balance_dest'],
            dest_price=self.kwargs['dest_price']
        )