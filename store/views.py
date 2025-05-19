from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.contrib.auth import logout, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.views import LoginView
from django.http import HttpResponse
from django.db.models import Q
from .models import Category, Product, CartItem, Order

# --- Authentication Views ---
def signup(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful!")
            return redirect("index")
        messages.error(request, "Registration failed. Please correct the errors.")
    else:
        form = UserCreationForm()
    return render(request, "store/signup.html", {"form": form})


def signin(request):
    return render(request, "store/signin.html")


def logout_view(request):
    logout(request)
    return redirect("signin")


class CustomLoginView(LoginView):
    template_name = "store/signin.html"
    redirect_authenticated_user = True

    def get_success_url(self):
        return reverse("index")


# --- Homepage & Product Views ---
def index(request):
    return render(request, "store/index.html")



from django.shortcuts import render
from store.models import Product, Category

def product_list(request):
    category_name = request.GET.get("category", None)  # ✅ Get category from URL
    print(f"🔎 Category Requested: {category_name}")  # 🚀 Debugging print statement

    if category_name:
        category = Category.objects.filter(name__iexact=category_name).first()
        products = Product.objects.filter(category=category) if category else Product.objects.none()
    else:
        products = Product.objects.all()  # ✅ Show all products if no category filter

    print(f"🛒 Retrieved Products: {products}")  # 🚀 Debugging print statement
    return render(request, "store/productlist.html", {"products": products})



def buy_product(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == "POST":
        order = Order.objects.create(
            user=request.user,
            product=product,
            quantity=request.POST.get("quantity", 1),
            total_price=product.price * int(request.POST.get("quantity", 1)),
        )
        return redirect("order_success", order_id=order.id)
    return render(request, "store/buy_product.html", {"product": product})


def category_products(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    products = Product.objects.filter(category=category)
    return render(request, "store/category_products.html", {"products": products, "category": category})


# --- Cart & Order Management ---
@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart_item, created = CartItem.objects.get_or_create(
        user=request.user,
        product=product,
        defaults={
            "quantity": 1,
            "size": request.POST.get("size", "M"),
        },
    )
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    return redirect(reverse("store:cart"))


@login_required
def cart(request):
    cart_items = CartItem.objects.filter(user=request.user)
    total = sum(item.total_price for item in cart_items)
    return render(request, "store/cart.html", {"cart_items": cart_items, "total": total})


@login_required
def checkout(request):
    cart_items = CartItem.objects.filter(user=request.user)
    if not cart_items.exists():
        return redirect("store:cart")

    if request.method == "POST":
        order = Order.objects.create(
            user=request.user,
            shipping_address=request.POST.get("address"),
            payment_method=request.POST.get("payment_method"),
            total_price=sum(item.total_price for item in cart_items),
        )
        order.items.set(cart_items)
        cart_items.delete()
        return redirect("store:order_success", order_id=order.id)

    return render(request, "store/checkout.html", {"cart_items": cart_items, "total": sum(item.total_price for item in cart_items)})


@login_required
def order_success(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    return render(request, "store/order_success.html", {"order": order})


@login_required
def update_cart(request, cart_item_id, action):
    cart_item = get_object_or_404(CartItem, id=cart_item_id, user=request.user)
    if action == "increase":
        cart_item.quantity += 1
    elif action == "decrease" and cart_item.quantity > 1:
        cart_item.quantity -= 1
    cart_item.save()
    return redirect(reverse("store:cart"))


@login_required
def remove_from_cart(request, cart_item_id):
    cart_item = get_object_or_404(CartItem, id=cart_item_id, user=request.user)
    cart_item.delete()
    return redirect(reverse("store:cart"))