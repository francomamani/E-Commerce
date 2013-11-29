Luispa.Routers.BaseRouter = Backbone.Router.extend({
	routes: {
		"" :  "root",
		"productos" : "productos",
		"producto/:id" : "productoSingle",
		"productoUpdate/:id" : "productoUpdate"
	},
	initialize : function(){
		var self = this;

	},
	root: function(){
		var self = this;
		window.app.state = "root";
		

		
		
	},
	productos : function(){
		window.app.state = "productos";


	},
	productoSingle : function(id){
		window.app.state = "productoSingle";
		window.app.producto = id;
		
	},
	productoUpdate : function(id){
		window.app.state = "productoUpdate";
		window.app.producto = id;
		
	}
});
