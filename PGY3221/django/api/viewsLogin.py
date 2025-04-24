from rest_framework.parsers import JSONParser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['POST'])
def login(request):
    data = JSONParser().parse(request)
    username = data['username']
    password = data['password']

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response( "Usuario no existe", status=status.HTTP_404_NOT_FOUND)
    
    pass_ok = check_password(password, user.password)

    if(not pass_ok):
        return Response("Contraseña incorrecta", status=status.HTTP_401_UNAUTHORIZED)
    
    token, created = Token.objects.get_or_create(user=user)
    return Response(token.key, status=status.HTTP_200_OK)