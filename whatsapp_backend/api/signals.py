from django.db.models.signals import post_delete
from django.dispatch import receiver
from .models import *

@receiver(post_delete, sender=WhatsAppAccount)
def delete_related_data(sender, instance, **kwargs):
    try:
        print(f"⚠ Eliminando datos relacionados a la cuenta de WhatsApp ID {instance.id}")

        # Usar el campo correcto: whatsapp
        related_chatbots = Chatbot.objects.filter(whatsapp=instance)

        if related_chatbots.exists():
            ChatbotItem.objects.filter(chatbot__in=related_chatbots).delete()
            related_chatbots.delete()

        Instance.objects.filter(whatsapp=instance).delete()
        Message.objects.filter(whatsapp=instance).delete()

        print("✅ Todos los datos relacionados han sido eliminados correctamente.")
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"❌ Error al eliminar datos relacionados: {e}")