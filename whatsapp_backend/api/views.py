from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, SAFE_METHODS
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()


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
    permission_classes = [IsAuthenticated | IsAdminUser]  

    def update(self, request, *args, **kwargs):
        user = self.get_object()  
        authenticated_user = request.user  

        # Permitir a los administradores actualizar sin contraseña
        if authenticated_user.is_staff or authenticated_user.is_superuser:
            serializer = self.get_serializer(user, data=request.data, partial=True)  # Permitir actualización parcial
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Para usuarios normales, se requiere contraseña
        if "password" not in request.data:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

        return super().update(request, *args, **kwargs)

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
    
    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return [IsAuthenticated()]
        return[IsAdminUser()]

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

# ===============================
# PERMISSIONS
# ===============================
class PermissionListCreateView(generics.ListCreateAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [IsAdminUser]

class PermissionRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [IsAdminUser]

# ===============================
# PLANES Y SUS PERMISSIONS
# ===============================
class PlanPermissionListCreateView(generics.ListCreateAPIView):
    queryset = PlanPermission.objects.all()
    serializer_class = PlanPermissionSerializer
    permission_classes = [IsAdminUser]

class PlanPermissionRetrieveUpdateDeleteView(generics.DestroyAPIView):
    queryset = PlanPermission.objects.all()
    serializer_class = PlanPermissionSerializer
    permission_classes = [IsAdminUser]

# ===============================
# PERMISOS DE UN PLAN ESPECIFICO
# ===============================
from rest_framework.views import APIView

class PermissionsByPlanView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, plan_id):
        permissions = PlanPermission.objects.filter(plan_id=plan_id)
        serializer = PlanPermissionSerializer(permissions, many=True)
        return Response(serializer.data)
    
# ===============================
# GRUPOS DE CONTACTOS
# ===============================
class ContactGroupListCreateView(generics.ListCreateAPIView):
    queryset = ContactGroup.objects.all()
    serializer_class = ContactGroupSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ContactGroupRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ContactGroup.objects.all()
    serializer_class = ContactGroupSerializer
    permission_classes = [IsAuthenticated]

# ===============================
# CONTACTOS
# ===============================
class ContactListCreateView(generics.ListCreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]


class ContactRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]