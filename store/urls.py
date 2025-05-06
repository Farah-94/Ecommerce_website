from django.urls import path
from .views import logout_view, product_list, signup, signin

urlpatterns = [
    path('logout/', logout_view, name='logout'),
    path('products/', product_list, name='product_list'),
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),
    
]