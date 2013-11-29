from django.shortcuts import render_to_response
from django.template import RequestContext
from principal.apps.ventas.forms import addProductForm
from principal.apps.ventas.models import producto
from django.http import HttpResponseRedirect


def add_product_view(request):
	info ="Inicializando"
	if request.user.is_authenticated():
		if request.method == "POST":
			form = addProductForm(request.POST, request.FILES)
			if form.is_valid():
				nombre = form.cleaned_data['nombre']
				descripcion = form.cleaned_data['descripcion']
				imagen = form.cleaned_data['imagen'] #Esto se obtiene con el request.FILES
				precio = form.cleaned_data['precio']
				stock = form.cleaned_data['stock']
				p = producto()
				if imagen: #generamos una pequenia validacin
					p.imagen = imagen
				p.nombre = nombre
				p.descripcion = descripcion
				p.precio = precio
				p.stock = stock
				p.status = True
				p.save()
				info = "se gurdo satisfactoriamente!!"
			else:
				info = "informacion con datos incorrectos"
			form = addProductForm()
			ctx = {'form':form, 'informacion':info}
			return render_to_response('ventas/addProducto.html',ctx,context_instance=RequestContext(request))
		else:
				form = addProductForm()
				ctx = {'form':form}

		return render_to_response('ventas/addProducto.html',ctx,context_instance=RequestContext(request))
	else:
		return HttpResponseRedirect('/')



from .serializers import ProductoSerializer, UserSerializer
from rest_framework import viewsets
from django.contrib.auth.models import User

class ProductoViewSet(viewsets.ModelViewSet):
	queryset = producto.objects.all()
	serializer_class = ProductoSerializer

class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer