from child.models import Child
from django.contrib import admin

# Register your models here.
class ChildAdmin(admin.ModelAdmin):
    list_display = ["child_name", "room","grade","writer","created_at"]
admin.site.register(Child,ChildAdmin)
