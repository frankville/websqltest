// var db = openDatabase("test", "1.0", "BD Prueba", 1024);  // Open SQLite Database

$(document).ready(function(){

});

$("#formulario").submit(function(event){
	event.preventDefault();
	$("#usuario").hide("fast",function(){});
	$("#pass").hide("fast",function(){});
	$("#spin").show("fast",function(){});

	verificarUsuario($("#usuario").val(),$("#pass").val(), darRespuesta);
	/* 
$("#usuario").show("slow",function(){});
		$("#pass").show("slow",function(){});
		$("#spin").fadeOut("slow");
	*/

});

var datosLogin = function  (nomus, passus) {
	this.nusuario = nomus;
	this.pusuario = passus;
	this.toString = function () {
		return " username: "+this.nusuario+" userpass: "+this.pusuario;	
	};
};

var verificarUsuario = function(us,pass,callback){


	var sesion = new datosLogin(us,pass);
	alert("json "+JSON.stringify(sesion));

	$.getJSON("http://localhost:2011/greetings", function(data) {
		alert("datos del server "+JSON.stringify(data));
	});
/*
	$.ajax ({
		type: "GET",
		url: "http://localhost:2011/greetings",
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		//data: JSON.stringify(sesion),
		success: function (data, status, jqXHR) {
			alert("la respuesta del server ");
		},
		error: function(xhrequest, ErrorText, thrownError) {
            alert("eror:  " + thrownError + " : " + ErrorText);
        }

	});

	
	db.transaction(function(t){
		t.executeSql("SELECT * FROM usuarios where id = ? and pass= ?;",
			[us,pass],
			function(t,result){
				callback(result);
			}
		);
	});
*/
};

var algo = function(data) {
	alert(JSON.stringify(data));
};

var darRespuesta = function(result){
	if(result != 0 ){
		$("#alcahuete").text("Exito! tu usuario y password son validos");
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-danger");
		$("#alcahuete").addClass("alert-success");

	}else{
		$("#alcahuete").text("Error! tu usuario y password NO son validos");
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-success");
		$("#alcahuete").addClass("alert-danger");
		$("#usuario").show("slow",function(){});
		$("#pass").show("slow",function(){});
		$("#spin").fadeOut("slow");
	};
};

var mostrarError = function(data){
	$("#alcahuete").text("Error en http request");
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-success");
		$("#alcahuete").addClass("alert-danger");
}

