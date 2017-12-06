function fire(element){
	if (element.className=="s1e"){
		element.setAttribute("class","dmg");
	} else if (element.className=='dmg'){
		alert('You were already there')
	}else if(element.className=='miss'){
		alert('You were already there');
	}else{
		element.className='miss';
	}
};
function check(){
	for(var i = 0,  len = arguments.length; i<len; ++i){
	    var el = document.getElementById(arguments[i]+''+arguments[i+1]);
	    el.setAttribute("class", "z");
	    i++;
	}
};
function check_id(id){
    if(id.length==2){
	var id = parseInt(id),
	    i = Math.floor(id/10),
	    j = id%10;
    }else {
	var id = parseInt(id),
            i = Math.floor(id/100),
            j = id%100;
    }
    return [i,j];
};
function addClass(i, j, count){
	for(var k = i; k < (i+4); k++){
            var el = document.getElementById(k+''+j);
            el.setAttribute("class", "s1");
	}
};
function setship4(id){
	i=check_id(id)[0];
        j=check_id(id)[1];
	addClass(i,j,4);
	check(i,j-1,i,j+1,i-1,j-1,i-1,j,i-1,j+1,i+1,j-1,i+1,j+1,i+2,j-1,i+2,j+1,i+3,j-1,i+3,j+1,i+4,j-1,i+4,j,i+4,j+1);
};
function setship3(id){
	i=check_id(id)[0];
        j=check_id(id)[1];
	addClass(i,j,3);
	check(i,j-1,i,j+1,i-1,j-1,i-1,j,i-1,j+1,i+1,j+1,i+1,j-1,i+2,j-1,i+2,j+1,i+3,j-1,i+3,j,i+3,j+1);
};
function setship2(id){
	i=check_id(id)[0];
	j=check_id(id)[1];
	check(i,j-1,i,j+1,i+1,j-1,i+1,j+1,i-1,j-1,i-1,j,i-1,j+1,i+2,j-1,i+2,j,i+2,j+1);
	var el = document.getElementById(i+''+j);
	el.setAttribute("class", "s1");
	el = document.getElementById((i+1)+''+j);
	el.setAttribute("class", "s1");
};
function setShip1(id){
	i=check_id(id)[0];
	j=check_id(id)[1];
        check(i,j+1,i,j-1,i+1,j-1,i+1,j,i+1,j+1,i-1,j-1,i-1,j,i-1,j+1);
};
function create(count,e){
	for(var i = 0;i<count;++i){
		ships=document.createElement('div');
                ships.setAttribute("class", "s"+e);
                ships.setAttribute("id", "s"+i+e);
                ships.setAttribute("draggable", "true");
                ships.setAttribute("ondragstart", "drag(event)");
                enemy.appendChild(ships);
	}	
};
function init(){
	var width = 12, height = 12;
	player = document.querySelector('.js-player');
	enemy = document.querySelector('.js-enemy');
	for (var i=0;i<width;i++){
		for (var j=0;j<height;j++){
			if(i == 0 || i == 11 || j==0 || j == 11){
			    z=document.createElement('div');
                            z.setAttribute("style","background-image:none;");
			} else {
			    z=document.createElement('div');
			    z.setAttribute("class", "w");
			    z.setAttribute("ondrop", "drop(event)");
			    z.setAttribute("ondragover", "allowDrop(event)");
			}
			z.setAttribute("id", i + '' +j);
			player.appendChild(z);
		}
	}
create(4,1);
create(3,2);
create(2,3);
create(1,4);
};
function allowDrop(ev) {
    ev.preventDefault();
};
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.className);
    ev.dataTransfer.setData("id", ev.target.id);
};
function createenemy() {
    for (var i=0;i<12;i++){
        for (var j=0;j<12;j++){
	    var z=document.getElementById(i+''+j);
	    if(z.className == "s1"){
		z.setAttribute("class","s1e");
	    }
	    z.setAttribute("onclick","fire(this)")
	}
    }
    alert("start game");
};
    counter = 10;
function drop(ev) {
    var classname = ev.target.className;
    if (classname === "w"){
        var data = ev.dataTransfer.getData("text");
        id = ev.dataTransfer.getData("id");
        ev.target.setAttribute("class", data);
	var idname = ev.target.id;
	if((id === "s02")||(id ==="s12")||(id ==="s22")){
	    setship2(idname);
	}else if((id == "s03")||(id == "s13")){
	    setship3(idname);
	} else if(id == "s04") {
	    setship4(idname);
	} else {
            setShip1(idname);
        }
	document.getElementById(id).parentNode.removeChild(document.getElementById(id));
    --counter;
    if(counter == 0){
	createenemy();
    };
    } else {
	alert("wrong location");
    }
    ev.preventDefault();

};
window.addEventListener("DOMContentLoaded", init);
