import java.lang.Exception;
import java.io.FileNotFoundException;

public class NameNotFound extends FileNotFoundException{
    public NameNotFound(String message){
	super(message);
    }
}

