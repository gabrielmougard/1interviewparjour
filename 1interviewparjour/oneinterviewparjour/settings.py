import os
import sys

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve(strict=True).parent.parent

############ START OF PUBLIC ENV DATA #####################
DEBUG = os.getenv('DEBUG', True)
DEBUG = False if DEBUG == "False" else True
ENV = os.getenv('ENV', 'dev')  # either 'prod' or 'dev'
FRONT_BASE_PATH = os.getenv('FRONT_BASE_PATH', 'http://localhost:3000')
STRIPE_LIVE_MODE = os.getenv('STRIPE_LIVE_MODE', False)  # STRIPE_LIVE_MODE is True for production
STRIPE_LIVE_MODE = True if STRIPE_LIVE_MODE == "True" else False
DB_HOST = os.getenv('DB_HOST', '127.0.0.1')
DB_PORT = os.getenv('DB_PORT', '3306')
SECRET_KEY="temz1*^52h)yvm7-d6sfnav6n8co#i4o+qe2!x(py$3ertf05b"
############ END OF PUBLIC ENV DATA #####################
print("VAULT_ENDPOINT = "+os.getenv("VAULT_ENDPOINT"))
############ START OF SENSITIVE AREA #############
if ENV == 'prod':
    """
    We use HVAC to get the information that we need and not environment variable
    """
    from hvac.v1 import Client as AppRoleTokenBuilder
    from hvac import Client as AppRoleClient

    APPROLE_ID = os.environ.get("APPROLE_ID")
    APPROLE_SECRET_ID = os.environ.get("APPROLE_SECRET_ID")
    VAULT_ENDPOINT = os.getenv("VAULT_ENDPOINT", "http://127.0.0.1:8200")

    token = AppRoleTokenBuilder(url=VAULT_ENDPOINT).auth_approle(
        APPROLE_ID,
        secret_id=APPROLE_SECRET_ID
    )['auth']['client_token']

    vault_client = AppRoleClient(url=VAULT_ENDPOINT, token=token)
    if vault_client.is_authenticated():
        #STRIPE
        token = AppRoleTokenBuilder(url=VAULT_ENDPOINT).auth_approle(
            APPROLE_ID,
            secret_id=APPROLE_SECRET_ID
        )['auth']['client_token']
        vault_client = AppRoleClient(url=VAULT_ENDPOINT, token=token)
        STRIPE_CREDENTIALS = vault_client.secrets.kv.v2.read_secret_version(path='1interviewparjour/stripe')["data"]["data"]
        STRIPE_LIVE_PUBLIC_KEY = STRIPE_CREDENTIALS["STRIPE_LIVE_PUBLIC_KEY"]
        STRIPE_LIVE_SECRET_KEY = STRIPE_CREDENTIALS["STRIPE_LIVE_SECRET_KEY"]
        STRIPE_TEST_PUBLIC_KEY = STRIPE_CREDENTIALS["STRIPE_TEST_PUBLIC_KEY"]
        STRIPE_TEST_SECRET_KEY = STRIPE_CREDENTIALS["STRIPE_TEST_SECRET_KEY"]

        #AWS
        token = AppRoleTokenBuilder(url=VAULT_ENDPOINT).auth_approle(
            APPROLE_ID,
            secret_id=APPROLE_SECRET_ID
        )['auth']['client_token']
        vault_client = AppRoleClient(url=VAULT_ENDPOINT, token=token)
        AWS_CREDENTIALS = vault_client.secrets.kv.v2.read_secret_version(path='1interviewparjour/aws')["data"]["data"]
        AWS_REGION_NAME = AWS_CREDENTIALS["AWS_REGION_NAME"]
        AWS_PUBLIC_KEY = AWS_CREDENTIALS["AWS_PUBLIC_KEY"]
        AWS_SECRET_KEY = AWS_CREDENTIALS["AWS_SECRET_KEY"]
        AWS_DBBACKUP_S3_NAME = AWS_CREDENTIALS["AWS_DBBACKUP_S3_NAME"]

        #MYSQL
        token = AppRoleTokenBuilder(url=VAULT_ENDPOINT).auth_approle(
            APPROLE_ID,
            secret_id=APPROLE_SECRET_ID
        )['auth']['client_token']
        vault_client = AppRoleClient(url=VAULT_ENDPOINT, token=token)
        MYSQL_CREDENTIALS = vault_client.secrets.kv.v2.read_secret_version(path='1interviewparjour/mysql')["data"]["data"]
        MYSQL_USERNAME = MYSQL_CREDENTIALS["AWS_MYSQL_USER"]
        MYSQL_PASSWORD = MYSQL_CREDENTIALS["AWS_MYSQL_PASSWORD"]
        MYSQL_DBNAME = MYSQL_CREDENTIALS["AWS_MYSQL_DB_NAME"]

    else:
        raise Exception("Could not instantiate the HVAC")

else:
    """
    Use environment variable, in credentials.sh
    """
    #STRIPE
    STRIPE_LIVE_PUBLIC_KEY = os.environ.get("STRIPE_LIVE_PUBLIC_KEY")
    STRIPE_LIVE_SECRET_KEY = os.environ.get("STRIPE_LIVE_SECRET_KEY")
    STRIPE_TEST_PUBLIC_KEY = os.environ.get("STRIPE_TEST_PUBLIC_KEY")
    STRIPE_TEST_SECRET_KEY = os.environ.get("STRIPE_TEST_SECRET_KEY")

    #AWS
    AWS_REGION_NAME = os.environ.get("AWS_REGION_NAME")
    AWS_PUBLIC_KEY = os.environ.get("AWS_PUBLIC_KEY")
    AWS_SECRET_KEY = os.environ.get("AWS_SECRET_KEY")
    AWS_DBBACKUP_S3_NAME = os.environ.get("AWS_DBBACKUP_S3_NAME")

    #MYSQL
    MYSQL_USERNAME = os.environ.get("MYSQL_USERNAME")
    MYSQL_PASSWORD = os.environ.get("MYSQL_PASSWORD")
    MYSQL_DBNAME = os.environ.get("MYSQL_DBNAME")

############ END OF SENSITIVE AREA ###############

ALLOWED_HOSTS = ["admin.1interviewparjour.com", "localhost"]

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
    'dbbackup',
    'multiselectfield',
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
    'whitenoise.middleware.WhiteNoiseMiddleware',
]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
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

DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_ENGINE', 'django.db.backends.mysql'),
        'NAME': MYSQL_DBNAME,
        'USER': MYSQL_USERNAME,
        'PASSWORD': MYSQL_PASSWORD,
        'HOST': DB_HOST,
        'PORT': DB_PORT
    }
}

######## DATABASE BACKUP ###########
DBBACKUP_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
DBBACKUP_STORAGE_OPTIONS = {
    'access_key': AWS_PUBLIC_KEY,
    'secret_key': AWS_SECRET_KEY,
    'region_name': AWS_REGION_NAME,
    'bucket_name': AWS_DBBACKUP_S3_NAME,
    'default_acl': 'private'
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
    'http://localhost:3000','http://localhost:3001',
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
