var URL = 'http://172.27.72.235/api';


function main() {
    chrome.storage.onChanged.addListener(function(changes) {
        if ('url' in changes) {
            URL = changes.url.newValue;
        }
    });

    chrome.storage.sync.get('url', function(items) {
        if (items.url && items.url != '') {
          URL = items.url;
        } else {
          chrome.storage.sync.set({ url: URL });
        }

        chrome.alarms.onAlarm.addListener(updateState);
        chrome.alarms.create({ delayInMinutes: 0, periodInMinutes: 0.1 });
    });
}


function updateState() {
    if (URL && URL != '') {
        $.get(URL).then(function(data) {
            //data = Math.random() > 0.5 ? 'free' : 'busy';
            //console.log(data)
			switch(data.toLowerCase()) {
					case "truetrue":
						icon = 'livre1livre2.png';
						msg = 'Um milagre os dois etão livres!';
						break;
					case "truefalse":
						icon = 'livre1ocupado2.png';
						msg = 'Corre que o da recepção está livre!';
						break;
					case "falsetrue":
						icon = 'ocupado1livre2.png';
						msg = 'Corre que o principal está livre!';
						break;
					case "falsefalse":
						icon = 'ocupado1ocupado2.png';
						msg = 'Pra variar todos ocupados!';
						break;
					default:
						icon = 'unknown.png';
						msg = 'tenta a sorte(servidor fora do ar)';
				}
				
            chrome.browserAction.setIcon({ path: icon });
            chrome.browserAction.setTitle({ title: msg });
        });
    }
}
main();
