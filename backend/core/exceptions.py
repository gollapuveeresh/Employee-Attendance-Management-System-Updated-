from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        custom_data = {
            'success': False,
            'status_code': response.status_code,
            'error': {
                'message': 'Request could not be processed.',
                'details': response.data
            }
        }
        # Extract a clean primary message if available
        if isinstance(response.data, dict):
            if 'detail' in response.data:
                custom_data['error']['message'] = str(response.data['detail'])
            elif len(response.data) > 0:
                first_key = next(iter(response.data))
                first_val = response.data[first_key]
                if isinstance(first_val, list) and len(first_val) > 0:
                    custom_data['error']['message'] = f'{first_key}: {first_val[0]}'
        response.data = custom_data
    else:
        logger.error(f'Unhandled Exception: {exc}', exc_info=True)
        response = Response(
            {
                'success': False,
                'status_code': status.HTTP_500_INTERNAL_SERVER_ERROR,
                'error': {
                    'message': 'An unexpected server error occurred.',
                    'details': str(exc)
                }
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return response
