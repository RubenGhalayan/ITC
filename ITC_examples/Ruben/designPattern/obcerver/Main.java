import src.*;

public class Main {

       public static void main(String args[]) {
              Newspaper printMedia = new Newspaper();
              Internet onlineMedia = new Internet();

              Subject subject= new Subject("new post");
              subject.addObserver(printMedia);
              subject.addObserver(onlineMedia);
              subject.setNews("Hello");

       }
}
