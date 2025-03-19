from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import *

@receiver(post_delete, sender=WhatsAppAccount)
def delete_related_data(sender, instance, **kwargs):
    """
    Cuando se elimina una cuenta de WhatsApp, también se eliminan todas sus instancias, chatbots, items y mensajes relacionados.
    """
    print(f"⚠ Eliminando datos relacionados a la cuenta de WhatsApp ID {instance.id}")

    # Eliminar instancias relacionadas a este número de WhatsApp
    Instance.objects.filter(whatsapp_account=instance).delete()
    
    # Eliminar chatbots relacionados a este número
    Chatbot.objects.filter(whatsapp_account=instance).delete()
    
    # Eliminar ítems de chatbot relacionados
    ChatbotItem.objects.filter(chatbot__whatsapp_account=instance).delete()
    
    # Eliminar mensajes relacionados
    Message.objects.filter(whatsapp_account=instance).delete()

    print("✅ Todos los datos relacionados han sido eliminados correctamente.")
