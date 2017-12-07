from django.db.models import QuerySet
from drf_openapi.utils import view_config
from rest_framework.generics import ListAPIView
from ..serializers import *
from ..models import *


class Balances(ListAPIView):
    """
    <jwt></jwt>
    Retrieves a list of coin balances in the users wallet.
    """
    serializer_class = BalanceSerializer

    @view_config(response_serializer=BalanceSerializer)
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):

        queryset = self.request.user.profile.balances.all()
        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset



class Transactions(ListAPIView):
    """
    <jwt></jwt>
    Retrieves all past transactions the user has done.
    """
    serializer_class = TransactionSerializer

    @view_config(response_serializer=TransactionSerializer)
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):

        queryset = self.request.user.profile.transactions.all()
        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset