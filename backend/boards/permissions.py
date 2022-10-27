from rest_framework import permissions
from .models import Board
from projects.models import ProjectMembership
from django.contrib.contenttypes.models import ContentType


class CanViewBoard(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.can_view_board(obj)


class IsAuthorOrReadOnly(CanViewBoard):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return super().has_object_permission(request, view, obj.item.list.board)
        else:
            return request.user == obj.author
