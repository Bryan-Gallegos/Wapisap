# Generated by Django 5.1.6 on 2025-03-19 16:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_billing'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plan',
            name='expires_at',
        ),
    ]
