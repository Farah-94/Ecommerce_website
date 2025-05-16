from django.contrib import admin
from django import forms  # <-- This import was missing
from .models import Product, Category
IMAGE_CHOICES = [
    ('pro1', 'Product 1 (pro1.jpg)'),
    ('pro2', 'Product 2 (pro2.jpg)'), 
    ('pro3', 'Product 3 (pro3.jpg)'),
    ('tshirt', 'T-Shirt (tshirt.jpg)'),
    ('watch', 'Watch (watch.jpg)'),
    ('jeans', 'Jeans (jeans.png)'),
    # Add all your actual image files here
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
    list_display = ('name', 'price', 'stock', 'category', 'display_main_image')
    list_editable = ('price', 'stock')  # Allow quick editing
    search_fields = ('name', 'description')
    list_filter = ('category', 'price', 'stock')
    
    def display_main_image(self, obj):
        if obj.image_code:
            return f"{obj.image_code}.jpg"
        return "-"
    display_main_image.short_description = 'Main Image'
    
    fieldsets = [
        ('Basic Info', {
            'fields': ('name', 'category', 'price', 'stock', 'description')
        }),
        ('Product Images', {
            'fields': ('image_code', 'image_code_alt1', 'image_code_alt2'),
            'description': '''
                Select images from static/store/images/products/<br>
                Files must exist with .jpg extension
            '''
        }),
    ]

# Register your models here
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)