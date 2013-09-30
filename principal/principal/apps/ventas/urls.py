from django.conf.urls.defaults import patterns,url,include

from rest_framework import routers
from principal.apps.ventas.views import ProductoViewSet

router = routers.DefaultRouter()
router.register(r'productos', ProductoViewSet)

urlpatterns = patterns('principal.apps.ventas.views',
	url(r'^api/',include(router.urls)),
	url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
	url(r'^add/producto/$','add_product_view',name='vista_agregar_producto'))
 