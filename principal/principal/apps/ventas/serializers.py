from rest_framework import serializers
from principal.apps.ventas.models import producto

class ProductoSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = producto
		fields = ('id','url','nombre','descripcion','status','imagen','precio','stock',)