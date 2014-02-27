 var db = openDatabase("test", "1.0", "BD Prueba", 1024);  // Open SQLite Database

$(document).ready(function(){

});

$("#formulario").submit(function(event){
	event.preventDefault();
	$("#usuario").hide("slow",function(){});
	$("#pass").hide("slow",function(){});
	$("#spin").show("slow",function(){});

	verificarUsuario($("#usuario").val(),$("#pass").val(), darRespuesta);
	/* 
$("#usuario").show("slow",function(){});
		$("#pass").show("slow",function(){});
		$("#spin").fadeOut("slow");
	*/

});

var verificarUsuario = function(us,pass,callback){
	db.transaction(function(t){
		t.executeSql("SELECT * FROM usuarios where id = ? and pass= ?;",
			[us,pass],
			function(t,result){
				callback(result);
			}
		);
	});
};

var darRespuesta = function(result){
	if(result.rows.length != 0 ){
		$("#alcahuete").text("Exito! tu usuario y password son validos");
		$("#alcahuete").removeClass("label-default");
		$("#alcahuete").removeClass("label-danger");
		$("#alcahuete").addClass("label-success");

	}else{
				$("#alcahuete").text("Error! tu usuario y password NO son validos");
		$("#alcahuete").removeClass("label-default");
		$("#alcahuete").removeClass("label-success");
		$("#alcahuete").addClass("label-danger");
		$("#usuario").show("slow",function(){});
		$("#pass").show("slow",function(){});
		$("#spin").fadeOut("slow");
	};
};

