import secrets
from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now
from datetime import timedelta

# ==========================
# MODELO DE USUARIOS
# ==========================

from django.utils.timezone import now
from datetime import timedelta

class User(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=255)
    timezone = models.CharField(max_length=50, default="UTC")
    access_token = models.CharField(max_length=12, blank=True, null=True, unique=True)
    
    expire_date = models.DateField(null=True, blank=True)

    # Relaciones
    role = models.ForeignKey('Role', on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    plan = models.ForeignKey('Plan', on_delete=models.SET_NULL, null=True, blank=True, related_name='users')

    groups = models.ManyToManyField('auth.Group', related_name="custom_user_groups", blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name="custom_user_permissions", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Asignar un expire_date si el usuario es nuevo y no lo tiene definido
        if not self.expire_date:
            self.expire_date = now().date() + timedelta(days=7)

        # Asignar un rol por defecto si no tiene uno
        if not self.role:
            from .models import Role
            self.role, _ = Role.objects.get_or_create(name="cliente")

        # Asignar un plan por defecto si no tiene uno
        if not self.plan:
            from .models import Plan
            self.plan, _ = Plan.objects.get_or_create(name="Free", whatsapp_limit=1)

        # Generar un token de acceso si no tiene uno
        if not self.access_token:
            self.access_token = secrets.token_hex(6).upper()

        # Cifrar la contraseña si no está cifrada
        if self.password and not self.password.startswith('pbkdf2_sha256$'):
            self.password = make_password(self.password)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.username})"





# ==========================
# MODELO DE ROLES
# ==========================
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
# ==========================
# MODELO DE Permission
# ==========================
class Permission(models.Model):
    name = models.CharField(max_length=100, default="default_permission")

    def __str__(self):
        return self.name


# ==========================
# MODELO DE PLANES DE SUSCRIPCIÓN
# ==========================
class Plan(models.Model):
    name = models.CharField(max_length=50)
    whatsapp_limit = models.IntegerField(default=1)
    message_limit = models.IntegerField(default=100)
    automated_replies = models.IntegerField(default=100)
    simultaneous_campaigns = models.IntegerField(default=2)
    contact_groups = models.IntegerField(default=50)
    contacts_per_group = models.IntegerField(default=2000)

    def __str__(self):
        return f"{self.name} (Messages: {self.message_limit})"

# ==========================
# MODELO DE RELACION PLAN-PERMISO
# ==========================
class PlanPermission(models.Model):
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('plan', 'permission')

    def __str__(self):
        return f"{self.plan.name} - {self.permission.name}"

    
# ==========================
# MODELO DE CUENTAS DE WHATSAPP
# ==========================
class WhatsAppAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15, unique=True)
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('inactive', 'Inactive')])
    profile_picture = models.URLField(blank=True, null=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.phone_number} - {self.user.username}"
    
# ==========================
# MODELO DE INSTANCIAS DE WHATSAPP
# ==========================
class Instance(models.Model):
    whatsapp = models.ForeignKey('WhatsAppAccount', on_delete=models.CASCADE)
    instance_key = models.CharField(max_length=12, unique=True, blank=True)  # Ahora es de 12 caracteres en mayúsculas
    session_data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.instance_key:  # Solo se genera en la primera vez
            self.instance_key = secrets.token_hex(6).upper()  # Genera un hexadecimal de 12 caracteres en mayúsculas

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Instance {self.instance_key} - {self.whatsapp.phone_number}"
    
# ==========================
# MODELO DE CHATBOTS
# ==========================
class Chatbot(models.Model):
    whatsapp = models.ForeignKey(WhatsAppAccount, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('inactive', 'Inactive')])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.whatsapp.phone_number}"
    
# ==========================
# CONFIGURACIÓN DE CHATBOTS
# ==========================
class ChatbotSettings(models.Model):
    chatbot = models.ForeignKey(Chatbot, on_delete=models.CASCADE)
    ai_status = models.BooleanField(default=False)  # IA activada/desactivada
    ai_apikey = models.CharField(max_length=255, blank=True, null=True)
    ai_temperature = models.FloatField(default=0.7)
    ai_model = models.CharField(max_length=50, default="gpt-4")
    max_tokens = models.IntegerField(default=256)
    keyword_enable = models.BooleanField(default=True)
    keyword_disable = models.BooleanField(default=False)

    def __str__(self):
        return f"Settings for {self.chatbot.name}"
    
# ==========================
# ITEMS DEL CHATBOT (RESPUESTAS AUTOMÁTICAS)
# ==========================
class ChatbotItem(models.Model):
    chatbot = models.ForeignKey(Chatbot, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('inactive', 'Inactive')])
    default_response = models.TextField(blank=True, null=True)
    send_to = models.CharField(max_length=50)  # A quién enviar la respuesta
    type = models.CharField(max_length=50)  # Tipo de respuesta (Texto, Imagen, etc.)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    keywords = models.TextField(blank=True, null=True)  # Lista separada por comas
    next_bot_action = models.CharField(max_length=255, blank=True, null=True)
    presence_delay = models.IntegerField(default=2)  # Delay antes de responder
    typing_type = models.CharField(max_length=50, choices=[('default', 'Default'), ('fast', 'Fast'), ('slow', 'Slow')])
    use_ai = models.BooleanField(default=False)
    save_data = models.BooleanField(default=False)
    api_rst_data = models.TextField(blank=True, null=True)  # API de respuesta
    
    def __str__(self):
        return f"Item {self.name} - {self.keywords} - {self.next_bot_action} - {self.status} - {self.type} - {self.send_to}"
    
# ==========================
# MODELO DE MENSAJES
# ==========================
class Message(models.Model):
    whatsapp = models.ForeignKey(WhatsAppAccount, on_delete=models.CASCADE)
    instance = models.ForeignKey(Instance, on_delete=models.CASCADE)
    sender = models.CharField(max_length=100)
    receiver = models.CharField(max_length=100)
    message = models.TextField()
    message_type = models.CharField(max_length=50, choices=[('text', 'Text'), ('image', 'Image'), ('video', 'Video')])
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('sent', 'Sent'), ('delivered', 'Delivered'), ('read', 'Read')])
    chatbot = models.ForeignKey(Chatbot, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Message from {self.sender} to {self.receiver}"
    
# ==========================
# MODELO DE FACTURACIÓN
# ==========================

class Billing(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="billing")
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    tax_number = models.CharField(max_length=50, blank=True, null=True)  # RUC o número fiscal
    last_payment_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    last_payment_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"Billing for {self.user.username}"
    
# ==========================
# MODELO DE GRUPO DE CONTACTOS
# ==========================
from django.contrib.auth import get_user_model

User = get_user_model()

class ContactGroup(models.Model):
    STATUS_CHOICES = [
        ('enable', 'Enable'),
        ('disable', 'Disable')
    ]

    name = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='enable')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='contact_groups')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"
    
# ==========================
# MODELO DE CONTACTOS
# ==========================
class Contact(models.Model):
    group = models.ForeignKey(ContactGroup, on_delete=models.CASCADE, related_name='contacts')
    phone_number = models.CharField(max_length=20)
    is_valid = models.BooleanField(default=False)
    params = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__ (self):
        return f"{self.phone_number} - {'Valid' if self.is_valid else 'Invalid'}"