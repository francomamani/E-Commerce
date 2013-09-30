from django.http import HttpResponse
from principal.apps.ventas.models import producto
#Integramos la serializacion de los objetos
from django.core import serializers


def apiProductos_view(request):
	data = serializers.serialize("json",producto.objects.filter(status=True))
	#retorna la info en formato json
	return HttpResponse(data,mimetype="application/json")