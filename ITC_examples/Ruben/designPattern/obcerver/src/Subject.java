package src;
import java.util.ArrayList;

public class Subject {
       private ArrayList<Observer> observers = new ArrayList<Observer>();
       private String news;

       public Subject(String news) {
              this.news = news;
       }
       public void setNews(String news) {
              this.news = news;
              updateObservers();
       }
       public void addObserver(Observer observer) {
              observers.add(observer);

       }

       public void removeObserver(Observer observer) {
              observers.remove(observer);

       }

       public void updateObservers() {
              for (Observer ob : observers) {
                     System.out.println("Update Observers on change in Subject news");
                     ob.update(this.news);
              }

       }

}
