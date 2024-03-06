from django.db import models

from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError("Email not provided")
        email = self.normalize_email(email)
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **kwargs):
        kwargs.setdefault('is_active', True)
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        if kwargs.get('is_active') is not True:
            raise ValueError("Superuser should be active")
        if kwargs.get('is_staff') is not True:
            raise ValueError("Superuser should be staff")
        if kwargs.get('is_superuser') is not True:
            raise ValueError("Superuser should have is_superuser=True")
        return self.create_user(email, password, **kwargs)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


class CommonInfo(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    class Meta:
        abstract = True


class Project(CommonInfo):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
            return self.name


class Table(CommonInfo):
    created_at = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


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