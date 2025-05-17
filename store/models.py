from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)  # Parent category

    def __str__(self):
        return self.name



class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    stock = models.IntegerField(default=0)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, default=1)
    
    # Image fields - we'll use these to reference your static files
    image_code = models.CharField(
        max_length=20,
        default='pro1',
        help_text="Reference to static image (pro1, pro2, etc)"
    )
    
    # Optional additional images
    image_code_alt1 = models.CharField(max_length=20, blank=True, null=True)
    image_code_alt2 = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.name
    
class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    size = models.CharField(max_length=1, choices=[('S','Small'),('M','Medium'),('L','Large')])
    added_at = models.DateTimeField(auto_now_add=True)

    @property
    def total_price(self):
        return self.product.price * self.quantity

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(CartItem)
    shipping_address = models.TextField()
    payment_method = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='Processing')
