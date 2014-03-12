 var baseDatos;

    function printResult(){
      	write("Executed : ", arguments);
  };

var Usuario = function(usuario,password,correoElec ){
	this.us = usuario;
	this.pass = password;
	this.email = correoElec;
};


//var db = openDatabase("test", "1.0", "BD Prueba", 1024);  // Open SQLite Database


$( document ).ready( function(){
	initDatabase();

	//getUsuarios(recargarUsuarios);
});


var initDatabase = function () {
var request = window.indexedDB.open('prueba', 1);
request.onerror = function(event) {
	alert("El navegador no soporta IndexedDB :/ "+JSON.stringify(event));
};
request.onsuccess = function(event) {
	alert("entra a crear bd!");
	baseDatos = request.result;



baseDatos.onerror = function ( event ){
	//generic error handler for all errors asociated with this db 
	alert("Database error! "+event.target.errorCode);

};


		$("#boton").click(function(){
	//	guardarUsuarios();
	var nvo = new Usuario($("#usuario").val(),$("#pass").val(),$("#correoelec").val());
	alert("Mis datos JSONificados "+JSON.stringify(nvo));
	addNewUser(nvo);
	});
	getUsuarios();
};



request.onupgradeneeded = function (event){
	//este evento se dispara si estamos queriendo inicializar una version superior 
	//a la que se uso cuando se creo la bd
	//aca se tienen que crear los objetos ("tablas")
	  var db = event.target.result;
  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique.
  var objectStore = db.createObjectStore("usuarios", { keyPath: "us" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("pass", "pass", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: false });

};




	/*
	db.transaction( function( tr ) 
		{
 		alert("entra a la creacion de bd");

		// Create our girls table if it doesn't exist.
		tr.executeSql(
		"CREATE TABLE IF NOT EXISTS usuarios (" +
		"id VARCHAR(50) NOT NULL PRIMARY KEY," +
		"pass VARCHAR(50) NOT NULL" +
		");"
		);
 
		}
	);
*/
};


var addNewUser = function(usuario) {
  	
  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  	var transac = baseDatos.transaction(["usuarios"],"readwrite");
  	var usuariosDB = transac.objectStore("usuarios");

 	 var request = usuariosDB.add(usuario);
 	 request.onsuccess = function(event) {
 	   alert("usuario agregado! "+JSON.stringify(usuario));
 	   		getUsuarios();
 		 };

	/*
	db.transaction (function(t){
		t.executeSql(
			("INSERT INTO usuarios VALUES (?,?);"),
			 [us, pass],
			 function(t, result){
			 	callback(result.insertId);
			 }
		);
	});
*/


}

var getUsuarios = function (){

	var array = new Array();

	var usuarios = baseDatos.transaction("usuarios").objectStore("usuarios");

usuarios.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
  	var newUser = new Usuario(cursor.key,cursor.value.pass, cursor.value.email);
  	array.push(newUser);
    cursor.continue();
  }
  else {
     recargarUsuarios(array);
  }
};
/*
	db.transaction(function(t){
		 		

		t.executeSql("SELECT * FROM usuarios ORDER BY id;",
			[],
			function(t,result){
				alert("manda la info a callback "+result.toString());
				callback(result);
			}
		);
	});
*/
}


var guardarUsuarios = function(){
							alert("entra al evento");


/*
		addNewUser( $("#usuario").val(),
					$("#pass").val(),
					function(idagregado){
						alert("id agregado! "+idagregado);
						getUsuarios(recargarUsuarios);
					}
					
		);
*/
};


var recargarUsuarios = function(usuarios ){
	// Clear out the list of girls.

		var lista = $("#lista");
	lista.empty();

 
	// Check to see if we have any results.
	if (!usuarios){
	return;
	}
 
	// Loop over the current list of girls and add them
	// to the visual list.
	for(var i=0;i < usuarios.length; i++){

		lista.append("<li>"+usuarios[i].us+" "+usuarios[i].pass+" "+usuarios[i].email+"</li>");
	};
	};
	