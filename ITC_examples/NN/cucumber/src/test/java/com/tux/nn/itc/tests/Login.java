package com.tux.nn.itc.tests;

import cucumber.api.java.Before;
import cucumber.api.java.After;
import cucumber.api.java.en.Given;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.By;
import org.junit.Assert;
import static org.junit.Assert.assertEquals;

public class  Login {

    WebDriver driver = null;

    @Before("@login")
    public void init() {
    }

    @Given("^Open \"(.*?)\" browser with \"(.*?)\" url$")
    public void open_browser_with_url(String arg1, String arg2) throws Throwable {
        System.setProperty("webdriver.chrome.driver", "/home/student/Downloads/chromedriver");
        driver=new ChromeDriver();
        driver.manage().window().maximize();
        driver.navigate().to(arg2);
    }

    @When("^Fill \"(.*?)\" element with \"(.*?)\" value$")
    public void fill_element_with_value(String arg1, String arg2) throws Throwable {
        driver.findElement(By.id(arg1)).sendKeys(arg2);
    }

    @When("^\"(.*?)\" element with \"(.*?)\" value$")
    public void element_with_value(String arg1, String arg2) throws Throwable {
        driver.findElement(By.id(arg1)).sendKeys(arg2);
    }

    @Then("^Click on \"(.*?)\" button$")
    public void click_on_button(String arg1) throws Throwable {
        driver.findElement(By.name(arg1)).click();
        Thread.sleep(2000);
    }

    @Then("^Verify \"(.*?)\"$")
    public void verify(String arg1) throws Throwable {
        Assert.assertEquals(arg1, driver.getCurrentUrl());
    }
    @After("@login")
    public void close() {
        driver.quit();
    }
    /*
       @Given("^Open \"(.*?)\" browser with \"(.*?)\" urlr$")
       public void open_browser_with_urlr(String arg1, String arg2) throws Throwable {
       System.setProperty("webdriver.chrome.driver", "/home/ruben/Downloads/chromedriver");
       driver=new ChromeDriver();
       driver.navigate().to(arg2);
// Write code here that turns the phrase above into concrete actions
       }
       */
/*
    @When("^Click on toggle button(\\d+)$")
    public void click_on_toggle_button(int arg1) throws Throwable {
        driver.findElement(By.cssSelector("body > app-root > app-login-register > div > div > div.card.alt > div")).click();
        Thread.sleep(1000);
    }
    @When("^Fill \"(.*?)\" element with \"(.*?)\" value3$")
    public void fill_element_with_valuer(String arg1, String arg2) throws Throwable {
        driver.findElement(By.id(arg1)).sendKeys(arg2);
    }

    @When("^\"(.*?)\" element with \"(.*?)\" value4$")
    public void element_with_valuer(String arg1, String arg2) throws Throwable {
        driver.findElement(By.id(arg1)).sendKeys(arg2);
    }
    @When("^\"(.*?)\" element with \"(.*?)\" value5$")
    public void element_with_value1(String arg1, String arg2) throws Throwable {
        driver.findElement(By.id(arg1)).sendKeys(arg2);
    }
    @When("^\"(.*?)\" element with \"(.*?)\" value6$")
    public void element_with_value2(String arg1, String arg2) throws Throwable {
        driver.findElement(By.id(arg1)).sendKeys(arg2);
    }

    @Then("^Click on \"(.*?)\" buttonr$")
    public void click_on_buttonr(String arg1) throws Throwable {
        driver.findElement(By.name(arg1)).click();
        Thread.sleep(2000);
    }

    @Then("^Verifyr \"(.*?)\"$")
    public void verifyr(String arg1) throws Throwable {
        System.out.println(driver.getCurrentUrl());
        Assert.assertEquals("http://localhost:4200/home", driver.getCurrentUrl());
        //        driver.quit();
    }
    */
}
