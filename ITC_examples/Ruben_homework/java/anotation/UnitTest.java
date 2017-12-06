
public class UnitTest {

	@Test
	@TesterInfo
	void testA() {
	  if (true){
		System.out.println("ddddd");
		throw new RuntimeException("This test always failed");
	  }
	}

	@TesterInfo(name="test1", priority = 2)
	@Test(enabled = false)
	void testB() {
	  if (false)
		throw new RuntimeException("This test always passed");
	}

	@Test(enabled = true)
	void testC() {
	  if (10 > 1) {
	  }
	}
	@Test(enabled = true)
	@TesterInfo(name="test1", priority = 1)
	void testD() {
	  if (10 > 1) {
	  }
	}

}

