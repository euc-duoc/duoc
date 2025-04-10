from django.db import models

# Create your models here.
class Grupo(models.Model):    
    class TipoGrupo(models.TextChoices):
        TEMPORAL = 'Temporal'
        PERMANENTE = 'Permanente'

    nombre = models.CharField(max_length=30)
    tipo = models.CharField(max_length=10, choices=TipoGrupo.choices)
    imgUrl = models.CharField(max_length=1000, default="#")