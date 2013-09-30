from django.contrib import admin
from principal.apps.ventas.models import cliente,producto

admin.site.register(cliente)
admin.site.register(producto)