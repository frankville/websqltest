var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
var mysql = require("mysql");
var url = require("url");
var queryString = require("querystring");

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
	res.header("Access-Control-Allow-Origin", "*");
	next();
};



app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(grantAccess);
	app.use(app.router);

});


var validarUS = function(req, res){
	var urlParsed = url.parse(req.url);
	var query = queryString.parse(urlParsed.query);

	var qjson = JSON.parse(query.jsonObj);

	cliente.query("select * from usuarios where nusuario = ? and pusuario = ?;",[qjson.nusuario, qjson.pusuario] , function (err,results,fields) {
		if(err){
			console.log("Error en query! "+err.message);
		}else{
			var respuesta = null;
				if(results.length == 0){
					respuesta = { "status": "0"};
				}else{
					respuesta = { "status": "1"};
				}
			
			res.json(respuesta);
		}
	});
};

app.get("/login", validarUS);

server.listen(2011, function () {
	console.log("Node server running on http://localhost:2011");
	cliente.connect(function(err) {
		if(err){
			console.log("error en conexion con mysql!! "+err.message);
		}
	});
});