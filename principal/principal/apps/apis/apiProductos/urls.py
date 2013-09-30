from django.conf.urls.defaults import patterns,url

urlpatterns = patterns('principal.apps.apis.apiProductos.views',
	url(r'^api/Productos/$','apiProductos_view',name='api_productos_url'))