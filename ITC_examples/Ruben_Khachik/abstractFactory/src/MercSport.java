package src;
import interfaces.*;

public class MercSport implements Sport {
    @Override
    public void drive() {
        System.out.println(" Merc Sport Simple mode");
    }

    @Override
    public void sportMode() {
        System.out.println("Merc sport");
    }    
}
