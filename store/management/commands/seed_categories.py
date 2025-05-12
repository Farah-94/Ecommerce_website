from django.core.management.base import BaseCommand
from store.models import Category

class Command(BaseCommand):
    help = "Seeds the database with default categories"

    def handle(self, *args, **kwargs):
        if not Category.objects.filter(name="Women").exists():
            women = Category.objects.create(name="Women")
            Category.objects.create(name="Women T-Shirts", parent=women)
            Category.objects.create(name="Women Bottoms", parent=women)
            Category.objects.create(name="Women Watches", parent=women)
            print("✅ Categories seeded successfully!")
        else:
            print("Categories already exist.")