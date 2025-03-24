from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import *
from django.contrib.auth import get_user_model

User = get_user_model()

# Serializador para Usuarios
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'role', 'plan', 'expire_date']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': True}, # No permitir que el frontend modifique estos valores directamente
            'is_superuser': {'read_only': True}
            }  # No se muestra en respuestas

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        role = validated_data.pop('role', '')

        # Crear Usuario
        user = User(**validated_data)
        if password:
            user.password = make_password(password)

        # Si el rol es "admin", hacerlo superusuario y staff
        if role == "admin":
            user.is_staff = True
            user.is_superuser = True
        else:
            user.is_staff = False
            user.is_superuser = False
        
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        role = validated_data.get('role', instance.role)  # Mantener el rol si no se envía en la actualización

        # Si el usuario está cambiando su contraseña
        if password:
            instance.password = make_password(password)

        # Si el rol es "admin", hacer que tenga permisos
        if role == "admin":
            instance.is_staff = True
            instance.is_superuser = True
        else:
            instance.is_staff = False
            instance.is_superuser = False

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

# Serializador para Roles
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = '__all__'

# Serializador para Planes
class PlanSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = Plan
        fields = '__all__'
        extra_fields = ['permissions']

    def get_permissions(self, obj):
        """ Devuelve la lista de permisos por defecto para todos los planes """
        return {
            "Whatsapp Tools": [
                "Bulk Messaging",
                "Message History",
                "Chatbot",
                "Autoresponder",
                "List Message Template",
                "Poll Template",
                "API",
                "Quick Response",
                "Link Generator",
                "Profile",
                "Report",
            ],
            "Advanced Features": [
                "Shortlink",
                "OpenAI",
                "File Manager",
            ],
        }

# Serializador para Cuentas de WhatsApp
class WhatsAppAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhatsAppAccount
        fields = ['id', 'name', 'phone_number', 'status', 'user']

# Serializador para Instancias de WhatsApp
class InstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instance
        fields = '__all__'

# Serializador para Chatbots
class ChatbotSerializer(serializers.ModelSerializer):
    whatsapp = WhatsAppAccountSerializer(read_only=True)
    whatsapp_id = serializers.PrimaryKeyRelatedField(
        queryset=WhatsAppAccount.objects.all(), write_only=True, source='whatsapp'
    )

    class Meta:
        model = Chatbot
        fields = ['id', 'name', 'status', 'whatsapp', 'whatsapp_id']

# Serializador para Configuración de Chatbots
class ChatbotSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatbotSettings
        fields = '__all__'

# Serializador para Items del Chatbot
class ChatbotItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatbotItem
        fields = '__all__'

# Serializador para Mensajes
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

# Serializador para Token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["email"] = user.email
        return token

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        # Permitir login con email o username
        user = User.objects.filter(email=username).first() or User.objects.filter(username=username).first()

        if user and user.check_password(password):
            data = super().validate({"username": user.username, "password": password})

            # Agregar user_id en la respuesta de la API
            data["user_id"] = user.id

            # Agregar role en la respuesta de la API
            data["role"] = user.role.name if hasattr(user, "role") else "user"

            return data
        else:
            raise serializers.ValidationError("Credenciales incorrectas")

# Serializadoe de Billing
class BillingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Billing
        fields = '__all__'