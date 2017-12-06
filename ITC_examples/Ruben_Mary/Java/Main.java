import calc.CalcArrays;

public class Main {
    public static void main(String[] args) {
	int[] array1 = {2, 3, 10};
	int[] array2 = {3, 5, 9};
        CalcArrays calc = new CalcArrays();
	int[] sum = calc.sumArrays(array1, array2);
	System.out.println("Sum two arrays");
	for(int i = 0; i < sum.length; ++i){
	    System.out.println(sum[i]);
	}
	System.out.println("multiply two arrays");
	if(array1.length == array2.length) {
	    sum = calc.multiArrays(array1, array2);
	    for(int i = 0; i < sum.length; ++i){
                System.out.println(sum[i]);
            }
	} else {
	    System.out.println("Not multiply this arrays");
	}
    }
}
