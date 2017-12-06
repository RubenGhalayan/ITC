var canvas = document.getElementById("my_canvas");
var c = canvas.getContext("2d");
var circles = [];
//create te container that will hold the boincing balls.
var container = {
  x: 0,
  y: 0,
  width: 600,
  height: 500
};

function ball(x,y,r,vx,vy,color){
  this.x = x;
  this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
};

circles[0] = new ball(50, 100, 10, 1, 6, 150);
circles[1] = new ball(60, 200, 10, 4, 3, 205);
circles[2] = new ball(70, 150, 10, 6, 4, 150);
circles[3] = new ball(80, 250, 10, 5, 4, 50);
circles[4] = new ball(90, 190, 10, 4, 3, 205);
circles[5] = new ball(100, 19, 10, 3, 5, 205);
circles[6] = new ball(310, 120, 10, 4, 5, 50);
circles[7] = new ball(220, 220, 10, -4, -11, 205);
circles[8] = new ball(530, 155, 10, 5, 4, 150);
circles[9] = new ball(440, 250, 10, 4, -15, 150);
circles[10] = new ball(500, 180, 10, -16, -6, 50);
circles[11] = new ball(460, 100, 10, 14, -3, 50);


function animate() {
  c.fillStyle = "#000000";
  c.fillRect(container.x, container.y, container.width, container.height);
  for (var i = 0; i < circles.length; i++) {
    c.fillStyle = 'hsl(' + circles[i].color + ', 100%, 50%)';
    c.beginPath();
    c.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2, true);
    c.fill()

    if (circles[i].x - circles[i].r + circles[i].vx < container.x || circles[i].x + circles[i].r + circles[i].vx > container.x + container.width) {
      circles[i].vx = -circles[i].vx;
    }

    if (circles[i].y + circles[i].r + circles[i].vy > container.y + container.height || circles[i].y - circles[i].r + circles[i].vy < container.y) {
      circles[i].vy = -circles[i].vy;
    }
    circles[i].x += circles[i].vx;
    circles[i].y += circles[i].vy;
    circles[i].vx++;
    circles[i].vy++;
    for(var j = 0; j < circles.length; ++j ){
        position(circles[i], circles[j], j);
    }
  }
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

function position(circle1, circle2, index) {
    if (circle1 == undefined || circle2 == undefined){
    } else if (circle1 != circle2 && valid(circle1, circle2)) {
        if (circle1.color == circle2.color) {
            circle1.r = circle1.r + circle2.r;
            circles.splice(index, 1);
        } else {
            circle1.vx = circle2.vx;
            circle1.vy = circle2.vy;
            circle2.vx = -circle2.vx;
            circle2.vy = -circle2.vy;
        }
    }
};

function valid(circle1, circle2) {
    for (var i = 0; i < 8; ++i) {
        if (Math.abs((circle1.x + circle1.r + circle1.vx - (circle2.x + circle2.r + circle2.vx))) < Math.abs(circle1.r + circle2.r) && Math.abs((circle1.y + circle1.r + circle1.vy - (circle2.y + circle2.r + circle2.vy))) < Math.abs(circle1.r + circle2.r)) {
            return true;
        }
    }
    return false;
};
