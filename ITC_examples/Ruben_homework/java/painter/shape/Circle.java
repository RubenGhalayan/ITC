package shape;
import java.io.*;
import shape.Shape;

public class Circle implements Shape{
    public void draw(PrintStream out, char symbol) {
        int posX = 10, posY = 10, radius = 5;
        for (int i = 0; i <= posX + radius; i++) {
           for (int j = 1; j <= posY + radius; j++) {
               int xSquared = (i - posX)*(i - posX);
               int ySquared = (j - posY)*(j - posY);
               if (Math.abs(xSquared + ySquared - radius * radius) < radius) {
                   out.print(symbol);
               } else {
                   out.print(" ");
               }
           }
           out.println();
       }
    }
}
