package cars;

public class SUVCar extends CarDecorator {

	public SUVCar(Car c) {
		super(c);
	}
	
	@Override
	public void drive(){
		super.drive();
		System.out.print("SUV Car drive.\n");
	}
}
