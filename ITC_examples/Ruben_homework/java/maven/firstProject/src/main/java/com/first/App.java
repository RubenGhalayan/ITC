package com.first;

import java.io.FileReader;
import java.util.Iterator;
 
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
 


public class App 
{
    public static void main( String[] args )
    {
        JSONParser parser = new JSONParser();
 
        try {
 
            JSONArray objArray =(JSONArray) parser.parse(new FileReader(
                    "test.json"));
	    System.out.println(getObject(objArray, "name1"));
	    System.out.println(getObjectValue(objArray.get(0), "surname")); 
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static JSONObject getObject(JSONArray objArray, String name){
	for(Object obj : objArray) {
	    JSONObject obj1 = (JSONObject) obj;
	    String value = (String)obj1.get("name");
	    if ( value.equals(name) ) {
		return obj1;
	    }
	}
	return null;
    }

    public static String getObjectValue (Object obj, String key){
	JSONObject obj1 = (JSONObject) obj;
	String key1 = (String)obj1.get(key);
	return key1;
    }
}
