from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class CommonInfo(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    class Meta:
        abstract = True


class Project(CommonInfo):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
            return f'{self.name} by user {self.user}'


class Table(CommonInfo):
    created_at = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name} to {self.project}'


class DataType(CommonInfo):
    pass


class Column(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    data_type = models.ForeignKey(DataType, on_delete=models.PROTECT)
    is_primary_key = models.BooleanField(default=False)
    is_nullable = models.BooleanField(default=False)
    is_relationship = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class RelationshipType(CommonInfo):
    def __str__(self):
        return self.name


class Relationship(models.Model):
    relationship_type = models.ForeignKey(RelationshipType, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    from_column = models.ForeignKey(
        Column,
        on_delete=models.CASCADE,
        related_name='from_column'
    )
    to_column = models.ForeignKey(
        Column,
        on_delete=models.CASCADE,
        related_name='to_column'
    )
    from_table = models.ForeignKey(
        Table,
        on_delete=models.CASCADE,
        related_name='from_table'
    )
    to_table = models.ForeignKey(
        Table,
        on_delete=models.CASCADE,
        related_name='to_table'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.from_table} -> {self.to_table} ({self.relationship_type})"