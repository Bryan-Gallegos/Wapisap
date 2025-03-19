from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from .models import *
from .serializers import *
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import authenticate

# ===============================
# USUARIOS
# ===============================
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Cualquier usuario puede registrarse

class UserRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]  # Solo autenticados pueden ver/modificar

# ===============================
# ROLES (Solo admins)
# ===============================
class RoleListCreateView(generics.ListCreateAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdminUser]

class RoleRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [IsAdminUser]

# ===============================
# PLANES (Solo admins pueden modificar)
# ===============================
class PlanListCreateView(generics.ListCreateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsAuthenticated]

class PlanRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsAdminUser]  # Solo admins pueden modificar/eliminar planes

# ===============================
# CUENTAS DE WHATSAPP
# ===============================
class WhatsAppAccountListCreateView(generics.ListCreateAPIView):
    queryset = WhatsAppAccount.objects.all()
    serializer_class = WhatsAppAccountSerializer
    permission_classes = [IsAuthenticated]

class WhatsAppAccountRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = WhatsAppAccount.objects.all()
    serializer_class = WhatsAppAccountSerializer
    permission_classes = [IsAdminUser]  # Solo admins pueden modificar/eliminar

# ===============================
# INSTANCIAS DE WHATSAPP
# ===============================
class InstanceListCreateView(generics.ListCreateAPIView):
    queryset = Instance.objects.all()
    serializer_class = InstanceSerializer
    permission_classes = [IsAuthenticated]

class InstanceRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Instance.objects.all()
    serializer_class = InstanceSerializer
    permission_classes = [IsAuthenticated]

# ===============================
# CHATBOTS
# ===============================
class ChatbotListCreateView(generics.ListCreateAPIView):
    queryset = Chatbot.objects.all()
    serializer_class = ChatbotSerializer
    permission_classes = [IsAuthenticated]

class ChatbotRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chatbot.objects.all()
    serializer_class = ChatbotSerializer
    permission_classes = [IsAdminUser]  # Solo admins pueden modificar/eliminar chatbots

# ===============================
# CONFIGURACIÓN DE CHATBOTS
# ===============================
class ChatbotSettingsListCreateView(generics.ListCreateAPIView):
    queryset = ChatbotSettings.objects.all()
    serializer_class = ChatbotSettingsSerializer
    permission_classes = [IsAuthenticated]

class ChatbotSettingsRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChatbotSettings.objects.all()
    serializer_class = ChatbotSettingsSerializer
    permission_classes = [IsAdminUser]

# ===============================
# ITEMS DEL CHATBOT
# ===============================
class ChatbotItemListCreateView(generics.ListCreateAPIView):
    queryset = ChatbotItem.objects.all()
    serializer_class = ChatbotItemSerializer
    permission_classes = [IsAuthenticated]

class ChatbotItemRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ChatbotItem.objects.all()
    serializer_class = ChatbotItemSerializer
    permission_classes = [IsAuthenticated]

# ===============================
# MENSAJES
# ===============================
class MessageListCreateView(generics.ListCreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

class MessageRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

# ===============================
# TOKEN (Autenticación solo con username)
# ===============================
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# ===============================
# BILLING
# ===============================
class BillingListCreateView(generics.ListCreateAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer
    permission_classes = [IsAuthenticated]

class BillingRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Billing.objects.all()
    serializer_class = BillingSerializer
    permission_classes = [IsAuthenticated]