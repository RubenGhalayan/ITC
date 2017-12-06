package war;
import war.Weapon;

public class Ak_74 implements Weapon {
    private String name;
    private int damage;
    private int maxDistance;
    private int bulletCount;
    private int bulletSize;

    public Ak_74() {
	this.name = "Ak-74";
	this.damage = 30;
	this.maxDistance = 2000;
	this.bulletCount = 40;
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

