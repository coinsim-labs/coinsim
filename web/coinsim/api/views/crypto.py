from drf_openapi.utils import view_config
from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from ..serializers import *

class CryptoDescriptions(ListAPIView):
    """
    Retrieves a list of currencies descriptions.
    """
    serializer_class = CryptoDescriptionSerializer
    queryset = CryptoDescription.objects.all()
    permission_classes = (AllowAny,)

    @view_config(response_serializer=CryptoDescriptionSerializer)
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
