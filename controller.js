 var db = openDatabase("test", "1.0", "BD Prueba", 1024);  // Open SQLite Database


$( document ).ready( function(){
	alert("ya esta");
	initDatabase();
	$("#boton").click(function(){
		guardarUsuarios();
	});
	getUsuarios(recargarUsuarios);
});


var initDatabase = function () {
	
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
}

var addNewUser = function(us, pass, callback) {
	db.transaction (function(t){
		t.executeSql(
			("INSERT INTO usuarios VALUES (?,?);"),
			 [us, pass],
			 function(t, result){
			 	callback(result.insertId);
			 }
		);
	});
}

var getUsuarios = function (callback){
	db.transaction(function(t){
		 		

		t.executeSql("SELECT * FROM usuarios ORDER BY id;",
			[],
			function(t,result){
				alert("manda la info a callback "+result.toString());
				callback(result);
			}
		);
	});
}


var guardarUsuarios = function(){
							alert("entra al evento");



		addNewUser( $("#usuario").val(),
					$("#pass").val(),
					function(idagregado){
						alert("id agregado! "+idagregado);
						getUsuarios(recargarUsuarios);
					}
					
		);
};


var recargarUsuarios = function(results ){
	// Clear out the list of girls.
			alert("entra a recargarUsuarios???");

		var lista = $("#lista");
	lista.empty();

 
	// Check to see if we have any results.
	if (!results){
	return;
	}
 
	// Loop over the current list of girls and add them
	// to the visual list.
			alert("entra a agregar usuario!!!! "+results.rows.length);

	for(var i=0;i < results.rows.length;i++){
					alert("elemento "+results.rows.item(i).id);


		lista.append("<li>"+results.rows.item(i).id+"</li>");
	};
	};
	