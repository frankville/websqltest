var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var mysql = require("mysql");

var cliente = mysql.createConnection({
	user :"queryuser",
	password : "undomiel",
	host :"192.168.0.103",
	port :"3306",
	database :"lancaster_test"
});


var usuario = function (id, nom, pass) {
	this.idus = id;
	this.nusuario = nom;
	this.passus = pass;
	this.toString = function () {
		return "id: "+this.idus+" nomusuario: "+this.nusuario+" pusuario: "+this.pusuario;	
	};
};
var grantAccess = function(req, res, next){
	
};



app.configure(function() {
	//app.use(grantAccess);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

});


var mostrarUS = function(req, res){
	res.header('Access-Control-Allow-Origin', "*");
	var arreglo = new Array();
//	console.log("pedido "+JSON.stringify(res));
	cliente.query("select * from usuarios;", function (err,results,fields) {
		if(err){
			res.send("Error en query! "+err.message);
		}else{
			console.log("buena!!!");
			for(var i=0; i < results.length; i++){
				var us = new usuario(results[i].idusuario,results[i].nusuario, results[i].pusuario);
				arreglo.push(us);
			};
			console.log(arreglo.valueOf());
			res.json(arreglo);
		}
	});
};

app.get("/greetings", mostrarUS);

server.listen(2011, function () {
	console.log("Node server running on http://localhost:2011");
	cliente.connect(function(err) {
		if(err){
			console.log("error en conexion con mysql!! "+err.message);
		}
	});
});