package src;

public class Newspaper implements Observer {
       @Override
       public void update(String news) {
              System.out.println("Newspaper: Updating news: " + news);
       }
}
