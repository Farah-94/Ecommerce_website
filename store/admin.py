from django.contrib import admin
from .models import Product, Category  # Importing models to register them in Admin


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Shows category names
    search_fields = ('name',)  # Enables search for categories

admin.site.register(Category, CategoryAdmin)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock')  # Shows these columns in Admin
    search_fields = ('name',)  # Adds search functionality
    list_filter = ('price', 'stock')  # Filters for easier navigation

admin.site.register(Product, ProductAdmin)


class ProductInline(admin.TabularInline):
    model = Product
    extra = 1  # Allows adding 1 extra blank product per category

class CategoryAdmin(admin.ModelAdmin):
    inlines = [ProductInline]