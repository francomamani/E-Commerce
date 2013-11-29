Luispa.Views.ProductoNewView = Backbone.View.extend({
	events:{
		"click .nuevo" : "nuevo",
		"click .cancelar" : "cancelar",
		"submit form" : "agregar"
		

	},
	className:"",
	initialize : function($el){
		this.$el = $el;
		//this.template = _.template($("#ArticleNew_tpl").html());
	},

	nuevo : function(){
		$('#formulario').slideDown();
		$('.btnAdd').hide();

	},
	cancelar : function(){
		$('#formulario').slideUp();
		$('.btnAdd').show();

	},

	agregar : function(e){
		
     e.preventDefault();

    var nombre = $('#nombreId').val();
	var descripcion = $('#descripcionId').val();
	var precio = $('#precioId').val();
	var stock = $('#stockId').val();
	var imagen = $('#imagenId')[0].files[0];
	
	//var imagVal = $('#imagenId').val();
	//var imagDiv = ImagVal = imagVal.split('\\');
	//var imagen = imagDiv[imagDiv.length-1];

		
	var data = {
		nombre : nombre,
	 	descripcion : descripcion,
	 	precio : parseFloat(precio),
	 	stock : parseInt(stock),
	 	imagen : imagen
	 };

    //_.each(this.$('form').serializeArray(), function(input){
      
    //  values[ input.name ] = input.value;
    //});

	var model = new Luispa.Models.Producto(data);

    //model.save(data, { iframe: true,
                              //files: this.$('form :file'),
                              //data: values });
   	
   	var xhr = model.save(data);

   	xhr.done(function(dato){
   		window.collections.productos.add(dato);		
   	});
   
   	
    
	},

  //    $(document).ready(function() {
//      $("#statusForm").submit(function() {
//      var frm = $('#statusForm');
//         $.ajax({
//             type: frm.attr('method'),
//             url: 'tweet.php',
//             data: frm.serialize(),
//             success: function (data) {
//             $('#new_tweet').html(data);
//             $('#txtArea').val('');
//             },
//             error: function(jqXHR, textStatus, errorThrown){
//             // log the error to the console
//             console.log(
//                 "The following error occured: "+
//                 textStatus, errorThrown
//             );
//             }

//         });

//         return false;
//     });
// });


  // upload FormData object by XMLHttpRequest
            // $.ajax({
            //     url: '/api/productos',
            //     type: 'POST',
            //     data: fileData,
            //     processData: false,
            //     cache: false,
            //     contentType: false
            // })
            // .done(function () {
            //     console.log(' uploaded successfully !' );
            // })
            // .fail(function () {
            //     console.log('Error! An error occurred while uploading ');
            //     return false;
            // });
  

	// agregar : function(e){

	// 	e.preventDefault();

	// 	var nombre = this.$el.find('#nombreId').val();
	// 	var descripcion = this.$el.find('#descripcionId').val();
	// 	var precio = this.$el.find('#precioId').val();
	// 	var stock = this.$el.find('#stockId').val();

	// 	var imagVal = this.$el.find('#imagenId').val();
	// 	var imagDiv = ImagVal = imagVal.split('\\');
	// 	var imagen = imagDiv[imagDiv.length-1];

		
	// 	var model = new Luispa.Models.Producto({
	// 		nombre : nombre,
	// 		descripcion : descripcion,
	// 		imagen : "MultimediaData/Producto/"+nombre+"/"+imagen,
	// 		precio : parseFloat(precio),
	// 		stock : parseInt(stock)

	// 	});
	// 	var xhr = model.save(imagen);

	// 	xhr.done(function(data){
	// 		console.log("Creado Correctamente");
	// 		Backbone.history.navigate('producto/'+data.id, {trigger: true});

	// 	});
	// },

	render: function(data) {
		// var self = this;
		// var locals ={};

		// this.$el.html(this.template({data:locals}));

		// return this;
	}
});
