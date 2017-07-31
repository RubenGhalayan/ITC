package print;
import controller.*;

public class Numeric {
    public static void isNumber(int number) {
	Fibonacci fib = new Fibonacci();
	Factorial fact = new Factorial();
	System.out.println("fibonacci(" + number + ") = " + fib.fibonacci(number));
	System.out.println("factorial(" + number + ") = " + fact.factorial(number));
    }
}
