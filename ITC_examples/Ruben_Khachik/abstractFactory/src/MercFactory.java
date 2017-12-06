package src;
import interfaces.*;

public class MercFactory implements Factory {
    @Override
    public SUV createSUV() {
        return new MercSUV();
    }

    @Override
    public Sport createSport() {
        return new MercSport();
    }
}
