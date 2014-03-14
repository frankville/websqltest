
$(document).ready(function () {
	//getUsuarios();

$("#botonCargaUs").click(function(event){
	//	guardarUsuarios();
	event.preventDefault();
	var nvo = new Usuario($("#usuario").val(),$("#pass").val(),$("#correoe").val(), new Array());
	alert("Mis datos JSONificados "+JSON.stringify(nvo));
	addNewUser(nvo);
});



});



var Usuario = function(usuario,password,correoElec,sesiones ){
	
	this.nombre = usuario;
	this.pass = password;
	this.email = correoElec;
	this.sesiones = sesiones;
};


var addNewUser = function(usuario) {
  	
  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  	var transac = baseDatos.transaction(["usuarios"],"readwrite");
  	var usuariosDB = transac.objectStore("usuarios");

 	 var request = usuariosDB.add(usuario);
 	transac.oncomplete = function (event) {
 		getUsuarios();
 	};   		
 	transac.onerror = function(event){
 		alert("error en addNewUser");
 	}

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


var getUsuarios = function (){

	var array = new Array();

	var usuarios = baseDatos.transaction("usuarios").objectStore("usuarios");

usuarios.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
  	var newUser = new Usuario(cursor.key,cursor.value.pass, cursor.value.email, cursor.value.sesiones);
  	array.push(newUser);
    cursor.continue();
  }
  else {
     recargarUsuarios(array);
  }
};

usuarios.openCursor().onerror = function (event){
	alert("error en getusuarios!!");
}
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
	$("#listaUsuarios tbody tr").remove();
	// Check to see if we have any results.
	if (!usuarios){
	return;
	}
 
	// Loop over the current list of girls and add them
	// to the visual list.
	for(var i=0;i < usuarios.length; i++){
		var fila = "<tr>"+"<td class='nombre'>"+usuarios[i].nombre+"</td>"+"<td class='pass'>"+usuarios[i].pass+"</td>"+"<td class='email'>"+usuarios[i].email+"</td>"+"</tr>";
		$("#listaUsuarios").append(fila);
		JSON.stringify(usuarios);

	};
	$('#listaUsuarios tbody tr').click(function(event){
			getSesiones($(this).find(".nombre").text());
 });
	};