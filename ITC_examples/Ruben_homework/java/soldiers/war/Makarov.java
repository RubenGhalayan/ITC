package war;
import war.Weapon;

public class Makarov implements Weapon {
    private String name;
    private int damage;
    private int maxDistance;
    private int bulletCount;
    private int bulletSize;

    public Makarov() {
        this.name = "Makarov";
        this.damage = 15;
        this.maxDistance = 200;
        this.bulletCount = 10;
        this.bulletSize = 1;
    }

    public String getName() {
        return this.name;
    }

    public int getDamage() {
        return this.damage;
    }
    public int getMaxDistance() {
        return this.maxDistance;
    }

    public void setBulletCount(int bulletCount) {
        this.bulletCount = bulletCount;
    }
    public int getBulletCount() {
        return this.bulletCount;
    }
    public int getBulletSize() {
        return this.bulletSize;
    }
}

