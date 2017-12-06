chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var popup = '';
    switch (request.directive) {
        case "popup-click1":
	    popup = "popup-click1";
            break;
        case "popup-click2":
	    popup = "popup-click2";
            break;
        case "popup-click3":
	    popup = "popup-click3";
            break;
        default:
            alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
    }
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: popup}, function(response) {});});
    chrome.tabs.executeScript(null, { 
        file: "contentscript.js", 
        allFrames: true 
    });
    sendResponse({}); 
});
