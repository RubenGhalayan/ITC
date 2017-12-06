import shape.Circle;
import shape.Point;
import shape.Line;
import shape.Shape;
import java.io.*;

public class Main {
    public static void main(String[] args) throws FileNotFoundException{
	Shape shape = null;
	if (args[1].equals("circle")) {
	    shape = new Circle();
	    
	} else if (args[1].equals("point")) {
	    shape = new Point();
	} else {
	    shape = new Line();
	}
	if (args[0].equals("file")) {
	    OutputStream output = new FileOutputStream("./test.txt");
	    PrintStream printStream = new PrintStream(output);
	    shape.draw(printStream, args[2].charAt(0));
	} else {
	    shape.draw(System.out, args[2].charAt(0));
	}
    }
}
