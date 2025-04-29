from django.urls import path
from .views import principal, grupo, agregar_grupo, guardar_grupo, eliminar_grupo, ver_problemas, asignar_problemas, guardar_problema

urlpatterns = [
    path('', principal, name="principal"),
    path('grupo/<int:id>', grupo, name="grupo"),
    path('agregargrupo', agregar_grupo, name="agregar grupo"),
    path('guardargrupo', guardar_grupo, name="guardar grupo"),
    path('eliminargrupo/<int:id>', eliminar_grupo, name="eliminar grupo"),
    path('problemas/<int:id>', ver_problemas, name="ver problemas"),
    path('asignar_problemas/<int:id>', asignar_problemas, name="asignar problemas"),
    path('guardar_problema', guardar_problema, name="guardar problema")
]