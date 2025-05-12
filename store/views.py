from django.shortcuts import render
from .models import Product
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.contrib.auth import logout
from django.contrib.auth import login

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required

from django.shortcuts import redirect
from django.contrib.auth import login

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages 
from django.shortcuts import render
from store.models import Category, Product
from django.contrib.auth.views import LoginView
from .models import Product, CartItem, Order

def logout_view(request):
    logout(request)
    return redirect('signin') 

def product_list(request):
    products = Product.objects.all()
    return render(request, 'store/product_list.html', {'products': products})

@login_required
def buy_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    # Add actual purchase logic here (e.g., create Order model)
    return render(request, 'store/buy_product.html', {'product': product})


def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  
            messages.success(request, "Account created! Please log in.")
            return redirect("signin")
    else:
        form = UserCreationForm()
    return render(request, "store/signup.html", {"form": form})



def signin(request):
    return render(request, "store/signin.html")


def category_products(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    products = Product.objects.filter(category=category)
    return render(request, 'store/product_list.html', {
        'products': products,
        'category': category  # Pass category to highlight active filter
    })

class CustomLoginView(LoginView):
    template_name = 'store/signin.html'  # Your template path
    redirect_authenticated_user = True  # Redirect if already logged in

    def get_success_url(self):
        return reverse('product_list') 
    
@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == 'POST':
        CartItem.objects.create(
            user=request.user,
            product=product,
            quantity=request.POST.get('quantity', 1),
            size=request.POST.get('size', 'M')
        )
        return redirect('cart')
    return redirect('product_detail', product_id=product_id)

@login_required
def cart(request):
    cart_items = CartItem.objects.filter(user=request.user)
    return render(request, 'store/cart.html', {'cart_items': cart_items})

@login_required
def checkout(request):
    if request.method == 'POST':
        # Create order
        order = Order.objects.create(
            user=request.user,
            shipping_address=request.POST['address'],
            payment_method="Credit Card"
        )
        # Add cart items to order
        cart_items = CartItem.objects.filter(user=request.user)
        order.items.set(cart_items)
        # Clear cart
        cart_items.delete()
        return redirect('order_success', order_id=order.id)
    return render(request, 'store/checkout.html')

@login_required
def order_success(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, 'store/order_success.html', {'order': order})


@login_required
def mock_payment(request):
    if request.method == 'POST':
        # Simulate payment processing
        return redirect('payment_success')  # Redirect to success page
    
    # Calculate total from cart
    cart_items = CartItem.objects.filter(user=request.user)
    total = sum(item.total_price for item in cart_items)
    
    return render(request, 'store/payment.html', {'total': total})

@login_required
def payment_success(request):
    # Create order record (mock)
    order = Order.objects.create(
        user=request.user,
        total=sum(item.total_price for item in request.user.cart_items.all()),
        status='Completed'
    )
    
    # Clear cart
    request.user.cart_items.all().delete()
    
    return render(request, 'store/payment_success.html')