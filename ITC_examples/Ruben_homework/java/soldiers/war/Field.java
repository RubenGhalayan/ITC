package war;
import java.util.ArrayList;

public class Field {
    private ArrayList<Soldier> soldiers;
    public Field() { 
        soldiers = new ArrayList<Soldier>();
    }
    public void add(Soldier soldier) {
        this.soldiers.add(soldier);
    }
    public ArrayList<Soldier> getSoldier() {
        return this.soldiers;
    }
}
