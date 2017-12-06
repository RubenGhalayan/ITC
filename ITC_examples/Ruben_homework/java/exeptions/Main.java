public class Main {
    public static void findName(String name) throws NameNotFound{
		if(name == ""){
	    	throw new NameNotFound("Name not found");
		}
		System.out.println(name);
	}
	public static void findNullName(String name){
		if(name == null){
	    throw new NullName("Name is null");
		}
		System.out.println(name);
    	}
    public static void main(String[] args){
		try {
	    	findNullName(null);
		} catch (NullName ex) {
	    	ex.printStackTrace();
		}
		try {
	    	findName("");
		} catch (NameNotFound ex) {
	    	ex.printStackTrace();
		}
    }
}
