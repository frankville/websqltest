// var db = openDatabase("test", "1.0", "BD Prueba", 1024);  // Open SQLite Database
var sesion = null;

$(document).ready(function(){
	$("#loaderContainer").fadeOut("fast");
});


$("#usuario").keyup(function(){
	$("#alcahuete").fadeOut("fast");
});
$("#pass").keyup(function(){
	$("#alcahuete").fadeOut("fast");
});
$("#formulario").submit(function(event){
	event.preventDefault();
	$("#formulario").fadeOut("fast",function () {
			$("#loaderContainer").fadeIn("fast");
	});

	verificarUsuario($("#usuario").val(),$("#pass").val(), darRespuesta);
	/* 
$("#usuario").show("fast",function(){});
		$("#pass").show("fast",function(){});
		$("#spin").fadeOut("fast");
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
/*
	$.getJSON("http://localhost:2011/greetings", function(data) {
		alert("datos del server "+JSON.stringify(data));
	});
*/
	$.ajax ({
		type: "GET",
		url: "http://localhost:2011/login",
		//contentType: "application/json; charset=utf-8",
		dataType: "json",
		data: {
			jsonObj: JSON.stringify(sesion)
		},
		success: function (data, status, jqXHR) {
			darRespuesta(data.status);
		},
		error: function(xhrequest, ErrorText, thrownError) {
            mostrarError(thrownError + ": " + ErrorText);
        }

	});

};

var algo = function(data) {
	alert(JSON.stringify(data));
};

var darRespuesta = function(result){
	setTimeout(function(){
			if(result != 0 ){
		sesion = 1;
		$("#loaderContainer").fadeOut("fast",function () {
			$("#formulario").fadeIn("fast");
		});
		$("#alcahuete").text("Exito! tu usuario y password son validos");
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-danger");
		$("#alcahuete").removeClass("collapse");
		$("#alcahuete").addClass("alert-success");

	}else{
		$("#loaderContainer").fadeOut("fast",function () {
			$("#formulario").fadeIn("fast");
		});
		<!--
		$("#alcahuete").text("Error! tu usuario y password NO son validos");
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-success");
		$("#alcahuete").removeClass("collapse");
		$("#alcahuete").addClass("alert-danger");
		-->
	};
	}, 2000);

};

var mostrarError = function(data){
	setTimeout(function(){
		$("#loaderContainer").fadeOut("fast",function () {
			$("#formulario").fadeIn("fast");
		});
	$("#alcahuete").text("Error en http request: "+data);
		$("#alcahuete").removeClass("alert-info");
		$("#alcahuete").removeClass("alert-success");
		$("#alcahuete").removeClass("collapse");
		$("#alcahuete").addClass("alert-danger");
	}, 2000);
};

