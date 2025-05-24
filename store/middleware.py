# store/middleware.py

class DisableXFrameOptionsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # Remove X-Frame-Options header if present
        if 'X-Frame-Options' in response:
            del response['X-Frame-Options']
        return response