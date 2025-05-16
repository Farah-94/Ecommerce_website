from django.contrib import admin
from django import forms  # <-- This import was missing
from .models import Product, Category

IMAGE_CHOICES = [
    ('pro1', 'Product Image 1'),
    ('pro2', 'Product Image 2'),
    ('pro3', 'Product Image 3'),
    # Add more as needed
]

class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = '__all__'
    
    # Convert the CharFields to dropdowns
    image_code = forms.ChoiceField(choices=IMAGE_CHOICES)
    image_code_alt1 = forms.ChoiceField(choices=[('', '---------')] + IMAGE_CHOICES, required=False)
    image_code_alt2 = forms.ChoiceField(choices=[('', '---------')] + IMAGE_CHOICES, required=False)

class ProductInline(admin.TabularInline):
    model = Product
    extra = 1  # Allows adding 1 extra blank product per category

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Shows category names
    search_fields = ('name',)  # Enables search for categories
    inlines = [ProductInline]

class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    list_display = ('name', 'price', 'stock', 'display_main_image')
    search_fields = ('name',)
    list_filter = ('price', 'stock', 'category')
    
    # Display image code in list view
    def display_main_image(self, obj):
        return obj.image_code
    display_main_image.short_description = 'Main Image'
    
    # Group fields nicely
    fieldsets = [
        ('Product Information', {
            'fields': ('name', 'price', 'stock', 'description', 'category')
        }),
        ('Product Images', {
            'fields': ('image_code', 'image_code_alt1', 'image_code_alt2'),
            'description': 'Select from existing static images (pro1, pro2, pro3)'
        }),
    ]

# Register your models here
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)