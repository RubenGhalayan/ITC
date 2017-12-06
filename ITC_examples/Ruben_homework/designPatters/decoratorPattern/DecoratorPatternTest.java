import cars.*;

public class DecoratorPatternTest {

	public static void main(String[] args) {
		Car sportsCar = new SportsCar(new BasicCar());
		sportsCar.drive();
		System.out.println("\n*****");
		Car suvSportCar = new SUVCar(new SportsCar(new BasicCar()));
		suvSportCar.drive();
	}

}
