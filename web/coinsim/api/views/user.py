from django.db.models import QuerySet
from rest_framework.generics import ListAPIView
from ..serializers import *
from ..models import *

class Balances(ListAPIView):
    """
    Retrieves a list of coin balances in the users wallet.
    """
    serializer_class = BalanceSerializer

    def get_queryset(self):

        queryset = self.request.user.profile.balances.all()
        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset


class Transactions(ListAPIView):
    """
    Retrieves all past transactions the user has done.
    """
    serializer_class = TransactionSerializer

    def get_queryset(self):

        queryset = self.request.user.profile.transactions.all()
        if isinstance(queryset, QuerySet):
            queryset = queryset.all()
        return queryset