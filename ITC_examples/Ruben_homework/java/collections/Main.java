import java.util.*;

public class Main {
    private static ArrayList<Long> rowList = new ArrayList<Long>();
    private static ArrayList<Long> rowLink = new ArrayList<Long>();
    private static ArrayList<Long> rowMap = new ArrayList<Long>();
    private static ArrayList<Long> rowSet = new ArrayList<Long>();
    private static ArrayList<Long> rowSset = new ArrayList<Long>();
    
    private static ArrayList<Integer> list = new ArrayList<Integer>();
    private static LinkedList<Integer> link = new LinkedList<Integer>();
    private static HashMap<Integer,Integer> map = new HashMap<Integer,Integer>();  
    private static HashSet<Integer> set=new HashSet<Integer>();  
    private static SortedSet<Integer> sSet = new TreeSet<Integer>(); 

    public static void main(String args[]) {
	

	for (int i = 0; i < 50000; ++i) {
	    list.add(i);
	    link.add(i);
	    map.put(i, i);
	    set.add(i);
	    sSet.add(i);
	}
	listFunc();
	linkFunc();
	mapFunc();
	setFunc();
	sSetFunc();
	System.out.println("name       | " + " insert " + " delete " + " find " + " index ");
	System.out.println("----------------------------------------------------");
	System.out.println("ArrayList  | " + rowList);
	System.out.println("----------------------------------------------------");
	System.out.println("LinkedList | " + rowLink);
	System.out.println("----------------------------------------------------");
	System.out.println("HashMap    | " + rowMap);
	System.out.println("----------------------------------------------------");
	System.out.println("HashSet    | " + rowSet);
	System.out.println("----------------------------------------------------");
	System.out.println("SortedSet  | " + rowSset);
	System.out.println("----------------------------------------------------");
    }
    
    private static void listFunc() {
	long time = System.nanoTime();
	list.add(4500, 7);
	rowList.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	list.remove(1000);
	rowList.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	list.contains(1000);
	rowList.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	list.get(1000);
	rowList.add(System.nanoTime() - time);
	
    }
    
    private static void linkFunc() {
	long time = System.nanoTime();
	link.add(4500, 7);
	rowLink.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	link.remove(1000);
	rowLink.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	link.contains(1000);
        rowLink.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	link.get(1000);
	rowLink.add(System.nanoTime() - time);
	
    }
    
    private static void mapFunc() {
	long time = System.nanoTime();
	map.put(4500, 7);
	rowMap.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	map.remove(1000);
	rowMap.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	map.containsValue(1000);
	rowMap.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	map.get(1000);
	rowMap.add(System.nanoTime() - time);
	
    }
    
    private static void setFunc() {
	long time = System.nanoTime();
	set.add(4500);
	rowSet.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	set.remove(1000);
	rowSet.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	set.contains(1000);
	rowSet.add(System.nanoTime() - time);
    }
    
    private static void sSetFunc() {
	long time = System.nanoTime();
	sSet.add(4500);
	rowSset.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	sSet.remove(1000);
	rowSset.add(System.nanoTime() - time);
	
	time = System.nanoTime();
	sSet.contains(1000);
	rowSset.add(System.nanoTime() - time);
    }
}
