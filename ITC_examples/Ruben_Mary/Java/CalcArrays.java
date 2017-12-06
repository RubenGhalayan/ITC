package calc;

public class CalcArrays {
    public static int[] sumArrays (int[] array1, int[] array2) {
        int[] newArray = null;
        if (array1.length > array2.length) {
            newArray = array1;
	    array1 = array2;
	    array2 = newArray;
        }
        for (int i = 0; i < array1.length; ++i) {
            array2[i] = array2[i] + array1[i];
        }
        return array2;
    }
    public static int[] multiArrays (int[] array1, int[] array2){
        for (int i = 0; i < array1.length; ++i) {
                array1[i] = array1[i] * array2[i];
    	}
        return array1;
    }
}
