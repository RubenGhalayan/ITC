package com.first;

import org.junit.Test;
import static org.junit.Assert.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;


public class AppTest {

    @Test
    public void testgetObject() {
	String s1 = "[{\"name\":\"name1\", \"surname\":\"surname1\"}, {\"name\":\"a\"}]";
	String s2 = "{\"name\":\"name1\", \"surname\":\"surname1\"}";
        JSONParser parser = new JSONParser();
        try{
            JSONArray objArray =(JSONArray) parser.parse(s1);
            JSONObject obj =(JSONObject) parser.parse(s2);
	    JSONObject result = App.getObject(objArray, "name1");
	    assertEquals(obj, result);
        } catch(Exception e) {

        }
    }

    @Test
    public void testgetObjectValue() {
	String s = "{\"name\":\"name1\", \"surname\":\"surname1\"}";
        JSONParser parser = new JSONParser();
        try{
            JSONObject obj =(JSONObject) parser.parse(s);
	    String result = App.getObjectValue(obj, "name");
	    assertEquals("name1", result);
        } catch(Exception e) {

        }
    }
}
