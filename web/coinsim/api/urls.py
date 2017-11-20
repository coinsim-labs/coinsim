from rest_framework.routers import DefaultRouter, Route
from django.conf.urls import url, include
from . import views

router = DefaultRouter()
router.register(r'currency', views.CurrencyView, base_name='currency')

urlpatterns = [

    url(r'^', include(router.urls)),

]
