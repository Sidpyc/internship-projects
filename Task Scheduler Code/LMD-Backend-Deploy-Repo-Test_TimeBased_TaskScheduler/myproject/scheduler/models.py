

from django.db import models
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class ScheduledTask(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('active', 'Active'),   
    )

    name = models.CharField(max_length=200)
    scheduled_date = models.DateTimeField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )
    task_id = models.CharField(max_length=255, blank=True, null=True)

    # GenericForeignKey setup
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, null=True, blank=True)
    object_id = models.PositiveIntegerField(null=True, blank=True)
    content_object = GenericForeignKey('content_type', 'object_id')

    # New field to store the method to execute
    activation_method = models.CharField(
        max_length=50,
        choices=[
            ('set_active', 'Set Active'),
            ('activate_with_notification', 'Activate with Notification'),
            ('activate_with_log', 'Activate with Log'),
            ('activate_with_welcome_email', 'Activate with Welcome Email'),
        ],
        default='set_active'
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.status}"
