from rest_framework import serializers
from principal.apps.ventas.models import producto
from django.contrib.auth.models import User

class ProductoSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = producto
		fields = ('id','url','nombre','descripcion','status','imagen','precio','stock',)

class UserSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = User
		fields = ('id','url','username','email',)