from rest_framework.routers import DefaultRouter, Route
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from . import views

router = DefaultRouter()
# router.register(r'currency', views.CurrencyView, base_name='currency')

urlpatterns = [

    url(r'^', include(router.urls)),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api-token-verify/', verify_jwt_token),
]
