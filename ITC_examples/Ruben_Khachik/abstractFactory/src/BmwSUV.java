package src;
import interfaces.*;

public class BmwSUV implements SUV {
    @Override
    public void drive() {

        System.out.println("BMW Simple mode");
    }

    @Override
    public void suvMode() {
        System.out.println("BMW 4X4");
    }    
}
