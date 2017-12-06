
public class Main {
    public static void main(String[] args) {
        Ball first = new Ball(2, 5, 2, 1, 0, "First");
        Ball second = new Ball(12, 5, 2, -1, 0, "Second");
        first.animate(second, 15);
    }
}
