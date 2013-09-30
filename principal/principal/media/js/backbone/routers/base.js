Luispa.Routers.BaseRouter = Backbone.Router.extend({
	routes: {
		"" :  "root",
		"producto/:id" : "productoSingle"
	},
	initialize : function(){
		var self = this;

	},
	root: function(){
		var self = this;
		$('#contenido > div').show();
		//window.app.state = "root";
		

		
		
	},
	productoSingle : function(id){
		//window.app.state = "articleSingle";
		//window.app.article = id;
		$('#contenido > div').hide();
		$('#contenido #' + id).show();
	}
});
