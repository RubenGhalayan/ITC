chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    switch(msg.action){
	case("popup-click1"):
	    changeImage();
	    break;
	case("popup-click2"):
	    changeBackground();
	    break;
	case("popup-click3"):
	    reload();
	    break;
    }

});

function changeImage(){
    var imgs = document.getElementsByTagName("img");
    for (var i = 0, l = imgs.length; i < l; ++i) {
        imgs[i].src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKTHd4f9EeZKUH4RTf8jQ04pqsqQgk5E-9FGtbEo6zvPsO_CVS";
    }
};
function changeBackground(){
    document.body.style.backgroundImage = "url('http://ichef-1.bbci.co.uk/news/976/media/images/83351000/jpg/_83351965_explorer273lincolnshirewoldssouthpicturebynicholassilkstone.jpg')";
};
function reload() {
    document.location.reload(true);

};
