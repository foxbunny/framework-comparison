from django.urls import path

from .views import Sessions

urlpatterns = [
    path('sessions/', Sessions.as_view(), name='product_list'),
]
