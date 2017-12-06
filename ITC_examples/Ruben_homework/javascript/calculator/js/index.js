var equals;
function run1(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}
	document.case.display.value += "1"
};
function run2(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}
	document.case.display.value += "2"
};
function run3(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}

	document.case.display.value += "3"
};
function run4(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}

	document.case.display.value += "4"
};
function run5(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}

	document.case.display.value += "5"
};

function run6(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}

	document.case.display.value += "6"
};

function run7(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}

	document.case.display.value += "7"
};

function run8(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}

	document.case.display.value += "8"
};

function run9(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}

	document.case.display.value += "9"
};

function run0(){
	if (document.case.display.value == equals) {
	    document.case.display.value = "";
	}

	document.case.display.value += "0"
};


function runPlus(){

	document.case.display.value += "+"
};

function runMinus(){

	document.case.display.value += "-"
};

function runDivide(){

	document.case.display.value += "/"
};
function runMultiply(){

	document.case.display.value += "*"
};

function runC(){

	document.case.display.value = ""
};

function runlog() {
        document.case.display.value = "Math.log(" + document.case.display.value + ")";
};

function runsqrt() {
        document.case.display.value = "Math.sqrt(" + document.case.display.value + ")";
};

function runabs() {
        document.case.display.value = "Math.abs(" + document.case.display.value + ")";
};

function runpow() {
        document.case.display.value = "Math.pow(" + document.case.display.value + ")";
};

function runfloat() {
        document.case.display.value += ".";
};
function runEquals() {
    try {
	equals = eval(document.case.display.value)
	document.case.display.value = equals;
    } catch (e) {
	document.case.display.value = "unknown number";
    }
}
