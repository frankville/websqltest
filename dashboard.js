$(document).ready(function(){

	$("#ingresosResumen").click(function (event){
		event.preventDefault();
			alert("entra");
		$("#homePan").fadeOut("slow");
		$("#ctrlResumenIngreso").removeClass("collapse");
		$("#visor").removeClass("collapse");
		$("#ctrlResumenIngreso").fadeIn("slow");
		$("#visor").fadeIn("slow");

	});
});