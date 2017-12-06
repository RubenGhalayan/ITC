package war;

public class Soldier {
    private String name;
    private String nation;
    private int life;
    private Weapon weapon;
    private int x;
    private int y;
    private int size;
    
    public Soldier(String name, String nation, int life, Weapon weapon, int x, int y, int size) {
        this.name = name;
        this.nation = nation;
        this.life = life;
        this.x = x;
        this.y = y;
        this.weapon = weapon;
        this.size = size;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getName() {
        return this.name;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }
    public String getNation() {
        return this.nation;
    }

    public void setLife(int life) {
        this.life = life;
    }
    public int getLife() {
        return this.life;
    }

    public void setX(int x) {
        this.x = x;
    }
    public int getX() {
        return this.x;
    }
    public void setY(int y) {
        this.y = y;
    }
    public int getY() {
        return this.y;
    }
    public void setWeapon(Weapon weapon) {
        this.weapon = weapon;
    }

    public Weapon getWeapon() {
        return this.weapon;
    }
   
    public void setSize(int size) {
        this.size = size;
    }
    public int getSize() {
        return this.size;
    }

    public boolean fire(Soldier soldier, int angle) {
	angle = (int)Math.toRadians(angle);
        if (this.weapon.getBulletCount() > 0) {
            this.weapon.setBulletCount(this.weapon.getBulletCount()-1);
            int newX = 0, newY = 0;
            for(int i = 0; i < this.weapon.getMaxDistance(); i+=this.weapon.getBulletSize()) {
                newX += (soldier.size * Math.sin(angle));
                newY += (soldier.size * Math.cos(angle));
                if(this.check(soldier, newX, newY)) {
                    soldier.life -= this.weapon.getDamage();
                    return true;
                }
            }
		System.out.println("\n" + this.name + " are missed\n");
        } else {
            System.out.println("\n" + this.name + " has not bullets");
            return false;
        }
        return false;
    }

    public boolean check(Soldier soldier, int newX, int newY) {
         return (Math.sqrt((newX - soldier.x) * (newX - soldier.x) + (newY - soldier.y) * (newY - soldier.y)) <= this.weapon.getBulletSize() + soldier.size);
    }

    public void printSoldierInfo() {
        if(this.life <= 0){
	    System.out.println("\n\n" + this.name + " are dead");
	} else {
            System.out.println("\n\n");
            System.out.println("Soldier Name            " + this.name);
            System.out.println("Soldier Nationality     " + this.nation);
            System.out.println("Soldier Life            " + this.life);    
            System.out.println("Soldier coordinate X    " + this.x);
            System.out.println("Soldier coordinate Y    " + this.y);
            System.out.println("Soldier size            " + this.size);
            System.out.println("Weapon name             " + this.weapon.getName());
            System.out.println("Weapon damage           " + this.weapon.getDamage());
            System.out.println("Weapon maxDistance      " + this.weapon.getMaxDistance());
            System.out.println("Weapon bullet count     " + this.weapon.getBulletCount());
            System.out.println("\n\n");
        }
    }
}
