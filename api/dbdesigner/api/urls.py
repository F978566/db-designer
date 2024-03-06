from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter

from .views import (
    ProjectViewSet,
    TableViewSet,
    ColumnViewSet,
    DataTypeViewSet,
    Logout,
    RelationshipTypeViewSet,
    RelationshipViewSet,
)

router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='projects')
router.register('tables', TableViewSet)
router.register('columns', ColumnViewSet)
router.register('datatypes', DataTypeViewSet)
router.register('relationshiptype', RelationshipTypeViewSet)
router.register('relationship', RelationshipViewSet)


urlpatterns = [
    path('', include(router.urls)),
    # path('auth/', include('djoser.urls')),/
    # path('auth/', include('djoser.social.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    re_path(r'^logout/', Logout.as_view()),
]
