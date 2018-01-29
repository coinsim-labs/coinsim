from math import ceil

import requests
from django.db.models import QuerySet
from drf_openapi.utils import view_config
from django.conf import settings
from requests import RequestException
from rest_framework.exceptions import APIException
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny
import logging
from ..serializers import *


class AllBalances(ListAPIView):
    """
    <jwt></jwt>
    Sums up balances for every users wallet.
    """
    serializer_class = RankingSerializer
    permission_classes = (AllowAny,)

    # @view_config(response_serializer=BalanceSerializer)
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        profiles = Profile.objects.all().select_related('user');

        currencies = [c.sym for c in Currency.objects.all()]
        usdPrices = {}
        for i in range(0,len(currencies), 6):
            r = requests.get(settings.CRYPTO_API.format(
                fsym='USD',
                tsym=','.join(currencies[i:i+6])
            ))

            try:
                r.raise_for_status()
            except RequestException as err:
                raise APIException('external-api-error', 500)

            response = r.json()

            usdPrices = {**usdPrices, **response.get('USD')};

        rankings = [];

        for profile in profiles:
            profile.totalUSD = 0
            balances = profile.balances.all()
            for balance in balances:
                profile.totalUSD += balance.amount * 1 / usdPrices[balance.currency]
            rankings.append(profile)

        rankings.sort(key = lambda r: -r.totalUSD)

        for idx, ranking in enumerate(rankings):
            ranking.pos = idx+1
            # ranking.roi =

        return rankings;
