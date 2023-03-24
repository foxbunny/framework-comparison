from django.urls import path

from .views import ProductList, ProductDetails, ProductHighlightList

urlpatterns = [
    path('products/', ProductList.as_view(), name='product_list'),
    path('products/<str:pk>', ProductDetails.as_view(),
         name='product_details'),
    path('highlights/', ProductHighlightList.as_view(),
         name='product_highlight_list'),
]
