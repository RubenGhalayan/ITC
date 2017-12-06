package cars;

public class SportsCar extends CarDecorator {

	public SportsCar(Car c) {
		super(c);
	}

	@Override
	public void drive(){
		super.drive();
		System.out.print("Sports Car drive.");
	}
}
