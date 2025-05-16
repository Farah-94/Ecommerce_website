# your_app/middleware.py
class CustomMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        # Code to run before view
        response = self.get_response(request)
        # Code to run after view
        return response