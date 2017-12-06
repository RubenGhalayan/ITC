package shape;
import java.io.*;
import shape.Shape;

public class Line implements Shape {
    public void draw(PrintStream out, char symbol){
        int length = 10;
	for (int i = 0; i <= length; i++){
	    out.print(symbol);
	}
    }
}

