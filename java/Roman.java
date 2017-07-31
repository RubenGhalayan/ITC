package print;
import controller.*;

public class Roman {
    public static String roman (int n) {
	String roman="";
        int repeat;
        int magnitude[]={1000,900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String symbol[]={"M","CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};
        repeat=n/1;
        for(int x=0; n>0; x++){
            repeat=n/magnitude[x];
            for(int i=1; i<=repeat; i++){
                roman=roman + symbol[x];
            }
            n=n%magnitude[x];
        }
        return roman;
    } 
    public static void isRoman (int number) {
	Fibonacci fib = new Fibonacci();
        Factorial fact = new Factorial();
	System.out.println("fibonacci(" + number + ") = " + roman(fib.fibonacci(number)));
        System.out.println("factorial(" + number + ") = " + roman(fact.factorial(number)));

    }   

}

