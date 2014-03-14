

    function printResult(){
      	write("Executed : ", arguments);
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
		getUsuarios();

baseDatos.onerror = function ( event ){
	//generic error handler for all errors asociated with this db 
	alert("Database error! "+event.target.errorCode);



};


};



request.onupgradeneeded = function (event){
	//este evento se dispara si estamos queriendo inicializar una version superior 
	//a la que se uso cuando se creo la bd
	//aca se tienen que crear los objetos ("tablas")
	  var db = event.target.result;
  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique.
  var usuarios = db.createObjectStore("usuarios", { keyPath: "nombre" });
  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  usuarios.createIndex("pass", "pass", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  usuarios.createIndex("email", "email", { unique: false });

  usuarios.createIndex("sesiones", "sesiones", { unique: false });


  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.



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


