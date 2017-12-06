function clickHandler1(e) {
    chrome.runtime.sendMessage({directive: "popup-click1"}, function(response) {
        this.close();
    });
}
function clickHandler2(e) {
    chrome.runtime.sendMessage({directive: "popup-click2"}, function(response) {
        this.close();
    });
}
function clickHandler3(e) {
    chrome.runtime.sendMessage({directive: "popup-click3"}, function(response) {
        this.close();
    });
}
document.addEventListener('DOMContentLoaded', function () {

   document.getElementById("click-me1").addEventListener('click', clickHandler1);
   document.getElementById("click-me2").addEventListener('click', clickHandler2);
   document.getElementById("click-me3").addEventListener('click', clickHandler3);

})
