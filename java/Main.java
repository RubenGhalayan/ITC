import print.Roman;
import print.Numeric;

public class Main {
    public static void main(String[] args) {
        int number = Integer.parseInt(args[0]);
	Numeric num = new Numeric();
        num.isNumber(number); 
	Roman rom = new Roman();
	rom.isRoman(number);
    }
}
