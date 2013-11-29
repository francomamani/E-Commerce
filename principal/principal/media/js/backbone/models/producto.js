Luispa.Models.ProductoModel = Backbone.Model.extend({

	urlRoot:"/api/productos/",
	
	

	sync: function (method, model, options) {
		var modelId = model.id+"/";
		if (modelId == undefined+"/"){
			
			modelId = "";
		}
	    var data
	      , methodMap = {
	          'create': 'POST',
	          'update': 'PUT',
	          'delete': 'DELETE',
	          'read':   'GET'
	        }
	      , params = {
	          type: methodMap[method],
	          dataType: 'json',
	          url: this.urlRoot+modelId || this.urlError()
	        };

	    if (method == 'create' || method == 'update') {
	    
	      if (!!window.FormData) {
	        data = new FormData();
	        
	        $.each(model.toJSON(), function (name, value) {
	          if ($.isArray(value)) {
	          	
	            if (value.length > 0) {
	              $.each(value, function(index, item_value) {
	                data.append(name, item_value);
	              })
	            }
	          } else {
	            data.append(name, value)
	          	
	          }
	        });
	        
	        params.contentType = false;
	        params.processData = false;
	      } else {
	      	
	        data = model.toJSON();
	        params.contentType = "application/x-www-form-urlencoded";
	        params.processData = true;

	      }
	      params.data = data;
	    }

	    return $.ajax(_.extend(params, options));

	    
	},



	urlError: function() {
	    throw new Error('A "url" property or function must be specified');
	},

	base_url: function() {
      var temp_url = Backbone.Model.prototype.url.call(this);
      return (temp_url.charAt(temp_url.length - 1) == '/' ? temp_url : temp_url+'/');
    },

    url: function() {
      return this.base_url();
    },

	prettyDate : function(date){
		if (!date || date === "0000-00-00 00:00:00") return "";
		var date = Date.parse(date);
		return date.toString("MMMM dd, yyyy")
	},
	parse : function(resp) {
		// the collection does not output same json format to models;
		if(resp.data){
			return resp.data;
		}else{
			return resp;
		}
	}
});
Luispa.Models.Producto = Luispa.Models.ProductoModel;