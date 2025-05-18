from django.urls import path
from . import views
from store.views import product_list
from .views import index

app_name = 'store'

urlpatterns = [
    # Main pages

    
    # Products
    # path('product/<int:pk>/', views.product_detail, name='product_detail'),
    # path('category/<int:category_id>/', views.category_products, name='category_products'),
    path('', index, name='index'),
    path('products/', product_list, name='product_list'),
 

    # Authentication
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('logout/', views.logout_view, name='logout'),
    
    # Cart
    path('cart/', views.cart, name='cart'),
    path('add-to-cart/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
    path('cart/update/<int:cart_item_id>/<str:action>/', views.update_cart, name='update_cart'),
    path('cart/remove/<int:cart_item_id>/', views.remove_from_cart, name='remove_from_cart'),
    
    # Checkout
    path('checkout/', views.checkout, name='checkout'),
    path('order-success/<int:order_id>/', views.order_success, name='order_success'),
]