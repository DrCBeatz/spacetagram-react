# core/urls.py

from django.contrib import admin
from django.urls import path
from .views import frontend

urlpatterns = [
    path("", frontend, name="frontend"),
    path('admin/', admin.site.urls),
]
