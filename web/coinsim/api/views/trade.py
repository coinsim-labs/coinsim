from django.db.models import QuerySet
from drf_openapi.utils import view_config
from rest_framework.generics import ListAPIView
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

