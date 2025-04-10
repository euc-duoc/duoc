from django.urls import path
from .views import principal, grupo, agregar_grupo, guardar_grupo, eliminar_grupo

urlpatterns = [
    path('', principal, name="principal"),
    path('grupo/<int:id>', grupo, name="grupo"),
    path('agregargrupo', agregar_grupo, name="agregar grupo"),
    path('guardargrupo', guardar_grupo, name="guardar grupo"),
    path('eliminargrupo/<int:id>', eliminar_grupo, name="eliminar grupo")
]