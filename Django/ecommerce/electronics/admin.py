from django.contrib import admin
from .models import Electronic
@admin.register(Electronic)
class ElectronicAdmin(admin.ModelAdmin):
 list_display = ('name', 'price', 'description')
 search_fields = ('name', 'price')
 list_filter = ('price', 'price')