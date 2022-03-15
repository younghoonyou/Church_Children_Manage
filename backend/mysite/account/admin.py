from django.contrib import admin
from .models import Account
# Register your models here.

admin.site.register(Account)
# list_display = ['name', 'password', 'phone_number', 'created_at', 'updated_at']
