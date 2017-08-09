function main() {
    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
}


function restoreOptions() {
    chrome.storage.sync.get('url', function(items) {
        document.getElementById('url').value = items.url;
    });
	chrome.storage.sync.get('notificar', function(items) {
        document.getElementById('notificar').checked = items.notificar;
    });
}


function saveOptions() {
    var url = document.getElementById('url').value;
	var notificar = document.getElementById('notificar').checked;

    chrome.storage.sync.set({
      url: url,
	  notificar: notificar
    }, function() {
      // Display "Saved" message
      $('#msg').css('display','inline').animate({ opacity: 1 }, 200);
      setTimeout(function() { $('#msg').animate({ opacity: 0 }, 500); }, 800);
    });
}


main();
