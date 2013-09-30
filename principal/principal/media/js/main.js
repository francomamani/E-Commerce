$(document).ready(function(){
	console.log('Starting app');

	window.collections.productos = new Luispa.Collections.ProductoCollection();
	window.routers.base = new Luispa.Routers.BaseRouter();
	window.collections.productos.on('add', function(model){
		var view = new Luispa.Views.ProductoView(model);
		view.render();
		view.$el.insertAfter('#contenido aside');
	});

	var xhr = $.get('/api/productos');

	xhr.done(function(data){
		data.forEach(function(item){
			window.collections.productos.add(item);
		});

		Backbone.history.start({
			root : '/',
			pushState : true,
			silent : false

		});
	});

	$('.nav:first').on('click', function(){
		Backbone.history.navigate("", {trigger:true});
	});
	
});
