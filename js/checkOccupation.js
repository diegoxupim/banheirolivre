var POLL_PERIOD = 1000; // in milliseconds

$( document ).ready(function() {

	setInterval(function () {checkOccupation();}, POLL_PERIOD);

	function checkOccupation() {
		$.get("api", function(data){
			switch(data) {
					case "truetrue":
						$("#mycoolstuff").attr("src","images/ocupado1ocupado2.png");
						favicon.change('images/favgreen.png', 'Livre');
						break;
					case "truefalse":
						$("#mycoolstuff").attr("src","images/ocupado1livre2.png");
						favicon.change('images/favgreen.png', 'Livre');
						break;
					case "falsetrue":
						$("#mycoolstuff").attr("src","images/livre1ocupado2.png");
						favicon.change('images/favgreen.png', 'Livre');
						break;
					case "falsefalse":
						$("#mycoolstuff").attr("src","images/livre1livre2.png");
						favicon.change('images/favgreen.png', 'Ocupado');
						break;
					default:
						$("#mycoolstuff").attr("src","images/fora-do-ar.png");
						favicon.change('images/favgray.png', 'Fora do ar');
				}
			
			
		}).fail(function(err, xhr, msg) {
			$("#mycoolstuff").attr("src","images/fora-do-ar.png");
			favicon.change('images/favgray.png', 'Fora do ar');
		});
	}
});
