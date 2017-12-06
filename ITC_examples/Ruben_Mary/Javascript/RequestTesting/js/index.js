function sendRequest() {
    var input = document.getElementById("input");
    var url = input.value;
    var xhttp = new XMLHttpRequest();

    console.log(url);
    xhttp.onreadystatechange = function() {
        document.getElementById("content").innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
