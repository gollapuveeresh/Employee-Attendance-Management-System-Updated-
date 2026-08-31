import time
import logging

logger = logging.getLogger('api_requests')

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Extract client IP
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        request.client_ip = ip

        start_time = time.time()
        response = self.get_response(request)
        duration = round((time.time() - start_time) * 1000, 2)

        if request.path.startswith('/api/'):
            user = request.user.username if hasattr(request, 'user') and request.user.is_authenticated else 'Anonymous'
            logger.info(f'{request.method} {request.path} | Status: {response.status_code} | Duration: {duration}ms | User: {user} | IP: {ip}')

        return response
