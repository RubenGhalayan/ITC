package shape;
import java.io.*;
import shape.Shape;

public class Point implements Shape {
    public void draw(PrintStream out, char symbol){
	out.print(symbol);
    }
}
