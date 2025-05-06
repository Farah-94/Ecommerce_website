from django.shortcuts import render
from .models import Product
from django.contrib.auth import logout
from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm



def logout_view(request):
    logout(request)  # Logs out the user
    return redirect('login') 

def product_list(request):
    products = Product.objects.all()
    return render(request, 'store/product_list.html', {'products': products})

from django.contrib.auth import login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages 

def signup(request):
    form = UserCreationForm() 
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  
            messages.success(request, "You have successfully signed up!")  # ✅ Confirmation message
            return redirect("signin") 

    return render(request, "store/signup.html", {"form": form})



def signin(request):
    return render(request, "store/signin.html")
