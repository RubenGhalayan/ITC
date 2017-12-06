function createCalc(rowNumber) {
    for (var i = 0, index=rowNumber.length; i < index; i++) {
        var input = document.createElement('input');
        input.setAttribute('value', rowNumber[i]);
        input.setAttribute('class', 'digit');
	input.setAttribute('type', 'button');
	input.setAttribute('onclick', 'run'+rowNumber[i]+'()');
        input.innerHTML = rowNumber[i];
        document.getElementById("calculator").appendChild(input);
    }
    var br = document.createElement('br');
    document.getElementById("calculator").appendChild(br);
};

function createButtons() {
    var inp = document.getElementById("input");
    inp.parentNode.removeChild(inp);
    var row1 = [1,2,3,"Plus"];
    var row2 = [4,5,6,"Minus"];
    var row3 = [7,8,9,"Multiply"];
    var row4 = ["Float",0,"Equals","Divide"];
    createCalc(row1);
    createCalc(row2);
    createCalc(row3);
    createCalc(row4);
};

var equals;

function isFree() {
	if (document.case.display.value == equals) {
            document.case.display.value = "";
        }
}
function run1(){
	isFree();
	document.case.display.value += "1"
};
function run2(){
        isFree();
	document.case.display.value += "2"
};
function run3(){
        isFree();
	document.case.display.value += "3"
};
function run4(){
	isFree();
	document.case.display.value += "4"
};
function run5(){
	isFree();
	document.case.display.value += "5"
};

function run6(){
	isFree();
	document.case.display.value += "6"
};

function run7(){
	isFree();
	document.case.display.value += "7"
};

function run8(){
	isFree();
	document.case.display.value += "8"
};

function run9(){
	isFree();
	document.case.display.value += "9"
};

function run0(){
	isFree();
	document.case.display.value += "0"
};

function runFloat() {
	isFree();
	document.case.display.value += "."
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

function runEquals() {
    try {
	equals = eval(document.case.display.value)
	document.case.display.value = equals;
    } catch (e) {
	document.case.display.value = "unknown number";
    } finally {
	equals = document.case.display.value;
    }
};

