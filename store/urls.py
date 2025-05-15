from django.urls import path
from .views import logout_view, product_list, signup, signin, buy_product
from .views import CustomLoginView
from .views import add_to_cart, cart, checkout, order_success
from .views import category_products 
from .views import update_cart, remove_from_cart

urlpatterns = [
    path('logout/', logout_view, name='logout'),
    path('products/', product_list, name='index'),  # ✅ Keep only one definition
    path('signup/', signup, name='signup'),
    path('signin/', signin, name='signin'),
    path('buy/<int:product_id>/', buy_product, name='buy_product'),
    path('category/<slug:category_slug>/', category_products, name='category_products'),
    path('add-to-cart/<int:product_id>/', add_to_cart, name='add_to_cart'),
    path('cart/', cart, name='cart'),
    path('checkout/', checkout, name='checkout'),
    path('order-success/<int:order_id>/', order_success, name='order_success'),

    path("cart/update/<int:cart_item_id>/<str:action>/", update_cart, name="update_cart"),
    path("cart/remove/<int:cart_item_id>/", remove_from_cart, name="remove_from_cart"),
]
