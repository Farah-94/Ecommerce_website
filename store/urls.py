from django.urls import path
from .views import product_list  # Import your view

urlpatterns = [
    path('products/', product_list, name='product_list'),
]