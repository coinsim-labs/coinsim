from rest_framework.routers import DefaultRouter, Route
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from . import views

router = DefaultRouter()
# router.register(r'currency', views.CurrencyView, base_name='currency')

urlpatterns = [

    url(r'^', include(router.urls)),
    url(r'^user/balances/', views.Balances.as_view()),
    url(r'^user/transactions/', views.Transactions.as_view()),

    url(r'^auth/signup/', views.RegisterView.as_view()),
    url(r'^auth/login/', views.obtain_jwt_token),
    url(r'^auth/token-refresh/', views.refresh_jwt_token),
    url(r'^auth/token-verify/', views.verify_jwt_token),

    url(r'^docs/',views.DocView.as_view(title='Coinsim API Docs'), name='api_schema')
]
