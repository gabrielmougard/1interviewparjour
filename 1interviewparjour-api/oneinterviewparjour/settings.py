import os
import sys

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'temz1*^52h)yvm7-d6sfnav6n8co#i4o+qe2!x(py$3ertf05b'

DEBUG = os.getenv('DEBUG', None)
ENV = os.getenv('ENV', 'dev')  # either 'prod' or 'dev'

#API related
API_BASE_PATH = os.getenv('API_BASE_PATH', 'http://localhost:8000')
FRONT_BASE_PATH = os.getenv('FRONT_BASE_PATH', 'http://localhost:8567')

# Payment credentials (tuto : https://testdriven.io/blog/django-stripe-tutorial/)
STRIPE_LIVE_PUBLIC_KEY = os.environ.get("STRIPE_LIVE_PUBLIC_KEY")
STRIPE_LIVE_SECRET_KEY = os.environ.get("STRIPE_LIVE_SECRET_KEY")
STRIPE_LIVE_SUBSCRIPTION_PRICE_ID = os.environ.get("STRIPE_LIVE_SUBSCRIPTION_PRICE_ID")
STRIPE_TEST_PUBLIC_KEY = os.environ.get("STRIPE_TEST_PUBLIC_KEY")
STRIPE_TEST_SECRET_KEY = os.environ.get("STRIPE_TEST_SECRET_KEY")
STRIPE_TEST_SUBSCRIPTION_PRICE_ID = os.environ.get("STRIPE_TEST_SUBSCRIPTION_PRICE_ID")

STRIPE_LIVE_MODE = os.getenv('STRIPE_LIVE_MODE', False)  # STRIPE_LIVE_MODE is True for production

# AWS SES credentials
AWS_REGION_NAME = os.environ.get("AWS_REGION_NAME")
AWS_PUBLIC_KEY = os.environ.get("AWS_PUBLIC_KEY")
AWS_SECRET_KEY = os.environ.get("AWS_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'admin_interface',
    'colorfield',
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_q',
    'oneinterviewparjour.api',
    'oneinterviewparjour.core',
    'oneinterviewparjour.mail_scheduler',
    'oneinterviewparjour.observability',
    'oneinterviewparjour.paypal',
    'oneinterviewparjour.s3_backup',
    'oneinterviewparjour.stripe'
]

X_FRAME_OPTIONS='SAMEORIGIN' # only if django version >= 3.0s

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'oneinterviewparjour.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'oneinterviewparjour.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_ENGINE', 'django.db.backends.mysql'),
        'NAME': os.getenv('DB_NAME', 'oneinterviewparjour'),
        'USER': os.getenv('DB_USER', 'root'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'oneinterviewparjour'),
        'HOST': os.getenv('DB_HOST', '127.0.0.1'),
        'PORT': os.getenv('DB_PORT', '3306')
    }
}

Q_CLUSTER = {
    'name': 'oneinterviewparjourQCluster',
    'workers': int(os.getenv('ASYNC_WORKER_COUNT', '1')),
    'timeout': 3600,
    'retry': 3600,
    'ack_failure': True,
    'compress': True,
    'save_limit': 2500,
    'queue_limit': 500,
    'catch_up': False,
    'cpu_affinity': int(os.getenv('DJANGO_CPU_AFFINITY', '1')),
    'orm': 'default',
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
MEDIA_ROOT = ''
MEDIA_URL = ''
STATIC_URL = '/static/'

# CORS PARAMETERS
CORS_ORIGIN_ALLOW_ALL = False
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8567',
)
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]