Luispa.Views.ProductoView = Backbone.View.extend({
	
	events:{
		"click .producto " : "ProductoDetalle",
		//"click .comprar" : "Comprar",
		"click .modificar" : "modificar",
		"submit form" : "actualizar",
		//"click .nombre" : "cambiar_nombre",
		"click .eliminar" : "removeHandler"


	},
	className:"",
	initialize : function(model){
		var self = this;
		this.model = model;
		
		this.model.on('change', function(){
			self.render();

		});
		this.destroyHandler = function(){
               
            self.remove();
        }

        this.model.on('destroy', this.destroyHandler);

		window.routers.base.on('route:root', function(){
			self.render();
		});

		window.routers.base.on('route:productos', function(){
			self.render();

		});

		window.routers.base.on('route:productoSingle', function(){
			self.render();
		});
		
		window.routers.base.on('route:productoUpdate', function(){
			self.render();
		});

		this.template = swig.compile($("#Producto_tpl").html());
		this.templateExtended = swig.compile($("#Producto_Extended_tpl").html());
		this.templateUpdate = swig.compile($("#Producto_Update_tpl").html());
	},
	
	modificar : function()
	{
		console.log("modificar");

		Backbone.history.navigate("productoUpdate/"+ this.model.get("id"), {trigger:true});
		
	},
	actualizar : function(e){
		e.preventDefault();
		
		var id = this.model.get("id");
		var nombre = $('#nombreUpId').val();
		var descripcion = $('#descripcionUpId').val();
		var precio = $('#precioUpId').val();
		var stock = $('#stockUpId').val();
		var imagen = $('#imagenUpId')[0].files[0];


		var data = {
			id: id,
			nombre: nombre,
			descripcion: descripcion,
			precio : parseFloat(precio),
	 		stock : parseInt(stock),
			imagen: imagen
		 	
		};
		
	
		
		this.model.save(data, {
			success: function(){
		    console.log("saved")
			 }, 
			 error: function(dat){
			  console.log(dat)
			 }
			

		});
		
	},	

	/*cambiar_nombre : function(e){
		
		var nombre = this.model.get("stock");
		this.model.set("nombre", nombre);
		this.model.save();

	},*/
	ProductoDetalle : function(e){

		
		Backbone.history.navigate("producto/"+ this.model.get("id"), {trigger:true});
		var nombre = this.model.get('nombre');
		var precio = this.model.get('precio');
		var dat = {
			grant_type:"client_credentials",
			client_id:"4306101771673080",
			client_secret:"X2NSCsm67Uv6ec4UdPGjoJKK9lvKDKQI"
			}

		$.post( "https://api.mercadolibre.com/oauth/token",dat)
			.done(function( data ) {
    			var access = data.access_token
    			var pref = {"items":[{"title":nombre,"quantity" : 1,"currency_id":"AR","unit_price" : parseFloat(precio)}]}
    			$.ajax ({
					    url: "https://api.mercadolibre.com/checkout/preferences?access_token="+access,
					    type: "POST",
					    data: JSON.stringify(pref),
					    dataType: "json",
					    contentType: "application/json; charset=utf-8",
					    success: function(dato){
					    	
					        var api = dato.init_point
					        $("a.comprar").attr("href", api)
					        var script = '<script type="text/javascript" src="https://www.mercadopago.com/org-img/jsapi/mptools/buttons/render.js"></script>';
					       $("a.comprar").after(script)
					    }
					});
			});
		
	},

	removeHandler : function(){
				
				if(confirm("¿Esta seguro que desea eliminar este producto?"))
				{
					this.model.off('destroy', this.destroyHandler);
           	 		this.model.destroy();
            		this.remove();

				}
				
				
            
        },
	render: function(data) {
		var self = this;
		var locals ={
			
			post : this.model.toJSON(),
			
		};

		if(window.app.state === "productos"){
			
			$('.productos').show();
			this.$el.show();
			this.$el.html( this.template(locals) );
			$(".inicio").hide();
			$(".btnAdd").show();
			$("#formulario").hide();

		}

		if(window.app.state === "productoSingle"){
				this.$el.hide();
				this.$el.html('');
			if(window.app.producto == this.model.get('id')){
				$('.productos').show();
				this.$el.show();
				this.$el.html( this.templateExtended(locals) );
				$(".inicio").hide();
				$(".ProductList").hide();
				$(".btnAdd").hide();
			}
		}
		if(window.app.state === "productoUpdate"){
			this.$el.hide();
			this.$el.html('');
			if(window.app.producto == this.model.get('id')){
				$('.productos').show();
				this.$el.show();
				this.$el.html( this.templateUpdate(locals) );
				$(".inicio").hide();
				$(".ProductList").hide();
				$(".btnAdd").hide();
			}
		}

			
		if (window.app.state === "root"){
			$('.productos').hide();
			this.$el.hide();
			this.$el.html('');
			$(".inicio").show();

		}		

		return this;
	}
});
