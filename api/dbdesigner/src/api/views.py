from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
from django.shortcuts import get_object_or_404

from .serializers import (
    ProjectSerializer,
    TableSerializer,
    ColumnSerializer,
    DataTypeSerializer,
    RelationshipSerializer,
    RelationshipTypeSerializer,
)
from .models import (
    Project,
    Table,
    Column,
    DataType,
    Relationship,
    RelationshipType,
)
from .permissions import (
    IsAdminOrReadOnly,
    IsProjectOwner,
    IsTableOwner,
    IsColumnOwner,
)


class Logout(APIView):
    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


'''
Относительно юзера берём проект
откносительно проекта берём таблицу
относительно таблицы берём колонки
относительно колонок берём всё отсальное: дату, отношения
'''


class ProjectViewSet(viewsets.ModelViewSet):
    """User projects"""
    serializer_class = ProjectSerializer
    permission_classes = [IsProjectOwner, ]
    queryset = Project.objects.all()

    def get_queryset(self):
        user = self.request.user
        return Project.objects.filter(user=user)


class TableViewSet(viewsets.ModelViewSet):
    """
    List of tables in the user's project
    """
    queryset = Table.objects.all()
    serializer_class = TableSerializer
    permission_classes = [permissions.IsAuthenticated, IsTableOwner, ]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project__name']

    def get_queryset(self):
        return Table.objects.filter(project__user=self.request.user)
    
    @action(methods=['get'], url_path='all-project-tables-except-one/(?P<project>\w+)/(?P<table>\w+)', detail=False)
    def excludeOneTable(self, request, *args, **kwargs):
        tables = Table.objects.filter(project=kwargs.get('project'), project__user=request.user).exclude(id=kwargs.get('table'))
        return Response(TableSerializer(tables, many=True).data)


class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    permission_classes = [permissions.IsAuthenticated, IsColumnOwner, ]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['table__name']
    
    def get_queryset(self):
        return Column.objects.filter(table__project__user=self.request.user)

    @action(methods=['get'], url_path='project-columns/(?P<table>\w+)/(?P<project>\w+)', detail=False)
    def projectColumns(self, request, *args, **kwargs):
        columns = Column.objects.filter(
            table__project_id=kwargs.get('project'),
            table__project__user=request.user
        ).exclude(table=kwargs.get('table'))
        return Response(ColumnSerializer(columns, many=True).data)

    
class DataTypeViewSet(viewsets.ModelViewSet):
    queryset = DataType.objects.all()
    serializer_class = DataTypeSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrReadOnly, ]
    
    @action(methods=['get'], detail=True)
    def datatypeInfo(self, request, pk=None):
        datatype = DataType.objects.filter(pk=pk)
        return Response(DataTypeSerializer(datatype).data)


class RelationshipViewSet(viewsets.ModelViewSet):
    queryset = Relationship.objects.all()
    serializer_class = RelationshipSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project__name']
    
    def get_queryset(self):
        return Relationship.objects.filter(project__user=self.request.user)


class RelationshipTypeViewSet(viewsets.ModelViewSet):
    queryset = RelationshipType.objects.all()
    serializer_class = RelationshipTypeSerializer
    permission_classes = [IsAdminOrReadOnly, ]