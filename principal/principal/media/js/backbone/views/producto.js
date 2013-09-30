Luispa.Views.ProductoView = Backbone.View.extend({
	events:{
		"click .prodArt " : "navigate",
		"click .nombre" : "cambiar_nombre"

	},
	className:"",
	initialize : function(model){
		var self = this;
		this.model = model;

		this.model.on('change', function(){
			self.render();
		});
		this.template = swig.compile($("#Producto_tpl").html());
	},
	
	cambiar_nombre : function(e){
		
		var nombre = this.model.get("stock");
		this.model.set("nombre", nombre);
		this.model.save();

	},
	navigate : function(e){
		Backbone.history.navigate("producto/"+ this.model.get("id"), {trigger:true});
	},

	render: function(data) {
		var self = this;
		var locals ={
			post : this.model.toJSON()
		};
		this.$el.html( this.template(locals) );	

		return this;
	}
});
