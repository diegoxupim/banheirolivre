var URL = 'http://172.27.72.235:8080/api';
var oldStatus;
var notificar = false;

function main() {
    chrome.storage.onChanged.addListener(function(changes) {
        if ('url' in changes) {
            URL = changes.url.newValue;
        }
		
		if ('notificar' in changes) {
            notificar = changes.notificar.newValue;
        }
    });

    chrome.storage.sync.get('url', function(items) {
        if (items.url && items.url != '') {
          URL = items.url;
        } else {
          chrome.storage.sync.set({ url: URL });
        }

        chrome.alarms.onAlarm.addListener(updateState);
        chrome.alarms.create({ delayInMinutes: 0, periodInMinutes: 0.05 });
    });
	
	chrome.storage.sync.get('notificar', function(items) {
        if (items.notificar && items.notificar != '') {
          notificar = items.notificar;
        } else {
          chrome.storage.sync.set({ notificar: notificar });
        }
    });
}


function updateState() {
    if (URL && URL != '') {
        $.get(URL).then(function(data) {
		switch(data) {
				case "truetrue":
					icon = 'ocupado1ocupado2.png';
					msg = 'Pra variar todos ocupados!';
					break;
				case "truefalse":
					icon = 'ocupado1livre2.png';
					msg = 'Corre que o principal está livre!';
					
					if(notificar && oldStatus == "truetrue")
						chrome.notifications.create("principal",{type: "basic", title: "Banheiro", message: msg, iconUrl: icon });
					
					break;
				case "falsetrue":
					icon = 'livre1ocupado2.png';
					msg = 'Corre que o da recepção está livre!';
					
					if(notificar && oldStatus == "truetrue")
						chrome.notifications.create("recepcao",{type: "basic", title: "Banheiro", message: msg, iconUrl: icon });
					
					break;
				case "falsefalse":
					icon = 'livre1livre2.png';
					msg = 'Um milagre! Os dois estão livres!';
					break;
				default:
					icon = 'unknown.png';
					msg = 'tenta a sorte(servidor fora do ar)';
				}
			
			oldStatus = data;
			
            chrome.browserAction.setIcon({ path: icon });
            chrome.browserAction.setTitle({ title: msg });
			
        });
    }
}
main();
