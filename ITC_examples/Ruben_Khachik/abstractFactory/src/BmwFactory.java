package src;
import interfaces.*;

public class BmwFactory implements Factory {
    @Override
    public SUV createSUV() {
        return new BmwSUV();
    }

    @Override
    public Sport createSport() {
        return new BmwSport();
    }
}
