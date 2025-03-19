from pathlib import Path
from datetime import timedelta

# ==========================
# CONFIGURACIÓN BASE
# ==========================
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-3n7ccw1dnp$x-2+8s58dfkp*!wpn+m(d*-$gjpqxrxr-^8htp+'

DEBUG = True

ALLOWED_HOSTS = []

# ==========================
# APLICACIONES INSTALADAS
# ==========================
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Librerías de Django REST Framework
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',  

    # Middleware de CORS
    'corsheaders',

    # Tu aplicación principal
    'api',  # Asegúrate de que está aquí

    # Documentación de Swagger
    'drf_yasg',

    # Filtros de Django
    'django_filters',
]

# ==========================
# MIDDLEWARE
# ==========================
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # Asegurar que esté antes de CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'whatsapp_backend.urls'

# ==========================
# CONFIGURACIÓN DE TEMPLATES
# ==========================
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'whatsapp_backend.wsgi.application'

# ==========================
# BASE DE DATOS
# ==========================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ==========================
# VALIDACIÓN DE CONTRASEÑAS
# ==========================
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

# ==========================
# CONFIGURACIÓN DE IDIOMA Y ZONA HORARIA
# ==========================
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ==========================
# ARCHIVOS ESTÁTICOS
# ==========================
STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ==========================
# AUTENTICACIÓN Y PERMISOS EN DRF
# ==========================
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',  # Autenticación con JWT
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',  # Solo usuarios autenticados pueden acceder
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',  # Activa la paginación
    'PAGE_SIZE': 10,  # Número de elementos por página
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],  # Activa los filtros
}

# ==========================
# CONFIGURACIÓN DE JWT (SimpleJWT)
# ==========================
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=30),  # ⬅️ Access token dura 30 días
    'REFRESH_TOKEN_LIFETIME': timedelta(days=365),  # ⬅️ Refresh token dura 1 año
    'ROTATE_REFRESH_TOKENS': True,  # ⬅️ Genera un nuevo refresh token cada vez que se usa
    'BLACKLIST_AFTER_ROTATION': False,
    'UPDATE_LAST_LOGIN': True,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
}

# ==========================
# CONFIGURACIÓN DE CORS
# ==========================
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Permitir frontend en React (si lo usas)
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]
CORS_ALLOW_CREDENTIALS = True

CSRF_COOKIE_SECURE = False

# ==========================
# CONFIGURACIÓN DE USERS
# ==========================
AUTH_USER_MODEL = 'api.User'  # Reemplaza 'api' con el nombre de tu aplicación donde definiste el modelo


AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',  # Backend por defecto de Django
]

