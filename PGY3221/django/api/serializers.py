from rest_framework import serializers
from gestionCursos.models import Grupo, Estudiante

class GrupoSerializer(serializers.ModelSerializer):    
    class Meta:
        model=Grupo
        fields = ['id', 'nombre', 'tipo', 'imgUrl', 'numintegrantes']

class EstudianteSerializer(serializers.ModelSerializer):    
    class Meta:
        model=Estudiante
        fields = ['id', 'nombre', 'grupo']