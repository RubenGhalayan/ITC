package src;
import interfaces.*;

public class BmwSport implements Sport {
    @Override
    public void drive() {
        System.out.println("BMW Sport Simple mode");
    }

    @Override
    public void sportMode() {
        System.out.println("BMW sport mode");
    }    
}
