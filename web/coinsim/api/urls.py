from rest_framework.routers import DefaultRouter, Route
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from .views import *

router = DefaultRouter()
# router.register(r'currency', views.CurrencyView, base_name='currency')

urlpatterns = [

    url(r'^auth/signup/', RegisterView.as_view()),
    url(r'^auth/login/', obtain_jwt_token),
    url(r'^auth/token-refresh/', refresh_jwt_token),
    url(r'^auth/token-verify/', verify_jwt_token),

    url(r'^docs/', DocView.as_view(title='Coinsim API Docs'), name='api_schema'),

    url(r'^trade/currencies/', Currencies.as_view()),

    url(r'^', include(router.urls)),
    url(r'^user/balances/', Balances.as_view()),
    url(r'^user/transactions/', Transactions.as_view()),


]
