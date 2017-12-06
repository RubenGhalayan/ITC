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

    public void testAppGmail() throws InterruptedException {
        String stringEmail = "";
        String stringPasssword = "";
        System.setProperty("webdriver.chrome.driver", "/home/ruben/Downloads/chromedriver");
        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://www.gmail.com");
        Thread.sleep(4000);

        WebElement email = driver.findElement(By.name("identifier"));
        email.sendKeys(stringEmail);
        driver.findElement(By.cssSelector("span[class='RveJvd snByac']")).click();
        Thread.sleep(2000);
        WebElement password = driver.findElement(By.name("password"));
        password.sendKeys(stringPasssword);
        driver.findElement(By.cssSelector("span[class='RveJvd snByac']")).click();
        Thread.sleep(12000);
        driver.findElement(By.cssSelector("div[gh='cm']")).click();
        Thread.sleep(2000);
        WebElement to = driver.findElement(By.name("to"));
        to.sendKeys(stringEmail);
        WebElement subject = driver.findElement(By.name("subjectbox"));
        subject.sendKeys("test");
        WebElement text = driver.findElement(By.cssSelector("div[aria-label='Message Body']"));
        text.sendKeys("hello");
        driver.findElement(By.cssSelector("div[aria-label='Send ‪(Ctrl-Enter)‬']")).click();
        Thread.sleep(2000);
        driver.findElement(By.cssSelector("td[class='yX xY ']")).click();
        Thread.sleep(2000);
        String test = driver.findElement(By.cssSelector("h2[id=':p8']")).getText();
        driver.quit();
        assertTrue(test.equals("test"));
    }
}
