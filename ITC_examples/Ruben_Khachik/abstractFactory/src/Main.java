package src;
import interfaces.*;

class Main{
    public static void main(String[] args) {
        Factory.get("Bmw").createSUV().drive();
       

    }
}
