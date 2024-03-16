from rest_framework import permissions
from django.shortcuts import get_object_or_404

from .models import (
    Project,
    Table,
    Relationship,
)


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user and request.user.is_staff


class IsProjectOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.user


class IsTableOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if get_object_or_404(Project, pk=request.data.get('project')).user.pk != request.user.pk:
            return False

        return super().has_permission(request, view)

    def has_object_permission(self, request, view, obj):
        return request.user == obj.project.user


class IsColumnOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if get_object_or_404(Table, pk=request.data.get('table')).project.user.pk != request.user.pk:
            return False
    
        return super().has_permission(request, view)
    

class IsRelationshipOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        if get_object_or_404(Relationship, pk=request.data.get('project')).project.user.pk != request.user.pk:
            return False

        return super().has_permission(request, view)