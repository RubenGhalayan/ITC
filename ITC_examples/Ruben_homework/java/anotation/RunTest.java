import java.lang.annotation.Annotation;
import java.lang.reflect.Method;

public class RunTest {

  public static void main(String[] args) throws Exception {

	System.out.println("Testing...");

	int passed = 0, failed = 0, count = 0, ignore = 0;

	Class<UnitTest> obj = UnitTest.class;
	
	for (Method method : obj.getDeclaredMethods()) {
	    if (method.isAnnotationPresent(TesterInfo.class)){
	    }
	}
	for (Method method : obj.getDeclaredMethods()) {

		if (method.isAnnotationPresent(Test.class) && method.isAnnotationPresent(TesterInfo.class)) {

			Annotation annotation = method.getAnnotation(Test.class);
			Test test = (Test) annotation;

			Annotation annotationa = method.getAnnotation(TesterInfo.class);
			TesterInfo testerInfo = (TesterInfo) annotationa;
                        System.out.println(testerInfo.priority());
	
			if (test.enabled()) {
			  try {
				method.invoke(obj.newInstance());
				System.out.printf("%s - Test '%s' - passed %n", ++count, method.getName());
				passed++;
			  } catch (Throwable ex) {
				System.out.printf("%s - Test '%s' - failed: %s %n", ++count, method.getName(), ex.getCause());
				failed++;
			  }

			} else {
				System.out.printf("%s - Test '%s' - ignored%n", ++count, method.getName());
				ignore++;
			}

		}

	}
	System.out.printf("%nResult : Total : %d, Passed: %d, Failed %d, Ignore %d%n", count, passed, failed, ignore);

	}
}
