"""
WSGI config for oneinterviewparjour project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/wsgi/
"""

import os
import sys



path = '~/1interviewparjour/1interviewparjour/oneinterviewparjour'
if path not in sys.path:
    sys.path.append(path)


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'oneinterviewparjour.settings')
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
