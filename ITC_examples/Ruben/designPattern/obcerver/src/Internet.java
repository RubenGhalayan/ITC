package src;

public class Internet implements Observer {
       @Override
       public void update(String news) {
              System.out.println("Internet: Updating news: " + news);
       }
}
