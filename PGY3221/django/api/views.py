from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from gestionCursos.models import Grupo, Estudiante
from .serializers import GrupoSerializer, EstudianteSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

@csrf_exempt
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def lista_grupos(request):
    if(request.method == 'GET'):
        grupo = Grupo.objects.all()
        serializer = GrupoSerializer(grupo, many=True)   
        return Response(serializer.data, status=200)
    elif(request.method == 'POST'):
        data = JSONParser().parse(request)
        serializer = GrupoSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Error: ", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt   
@api_view(['GET', 'PUT', 'DELETE', 'PATCH'])
@permission_classes((IsAuthenticated,))
def ver_grupo(request, id):
    try:
        grupo = Grupo.objects.get(id=id)
    except Grupo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = GrupoSerializer(grupo)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT' or request.method == 'PATCH':
        serializer = GrupoSerializer(grupo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print("Error: ", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        grupo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)