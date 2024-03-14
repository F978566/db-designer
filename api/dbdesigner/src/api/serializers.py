from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from rest_framework.validators import UniqueTogetherValidator
from django.contrib.auth import get_user_model

from .models import (
    Project,
    Table,
    Column,
    DataType,
    Relationship,
    RelationshipType,
)


User = get_user_model()


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'


class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = '__all__'


class DataTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataType
        fields = '__all__'


class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=Relationship.objects.all(),
                fields=['from_column', 'to_column', 'from_table', 'to_table']
            )
        ]


class RelationshipTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = RelationshipType
        fields = '__all__'


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'password']