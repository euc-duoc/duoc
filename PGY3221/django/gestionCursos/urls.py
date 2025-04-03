from django.urls import path
from .views import principal, grupo, agregar_grupo

urlpatterns = [
    path('', principal, name="principal"),
    path('grupo/<int:id>', grupo, name="grupo"),
    path('agregargrupo', agregar_grupo, name="agregar grupo")
]