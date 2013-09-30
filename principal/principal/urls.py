from django.conf.urls import patterns, include, url
import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^',include('principal.apps.home.urls')),
    url(r'^',include('principal.apps.ventas.urls')),
    url(r'^',include('principal.apps.apis.apiProductos.urls')),
   
    
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.MEDIA_ROOT}),
)
