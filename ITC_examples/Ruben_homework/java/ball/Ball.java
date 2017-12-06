
public class Ball {
    private int x;
    private int y;
    private int r;
    private int vx;
    private int vy;
    private String name;

    public Ball(int x, int y, int r, int vx, int vy, String name) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = vx;
        this.vy = vy;
	this.name = name;
        print(this);
    }

    public void getStatus(Ball other, int time) {
        for (int i = 1; i <= time; ++i) {
            x += vx;
            y += vy;
            other.x += other.vx;
            other.y += other.vy;
       	    checkBoard(this);
            print(this);
	    checkBoard(other);
            print(other);
            if (Math.abs(x + r + vx - (other.x + other.r + other.vx)) < Math.abs(r + other.r) && 
		Math.abs(y + r + vy - (other.y + other.r + other.vy)) < Math.abs(r + other.r)) {
		vx = -vx;
		vy = -vy;
		other.vx = -vx;
		other.vy = -vy;
		System.out.println("They are clashed \n");
	    }
	}

    }

    private void print(Ball ball) {
	System.out.println("Ball name:  " + ball.name);
        System.out.println("x: " + ball.x + "    y: " + ball.y); 
        System.out.println("vx: " + ball.vx + "    vy: " + ball.vy);
        System.out.println("r: " + ball.r + "\n");
    }

    private void checkBoard(Ball ball) {
	if (ball.x - ball.r + ball.vx < 0 || ball.x + ball.r + ball.vx > 15) {
	    ball.vx = -ball.vx;
	    System.out.println(ball.name + " clashed in board");
	}
        if (ball.y - ball.r + ball.vy < 0 || ball.y + ball.r + ball.vy > 15) {
            ball.vy = -ball.vy;
	    System.out.println(ball.name + " clashed in board");
        }
    }
}
