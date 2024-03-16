from django.contrib import admin
from .models import (
    Project,
    Table,
    DataType,
    Column,
    RelationshipType,
    Relationship,
    User,
)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email']


class DataTypeAdmin(admin.ModelAdmin):
    list_display = ["name"]
    list_display_links = ["name"]
    search_fields = ["name"]
    list_filter = ["name"]

    
class ColumnAdmin(admin.ModelAdmin):
    list_display = ["name", "table"]
    list_display_links = ["name", "table"]


admin.site.register(Table)
admin.site.register(DataType, DataTypeAdmin)
admin.site.register(Column, ColumnAdmin)
admin.site.register(RelationshipType)
admin.site.register(Relationship)
admin.site.register(Project)