from django.urls import path, include, re_path

from .views import (
    Logout,
)


urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    re_path(r'^logout/', Logout.as_view()),
]