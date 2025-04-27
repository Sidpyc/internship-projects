from django.contrib import admin
from .models import ScheduledTask

@admin.register(ScheduledTask)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("task_id", "name", "scheduled_date", "status", "executed_function", "created_at", "updated_at")
    list_filter = ("status",)
    search_fields = ("name",)
    ordering = ("created_at",)

    def executed_function(self, obj):
        """Display the executed function only after task completion."""
        if obj.status == "pending":
            return ""  # Blank until execution

        if obj.content_object:
            return obj.activation_method if obj.activation_method else "Unknown"
        
        return "No linked object"

    executed_function.short_description = "Executed Function"
