import war.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Weapon firstWeapon = new Makarov();
        Soldier first = new Soldier("Ahmed", "azer", 80, firstWeapon, 0, 0, 20);     
        Weapon secondWeapon = new Ak_74();
        Soldier second = new Soldier("Armen", "arm", 100, secondWeapon, 150, 150, 15);        
        Field field = new Field();
        field.add(first);
        field.add(first);        
        first.fire(second, 20); 
        first.printSoldierInfo();      
        second.printSoldierInfo();     
        second.fire(first, 45); 
        first.printSoldierInfo();      
        second.printSoldierInfo();     
        second.fire(first, 45); 
        first.printSoldierInfo();      
        second.printSoldierInfo();     
        second.fire(first, 45); 
        first.printSoldierInfo();      
        second.printSoldierInfo();     
    }
}
