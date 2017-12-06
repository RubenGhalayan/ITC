"use strict";

function average(first, second, third) {
    for (var i = 0, len=arguments.length; i < len; i++) {
	var summ = 0;
	summ += arguments[i];       
    }
    document.write("this numbers average is  " + summ/arguments.length);
    console.log("first function");
}

function average(first, second) {
    for (var i = 0, len = arguments.length; i < len; i++) {
	var summ = 0;
	summ += arguments[i];       
    }
    document.write("this numbers average is  " + summ/arguments.length);
    console.log("second function");
}
