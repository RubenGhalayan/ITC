"use strict";

function change_by_id(id_name) {
    document.getElementById(id_name).innerHTML = "This is div with id " + id_name;
}

function change_by_class(class_name) {
    var array = document.getElementsByClassName(class_name);
    for (var i = 0, len = array.length; i < len; ++i) {
        array[i].innerHTML = "This is div with class " + class_name;
    }
}
