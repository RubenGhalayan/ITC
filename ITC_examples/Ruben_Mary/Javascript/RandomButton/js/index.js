var count = 0;
var num;

function myfunc() {
    var div = document.getElementById("div");
    if (count < 6) {
        num = Math.round(Math.random() * 100);
        div.innerHTML += num + "<br>"; 
        ++count;
    }
    else document.getElementById("button").removeEventListener("click", myfunc);
}

document.getElementById("button").addEventListener("click", myfunc);
