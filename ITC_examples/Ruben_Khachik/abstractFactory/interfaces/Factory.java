
package interfaces;

import src.*;

public interface Factory {
    public SUV createSUV();
    public Sport createSport();
    public static Factory get(String model) {
         if(model.equals("Bmw")) {
             return new BmwFactory();
         }
         if(model.equals("Merc")) {
             return new MercFactory();
         }
         return null;
    }

}
