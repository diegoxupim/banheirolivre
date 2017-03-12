var POLL_PERIOD = 10000; // in milliseconds

$( document ).ready(function() {

	setInterval(function () {checkOccupation();}, POLL_PERIOD);

	function checkOccupation() {
		$.get("api", function(data){
			switch(data) {
					case "truetrue":
						$("#mycoolstuff").attr("src","images/page-ocupado1ocupado2.png");
						favicon.change('images/favgreen.png', 'Ocupados');
						break;
					case "truefalse":
						$("#mycoolstuff").attr("src","images/page-ocupado1livre2.png");
						favicon.change('images/favgreen.png', 'Principal livre');
						break;
					case "falsetrue":
						$("#mycoolstuff").attr("src","images/page-livre1ocupado2.png");
						favicon.change('images/favgreen.png', 'Recepção livre');
						break;
					case "falsefalse":
						$("#mycoolstuff").attr("src","images/page-livre1livre2.png");
						favicon.change('images/favgreen.png', 'Livres');
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
