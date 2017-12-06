var width = 14, height = 14, mineNumber = 20; 
var winner = (height-1)*(width-1) - mineNumber;
function fire(element){
	if(element.getAttribute("style") !== null){
	}else if (element.className=="s1"){
		element.setAttribute("class","dmg");
		alert("game over");
	}else if(element.className=='w') {
		element.setAttribute("class","z0");
		idname = parseInt(element.id);
		--winner;
		change_classname(idname+1,idname-1,idname-width,idname-width-1,idname-width-2,idname+height,idname+height+1,idname+height+2);
	}else if(element.className=='z1'){
		element.setAttribute("class","z11");
		--winner
	}else if(element.className=='z2'){
		element.setAttribute("class","z22");
		--winner
	}else if(element.className=='z3'){
		element.setAttribute("class","z33");
		--winner
	}else if(element.className=='z4'){
		element.setAttribute("class","z44");
		--winner
	}else if(element.className=='z5'){
		element.setAttribute("class","z55");
		--winner
	}else if(element.className=='z6'){
		element.setAttribute("class","z66");
		--winner
	}else if(element.className=='z7'){
		element.setAttribute("class","z7");
		--winner
	}else if(element.className=='z8'){
		element.setAttribute("class","z88");
		--winner
	}else if (element.className=='dmg' ){
		alert('You were already there')
	}
}
function change_classname(){
    for(var i = 0, len = arguments.length; i < len; ++i ){
	var element = document.getElementById(arguments[i])
	if(element.className == 'w'){
	    fire(element);
	}
	if(element.className == 'z1'){
	    element.className = 'z11';
		--winner
	}
	if(element.className == 'z2'){
	    element.className = 'z22';
		--winner
	}
	if(element.className == 'z3'){
	    element.className = 'z33';
		--winner
	}
	if(element.className == 'z4'){
	    element.className = 'z44';
		--winner
	}
	if(element.className == 'z5'){
	    element.className = 'z55';
		--winner
	}
	if(element.className == 'z6'){
	    element.className = 'z66';
		--winner
	}
	if(element.className == 'z7'){
	    element.className = 'z77';
		--winner
	}
	if(element.className == 'z8'){
	    element.className = 'z88';
		--winner
	}
    }
}
function check(){
	for(var i = 0,  len = arguments.length; i<len; ++i){
	    var k = arguments[i];
	    var j = arguments[i+1];
	    if(playerMap[k][j]=="s1"){
	    }else if(playerMap[k][j]=="w"){
		playerMap[k][j] = "z1";
	    }else if (playerMap[k][j] == "z1"){
		playerMap[k][j] = "z2";
	    } else if (playerMap[k][j] == "z2"){
		playerMap[k][j] = "z3";
	    }else if (playerMap[k][j] == "z3"){
		playerMap[k][j] = "z4";
	    } else if (playerMap[k][j] == "z4"){
                playerMap[k][j] = "z5";
            } else if (playerMap[k][j] == "z5"){
                playerMap[k][j] = "z6";
            }else if (playerMap[k][j] == "z6"){
                playerMap[k][j] = "z7";
            } else if (playerMap[k][j] == "z7"){
                playerMap[k][j] = "z8";
            }
	    ++i;
	}

}
var setMine = function(i,j){
	playerMap[i][j]="s1";
	check(i,j+1,i,j-1,i+1,j-1,i+1,j,i+1,j+1,i-1,j-1,i-1,j,i-1,j+1);

}

var genMineArrangement = function(){
	var set = false;
	while (!set){
		var i = parseInt(Math.random() * width);
		var j = parseInt(Math.random() * height);
		
		if (i<height & i>0 & j>0 & j<width & (playerMap[i][j] !== 's1') ){
				set = true;
				setMine(i,j) 
		}
	}
}
function right(element){
    if(event.button === 2){
	if(element.getAttribute("style") == null & element.className !== 'z'){
            element.setAttribute("style", "background-image: url('imgs/zx.PNG')");
	} else {
	    element.removeAttribute("style");
	}
    } else if(event.button === 0){
	fire(element);
    }
}
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
function start(){
    var bool = true;
    while(bool){
        var id = randomInteger(0,width*height-1);
	if(document.getElementById(id).className == 'w'){
	    fire(document.getElementById(id));
	    bool = false;
	}
    }
}
function init(){
	enemy = document.querySelector('.js-enemy')
        enemy.style.height=((height+1)*47)+"px";	
        enemy.style.width=((width+1)*47)+"px";	
 	playerMap = new Array();

	for (var i=0;i<=width;i++){
		playerMap[i] = new Array();
		for (var j=0;j<=height;j++){
			if(i == 0 || i == width || j==0 || j == height){
			playerMap[i][j] = 'z';
			} else {
			playerMap[i][j] = 'w';
			}
		}
	}
	for(var i = 0; i < mineNumber; ++i){
		genMineArrangement(1,1);
	}
	var k = 0;
	for (var i=0;i<=width;i++){
		for (var j=0;j<=height;j++){
			z=document.createElement('div');
			z.className = playerMap[i][j];
			z.setAttribute("onmousedown","right(this)")
			z.setAttribute("oncontextmenu","return false")
			z.setAttribute("id",k++);
			enemy.appendChild(z);
		}
	}
	start();
	
};
window.addEventListener("DOMContentLoaded", init);
