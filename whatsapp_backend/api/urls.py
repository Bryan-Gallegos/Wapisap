from django.urls import path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  # Para obtener el token de acceso y refresh
    TokenRefreshView,  # Para refrescar el token
    TokenVerifyView  # Para verificar si un token es válido
)

# 📌 Configuración del esquema de la API con Swagger
schema_view = get_schema_view(
    openapi.Info(
        title="API de WhatsApp Automation",
        default_version='v1',
        description="Documentación de la API para la gestión de chatbots, instancias de WhatsApp y más.",
        contact=openapi.Contact(email="carlosbryan.gb@gmail.com"),  # Contacto de soporte
        license=openapi.License(name="Golden Shark License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    # 📄 Documentación de la API
    path('redoc/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r'^api/swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),

    # Usuarios
    path('users/', UserListCreateView.as_view(), name='users-list'),
    path('users/<int:pk>/', UserRetrieveUpdateDeleteView.as_view(), name='users-detail'),

    # Roles
    path('roles/', RoleListCreateView.as_view(), name='roles-list'),
    path('roles/<int:pk>/', RoleRetrieveUpdateDeleteView.as_view(), name='roles-detail'),

    # Planes
    path('plans/', PlanListCreateView.as_view(), name='plans-list'),
    path('plans/<int:pk>/', PlanRetrieveUpdateDeleteView.as_view(), name='plans-detail'),

    # Cuentas de WhatsApp
    path('whatsapp-accounts/', WhatsAppAccountListCreateView.as_view(), name='whatsapp-accounts-list'),
    path('whatsapp-accounts/<int:pk>/', WhatsAppAccountRetrieveUpdateDeleteView.as_view(), name='whatsapp-accounts-detail'),

    # Instancias de WhatsApp
    path('instances/', InstanceListCreateView.as_view(), name='instances-list'),
    path('instances/<int:pk>/', InstanceRetrieveUpdateDeleteView.as_view(), name='instances-detail'),

    # Chatbots
    path('chatbots/', ChatbotListCreateView.as_view(), name='chatbots-list'),
    path('chatbots/<int:pk>/', ChatbotRetrieveUpdateDeleteView.as_view(), name='chatbots-detail'),

    # Configuración de Chatbots
    path('chatbot-settings/', ChatbotSettingsListCreateView.as_view(), name='chatbot-settings-list'),
    path('chatbot-settings/<int:pk>/', ChatbotSettingsRetrieveUpdateDeleteView.as_view(), name='chatbot-settings-detail'),

    # Items del Chatbot
    path('chatbot-items/', ChatbotItemListCreateView.as_view(), name='chatbot-items-list'),
    path('chatbot-items/<int:pk>/', ChatbotItemRetrieveUpdateDeleteView.as_view(), name='chatbot-items-detail'),

    # Mensajes
    path('messages/', MessageListCreateView.as_view(), name='messages-list'),
    path('messages/<int:pk>/', MessageRetrieveUpdateDeleteView.as_view(), name='messages-detail'),

    # 🔐 Autenticación con JWT
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),  # Verificar token
    
    # Billing
    path('billing/', BillingListCreateView.as_view(), name='billing-list'),
    path('billing/<int:pk>/', BillingRetrieveUpdateDeleteView.as_view(), name='billing-detail'),
    
]
