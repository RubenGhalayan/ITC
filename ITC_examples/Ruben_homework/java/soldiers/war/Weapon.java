package war;

public interface Weapon {
/*    private String name;
    private int damage;
    private int diapason;
    private int bulletCount;
    private int bulletSize;*/
    public String getName();
    public int getDamage();
    public int getMaxDistance();
    public void setBulletCount(int bulletCount);
    public int getBulletCount();
    public int getBulletSize();
}
 
