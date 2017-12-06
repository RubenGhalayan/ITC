
function fire(element){
	if (element.className=="s1" || element.className=="s2" || element.className=="s3"||element.className=="s4"){
		element.setAttribute("class","dmg");
	} else if (element.className=='dmg'){
		alert('You were already there')
	}else if(element.className=='miss'){
		alert('You were already there');
	}else{
		element.className='miss';
	}
}

var setShip = function(i,j,typeShip,direction,mass){
	for (var l = 0; l < typeShip; l++){
		if (direction==1){
			mass[i+l][j]="s"+typeShip;
			if (j>0) mass[i+l][j-1]='z';
			if (j<9) {
				mass[i+l][j+1]='z';
				if (i>0) mass[i-1][j+1]='z';
			}
			if (i>0){
				mass[i-1][j]='z';
				if (j>0) mass[i-1][j-1]='z';
			}
			if (i<10-typeShip){
				mass[i+typeShip][j]='z';
				if (j>0) mass[i+typeShip][j-1]='z';
				if (j<9) mass[i+typeShip][j+1]='z';
			} 
		}else{
			mass[i][j+l]="s"+typeShip;
			if(i>0){
				mass[i-1][j+l]='z';
			}
			if (i<9){
				mass[i+1][j+l]='z';
			}
			if (j==0){
				mass[i][j+typeShip]='z';
				if (i<9) mass[i+1][j+typeShip]='z'
				if (i>0) mass[i-1][j+typeShip]='z'
			}
			if (j>0){
				mass[i][j-1]='z';
				if(i>0) mass[i-1][j-1]='z';				
				if(i<9) mass[i+1][j-1]='z';
				if (j<9){
					mass[i][j+typeShip]='z';
					if (i>0) mass[i-1][j+typeShip]='z';
					if (i<9) mass[i+1][j+typeShip]='z';
				}
			}
		}
	}
}

var genShipsArrangement = function(mass,ts,playr){
	var set = false;
	var p = playr;
	var typeShip = ts;
	while (!set){
		var i = parseInt(Math.random() * 10);
		var j = parseInt(Math.random() * 10);
		var direction = parseInt(Math.random() * 2);
		var rj = j+typeShip;
		var ri = i+typeShip;
		
		if (direction == 1 & ri<11 & mass[i][j]=='w'){
			if (ri>9){
				continue;
			}else
				if(mass[ri][j]=='w') {
				set = true;
				setShip(i,j,typeShip,direction,mass,p) 
			}
		}
		if (direction == 0 & rj<11 & mass[i][j]=='w'){	
			if (rj>9){
				continue;
			}else
				if (mass[i][rj]=='w'){
					set = true;
					setShip(i,j,typeShip,direction,mass,p)
				}
		}
	}
}

function init(){
	var width = 10, height = 10;
	player = document.querySelector('.js-player')
	enemy = document.querySelector('.js-enemy')
 	
 	playerMap = new Array();

	for (var i=0;i<width;i++){
		playerMap[i] = new Array();
		for (var j=0;j<height;j++){
			playerMap[i][j] = 'w'
		}
	}
	genShipsArrangement(playerMap,4,1)
	genShipsArrangement(playerMap,3,1)
	genShipsArrangement(playerMap,3,1)
	genShipsArrangement(playerMap,2,1)
	genShipsArrangement(playerMap,2,1)
	genShipsArrangement(playerMap,2,1)
	genShipsArrangement(playerMap,1,1)
	genShipsArrangement(playerMap,1,1)
	genShipsArrangement(playerMap,1,1)
	genShipsArrangement(playerMap,1,1)

	for (var i=0;i<width;i++){
		for (var j=0;j<height;j++){

			z=document.createElement('div')
			e=document.createElement('div')
			z.className = playerMap[i][j]
			e.className = playerMap[i][j]
			z.setAttribute("i", i)
			z.setAttribute("j", j)
			e.setAttribute("i", i)
			e.setAttribute("j", j)
			e.setAttribute("onclick","fire(this)")
			player.appendChild(z)
			enemy.appendChild(e)
		}
	}
};
window.addEventListener("DOMContentLoaded", init);
