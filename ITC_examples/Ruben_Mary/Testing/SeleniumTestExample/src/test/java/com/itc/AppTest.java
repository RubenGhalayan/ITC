package com.itc;

import junit.framework.Test;
import junit.framework.TestCase;
import junit.framework.TestSuite;

import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.lang.InterruptedException;
import org.openqa.selenium.JavascriptExecutor;
import java.util.List;

public class AppTest extends TestCase {
    public AppTest(String testName) {
        super(testName);
    }

    public static Test suite() {
        return new TestSuite(AppTest.class);
    }

    public void testAppYoutube() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "/home/student/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://www.youtube.com");
        Thread.sleep(5000);

        WebElement searchBox = driver.findElement(By.name("search_query"));
        searchBox.sendKeys("Java");
        searchBox.submit();
        Thread.sleep(3000);

        List<WebElement> elems = driver.findElements(By.cssSelector("a[id='video-title']"));
        for (int i = 5; i < 10; ++i) {
            if (elems.get(i).getAttribute("title").toLowerCase().contains("selenium".toLowerCase())) {
                System.out.println(elems.get(i).getAttribute("title") + "\t\t\t\tContains");
            } else { 
                System.out.println(elems.get(i).getAttribute("title") + "\t\t\t\tDoesn't contain");
            }
        }
        Thread.sleep(3000);

        driver.quit();
        assertTrue(true);
    }

    public void testAppFacebook() throws InterruptedException {
        System.setProperty("webdriver.chrome.driver", "/home/student/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.facebook.com");
        Thread.sleep(5000);

        WebElement email = driver.findElement(By.name("email"));
        email.sendKeys("mail");
        WebElement password = driver.findElement(By.name("pass"));
        password.sendKeys("pass");
        password.submit();
        Thread.sleep(3000);
        JavascriptExecutor jsx = (JavascriptExecutor)driver;
        for (int k = 0; k < 50; k++) {
            driver.findElement(By.cssSelector("a[data-testid='fb-ufi-likelink']")).click();
            jsx.executeScript("window.scrollBy(0,900)", "");
        }
        driver.quit();
        assertTrue(true);
    }
}
