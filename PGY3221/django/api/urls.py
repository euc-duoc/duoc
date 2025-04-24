from django.urls import path
from . import views

urlpatterns = [
    path('grupos/', views.lista_grupos, name="lista_grupos"),
    path('grupo/<id>', views.ver_grupo, name="ver_grupo")
]