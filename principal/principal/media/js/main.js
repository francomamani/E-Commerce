$(document).ready(function(){
	console.log('Starting app');

	window.collections.productos = new Luispa.Collections.ProductoCollection();
	window.routers.base = new Luispa.Routers.BaseRouter();
	window.views.productoNew = new Luispa.Views.ProductoNewView($('.ProductNew'));
	window.collections.productos.on('add', function(model){
		var view = new Luispa.Views.ProductoView(model);
		view.render();
		$('.productos').append(view.$el);
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

	$('#root').on('click', function(){
		Backbone.history.navigate("", {trigger:true});
	});
	$('#productos').on('click', function(){
		Backbone.history.navigate("productos", {trigger:true});
	});
	
	
});
