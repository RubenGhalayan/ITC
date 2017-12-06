package src;
import interfaces.*;

public class MercSUV implements SUV {
    @Override
    public void drive() {
        System.out.println("Merc Simple mode");
    }

    @Override
    public void suvMode() {
        System.out.println("Merc 4X4");
    }    
}
