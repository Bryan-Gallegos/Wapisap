from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Información Personal', {'fields': ('first_name', 'last_name', 'timezone')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Otros Datos', {'fields': ('role', 'plan', 'access_token')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'is_active', 'is_staff')}
        ),
    )
    list_display = ('username', 'email', 'is_active', 'is_staff')
    search_fields = ('username', 'email')
    ordering = ('username',)

    def save_model(self, request, obj, form, change):
        if 'password' in form.changed_data:
            obj.set_password(obj.password)  # Hashea la contraseña si ha sido cambiada
        obj.save()

admin.site.register(User, CustomUserAdmin)
admin.site.register(Role)
admin.site.register(Permission)
admin.site.register(Plan)
admin.site.register(WhatsAppAccount)
admin.site.register(Instance)
admin.site.register(Chatbot)
admin.site.register(ChatbotSettings)
admin.site.register(ChatbotItem)
admin.site.register(Message)
admin.site.register(ContactGroup)
admin.site.register(Contact)
