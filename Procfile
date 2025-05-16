web: gunicorn ecommerce_store.wsgi --timeout 120 --workers=3 --threads=3 --worker-class=gthread
release: python manage.py migrate